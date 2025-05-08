import React, { useEffect, useState } from 'react';
import styles from './modal.module.css';
import SuccessMessage from '../SuccessMessage/SuccessMessage';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { createRecord, getRecords } from '../../redux/slices/recordSlice';
import SpinnerModal from '../SpinnerModal/SpinnerModal';
import useTranslate from '../../hooks/useTranslate';

const Modal = ({ setModal, data }) => {
  const [result, setResult] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [times, setTimes] = useState([]);

  const dispatch = useDispatch();
  const { error, loading, success, records } = useSelector(state => state.recordsReducer);

  const today = new Date();
  const dates = [];
  for (let i = 0; i < 10; i++) {
    const date = new Date(today.getTime() + (i * 24 * 60 * 60 * 1000));
    const dateString = date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
    const dayOfWeek = new Intl.DateTimeFormat('ru-RU', { weekday: 'long' }).format(date);
    if (dayOfWeek !== 'воскресенье') {
      dates.push({ date: dateString, dayOfWeek });
    }
  }

  const generateTimes = () => {
    const arr = [];
    for (let hour = 9; hour < 22; hour++) {
      arr.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    return arr;
  };

  const updateAvailableTimes = (dateVal = selectedDate, serviceVal = selectedService, doctorVal = selectedDoctor) => {
    if (!dateVal || !serviceVal || !doctorVal) return;
    const baseTimes = generateTimes();
    const filtered = baseTimes.filter(time => {
      return !records.some(r =>
        r.date === dateVal &&
        r.time === time &&
        r.service === serviceVal &&
        r.doctor === doctorVal
      );
    });
    setTimes(filtered);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    dispatch(getRecords());

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handlePhoneNumberChange = (event) => {
    let input = event.target.value.replace(/\D/g, '');
    if (!/^(2\d{2}|5\d{2}|7\d{2}|9\d{2})\d{6}$/.test(input)) {
      setIsValid(false);
      setPhone(input);
      return;
    }
    input = input.replace(/^(\d{3})(\d{3})(\d{3})$/, '($1)-$2-$3');
    setIsValid(true);
    setPhone(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(true);
    const rec = {
      type: 1,
      name,
      phone,
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      doctor: selectedDoctor,
    };
    dispatch(createRecord(rec));
  };

  const closeModal = (e) => {
    if (!document.querySelector('form').contains(e.target) && !result) {
      document.body.style.overflow = '';
      setModal(false);
    }
  };

  const handleClose = () => {
    document.body.style.overflow = '';
    setModal(false);
  };
  const t = useTranslate()

  return (
    <div onClick={closeModal} className={styles.window}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h2>{t.makeAppointment}</h2>
        <section onClick={handleClose} className={styles.closeX}>X</section>

        {result ? (
          loading ? (
            <div className={styles.loading}>
              <SpinnerModal />
              <p>{t.loading}</p>
            </div>
          ) : (
            <div>
              <button type='button' className={styles.closeBtn} onClick={handleClose}>X</button>
              {error ? <ErrorMessage message={error} /> : <SuccessMessage message={success} />}
            </div>
          )
        ) : (
          <>
            <div className="form-group">
              <label htmlFor="name">{t.formName}: </label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Телефон: </label>
              <input type="tel" placeholder="777222333" id="phone" value={phone} onChange={handlePhoneNumberChange} required />
              {!isValid && phone.length > 0 && <p className='errorNum'>{t.invalidPhone}</p>}
            </div>

            <div className='form-group'>
              <label htmlFor="service">{t.formService}: </label>
              <select
                id='service'
                required
                value={selectedService}
                onChange={(e) => {
                  setSelectedService(e.target.value);
                  updateAvailableTimes(selectedDate, e.target.value, selectedDoctor);
                  setSelectedDate('');
                  setSelectedTime('');
                }}
              >
                <option value=''>{t.formServiceSelect}</option>
                {data.categories.map(el => <option key={el.name} value={el.name}>{el.name}</option>)}
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor="doctor">Врач:</label>
              <select
                id='doctor'
                required
                value={selectedDoctor}
                onChange={(e) => {
                  setSelectedDoctor(e.target.value);
                  updateAvailableTimes(selectedDate, selectedService, e.target.value);
                  setSelectedDate('');
                  setSelectedTime('');
                }}
              >
                <option value="">{t.formDoctorSelect}</option>
                {data.doctors?.map(doctor => (
                  <option key={doctor.name} value={doctor.name}>{doctor.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="date">{t.date}: </label>
              <select
                id="date"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  updateAvailableTimes(e.target.value, selectedService, selectedDoctor);
                  setSelectedTime('');
                }}
                required
              >
                <option value="" disabled>{t.chooseDate}</option>
                {dates.map((date) => (
                  <option key={date.date} value={date.date}>{`${date.dayOfWeek}, ${date.date}`}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="time">{t.time}: </label>
              <select
                disabled={!selectedDate}
                id="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                required
              >
                <option value="" disabled>{t.chooseTime}</option>
                {times
                  .filter(time =>
                    today.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' }) === selectedDate
                      ? Number(time.slice(0, 2)) >= today.getHours() + 1
                      : true
                  )
                  .map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))
                }
              </select>
            </div>

            <button disabled={!isValid} type="submit">{t.recordLink}</button>
          </>
        )}
      </form>
    </div>
  );
};

export default Modal;

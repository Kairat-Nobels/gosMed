import styles from './homePage.module.css'
import hello from '../../assets/images/homemed.jpg'
import searchIcon from '../../assets/images/searchIcon.png'
import serviceIcon from '../../assets/images/serviceIcon.png'
import { useSelector } from 'react-redux'
import HomeCards from '../../components/HomeCards/HomeCards'
import SwipperSlider from '../../components/SwipperSlider/SwipperSlider'
import HomeDoctors from '../../components/HomeDoctors/HomeDoctors'
import { NavLink } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import { useEffect, useState } from 'react'
import ReviewModal from '../../components/ReviewModal/ReviewModal'
import Spinner from '../../components/Spinner/Spinner'
import useTranslate from '../../hooks/useTranslate'
import Slider from '../../components/Slider/Slider'

function HomePage() {
  const [modal, setModal] = useState(false)
  const [more, setMore] = useState(false)
  const { reviews } = useSelector(state => state.reviewsReducer)
  const { doctors, loading, error } = useSelector(state => state.doctorsReducer)

  const t = useTranslate()

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Сообщение отправлено')
    e.target.reset()
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className={styles.page}>
      <div className={styles.hello}>
        <div className={styles.left}>
          <div><h1>{t.homeh1}</h1>
            {/* <div className={styles.rightH1}><img src={hello} alt="img" /></div> */}
          </div>
          <p>{t.homeWelcome}</p>
          <a href="#sliderHome">{t.readMore}</a>
        </div>
        <div className={styles.right}></div>
      </div>
      <div>
        <Slider />
      </div>
      <HomeCards />
      <div className={styles.about}>
        <h2>{t.aboutTitle}</h2>
        <div className={styles.aboutLine}></div>
        <div className={styles.aboutText}>
          <p>{t.aboutP1}</p>
          <p>{t.aboutP2}</p>
          <p className={styles.aboutP}>{t.aboutP3}</p>
          <p className={styles.aboutP}>{t.aboutP4}</p>
          {
            more &&

            <>
              <p>{t.aboutP3}</p>
              <p>{t.aboutP4}</p>
            </>
          }
          <span onClick={() => {
            setMore(!more)
          }} className={styles.moreBtn}>{more ? t.moreBtnClose : t.moreBtnOpen}</span>
        </div>
        <div className={styles.reviewsModal}>
          <div className={styles.docLink}>
            <NavLink to={'/services'}>
              <p>{t.seeAllServices}</p>
              <div><img src={serviceIcon} alt="img" /></div>
            </NavLink>
          </div>
          <button onClick={e => setModal(true)}>{t.leaveReview}</button>
        </div>
        {
          modal && <ReviewModal setModal={setModal} />
        }
      </div>
      <div className={styles.doctors}>
        <h2>{t.ourDoctors} </h2>
        {loading ? <Spinner />
          :
          error ? <div className='fetchError'><p>😕 Error: {error}</p><p>{t.errorAdvice}</p></div> :
            <>
              <div className={styles.cardsDoc}>
                {
                  doctors.slice(0, 6).filter((v, i) => i % 2 === 1).map(s => <HomeDoctors key={s.id} data={s} />)
                }
              </div>
              <div className={styles.docLink}>
                <NavLink to={'/doctors'}>
                  <p>{t.seeAllDoctors}</p>
                  <div><img src={searchIcon} alt="img" /></div>
                </NavLink>
              </div>
            </>
        }
      </div>
      {
        reviews.length > 0 && <SwipperSlider items={reviews} />
      }
      <div className={styles.feedBack}>
        <div className={styles.maps}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d2955.0274660516375!2d75.74819874504496!3d42.21385760721514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1z0JrQntCn0JrQntCgINCT0JzQow!5e0!3m2!1sru!2skg!4v1746353440424!5m2!1sru!2skg" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div className={styles.sendMes}>
          <h2>{t.contactTitle}</h2>
          <p>{t.contactDesc}</p>
          <form className={styles.formMes} onSubmit={handleSubmit} action="">
            <div>
              <label htmlFor="">{t.formName}: </label>
              <input required type="text" />
            </div>
            <div>
              <label htmlFor="">Email: </label>
              <input required type="email" />
            </div>
            <div className={styles.message}>
              <label htmlFor="">{t.formMessage}: </label>
              <textarea required cols="30" rows="4"></textarea>
            </div>
            <button type='submit'>{t.formSubmit}</button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default HomePage
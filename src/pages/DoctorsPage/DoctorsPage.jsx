
import { useSelector } from 'react-redux'
import styles from './doctorsPage.module.css'
import DoctorCard from '../../components/DoctorCard/DoctorCard'
import { useEffect } from 'react'
import Footer from '../../components/Footer/Footer'
import Spinner from '../../components/Spinner/Spinner'
import useTranslate from '../../hooks/useTranslate'

function DoctorsPage() {

  const t = useTranslate()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const { doctors, loading, error } = useSelector(state => state.doctorsReducer)
  return (
    <div className={styles.page}>
      <h2>{t.doctorsTitle}:</h2>
      <div className={styles.doctors}>
        {
          loading ? <Spinner /> :
            error ? <div className='fetchError'><p>😕 Error: {error}</p><p>{t.errorAdvice}</p></div> :
              doctors.map(s => <DoctorCard key={s.id} data={s} />)
        }
      </div>
      <Footer />
    </div>
  )
}

export default DoctorsPage
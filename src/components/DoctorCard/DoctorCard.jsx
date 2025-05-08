import { useSelector } from 'react-redux'
import styles from './doctorCard.module.css'
import useTranslate from '../../hooks/useTranslate'

function DoctorCard({ data }) {
    const t = useTranslate()
    const lang = useSelector(state => state.languageReducer.lang)

    return (
        <div className={styles.card}>
            <div className={styles.img}><img src={data.img} alt="img" /></div>
            <h3>{data.name}</h3>
            <h3 className={styles.post}>{data.post}</h3>
            <h4><span>{t.doctorsEducation} </span>{lang === 'ru' ? data.education : data.educationKG}</h4>
            <p><span>{t.doctorsAge} </span> {data.age} {t.age}</p>
            <p><span>{t.doctorsExperience} </span> {lang === 'ru' ? data.experience : data.experienceKG}</p>
        </div>
    )
}

export default DoctorCard
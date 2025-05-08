import { useSelector } from 'react-redux'
import styles from './doctor.module.css'

function Doctor({ obj }) {
    const lang = useSelector(state => state.languageReducer.lang)

    return (
        <div className={styles.div}>
            <p>{obj.name}</p>
            <p>({lang === 'ru' ? obj.post : obj.postKG})</p>
        </div>
    )
}

export default Doctor
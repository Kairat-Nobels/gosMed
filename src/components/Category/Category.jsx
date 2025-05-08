import { useSelector } from 'react-redux'
import styles from './category.module.css'

function Category({ obj }) {
    const lang = useSelector(state => state.languageReducer.lang)

    return (
        <div className={styles.category}>
            <p><span>{lang === 'ru' ? obj.name : obj.nameKG}</span></p>
        </div>
    )
}

export default Category
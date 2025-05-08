import { NavLink } from 'react-router-dom'
import styles from './serviceCard.module.css'
import { useSelector } from 'react-redux'

function ServiceCard({ data }) {
    const lang = useSelector(state => state.languageReducer.lang)

    return (
        <NavLink state={data} to={`/services/${data.id}`} className={styles.card}>
            <div><img src={data.img} alt="img" /></div>
            <h3>{lang === 'ru' ? data.name : data.nameKG}</h3>
        </NavLink>
    )
}

export default ServiceCard
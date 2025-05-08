import { useEffect } from 'react'
import ServiceCard from '../../components/ServiceCard/ServiceCard'
import styles from './servicePage.module.css'
import { useSelector } from 'react-redux'
import Spinner from '../../components/Spinner/Spinner'
import useTranslate from '../../hooks/useTranslate'

function ServicePage() {
    const t = useTranslate()
    const { services, loading, error } = useSelector(state => state.servicesReducer)
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className={styles.page}>
            <h2>{t.servisesTitle}:</h2>
            <div className={styles.service}>
                {
                    loading ? <Spinner /> :
                        error ? <div className='fetchError'><p>😕 Error: {error}</p><p>{t.errorAdvice}</p></div> :
                            services.map(s => <ServiceCard key={s.id} data={s} />)
                }
            </div>
        </div>
    )
}

export default ServicePage
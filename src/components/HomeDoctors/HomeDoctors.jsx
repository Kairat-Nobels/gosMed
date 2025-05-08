import styles from './homeDoctors.module.css'

function HomeDoctors({ data })
{
    return (
        <div className={styles.card}>
            <div className={styles.img}><img src={data.img} alt="img" /></div>
            <h3>{data.name}</h3>
            <h3>{data.post}</h3>
        </div>
    )
}

export default HomeDoctors
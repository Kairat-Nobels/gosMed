import styles from './doctor.module.css'

function Doctor({ obj }) {
    return (
        <div className={styles.div}>
            <p>{obj.name}</p>
            <p>({obj.post})</p>
        </div>
    )
}

export default Doctor
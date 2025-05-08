import styles from './review.module.css'
import image from '../../assets/images/userIcon.png'
function Review({ data })
{
    return (
        <div className={styles.review}>
            <div className={styles.head}>
                <div className={styles.imageUser}><img src={image} alt="Smashicons" /></div>
                <h3> {data.name}</h3>
            </div>
            <p>{data.comment}</p>
        </div>
    )
}

export default Review
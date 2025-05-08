import styles from './homeCards.module.css'
import card1 from '../../assets/images/card1.png'
import card2 from '../../assets/images/card2.png'
import card6 from '../../assets/images/card6.png'
import useTranslate from '../../hooks/useTranslate'
function HomeCards() {
    const t = useTranslate()

    return (
        <div id='homeCards' className={styles.cardPage}>
            <h2>{t.homeCardsTitle}</h2>
            <div className={styles.cards}>
                <div className={styles.card}>
                    <h3>{t.card1Title}</h3>
                    <p>{t.card1Text}</p>
                    <div><img src={card1} alt="img" /></div>
                </div>
                <div className={styles.card}>
                    <h3>{t.card2Title}</h3>
                    <p>{t.card2Text}</p>
                    <div><img src={card2} alt="img" /></div>
                </div>
                <div className={styles.card}>
                    <h3>{t.card6Title}</h3>
                    <p>{t.card6Text}</p>
                    <div><img src={card6} alt="img" /></div>
                </div>
            </div>
        </div>
    )
}

export default HomeCards
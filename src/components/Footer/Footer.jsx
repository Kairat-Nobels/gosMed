import { NavLink } from 'react-router-dom'
import styles from './footer.module.css'
import logo from '../../assets/logo.png'
import tel from '../../assets/images/tel.png'
import whats from '../../assets/images/whatsApp.png'
import insta from '../../assets/images/Instagram.png'
import faceBookicon from '../../assets/images/faceBookicon.png'
import useTranslate from '../../hooks/useTranslate'

function Footer() {
    const t = useTranslate()
    return (
        <>
            <nav className={styles.navbar}>
                <NavLink className={styles.logo} to='/'>
                    <div className={styles.logoImg}><img src={logo} alt="logo" /></div>
                    <h1>{t.siteTitle}</h1>
                </NavLink>
                <ul>
                    <li><a target='_blank' href="https://www.facebook.com/"><div><img src={faceBookicon} alt="img" /></div></a></li>
                    <li><a target='_blank' href="https://www.instagram.com"><div><img src={insta} alt="img" /></div></a></li>
                    <li><a target='_blank' href="https://wa.me"><div><img src={whats} alt="img" /></div></a></li>
                </ul>
                <div className={styles.info}>
                    <div>
                        <p className={styles.workTime}>{t.workTime}: <span>{t.workTimeSpan}</span></p>
                        <div className={styles.tel}><img className={styles.telIcon} src={tel} alt="" /><a href='tel:+996500555555'>+996 500 555 555</a></div>
                    </div>
                    <NavLink className={styles.linkBtn} to={'/services'}>{t.recordLink}</NavLink>
                </div>
            </nav>
            <div className={styles.mobileFooter}>
                <ul>
                    <li><a target='_blank' href="https://www.facebook.com/"><div><img src={faceBookicon} alt="img" /></div></a></li>
                    <li><a target='_blank' href="https://www.instagram.com/"><div><img src={insta} alt="img" /></div></a></li>
                    <li><a target='_blank' href="https://api.whatsapp.com/"><div><img src={whats} alt="img" /></div></a></li>
                </ul>
                <NavLink className={styles.linkBtn} to={'/services'}>{t.recordLink}</NavLink>
            </div>
        </>
    )
}

export default Footer
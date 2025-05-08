import { useDispatch, useSelector } from 'react-redux'
import styles from './layout.module.css'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getRecords } from '../../redux/slices/recordSlice'
import CameModal from '../../components/CameModal/CameModal'
import logo from '../../assets/logo.png'
import tel from '../../assets/images/tel.png'
import { getDoctors } from '../../redux/slices/doctorsSlice'
import { getService } from '../../redux/slices/servicesSlice'
import { getReviews } from '../../redux/slices/reviewsSlice'
import useTranslate from '../../hooks/useTranslate'
import { setLang } from '../../redux/slices/languageSlice'


function Layout() {
    const [modal, setModal] = useState(false)
    const [burger, setBurger] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const lang = useSelector(state => state.languageReducer.lang)
    const t = useTranslate()

    useEffect(() => {
        dispatch(getRecords())
        dispatch(getService())
        dispatch(getDoctors())
        dispatch(getReviews())
    }, [])
    burger ? document.body.style.overflow = 'hidden' : document.body.style.overflow = '';
    return (
        <div className="container">
            <nav className={styles.navbar}>
                <div className={styles.left}>
                    <NavLink className={styles.logo} to='/'>
                        <div className={styles.logoImg}><img src={logo} alt="logo" /></div>
                        <h1>{t.siteTitle}</h1>
                    </NavLink>
                    <ul>
                        <li><NavLink to='/' className={({ isActive }) => (isActive ? styles.active : '')}>{t.home}</NavLink></li>
                        <li><NavLink to='/services' className={({ isActive }) => (isActive ? styles.active : '')}>{t.services}</NavLink></li>
                        <li><NavLink to='/doctors' className={({ isActive }) => (isActive ? styles.active : '')}>{t.doctors}</NavLink></li>
                    </ul>
                </div>
                <div className={styles.info}>
                    <div>
                        <p className={styles.workTime}>{lang === 'ru' && t.workTime}<span>{t.workTimeSpan}</span></p>
                        <div className={styles.tel}><img className={styles.telIcon} src={tel} alt="" /><a href='tel:+996500555555'>+996 500 555 555</a></div>
                    </div>
                    <div className={styles.adminDiv}>
                        <button className={styles.adminBtn} onClick={e => {
                            if (localStorage.getItem('admin') === "true") {
                                navigate('/admin');
                            } else setModal(true)
                        }}>Админ</button>
                        <div className={styles.langButtons}>
                            <button onClick={() => dispatch(setLang('ru'))}>RU</button>
                            <button onClick={() => dispatch(setLang('kg'))}>KG</button>
                        </div>
                    </div>
                    <div className={styles.burger}>
                        <div onClick={() => setBurger(!burger)} className={styles.burgerBtn}>
                            <p className={burger ? styles.close : ''}></p>
                        </div>
                        {
                            burger && <div className={styles.burgerContent}>

                                <div className={styles.tel}><a href='tel:+996500555555'>+996 500 555 555</a></div>
                                <ul>
                                    <li><NavLink onClick={() => setBurger(false)} to='/' className={({ isActive }) => (isActive ? styles.active : '')}>{t.home}</NavLink></li>
                                    <li><NavLink onClick={() => setBurger(false)} to='/services' className={({ isActive }) => (isActive ? styles.active : '')}>{t.services}</NavLink></li>
                                    <li><NavLink onClick={() => setBurger(false)} to='/doctors' className={({ isActive }) => (isActive ? styles.active : '')}>{t.doctors}</NavLink></li>
                                    <div><button className={styles.adminBtn} onClick={e => {
                                        setModal(true)
                                        setBurger(false)
                                    }}>Админ</button></div>
                                    <div className={styles.MoblangButtons}>
                                        <button onClick={() => dispatch(setLang('ru'))}>RU</button>
                                        <button onClick={() => dispatch(setLang('kg'))}>KG</button>
                                    </div>

                                </ul>
                                <p className={styles.workTime}>{t.workTime}: <span>{t.workTimeSpan}</span></p>
                            </div>}
                    </div>
                </div>
            </nav>
            {
                modal && <CameModal setModal={setModal} />
            }
            <div className="outlet">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout
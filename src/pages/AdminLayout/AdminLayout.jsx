import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'rsuite';
import styles from './adminLayout.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { outAdmin } from '../../redux/slices/adminSlice';

function AdminLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { valid } = useSelector(state => state.adminReducer);
  const location = useLocation();

  useEffect(() => {
    if (valid && location.pathname === '/admin') {
      navigate('/admin/records');
    }
  }, [valid, location.pathname, navigate]);

  const handleLogout = () => {
    dispatch(outAdmin());
    navigate('/');
  };

  if (!valid) {
    return (
      <div className={styles.notWelcome}>
        <h2>Вы должны войти как администратор</h2>
        <Button appearance="primary" onClick={handleLogout}>Выйти</Button>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className='container'>
        <div className={styles.header}>
          <Button className='adminBtn' appearance="ghost" onClick={() => navigate('/')}>Главная</Button>
          <h2>Администратор</h2>
          <Button className='adminBtn red' appearance="ghost" onClick={handleLogout}>Выйти</Button>
        </div>
        <div className={styles.navbar}>
          <NavLink to="/admin/records" className={({ isActive }) => isActive ? styles.active : ''}>Записи</NavLink>
          <NavLink to="/admin/reviews" className={({ isActive }) => isActive ? styles.active : ''}>Отзывы</NavLink>
          <NavLink to="/admin/services" className={({ isActive }) => isActive ? styles.active : ''}>Услуги</NavLink>
          <NavLink to="/admin/staff" className={({ isActive }) => isActive ? styles.active : ''}>Персонал</NavLink>
        </div>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;

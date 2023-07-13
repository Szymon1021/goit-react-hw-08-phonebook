import { NavLink } from 'react-router-dom';
import { selectIsLoggedIn } from 'redux/auth/selector';
import { useSelector } from 'react-redux';

import css from './Navigation.module.css';

export const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <nav>
      <NavLink className={css.link} to="/home">
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink className={css.link} to="/Contacts">
          Contacts
        </NavLink>
      )}
    </nav>
  );
};

import { NavLink } from "react-router-dom";
import clsx from "clsx";

import s from "./AuthNav.module.css";

function makeClass({ isActive }) {
  return clsx(s.navLink, isActive && s.isActive);
}
const AuthNav = () => {
  return (
    <div className={s.wrapper}>
      <NavLink to="/login" className={makeClass}>
        Log in
      </NavLink>
      <NavLink to="/register" className={makeClass}>
        Register
      </NavLink>
    </div>
  );
};

export default AuthNav;

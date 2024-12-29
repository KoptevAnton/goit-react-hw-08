import { NavLink } from "react-router-dom";
import clsx from "clsx";

import s from "./Navigation.module.css";

function makeClass({ isActive }) {
  return clsx(s.navLink, isActive && s.isActive);
}

const Navigation = () => {
  return (
    <div className={s.container}>
      <NavLink to="/" className={makeClass}>
        Home
      </NavLink>
      <NavLink to="/contacts" className={makeClass}>
        Contacts
      </NavLink>
    </div>
  );
};

export default Navigation;

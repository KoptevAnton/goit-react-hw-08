import { selectUser } from "../../redux/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/operation";

import s from "./UserMenu.module.scss";

const UserMenu = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  return (
    <div className={s.container}>
        <p className={s.text}>
          Welcome, <span className={s.name}>{user.name}</span>
        </p>
      <div>
        <button
          className={s.btn}
          type="button"
          onClick={() => dispatch(logout())}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default UserMenu;

import { useId } from "react";
import { useDispatch } from "react-redux";
import { changeFilter } from "../../redux/filters/slice";

import s from "./SearchBox.module.css";

export default function SearchBox() {
  const id = useId();
  const dispatch = useDispatch();

  return (
    <div className={s.wrapper}>
      <label className={s.label} htmlFor={`${id}-name`}>
        Find contact by name or number
      </label>
      <input
        className={s.input}
        placeholder="search here..."
        type="text"
        onChange={e => dispatch(changeFilter(e.target.value))}
        id={`${id}-name`}
      />
    </div>
  );
}

import { useId } from "react";
import { useDispatch } from "react-redux";
import { changeFilter } from "../../redux/filters/slice";

import css from "./SearchBox.module.css";

export default function SearchBox() {
  const id = useId();
  const dispatch = useDispatch();

  return (
    <div className={css.container}>
      <label className={css.label} htmlFor={`${id}-name`}>
        Find contact by name or number
      </label>
      <input
        className={css.input}
        placeholder="enter the name or number here..."
        type="text"
        onChange={e => dispatch(changeFilter(e.target.value))}
        id={`${id}-name`}
      />
    </div>
  );
}

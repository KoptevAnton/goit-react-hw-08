import { useId } from "react";
import css from "./SearchBox.module.css";

export default function SearchBox({ value, onFilter }) {
  const id = useId();

  return (
    <div className={css.container}>
      <label className={css.label} htmlFor={`${id}-name`}>
        Find contact by name
      </label>
      <input
        className={css.input}
        type="text"
        name="name"
        value={value}
        onChange={e => onFilter(e.target.value)}
        id={`${id}-name`}
      />
    </div>
  );
}

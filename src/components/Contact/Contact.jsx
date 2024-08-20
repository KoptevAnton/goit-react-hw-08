import css from "./Contact.module.css";
import { FaPhone } from "react-icons/fa6";
import { RiContactsFill } from "react-icons/ri";

export default function Contact({ contact: { name, number, id }, onDelete }) {
  return (
    <div className={css.container}>
      <div className={css.contactInfoWrapper}>
        <div className={css.contactInfo}>
          <RiContactsFill size={26} />
          <p>{name}</p>
        </div>
        <a href="tel:{contact.number}" className={css.contactInfo}>
          <FaPhone size={26} />
          <p>{number}</p>
        </a>
      </div>
      <button type="button" className={css.button} onClick={() => onDelete(id)}>
        Delete
      </button>
    </div>
  );
}

import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsSlice";

import { RiContactsFill } from "react-icons/ri";
import { FaPhone } from "react-icons/fa6";

import css from "./Contact.module.css";

export default function Contact({ contact: { name, number, id } }) {
  const dispatch = useDispatch();

  return (
    <div className={css.container}>
      <div className={css.contactInfoWrapper}>
        <div className={css.contactInfo}>
          <RiContactsFill size={26} />
          <p>{name}</p>
        </div>
        <a href={`tel:${number}`} className={css.contactInfo}>
          <FaPhone size={26} />
          <p>{number}</p>
        </a>
      </div>
      <button
        type="button"
        className={css.button}
        onClick={() => dispatch(deleteContact(id))}
      >
        Delete
      </button>
    </div>
  );
}

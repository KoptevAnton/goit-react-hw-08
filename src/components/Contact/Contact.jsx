import { useDispatch } from "react-redux";
import { deleteContact, editContact } from "../../redux/contacts/operations";

import { RiContactsFill } from "react-icons/ri";
import { FaPhone } from "react-icons/fa6";

import s from "./Contact.module.scss";

export default function Contact({ contact: { name, number, id } }) {
  const dispatch = useDispatch();

  const originalName = name;
  const originalNumber = number;

  return (
    <div className="container">
      <div className={s.wrapper}>
        <div className={s.contactInfoWrapper}>
          <div className={s.contactInfo}>
            <RiContactsFill size={26} />
            <p className={s.text}>{name}</p>
          </div>
          <a href={`tel:${number}`} className={s.contactInfo}>
            <FaPhone size={26} />
            <p className={s.text}>{number}</p>
          </a>
        </div>
        <div className={s.btnContainer}>
          <button
            type="button"
            className={s.button}
            onClick={() =>
              dispatch(
                editContact({
                  id,
                  name: prompt("Enter new name") ?? name,
                  number: prompt("Enter new number") ?? number,
                  originalName,
                  originalNumber,
                })
              )
            }
          >
            Edit
          </button>
          <button
            type="button"
            className={s.button}
            onClick={() => dispatch(deleteContact(id))}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

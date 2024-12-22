import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectContacts,
  selectError,
  selectFilteredContacts,
  setError,
} from "../../redux/contactsSlice";

import Contact from "../Contact/Contact";

import css from "./ContactList.module.css";

export default function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const error = useSelector(selectError);
  const filteredItems = useSelector(selectFilteredContacts);

  useEffect(() => {
    if (error && error === "Contacts not found (404 error)") {
      dispatch(setError("Contacts not found (404 error)"));
      return;
    }

    if (filteredItems.length === 0 && contacts.length > 0) {
      dispatch(setError("There are no matches with this search query."));
    } else if (contacts.length === 0) {
      dispatch(setError("Your phone book is empty"));
    } else if (error && error !== "Contacts not found (404 error)") {
      dispatch(setError(null));
    }
  }, [filteredItems, contacts, error, dispatch]);

  return (
    <ul className={css.list}>
      {filteredItems.map(item => (
        <li key={item.id}>
          <Contact contact={item} />
        </li>
      ))}
    </ul>
  );
}

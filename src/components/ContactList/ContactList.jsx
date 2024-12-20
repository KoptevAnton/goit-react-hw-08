import { useSelector } from "react-redux";
import {
  selectError,
  selectFilteredContacts,
  selectLoading,
} from "../../redux/contactsSlice";

import Contact from "../Contact/Contact";

import css from "./ContactList.module.css";

export default function ContactList() {
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const filteredItems = useSelector(selectFilteredContacts);

  return (
    <>
      {/* TODO: make pretty error and loading */}
      {loading && <h2>Loading...</h2>}
      {error && <h2>error!!!</h2>}
      <ul className={css.list}>
        {filteredItems.map(item => (
          <li key={item.id}>
            <Contact contact={item} />
          </li>
        ))}
      </ul>
    </>
  );
}

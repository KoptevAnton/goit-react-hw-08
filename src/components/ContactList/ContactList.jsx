import { useSelector } from "react-redux";
import { selectContacts } from "../../redux/contactsSlice";
import { selectNameFilter } from "../../redux/filtersSlice";

import Contact from "../Contact/Contact";

import css from "./ContactList.module.css";

export default function ContactList() {
  const items = useSelector(selectContacts);
  const name = useSelector(selectNameFilter);
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(name.toLowerCase())
  );

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

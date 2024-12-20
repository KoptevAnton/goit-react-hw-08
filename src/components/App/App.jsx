import { useDispatch } from "react-redux";
import { fetchContacts } from "../../redux/contactsOps";
import { useEffect } from "react";

import ContactForm from "../ContactForm/ContactForm";
import SearchBox from "../SearchBox/SearchBox";
import ContactList from "../ContactList/ContactList";

import css from "./App.module.css";

export default function App() {
  const dispatch = useDispatch();
  dispatch(fetchContacts());
  useEffect(() => {}, [dispatch]);

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      <ContactList />
    </div>
  );
}

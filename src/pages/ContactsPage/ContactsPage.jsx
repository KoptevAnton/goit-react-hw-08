import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoading } from "../../redux/contacts/selectors";
import { fetchContacts } from "../../redux/contacts/operation";

import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import List from "../../components/ContactList/ContactList";
import Loader from "../../components/Loader/Loader";

import s from "./ContactsPage.module.css";

const ContactsList = () => {
  const dispatch = useDispatch();
  const loadingContacts = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="container">
      <div className={s.container}>
        <h1>Phone book</h1>
        <ContactForm />
        <SearchBox />
        {loadingContacts && <Loader />}
        {!loadingContacts && <List />}
      </div>
    </div>
  );
};

export default ContactsList;

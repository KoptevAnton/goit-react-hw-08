import { useId } from "react";
import { useDispatch } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addContact } from "../../redux/contacts/operation";
import * as Yup from "yup";

import s from "./ContactForm.module.css";

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "To short!")
    .max(50, "Too long")
    .required("Required"),
  number: Yup.string()
    .min(3, "To short!")
    .max(50, "Too long!")
    .required("Required"),
});

export default function ContactForm() {
  const id = useId();
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    number: "",
  };

  const handleSubmit = (values, actions) => {
    const newItem = {
      name: values.name,
      number: values.number,
    };
    dispatch(addContact(newItem));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <div className={s.container}>
        <Form className={s.form}>
          <div className={s.labelInput}>
            <label htmlFor={`${id}-name`}>Name</label>
            <Field
              className={s.input}
              type="text"
              name="name"
              id={`${id}-name`}
            />
            <ErrorMessage className={s.error} name="name" component="span" />
          </div>
          <div className={s.labelInput}>
            <label htmlFor={`${id}-number`}>Number</label>
            <Field
              className={s.input}
              type="text"
              name="number"
              id={`${id}-number`}
            />
            <ErrorMessage className={s.error} name="number" component="span" />
          </div>
          <button type="submit">Add contact</button>
        </Form>
      </div>
    </Formik>
  );
}

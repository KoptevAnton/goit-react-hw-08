import { useId } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import css from "./ContactForm.module.css";

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

export default function ContactFormCopy({ onAdd }) {
  const id = useId();

  const initialValues = {
    name: "",
    number: "",
  };

  const handleSubmit = (values, actions) => {
    onAdd(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <div className={css.container}>
        <Form className={css.form}>
          <div className={css.labelInput}>
            <label htmlFor={`${id}-name`}>Name</label>
            <Field
              className={css.input}
              type="text"
              name="name"
              id={`${id}-name`}
            />
            <ErrorMessage className={css.error} name="name" component="span" />
          </div>
          <div className={css.labelInput}>
            <label htmlFor={`${id}-number`}>Number</label>
            <Field
              className={css.input}
              type="text"
              name="number"
              id={`${id}-number`}
            />
            <ErrorMessage
              className={css.error}
              name="number"
              component="span"
            />
          </div>
          <button type="submit">Add contact</button>
        </Form>
      </div>
    </Formik>
  );
}

import { useId } from "react";
import { Link } from "react-router";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operation";

import * as Yup from "yup";
import s from "./Form.module.css";

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "To short!")
    .max(50, "Too long")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Password too short!").required("Required"),
});

export default function RegistrationForm() {
  const id = useId();
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    console.log("Submitted values:", values);
    dispatch(register(values));

    actions.resetForm();
  };

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  return (
    <div className={s.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={FeedbackSchema}
      >
        <div className={s.wrapper}>
          <Form className={s.form}>
            <div className={s.labelInput}>
              <label htmlFor={`${id}-name`}>Username</label>
              <Field
                className={s.input}
                id={`${id}-name`}
                name="name"
                placeholder="Enter name"
              />
              <ErrorMessage className={s.error} name="name" component="span" />
            </div>
            <div className={s.labelInput}>
              <label htmlFor={`${id}-email`}>Email</label>
              <Field
                className={s.input}
                id={`${id}-email`}
                name="email"
                placeholder="Enter email"
              />
              <ErrorMessage className={s.error} name="email" component="span" />
            </div>
            <div className={s.labelInput}>
              <label htmlFor={`${id}-password`}>Password</label>
              <Field
                className={s.input}
                type="password"
                id={`${id}-password`}
                name="password"
                placeholder="Enter pass"
              />
              <ErrorMessage
                className={s.error}
                name="password"
                component="span"
              />
            </div>
            <div className={s.wrapperBtn}>
              <Link to="/">
                <button type="button">Go Home</button>
              </Link>
              <button type="submit">Register</button>
            </div>
          </Form>
        </div>
      </Formik>
    </div>
  );
}

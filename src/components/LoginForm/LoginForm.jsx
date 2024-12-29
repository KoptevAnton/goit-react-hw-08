import {  useId } from "react";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { login } from "../../redux/auth/operation";

import * as Yup from "yup";
import s from "../RegistrationForm/Form.module.css";

const FeedbackSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Password too short!").required("Required"),
});

export default function LoginForm() {
  const id = useId();
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(login(values))
    actions.resetForm();
  };

  const initialValues = {
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
              <label htmlFor={`${id}-email`}>Email</label>
              <Field
                className={s.input}
                id={`${id}-email`}
                name="email"
                placeholder="Enter email..."
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
                placeholder="Enter pass..."
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
              <button type="submit">Login</button>
            </div>
          </Form>
        </div>
      </Formik>
    </div>
  );
}

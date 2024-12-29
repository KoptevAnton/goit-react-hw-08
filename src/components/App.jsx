import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { clearError } from "../redux/auth/slice";
import { refreshUser } from "../redux/auth/operation";
import { selectError } from "../redux/contacts/selectors";
import {
  selectIsErrorAuth,
  selectIsRefreshing,
  selectToken,
} from "../redux/auth/selectors";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const RegistrationPage = lazy(() =>
  import("../pages/RegistrationPage/RegistrationPage")
);
import LoginPage from "../pages/LoginPage/LoginPage";

const ContactsPage = lazy(() => import("../pages/ContactsPage/ContactsPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));
const ErrorMessage = lazy(() => import("./ErrorMessage/ErrorMessage"));

import Layout from "./Layout/Layout";
import PrivateRoute from "./PrivateRoute";
import RestrictedRoute from "./RestrictedRoute";
import ThemeProvider from "./ThemeProvider/ThemeProvider";
import Loader from "./Loader/Loader";

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const token = useSelector(selectToken);
  const errorAuth = useSelector(selectIsErrorAuth);
  const errorContact = useSelector(selectError);

  useEffect(() => {
    if (token) {
      dispatch(refreshUser());
    }
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route
              path="/contacts"
              element={
                <PrivateRoute>
                  <ContactsPage />
                </PrivateRoute>
              }
            />
          </Route>
          <Route
            path="/register"
            element={
              <RestrictedRoute
                component={<RegistrationPage />}
                redirectTo="/contacts"
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute
                component={<LoginPage />}
                redirectTo="/contacts"
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <ErrorMessage errorContact={errorContact} errorAuth={errorAuth} />
      </Suspense>
      <ThemeProvider />
    </>
  );
}

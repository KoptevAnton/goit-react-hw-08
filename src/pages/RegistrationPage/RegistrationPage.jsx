import { useSelector } from "react-redux";
import { selectIsLoadingAuth } from "../../redux/auth/selectors";

import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import Loader from "../../components/Loader/Loader";

import s from "./RegistrationPage.module.css";

const RegistrationPage = () => {
  const isLoading = useSelector(selectIsLoadingAuth);

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Register your account</h2>
      {isLoading && <Loader />}
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;

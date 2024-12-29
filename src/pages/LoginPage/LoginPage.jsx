import LoginForm from "../../components/LoginForm/LoginForm";
import s from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <div className="container">
      <div className={s.wrapper}>
        <h2 className={s.title}>Log into your account</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;

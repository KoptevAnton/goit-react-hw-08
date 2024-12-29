import s from "./NotFoundPage.module.css";

import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="container">
      <div className={s.wrapper}>
        <h1 className={s.title}>Oops... something went wrong page not found</h1>
        <Link className={s.goBackLink} to="/">
          <button type="button">Back to Homepage</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

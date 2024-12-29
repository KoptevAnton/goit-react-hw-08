import s from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className="container">
      <div className={s.wrapper}>
        <h2 className={s.title}>Welcome to Contact Manager!</h2>
        <p className={s.text}>
          Effortlessly manage your contacts with our user-friendly web
          application. With Contact Manager, you can:
        </p>
        <ul className={s.list}>
          <li className={s.item}>Add new contacts to your list.➕</li>
          <li className={s.item}>Edit existing contact details.✏️</li>
          <li className={s.item}>Delete contacts you no longer need.➖</li>
          <li className={s.item}>
            Search and filter contacts by both name and phone number for quick
            access.🔍
          </li>
        </ul>
        <p className={s.text}>Our app also supports:</p>
        <ul className={s.list}>
          <li className={s.item}>
            A great interface even on a wide variety of screens.💻 🖥️ 📱
          </li>
          <li className={s.item}>
            High-quality routing for a smooth user experience.🛣️🔄
          </li>
          <li className={s.item}>
            Light and dark themes for a personalized experience.⚪⚫
          </li>
          <li className={s.item}>
            Database integration to safely store and retrieve your contacts from
            the server.📂
          </li>
        </ul>
        <p className={s.text}>
          Stay organized and in control with Contact Manager – the ultimate tool
          for managing your personal or professional connections!
        </p>
      </div>
    </div>
  );
};

export default HomePage;

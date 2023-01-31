import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../image/logo2.png";
import styles from "./Header.module.scss";
import bell from "../image/bell.png";
import my from "../image/my.png";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <div className={styles.contents}>
        <div className={styles.logoContainer}>
          <Link to="/group">
            <img src={logo} alt="logo image" className={styles.logo} />
          </Link>
        </div>
        <div className={styles.navigation}>
          <div className={styles.content}>
            <Link to="/todolist">할 일</Link>
          </div>
          <div className={styles.content}>
            <Link to="/calendar">일정</Link>
          </div>
          <div className={styles.content}>
            <Link to="/board">전달사항</Link>
          </div>
          <div className={styles.content}>멤버</div>
        </div>
        <div className={styles.otherContainer}>
          <img src={bell} alt="alert" className={styles.icon} />
          <img src={my} alt="my page" className={styles.icon} />
        </div>
      </div>
    </div>
  );
};

export default Header;

{
  /* <div className={styles.contents}>
        <div className={styles.logoContainer}>
          
        </div>
        <div className={styles.navigation}>
          <div className={styles.content}>할 일</div>
          <div className={styles.content}>일정</div>
          <div className={styles.content}>전달사항</div>
        </div>
        <div className={styles.otherContainer}>
          <img src={bell} alt="alert" className={styles.icon} />
          <img src={my} alt="my page" className={styles.icon} />
        </div>
      </div> */
}

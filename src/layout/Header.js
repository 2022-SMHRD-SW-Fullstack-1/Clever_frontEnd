import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../image/logo2.png";
import styles from "./Header.module.scss";
import bell from "../image/bell.png";
import my from "../image/my.png";

const Header = () => {
  const navigate = useNavigate();
  const userName = sessionStorage.getItem("mem_name");
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };
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
          <div className={styles.content}>
            <Link to="/member">멤버관리</Link>
          </div>
        </div>
        <div className={styles.otherContainer}>
          <div>
            <img src={bell} alt="alert" className={styles.icon} />
          </div>
          <div className={styles.dropdown}>
            <button className={styles.button}>
              <img src={my} alt="my page" className={styles.icon} />
            </button>
            <div className={styles.dropdownMenu}>
              <p className={styles.welcome}>{userName}님 환영합니다</p>
              <p className={styles.logout} onMouseDown={handleLogout}>
                로그아웃
              </p>
            </div>
          </div>
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

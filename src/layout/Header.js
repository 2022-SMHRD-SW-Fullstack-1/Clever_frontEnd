import React from "react";
import { Link } from "react-router-dom";
import logo from "../image/logo2.png";
import styles from "./Header.module.scss";
const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.contents}>
        <div className={styles.logoContainer}>
          <Link to="/">
            <img src={logo} alt="logo image" className={styles.logo} />
          </Link>
        </div>
        <div className={styles.navigation}>
          <ul>
            <li>
              <a href="/todolist">할 일</a>
            </li>
            <li>
              <a href="/calendar">일정</a>
            </li>
            <li>
              <a href="/board">전달사항</a>
            </li>
            <li>
              <a href="/group">그룹</a>
            </li>
            <li>
              <a href="/join">회원가입</a>
            </li>
            <li>
              <a href="/login">로그인</a>
            </li>
          </ul>
        </div>
        <div className={styles.otherContainer}>
          <button>알림</button>
          <button>마이페이지</button>
        </div>
      </div>
    </div>
  );
};

export default Header;

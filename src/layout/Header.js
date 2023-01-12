import React from "react";
import { Link } from "react-router-dom";
import logo from "../image/logo2.png";
import "./Header.scss";
const Header = () => {
  return (
    <div className="header">
      <div className="logoContainer">
        <Link to="/">
          <img src={logo} alt="logo image" className="logo" />
        </Link>
      </div>
      <div className="menuContainer">
        <a href="/todolist">할 일</a>
        <a href="/calendar">일정</a>
        <a href="/board">전달사항</a>
        <a href="/group">그룹</a>
        <a href="/join">회원가입</a>
        <a href="/login">로그인</a>
      </div>
      <div className="otherContainer">
        <button>알림</button>
        <button>마이페이지</button>
      </div>
    </div>
  );
};

export default Header;

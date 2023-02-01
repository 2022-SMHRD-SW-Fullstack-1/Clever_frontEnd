import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../image/logo2.png";
import styles from "./User.module.scss";

const Login = ({ getAuth }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [inputValue, setInputValue] = useState({
    mem_id: "",
    mem_pw: "",
  });

  const goToMain = (e) => {
    e.preventDefault();
    login();
  };
  const goToJoin = () => {
    navigate("../join");
  };
  const login = () => {
    axios
      .post("/login", inputValue)
      .then((res) => {
        const mem_info = res.data;
        if (
          inputValue.mem_id === mem_info.mem_id &&
          inputValue.mem_pw === mem_info.mem_pw
        ) {
          alert("로그인 성공!");
          // 새로고침
          window.location.replace("/group");

          getAuth(mem_info);
          // navigate("./todolist");
        } else {
          alert("아이디 비밀번호 확인");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("로그인 실패");
      });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  return (
    <div className="container">
      <div className={styles.loginContainer}>
        <img src={logo} alt="logo title"></img>
        <div className={styles.inputArea}>
          <form className={styles.inputLine}>
            <span className={styles.userInputLine}>휴대폰번호</span>
            <input
              className={styles.userInput}
              type="text"
              name="mem_id"
              onChange={handleInput}
            ></input>
          </form>
          <form className={styles.inputLine}>
            <span className={styles.userInputLine}>비밀번호</span>
            <input
              className={styles.userInput}
              type="password"
              name="mem_pw"
              onChange={handleInput}
            ></input>
          </form>
        </div>
        <button className={styles.joinBtn} onClick={goToMain}>
          로그인
        </button>
        <button className={styles.loginBtn} onClick={goToJoin}>
          회원가입
        </button>
      </div>
    </div>
  );
};

export default Login;

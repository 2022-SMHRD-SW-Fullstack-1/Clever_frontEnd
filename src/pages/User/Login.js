import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../image/logo2.png";
import styles from "./User.module.scss";
const Login = ({ getAuth }) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    mem_id: "",
    mem_pw: "",
  });

  const goToMain = (e) => {
    e.preventDefault();
    login();
    navigate("../todolist");
  };
  const goToJoin = () => {
    navigate("../join");
  };
  const login = () => {
    axios
      .post("/clever/login", {
        memb_phone: inputValue.phone,
        memb_pw: inputValue.pw,
      })
      .then(function (res) {
        if (res.data !== "") {
          // getAuth(res.data);
          getAuth({ mem_id: "01012341234", mem_pw: "1234" });
        } else {
          alert("아이디 비밀번호 확인");
        }
      })
      .catch(function (error) {
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
              type="text"
              name="mem_pw"
              onChange={handleInput}
            ></input>
          </form>
        </div>
        <button className={styles.loginBtn} onClick={goToMain}>
          로그인
        </button>
        <button className={styles.joinBtn} onClick={goToJoin}>
          회원가입
        </button>
      </div>
    </div>
  );
};

export default Login;

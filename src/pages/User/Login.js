import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../image/logo2.png";
import styles from "./User.module.scss";
const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    phone: "",
    pw: "",
  });
  const phone = inputValue.phone;
  const goToMain = () => {
    navigate("../todolist");
  };
  const goToJoin = () => {
    navigate("../join");
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
              name="phone"
              onChange={handleInput}
            ></input>
          </form>
          <form className={styles.inputLine}>
            <span className={styles.userInputLine}>비밀번호</span>
            <input
              className={styles.userInput}
              type="text"
              name="phone"
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

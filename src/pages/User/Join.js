import React, { useState } from "react";
import logo from "../../image/logo2.png";
import styles from "./User.module.scss";
const Join = () => {
  const [inputValue, setInputValue] = useState({
    phone: "",
    name: "",
    pw: "",
    joindate: "",
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  const handleJoin = () => {
    const time = new Date();
    let now = time.toLocaleString();
    setInputValue({
      ...inputValue,
      joindate: now,
    });
  };
  console.log("보내는 값 :", inputValue);

  return (
    <div className="container">
      <div className={styles.loginContainer}>
        <img src={logo} alt="logo title"></img>
        <h3 className={styles.userTitle}>회원가입</h3>
        <div className={styles.inputArea}>
          <form className={styles.inputLine}>
            <span className={styles.userInputLine}>전화번호</span>
            <input
              className={styles.userInput}
              type="text"
              name="phone"
              onChange={handleInput}
            ></input>
          </form>
          <form className={styles.inputLine}>
            <span className={styles.userInputLine}>이름</span>
            <input
              className={styles.userInput}
              type="text"
              name="name"
              onChange={handleInput}
            ></input>
          </form>
          <form className={styles.inputLine}>
            <span className={styles.userInputLine}>비밀번호</span>
            <input
              className={styles.userInput}
              type="password"
              name="pw1"
              onChange={handleInput}
            ></input>
          </form>
          <form className={styles.inputLine}>
            <span className={styles.userInputLine}>비밀번호 확인</span>
            <input
              className={styles.userInput}
              type="password"
              name="pw2"
              onChange={handleInput}
            ></input>
          </form>
        </div>
        <button className={styles.loginBtn}>회원가입</button>
        <button className={styles.joinBtn}>취소</button>
      </div>
    </div>
  );
};

export default Join;

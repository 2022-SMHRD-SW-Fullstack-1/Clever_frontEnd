import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../ApiService";
import logo from "../../image/logo2.png";
import styles from "./User.module.scss";
const Join = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    mem_id: "",
    mem_name: "",
    mem_pw: "",
    mem_check: "",
    mem_email: "",
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  const handleJoin = () => {
    // const time = new Date();
    // let now = time.toLocaleString();
    // setInputValue({
    //   ...inputValue,
    //   joindate: now,
    // });
    // axios
    //   .post("/join", {
    //     mem_id: inputValue.mem_id,
    //     mem_name: inputValue.mem_name,
    //     mem_pw: inputValue.mem_pw1,
    //   })
    //   .then(function (res) {
    //     console.log(res.data);
    //   })
    //   .catch(function (err) {
    //     console.log(err);
    //   });
    ApiService.addMember(inputValue)
      .then((res) => {
        console.log("회원가입 성공!");
        setInputValue({
          mem_id: "",
          mem_name: "",
          mem_pw: "",
          mem_check: "",
          mem_email: "",
        });
        navigate("./todolist");
      })
      .catch((err) => {
        console.log(err);
      });

    console.log("보내는 값 :", inputValue);
    ApiService.addMember(inputValue);
  };
  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <div className={styles.loginContainer}>
        {/* <img src={logo} alt="logo title"></img> */}
        <h3 className={styles.userTitle}>회원가입</h3>
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
            <span className={styles.userInputLine}>이름</span>
            <input
              className={styles.userInput}
              type="text"
              name="mem_name"
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
          <form className={styles.inputLine}>
            <span className={styles.userInputLine}>비밀번호 확인</span>
            <input
              className={styles.userInput}
              type="password"
              name="mem_check"
              onChange={handleInput}
            ></input>
          </form>
          <form className={styles.inputLine}>
            <span className={styles.userInputLine}>이메일</span>
            <input
              className={styles.userInput}
              type="text"
              name="mem_email"
              onChange={handleInput}
            ></input>
          </form>
          <form className={styles.inputLine}>
            <span className={styles.userInputLine2}>인증번호</span>
            <input
              className={styles.userInput}
              type="text"
              name="authNum"
              onChange={handleInput}
            ></input>
            <button className={styles.loginBtn}>인증하기</button>
          </form>
        </div>

        <button className={styles.joinBtn} onClick={handleJoin}>
          회원가입
        </button>
        <button className={styles.loginBtn} onClick={handleCancel}>
          취소
        </button>
      </div>
    </div>
  );
};

export default Join;

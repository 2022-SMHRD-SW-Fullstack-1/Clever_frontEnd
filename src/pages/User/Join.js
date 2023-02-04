import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../ApiService";
import logo from "../../image/logo2.png";
import Header from "../../layout/Header";
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
  const { mem_id, mem_name, mem_pw, mem_check, mem_email } = inputValue;
  const [checkid, setCheckId] = useState(0);
  const [idAlertSentence, setIdAlertSentence] =
    useState("휴대폰번호를 입력해주세요");
  const [pwAlertSentence, setPwAlertSentence] = useState("");
  const [emailAlertSentence, setEmailAlertSentence] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  const join = () => {
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
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleJoin = () => {
    axios
      .post("/member/join/checkid", { mem_id: inputValue.mem_id })
      .then((res) => {
        setCheckId(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    if (checkid === 0) {
      join();
    } else if (checkid === 1) {
      alert("아이디 존재");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  const pwCheck = (mem_check) => {
    if (mem_pw === mem_check && 4 < mem_check.length && mem_check.length < 17) {
      setPwAlertSentence("사용가능한 비밀번호입니다.");
    } else if (mem_pw !== mem_check) {
      setPwAlertSentence("비밀번호가 일치하지 않습니다.");
    } else {
      setPwAlertSentence("다시 입력해주세요");
    }
  };

  const emailCheck = (mem_email) => {
    let joinEmail = /[a-zA-Z0-9_-]+@[a-z]+.[a-z]+$/;
    if (!joinEmail.test(mem_email)) {
      setEmailAlertSentence("유효한 이메일을 입력해 주세요.");
    } else {
      setEmailAlertSentence("");
    }
  };

  return (
    <>
      <div className="container">
        <div className={styles.loginContainer}>
          {/* <img src={logo} alt="logo title"></img> */}
          <h3 className={styles.userTitle}>회원가입</h3>
          <div className={styles.inputArea}>
            <div className={styles.inputLine}>
              <span className={styles.userInputLine}>휴대폰번호</span>
              <input
                className={styles.userInput}
                type="text"
                name="mem_id"
                onChange={handleInput}
                maxLength="11"
              ></input>
              {/* <div className="inputDescription">{idAlertSentence}</div> */}
            </div>
            <div className={styles.inputLine}>
              <span className={styles.userInputLine}>이름</span>
              <input
                className={styles.userInput}
                type="text"
                name="mem_name"
                onChange={handleInput}
              ></input>
            </div>
            <div className={styles.inputLine}>
              <span className={styles.userInputLine}>비밀번호</span>
              <input
                className={styles.userInput}
                type="password"
                name="mem_pw"
                onChange={handleInput}
              ></input>
              <div className="inputDescription">
                (영문 대소문자/숫자 4자~16자)
              </div>
            </div>
            <div className={styles.inputLine}>
              <span className={styles.userInputLine}>비밀번호 확인</span>
              <input
                className={styles.userInput}
                type="password"
                name="mem_check"
                onChange={handleInput}
                onBlur={() => pwCheck(mem_check)}
              ></input>
              <div className="inputDescription">{pwAlertSentence}</div>
            </div>
            <div className={styles.inputLine}>
              <span className={styles.userInputLine}>이메일</span>
              <input
                className={styles.userInput}
                type="text"
                name="mem_email"
                onChange={handleInput}
                onBlur={() => emailCheck(mem_email)}
              ></input>
              <div className="inputDescription">{emailAlertSentence}</div>
            </div>
          </div>

          <button className={styles.joinBtn} onClick={handleJoin}>
            회원가입
          </button>
          <button className={styles.loginBtn} onClick={handleCancel}>
            취소
          </button>
        </div>
      </div>
    </>
  );
};

export default Join;

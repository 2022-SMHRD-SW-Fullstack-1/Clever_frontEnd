import React, { useState } from "react";

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
    <div>
      <h1>회원가입 ~@^____^@~ </h1>
      <h2>환영합니다~~**^0^**</h2>
      <form>
        <input
          type="text"
          placeholder="휴대폰번호"
          className="phoneLine"
          name="phone"
          onChange={handleInput}
        ></input>
        <br />
        <input
          type="text"
          placeholder="이름"
          className="nameLine"
          name="name"
          onChange={handleInput}
        ></input>
        <br />
        <input
          type="password"
          placeholder="비밀번호"
          className="pwLine"
          name="pw"
          onChange={handleInput}
        ></input>
        <br />
      </form>
      <button className="joinBtn" onClick={handleJoin}>
        회원가입
      </button>
    </div>
  );
};

export default Join;

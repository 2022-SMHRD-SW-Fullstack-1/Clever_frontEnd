import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./layout/Header";
import Group from "./pages/Group/Group";
import ToDoList from "./pages/ToDoList/ToDoList";
import Calendar from "./pages/Calendar/Calendar";
import Board from "./pages/Board/Board";
import Join from "./pages/User/Join";
import Login from "./pages/User/Login";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState(false);
  const [auth, setAuth] = useState("");

  const getAuth = (data) => {
    sessionStorage.setItem("phone", data.phone);
    sessionStorage.setItem("phone", data.pw);
  };

  useEffect(() => {
    sessionStorage.getItem("phone") !== null && setUser(true);
  }, []);

  const [hello, setHello] = useState("");
  useEffect(() => {
    axios
      .get("/hello")
      .then((response) => setHello(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Header />
      <div>백엔드에서 가져온 데이터입니다 : {hello}</div>;
      <Routes>
        <Route path="/group" element={<Group />}></Route>
        <Route path="/todolist" element={<ToDoList />}></Route>
        <Route path="/calendar" element={<Calendar />}></Route>
        <Route path="/board" element={<Board />}></Route>
        <Route path="/join" element={<Join />}></Route>
        <Route path="/" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;

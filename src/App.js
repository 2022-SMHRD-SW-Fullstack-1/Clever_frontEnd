import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./layout/Header";
import Group from "./pages/Group/Group";
import ToDo from "./pages/ToDoList/Todo";
import Calendar from "./pages/Calendar/Calendar";
import Board from "./pages/Board/Board";
import { useEffect, useState } from "react";
import axios from "axios";
import Join from "./pages/User/Join";
import Login from "./pages/User/Login";

import ToDoList from "./pages/ToDoList/ToDoList";
import ToDoCreate from "./pages/ToDoList/ToDoCreate";

function App() {
  const [hello, setHello] = useState("");

  useEffect(() => {
    axios
      .get("/hello")
      .then((response) => setHello(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <div>백엔드에서 가져온 데이터입니다 : {hello}</div>;
      <Header />
      <Routes>
        <Route path="/group" element={<Group />}></Route>
        <Route path="/todolist" element={<ToDo />}></Route>
        <Route path="/todolistcreate" element={<ToDoCreate />}></Route>
        <Route path="/calendar" element={<Calendar />}></Route>
        <Route path="/board" element={<Board />}></Route>
        <Route path="/join" element={<Join />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;

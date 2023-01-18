import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./layout/Header";
import Group from "./pages/Group/Group";
import ToDo from "./pages/ToDoList/Todo";
import Calendar from "./pages/Calendar/Calendar";
import Board from "./pages/Board/Board";
import { useEffect, useState } from "react";
import Join from "./pages/User/Join";
import Login from "./pages/User/Login";
import ToDoCreate from "./pages/ToDoList/ToDoCreate";
import AddGroup from "./pages/Group/AddGroup";
import CalendarInput from "./pages/Calendar/CalendarInput";

function App() {
  const [user, setUser] = useState("");
  const [auth, setAuth] = useState(false);

  const getAuth = (data) => {
    sessionStorage.setItem("mem_id", data.mem_id);
    sessionStorage.setItem("mem_name", data.mem_name);
  };

  useEffect(() => {
    sessionStorage.getItem("mem_id") !== null && setAuth(true);
    loginUser();
    setUser(sessionStorage.getItem("mem_id"));
  }, [auth]);

  const loginUser = () => {
    if (auth === false) {
      return <></>;
    } else {
      return <Header />;
    }
  };
  return (
    <div>
      {loginUser()}
      <Routes>
        <Route path="/group" element={<Group user={user} />}></Route>
        <Route path="/addgroup" element={<AddGroup user={user} />}></Route>
        <Route path="/todolist" element={<ToDo />}></Route>
        <Route path="/todolistcreate" element={<ToDoCreate />}></Route>
        <Route path="/calendar" element={<Calendar />}></Route>
        <Route path="/board" element={<Board />}></Route>
        <Route path="/join" element={<Join />}></Route>
        <Route path="/calendarInput" element={<CalendarInput />}></Route>
        <Route
          path="/"
          element={<Login getAuth={getAuth} setUser={setUser} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;

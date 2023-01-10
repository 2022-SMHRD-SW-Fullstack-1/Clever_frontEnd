import "./App.css";
import Header from "./layout/Header";

import Group from "./pages/Group/Group";
import ToDoList from "./pages/ToDoList/ToDoList";

function App() {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/group" element={<Group />}></Route>
        <Route path="/todolist" element={<ToDoList todos={todos} />}></Route>
      </Routes>
    </div>
  );
}

export default App;

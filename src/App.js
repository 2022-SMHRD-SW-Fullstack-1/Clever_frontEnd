import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./layout/Header";
import Group from "./pages/Group/Group";

function App() {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/group" element={<Group />}></Route>
      </Routes>
    </div>
  );
}

export default App;

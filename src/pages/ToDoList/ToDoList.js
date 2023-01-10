import React, { useState } from "react";

const ToDoList = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "냉장고, 냉동고 온도 확인",
      checked: true,
    },
  ]);

  return (
    <div>
      <div>ToDoList</div>;
    </div>
  );
};

export default ToDoList;

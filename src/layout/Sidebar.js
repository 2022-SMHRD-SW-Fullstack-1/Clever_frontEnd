import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const menus = [
    { name: "할일", path: "/todolist" },
    { name: "일정", path: "/" },
    { name: "전달사항", path: "/" },
    { name: "그룹관리", path: "/" },
  ];
  return (
    <div className="sidebar">
      {menus.map((menu, index) => {
        return (
          <Link to={menu.path} key={index}>
            <SidebarItem menu={menu} />
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;

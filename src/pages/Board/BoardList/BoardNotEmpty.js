import React from "react";
import BoardListItem from "./BoardListItem";

const BoardNotEmpty = ({ boardList, offset, limit, cateName }) => {
  return (
    <>
      {boardList.slice(offset, offset + limit).map((item, idx) => (
        <BoardListItem key={idx} item={item} cateName={cateName} />
      ))}
    </>
  );
};

export default BoardNotEmpty;

import React from "react";
import BoardListItem from "./BoardListItem";

const BoardNotEmpty = ({ boardList, offset, limit, cateName }) => {
  //   console.log(boardList[0].notice_title);
  //   const board = boardList.map((item, idx) => {
  //     <div>{item.notice_title}</div>;
  //   });
  return (
    <>
      {boardList.slice(offset, offset + limit).map((item, idx) => (
        <BoardListItem key={idx} item={item} cateName={cateName} />
      ))}
    </>
  );
};

export default BoardNotEmpty;

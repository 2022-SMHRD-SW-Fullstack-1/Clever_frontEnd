import React from "react";
import GroupItem from "./GroupItem";

const GroupNotEmpty = ({ groupList, user }) => {
  return (
    <>
      {groupList &&
        groupList.map((item, idx) => {
          return <GroupItem key={idx} user={user} item={item} />;
        })}
    </>
  );
};

export default GroupNotEmpty;

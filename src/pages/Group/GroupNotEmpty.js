import React from "react";
import GroupItem from "./GroupItem";

const GroupNotEmpty = ({ groupList }) => {
  return (
    <>
      {groupList &&
        groupList.map(({ group_seq, group_name }) => {
          return <GroupItem key={group_seq} group_name={group_name} />;
        })}
    </>
  );
};

export default GroupNotEmpty;

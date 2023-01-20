import React from "react";
import GroupItem from "./GroupItem";

const GroupNotEmpty = ({ groupList, id }) => {
  return (
    <>
      {groupList &&
        groupList.map(({ group_seq, group_name }) => {
          return (
            <GroupItem
              key={group_seq}
              group_seq={group_seq}
              group_name={group_name}
              id={id}
            />
          );
        })}
    </>
  );
};

export default GroupNotEmpty;

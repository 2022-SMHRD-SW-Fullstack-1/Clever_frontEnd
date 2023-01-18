import React, { useEffect, useState } from "react";
import styles from "./Group.module.scss";
import add from "../../image/add.png";
import { useNavigate } from "react-router";
import AddGroup from "./AddGroup";
import axios from "axios";
import GroupNotEmpty from "./GroupNotEmpty";
import GroupEmpty from "./GroupEmpty";

const Group = ({ user }) => {
  const [groupList, setGroupList] = useState([]);
  const [id, setId] = useState(sessionStorage.getItem("mem_id"));
  // 모달 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);
  const groupEmpty = groupList.length === 0;

  // 모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };
  console.log("modalopen : ", modalOpen);
  useEffect(() => {
    axios
      .post("/getgrouplist", id)
      .then((res) => {
        setGroupList(res.data);
        console.log(res.data);
        console.log("그룹유저값:", id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let groupCnt = groupList.length;

  return (
    <div className="container">
      <div className={styles.groupCountArea}>
        <span className={styles.groupCountTitle}>전체 그룹</span>
        <span className={styles.groupCount}>{groupCnt}</span>
      </div>

      <div className={styles.groupContainer}>
        {groupEmpty ? <GroupEmpty /> : <GroupNotEmpty groupList={groupList} />}
        <div className="groupAddBtnContainer">
          <button className={styles.addGroupBtn}>
            <div className={styles.addBtnIn} onClick={showModal}>
              <img src={add} alt="add Button" className={styles.addIcon} />
              <div className={styles.btnDecsriptionArea}>
                <span className={styles.btnDecsription}>그룹 만들기</span>
              </div>
            </div>
            {modalOpen && (
              <AddGroup setModalOpen={setModalOpen} modalOpen={modalOpen} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Group;

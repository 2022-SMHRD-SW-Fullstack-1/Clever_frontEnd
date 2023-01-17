import React, { useEffect, useState } from "react";
import styles from "./Group.module.scss";
import add from "../../image/add.png";
import { useNavigate } from "react-router";
import AddGroup from "./AddGroup";

const Group = ({ user }) => {
  const navigate = useNavigate();

  // 모달 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);

  // 모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };
  console.log("modalopen : ", modalOpen);
  useEffect(() => {}, []);

  return (
    <div className="container">
      <div className={styles.groupCountArea}>
        <span className={styles.groupCountTitle}>전체 그룹</span>
        <span className={styles.groupCount}>1</span>
      </div>

      <div className={styles.groupContainer}>
        <div className="groupItemContainer">
          <div className={styles.groupItem}>
            <div className={styles.groupNameArea}>
              <span className={styles.groupName}>클레버 1호점</span>
            </div>
            <div className={styles.groupBtnArea}>
              <button className={styles.inviteBtn}>그룹초대</button>
              <button className={styles.groupDelBtn}>삭제</button>
            </div>
          </div>
        </div>
        <div className="groupAddBtnContainer">
          <button className={styles.addGroupBtn} onClick={showModal}>
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

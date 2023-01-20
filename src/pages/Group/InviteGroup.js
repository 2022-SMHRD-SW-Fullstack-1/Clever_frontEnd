import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./InviteGroup.module.scss";
const InviteGroup = ({ setShowInviteModal, showInviteModal, group_seq }) => {
  const close = () => {
    setShowInviteModal(false);
  };
  const [inviteCode, setInviteCode] = useState("");
  useEffect(() => {
    axios
      .post("/getinvitecode", { group_seq: group_seq })
      .then((res) => {
        setInviteCode(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className={styles.modalContainer}>
        <div className={styles.modalBlock}>
          <span className={styles.close} onClick={close}>
            &times;
          </span>
          <div className={styles.modalContents}>
            <span className={styles.description}>
              화면에 뜬 초대코드를 어플에서 입력해주세요.
            </span>
            <div className={styles.inviteCode}>{inviteCode}</div>
            <button className={styles.closeBtn} onClick={close}>
              닫기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InviteGroup;

import React from "react";
import styles from "./InviteGroup.module.scss";
const InviteGroup = ({ setShowInviteModal, showInviteModal, group_seq }) => {
  const close = () => {
    setShowInviteModal(false);
  };

  return (
    <>
      <div className={styles.modalContainer} onClick={close}>
        <div className={styles.modalBlock}>
          <span className={styles.close} onClick={close}>
            &times;
          </span>
          <div className={styles.modalContents}>
            <span className={styles.description}>
              화면에 뜬 초대코드를 어플에서 입력해주세요.
            </span>
            <div className={styles.inviteCode}>AX2FG43G</div>
            <button className={styles.okBtn}>확인</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InviteGroup;

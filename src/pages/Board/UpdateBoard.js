import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./WriteBoard.module.scss";

const UpdateBoard = ({ setShowUpdate, updateItem }) => {
  const [inputValue, setInputValue] = useState({
    notice_seq: updateItem.notice_seq,
    notice_title: "",
    notice_content: "",
    notice_photo: updateItem.notice_photo,
  });
  const close = () => {
    setShowUpdate(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  const [inputFile, setInputFile] = useState({});
  const handleChangeFile = (e) => {
    setInputFile(e.target.files);
    console.log(inputFile);
  };
  const handleDelFile = () => {
    setInputFile(null);
    console.log(inputFile);
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("inputFile", inputFile[0]);
    const blob = new Blob([JSON.stringify(inputValue)], {
      type: "application/json",
    });
    formData.append("inputValue", blob);
    axios
      .post("/board/update", formData, {
        headers: {
          "Content-Type": `multipart/form-data; `,
        },
      })
      .then((res) => {
        alert("게시글 수정 완료!");
        close();
      })
      .catch((err) => {
        alert("등록 실패");
        console.log(err);
      });
  };

  return (
    <>
      <div className={styles.modalContainer}>
        <div className={styles.modalBlock}>
          <span className={styles.close} onClick={close}>
            &times;
          </span>
          <div className={styles.modalContents}>
            <span className={styles.description}>게시글 수정</span>
            <input
              className={styles.titleInput}
              // onChange={handleInput}
              name="notice_title"
              defaultValue={updateItem.notice_title}
              onChange={handleChange}
            ></input>
            <textarea
              className={styles.contentInput}
              name="notice_content"
              onChange={handleChange}
            >
              {updateItem.notice_content}
            </textarea>
            <div className={styles.fileArea}>
              <div>
                {updateItem.notice_photo ? (
                  <>
                    <div>
                      첨부파일 : {updateItem.notice_photo.substring(36)}
                    </div>
                    <button onClick={handleDelFile}>삭제</button>
                  </>
                ) : (
                  <div>첨부파일이 없습니다.</div>
                )}
              </div>

              <input
                className={styles.fileInput}
                type="file"
                name="inputFile"
                onChange={handleChangeFile}
              ></input>
            </div>
            <button className={styles.addBtn} onClick={handleUpdate}>
              수정하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateBoard;

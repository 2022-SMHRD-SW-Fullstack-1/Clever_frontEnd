import axios from "axios";
import { useState } from "react";
import styles from "./WriteBoard.module.scss";

const WriteBoard = ({ setShowWriteModal, writerInfo }) => {
  const close = () => {
    setShowWriteModal(false);
  };
  const cate_seq = writerInfo.current.category;
  const mem_id = writerInfo.current.mem_id;
  const mem_name = writerInfo.current.mem_name;
  const [inputValue, setInputValue] = useState({
    cate_seq: cate_seq,
    mem_id: mem_id,
    mem_name: mem_name,
    notice_title: "",
    notice_content: "",
  });
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
  };
  const handlePost = (e) => {
    e.preventDefault();
    const formData = new FormData();
    // add File Data to formData
    formData.append("inputFile", inputFile[0]);
    const blob = new Blob([JSON.stringify(inputValue)], {
      type: "application/json",
    });
    formData.append("inputValue", blob);
    axios
      .post("/board/post", formData, {
        headers: {
          "Content-Type": `multipart/form-data; `,
        },
      })
      .then((res) => {
        alert("게시글 등록 완료!");
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
            <span className={styles.description}>글쓰기</span>
            <input
              className={styles.titleInput}
              // onChange={handleInput}
              name="notice_title"
              placeholder="제목을 입력하세요"
              onChange={handleChange}
            ></input>
            <textarea
              className={styles.contentInput}
              name="notice_content"
              placeholder="내용을 입력하세요"
              onChange={handleChange}
            ></textarea>
            <div className={styles.fileArea}>
              <input
                className={styles.fileInput}
                type="file"
                name="inputFile"
                onChange={handleChangeFile}
              ></input>
            </div>
            <button className={styles.addBtn} onClick={handlePost}>
              올리기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WriteBoard;

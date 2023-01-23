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

  const handlePost = () => {
    axios
      .post("/board/postboard", inputValue)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // // console.log("writerinfo: ", writerInfo.current);
  // console.log(inputValue);
  // console.log("cateseq? ", cate_seq);

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
              <input type="file" id="file" multiple></input>
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

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
      .post("/board/post", inputValue)
      .then((res) => {
        alert("게시글 등록 완료!");
        close();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log("writerinfo: ", writerInfo.current);
  // console.log(inputValue);
  // console.log("cateseq? ", cate_seq);
  const [inputFile, setInputFile] = useState({});
  const handleChangeFile = (e) => {
    setInputFile(e.target.files);
  };
  const fileUpload = () => {
    const formData = new FormData();
    // add File Data to formData

    formData.append("inputFile", inputFile[0].File);
    console.log("formdata : ", formData.get("inputFile"));
    axios
      .post("/board/file", formData, {
        headers: {
          "Content-Type": `multipart/form-data; `,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        console.log(inputFile[0]);
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
              <button onClick={fileUpload}>파일업로드</button>
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

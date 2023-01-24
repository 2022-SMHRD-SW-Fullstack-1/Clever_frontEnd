import axios from 'axios';
import React, { useEffect } from 'react'
import "./ToDoDetail.scss"

const ToDoDetail = (props) => {
  console.log("detail_item", props);
  
  useEffect(() => {
    axios
      .post("/todolist/tododetail")
      .then((res) => {
        console.log("detailed",res.data);
        // console.log(res.data.cate_seq);
      })
      .catch((err) => {
        console.log("실패함", err);
      });
  }, []);

  return (
    <div className='todoDetail'>
    <div className='todoCom-mem'>담당자 완료</div> 
    <div className='todoCom-img'>완료 사진</div>
    <div className='todoCom-time'>완료 : 완료 시간</div>
    <div className='todoCom-memo'> 메모</div>
    
    </div>
  )
}

export default ToDoDetail

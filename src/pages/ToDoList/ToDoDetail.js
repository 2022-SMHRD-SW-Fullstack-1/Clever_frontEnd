import React from 'react'
import "./ToDoDetail.scss"

const ToDoDetail = (props) => {
  console.log("detail_item", props);

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

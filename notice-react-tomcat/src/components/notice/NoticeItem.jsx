import React from 'react'
import { Link } from 'react-router'

//const NoticeItem = ({n_no, n_title, n_writer}) => {
const NoticeItem = (props) => {
  console.log(props) // [object Object]
  console.log(props.notice)
  //공지 제목을 클릭했을 때 상세보기로 이동하기 - 라우트 처리
  //-> http://localhost:3000/detail/글번호(n_no)
  const {n_no, n_title, n_writer} = props.notice
  return (
    <>
      <tr>
        <td>{n_no}</td>
        <td>
          {/* <Route path="/notice/:n_no" exact={true} element={<NoticeDetail />}/> */}
          <Link to={"/notice/"+n_no} className='btn btn-primary'>{n_title}</Link>
        </td>
        <td>{n_writer}</td>
      </tr>
    </>
  )
}

export default NoticeItem
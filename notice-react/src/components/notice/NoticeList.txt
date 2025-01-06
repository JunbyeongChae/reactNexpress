import React, { useEffect, useState } from 'react'
import NoticeItem from './NoticeItem'
import { Button, Form, Modal } from 'react-bootstrap'
import { database } from '../../service/firebase'
import { set, ref, onValue } from 'firebase/database';
//props로 받아오는 값을 파라미터 자리에서 바로 구조분해 할당할 수  있다.
const NoticeList = () => {
  const [notice, setNotice] = useState({
    n_no: 0,
    n_title: '',
    n_writer: '',
    n_content: ''
  })
  const [notices, setNotices] = useState({})
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //선언부
  //Realtime database이용시에는 필요없는 코드임
  const [refresh, setRefresh] = useState(0)
  //db경유하여 공지글 목록 가져오기
  useEffect(() => {
    console.log('effect refresh : ' + refresh)
    const asyncDB = async() => {
      //select처리
      const dbRef = ref(database, '/notice')
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val()
        //console.log(data)
        setNotices(data)
      })
    }
    asyncDB()
    //DB에서 가져온 값이 있는지 출력해 보기
    console.log(notices)
  },[])
  //공지 글 쓰기
  const noticeAdd = async(event) => {
    event.preventDefault()
    set(ref(database, 'notice/'+notice.n_no), notice)
    //useState훅은 이전 상태값을 기억해 준다. - 일반변수와 다른점임.
    handleClose() //모달창 닫기
    setRefresh((prev) => prev+1)
  }
  const noticeList = () => {

  }
  const noticeSearch = () => {
    const gubun = document.querySelector("#gubun").value
    const keyword = document.querySelector("#keyword").value
    console.log(`${gubun}, ${keyword}`)
    let result = []
    if(gubun === 'n_title'){
      console.log('n_title : '+gubun)
      Object.keys(notices).map(key => (
        notices[key].n_title &&  notices[key].n_title === keyword ? result.push(notices[key]):null
      ))
    }//제목으로 검색하기
    else if(gubun === 'n_writer'){
      console.log('n_writer : '+gubun)
      Object.keys(notices).map(key => (
        notices[key].n_writer &&  notices[key].n_writer === keyword ? result.push(notices[key]):null
      ))
    }//작성자 검색하기
    else if(gubun === 'n_content'){
      console.log('n_content : '+gubun)
      Object.keys(notices).map(key => (
        notices[key].n_content &&  notices[key].n_content === keyword ? result.push(notices[key]):null
      ))
    }//내용으로 검색하기
    setNotices(result)
  }
  const handleChangeForm = (event) => {
    event.preventDefault()
    //사용자가 폼에 입력한 값을 notice useState훅에 담기
    setNotice({
      ...notice,
      n_no:Date.now(),
      [event.target.name]: event.target.value
    }) 
  }
  return (
    <>
        <div className='container'>
          <div className='page-header'>
            <h2>공지사항<small>글목록</small></h2>
            <hr />
          </div>

          <div className="row">
            <div className="col-sm-3">
            <select className="form-select" id="gubun" name="sellist1">
              <option defaultValue>분류선택</option>
              <option value="n_title">제목</option>
              <option value="n_writer">작성자</option>
              <option value="n_content">내용</option>
            </select>
            </div>
            <div className="col-sm-6">
            <input type="text" className="form-control" placeholder="검색어를 입력하세요" id="keyword" />
            </div>
            <div className="col-sm-3">
              <button type="button" className="btn btn-danger" onClick={noticeSearch}>검색</button>
            </div>
          </div>

        <table className="table table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>제목</th>
                    <th>작성자</th>
                </tr>
            </thead>
            {/* 데이터셋 연동하기 */}
            {/* props로 넘어온 상태값이 빈 깡통이면 실행하지 않기 */}
            <tbody>
              {notices && Object.keys(notices).map(key => (
                <NoticeItem key={key} notice={notices[key]} />
              ))}
            </tbody>
            {/* 데이터셋 연동하기 */}
        </table>
        <hr />
        <div className='list-footer'>
          <button className="btn btn-warning" onClick={noticeList}>전체조회</button>
          &nbsp;
          <button  className="btn btn-success" onClick={handleShow}>글쓰기</button>
        </div>
        </div>
{/* ================ [[ 공지등록 모달 시작 ]] =================*/}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>글등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form id="f_board">
          <Form.Group className="mb-3" controlId="boardTitle">
            <Form.Label>제목</Form.Label>
            <Form.Control type="text" name="n_title" onChange={handleChangeForm} placeholder="Enter 제목" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="boardWriter">
            <Form.Label>작성자</Form.Label>
            <Form.Control type="text" name="n_writer" onChange={handleChangeForm} placeholder="Enter 작성자" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="boardContent">
            <Form.Label>내용</Form.Label>
            <textarea className="form-control" name='n_content' onChange={handleChangeForm} rows="3"></textarea>
          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={noticeAdd}>
            저장
          </Button>
        </Modal.Footer>
      </Modal>     
{/* ================ [[ 공지등록 모달  끝    ]] =================*/}
    </>
  )
}

export default NoticeList
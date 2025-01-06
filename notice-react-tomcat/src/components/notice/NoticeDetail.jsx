import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Header from '../include/Header'
import Footer from '../include/Footer'
import { Button, Card, Form, ListGroup, ListGroupItem, Modal } from 'react-bootstrap'
import { database } from '../../service/firebase'
import { onValue, ref, remove, set } from 'firebase/database'

const NoticeDetail = () => {
  const navigate = useNavigate()
  const [notice, setNotice] = useState({
    n_no: 0,
    n_title: '',
    n_writer: '',
    n_content:''
  })
  //props로 가져오는게 아니다.-> http://localhost:3000/notice/2
  const {n_no} = useParams()
  console.log(n_no)
  //NoticeDetail 함수 실행시 최초 한 번 실행되는 값
  useEffect(() => {
    const asyncDB = async() => {
      //select처리
      const dbRef = ref(database, '/notice/'+n_no)
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val()
        //console.log(data)
        setNotice(data)
      })
    }
    asyncDB()
    //DB에서 가져온 값이 있는지 출력해 보기
    console.log(notice)    
  },[])//[]빈배열을 넣어두면 딱 한번만 실행됨. 만일 여기에 n건인 상태 훅을 넣으면 무한루프에 빠지지 주의할 것 
  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)
  const noticeDelete = async() => {
    await remove(ref(database, `notice/${n_no}`))
    window.location.href = "/notice"
  }
  const noticeList = () => {
    navigate("/notice")
  }
  const noticeUpdate = async(event) => {
    event.preventDefault()
    console.log('수정할 정보 : '+n_no+', '+notice.n_title+', '+notice.n_content+', '+notice.n_writer)
    await set(ref(database, 'notice/'+n_no), notice)
    handleClose()
  }
  const handleChangeForm = (event) => {
    event.preventDefault()
    //사용자가 폼에 입력한 값을 notice useState훅에 담기
    setNotice({
      ...notice,
      n_no:n_no,
      [event.target.name]: event.target.value
    }) 
  }
  return (
    <>
      <Header />
        <div className="container">
          <div className='page-header'>
            <h2>공지사항<small>글목록</small></h2>
            <hr />
          </div>
          
          <Card style={{ width: '58rem' }}>
            <Card.Body>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>{notice.n_title}</ListGroupItem>
              <ListGroupItem>{notice.n_writer}</ListGroupItem>
              <ListGroupItem>{notice.n_content}</ListGroupItem>
            </ListGroup>
            <div className='detail-link'>
              <Button variant="primary" onClick={handleShow}>
                수정
              </Button>
              &nbsp;
              <Button variant="primary" onClick={noticeDelete}>
                삭제
              </Button>
              &nbsp;
              <Button variant="primary" onClick={noticeList}>
                목록
              </Button>
              {/* <Link to="/board" variant="primary" className='nav-link'>공지목록</Link> */}
            </div>
          </Card>   
          <hr />
        </div>
      <Footer />

      {/* ================ [[ 공지등록 모달 시작 ]] =================*/}
      <Modal show={show} onHide={handleClose} animation={false}>
              <Modal.Header closeButton>
                <Modal.Title>글등록</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Form id="f_board">
                <Form.Group className="mb-3" controlId="boardTitle">
                  <Form.Label>제목</Form.Label>
                  <Form.Control type="text" name="n_title" value={notice.n_title} onChange={handleChangeForm} placeholder="Enter 제목" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="boardWriter">
                  <Form.Label>작성자</Form.Label>
                  <Form.Control type="text" name="n_writer" value={notice.n_writer} onChange={handleChangeForm} placeholder="Enter 작성자" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="boardContent">
                  <Form.Label>내용</Form.Label>
                  <textarea className="form-control" name='n_content'  value={notice.n_content} onChange={handleChangeForm} rows="3"></textarea>
                </Form.Group>
              </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  닫기
                </Button>
                <Button variant="primary" onClick={noticeUpdate}>
                  저장
                </Button>
              </Modal.Footer>
            </Modal>     
      {/* ================ [[ 공지등록 모달  끝    ]] =================*/}

    </>
  )
}

export default NoticeDetail
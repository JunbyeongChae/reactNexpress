import React, { useEffect, useState } from 'react'
import Header from '../include/Header'
import { Button, Card, Form, ListGroup, ListGroupItem, Modal } from 'react-bootstrap'
import Footer from '../include/Footer'
import { useNavigate, useParams } from 'react-router'
import { noticeDeleteDB, noticeDetailDB, noticeUpdateDB } from '../../service/dbLogic'

const NoticeDBDetail = () => {
  const navigate = useNavigate()
  const { n_no } = useParams()
  //모달창에서 수정할 정보를 받아서 notice훅에 반영하기 - 동기화처리
  const [notice, setNotice] = useState({
    n_no: 0,
    n_title: '',
    n_writer: '',
    n_content: ''
  })
  //수정 버튼을 누르면 모달 창 열기 처리
  //show값은 부트스트랩에서 모달창을 열고 닫을 때 설정하는 값이다.
  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)
  const handleChangeForm = (event) => {
    event.preventDefault();//이벤트가 전이되는 것을 방지함. - 새로고침발동
    //사용자가 폼에 입력한 값을 notice useState훅에 동기화 하기
    //<Form.Control type="text" name="n_title" value={notice.n_title} onChange={handleChangeForm} 
    //<Form.Control type="text" name="n_writer" value={notice.n_writer} onChange={handleChangeForm} 
    //<Form.Control type="text" name="n_content" value={notice.n_content} onChange={handleChangeForm} 
    setNotice({
      ...notice,
      [event.target.name]:event.target.value
    })
  }//end of handleChangeForm
  //NoticeDBDetail호출 되었을 때 최초 한 번만 호출된다. 왜냐면 의존성 배열이 빈통
  //최초 열린 화면에서 mySQL서버로 부터 select한 결과를 받아와서 
  //그 결과가 useState에 반영이 되었을 때 props가 변경될 때 혹은 state가 재조정이 일어남
  useEffect(() => {
    const asyncDB = async()=> {
      const res = await noticeDetailDB(n_no)
      setNotice(res.data)
    }
    asyncDB()
  },[])
  const noticeList = () => {
    navigate('/noticeDB')
  }
  const noticeDelete = () => {
    console.log('noticeDelete')
    const asyncDB = async () => {
      const res = await noticeDeleteDB(n_no)
      console.log(res.data)
      navigate('/noticeDB')
    }
    asyncDB()
  }
  //사용자가 입력하는 값을 수정처리 하기
  const noticeUpdate = () => {
    console.log('noticeUpdate')
    const asyncDB = async() => {
      const params = {
        n_no:n_no,
        n_title: notice.n_title,
        n_writer: notice.n_writer,
        n_content: notice.n_content
      }
      const res = await noticeUpdateDB(params)
      console.log(res.data)
    }
    asyncDB()
    handleClose() //수정하기 모달창 닫기
  }//end of noticeUpdate
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

      {/* ================ [[ 공지수정 모달 시작 ]] =================*/}
      <Modal show={show} onHide={handleClose} animation={false}>
              <Modal.Header closeButton>
                <Modal.Title>글수정</Modal.Title>
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

export default NoticeDBDetail
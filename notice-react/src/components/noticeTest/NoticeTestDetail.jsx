import React from 'react'
import { useLocation } from 'react-router'
import Header from '../include/Header'
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import Footer from '../include/Footer'

const NoticeTestDetail = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const n_no = queryParams.get("n_no")
  const n_title = queryParams.get("n_title")
  const n_writer = queryParams.get("n_writer")
  const n_content = queryParams.get("n_content")
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
              <ListGroupItem>{n_title}</ListGroupItem>
              <ListGroupItem>{n_writer}</ListGroupItem>
              <ListGroupItem>{n_content}</ListGroupItem>
            </ListGroup>
            <div className='detail-link'>
              <Button variant="primary" onClick={() => console.log("수정하기")}>
                수정
              </Button>
              &nbsp;
              <Button variant="primary" onClick={() => console.log("삭제하기")}>
                삭제
              </Button>
              &nbsp;
              <Button variant="primary" onClick={() => window.history.back()}>
                목록
              </Button>
              {/* <Link to="/board" variant="primary" className='nav-link'>공지목록</Link> */}
            </div>
          </Card>   
          <hr />
        </div>
      <Footer />    
    </>
  )
}

export default NoticeTestDetail
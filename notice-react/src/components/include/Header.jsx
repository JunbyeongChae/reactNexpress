import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = () => {
    //아래 부분이 화면 처리부분
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/board" className='nav-link'>게시판</Link>
            <Link to="/quill/write" className='nav-link'>QuillEditor</Link>
            <Link to="/notice" className='nav-link'>공지사항</Link>
            <Link to="/noticeDB" className='nav-link'>공지MySQL</Link>
            <Link to="/noticeT" className='nav-link'>공지데모</Link>
            <Link to="/page" className='nav-link'>페이징처리</Link>
          </Nav>
        </Container>
      </Navbar>    
    </>
  )
}

export default Header
/*
    페이지 이동시 href를 사용하면 URL이 변한다. 
    - 기존에 요청은 끊어지고 새로운 요청이 일어난다.:기존페이지가 쥐고 있던 데이터는 잃어버린다.
*/
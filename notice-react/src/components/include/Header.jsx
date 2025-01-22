import React, { useEffect, useState } from 'react'
import { use } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../service/authLogic'

const Header = () => {
  const userAuth = useSelector((state) => state.userAuth)
  const [email, setEmail] = useState("")
  const [isLoggedIn, setisLoggedIn] = useState(false)
  useEffect(() => {
    const email = localStorage.getItem("email")
    if(email){
      setEmail(email)
      setisLoggedIn(true)
    }
  },[email])
  const logoutE = () => {
    logout(userAuth.auth)
    setEmail(null)
    setisLoggedIn(false)
    console.log('logout')
  }
    //아래 부분이 화면 처리부분
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/pay/ready" className="nav-link">카카오페이</Link>
            <Link to="/board" className='nav-link'>게시판</Link>
            <Link to="/quill/write" className='nav-link'>QuillEditor</Link>
            <Link to="/notice" className='nav-link'>공지사항</Link>
            <Link to="/noticeDB" className='nav-link'>공지MySQL</Link>
            <Link to="/noticeT" className='nav-link'>공지데모</Link>
            <Link to="/page" className='nav-link'>페이징처리</Link>
          </Nav>
          <div className="d-flex">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {!isLoggedIn &&(
                <li className='nav-item' id='login'>
                  <Link to="/login" className="nav-link">로그인</Link>
                </li>
              )}
              {isLoggedIn &&(
                <>
                  <li className='nav-item' id='mypage'>
                    <Link to='/mypage' className="nav-link">{email}</Link>
                  </li>
                  <li className='nav-item' id='logout'>
                    <Link to='#' className="nav-link" onClick={logoutE}>로그아웃</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
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
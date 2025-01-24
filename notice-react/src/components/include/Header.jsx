import React, { useEffect, useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../service/authLogic'

const Header = () => {
  const userAuth = useSelector(state => state.userAuth) //authLogic.js
  const [email, setEmail] = useState("") //디폴트문자열가짐->로그인-> localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(false) //로그인 상태 관리
  //email 이 존재할때 와 email이 존재하지 않을 때
  useEffect(()=>{
    //의존성 배열에 있는 값이 변경될 때 마다  useEffect다시 호출된다.
    const email = localStorage.getItem("email")
    if(email){
      setEmail(email) //최초 렌더링시에 빈문자열이었다가 로그인 후 localStorage가 변하면 같이 바뀜
      setIsLoggedIn(true)
    }
  },[email])
  const logoutE = () =>{
    console.log('logout')
    //구글 logout처리 함수 > 이메일 초기화, setLogged false
    logout(userAuth.auth)
    setEmail(null)
    setIsLoggedIn(false)
  }//end of logoutE
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
          {/* 로그인 메뉴 Nav bar 오른쪽 끝에 붙이기 */}
          <div className="d-flex">
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              {!isLoggedIn && (
                <li className='nav-item' id='login'>
                  <Link to="/login" className='nav-link active'>로그인</Link>
                </li>
              )}
              {isLoggedIn && (
                <>
                  <li className='nav-item' id='mypage'><Link to="/mypage" className='nav-link'>{email}</Link></li>
                  <li className='nav-item' id='logout'><Link to="#" className='nav-link' onClick={logoutE}>로그아웃</Link></li>
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
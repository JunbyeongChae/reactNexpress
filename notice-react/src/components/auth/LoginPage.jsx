import React, { useState } from 'react'
import { DividerDiv, DividerHr, DividerSpan, GoogleButton, KakaoButton, LoginForm, MyH1, MyInput, MyLabel, MyP, PwEye, SubmitButton } from '../../styles/FormStyles';
import { Link, useNavigate } from 'react-router';
import { type } from '@testing-library/user-event/dist/type';
import { loginGoogle } from '../../service/authLogic';
import { useDispatch, useSelector } from 'react-redux';
import { setToastMsg } from '../../redux/toastStatus/action';
//rafce단축명령어
const LoginPage = () => {
  //state.js에서는 auth도 '', googleProvider도 ''인데 
  //언제 userAuth상태값이 빈값이 아니라 의미있는 값으로 변환되는가?
  const userAuth = useSelector(state => state.userAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate() //이 훅을 이용해서 화면 전환하기 -> URL바뀌지 않음. -> 부분갱신
  //사용자가 입력한 값을 담을 useState훅 선언하기
  //const tempUser에 값을 담는 것과 차이점은 useState는 값이 변경될 때마다 화면이
  //새로 렌더링 된다는 점이다.
  const [tempUser, setTempUser] = useState({
    mem_email: '',
    mem_pw: ''
  })
  const [submitBtn, setSubmitBtn] = useState({
    disabled: true,
    bgColor: 'rgb(175, 210, 244)',
    hover: false
  })
  //input 태그에 사용자가 입력한 이메일 , 비번이 변경될 때 마다. tempUser에 
  //입력되는 값이 달라져야 한다.
  const changeUser = (e) => {
    const id = e.currentTarget.id 
    const value = e.target.value 
    setTempUser({...tempUser, [id]:value})
  }
  //비밀번호와 비밀번호 확인
  //fontawesome에서 눈모양 이모지 사용. 클릭하면 비번이 보이고 초기일때는 *처리
  const [passwordType, setPasswordType] = useState({
    type: "password",
    visible: false
  })
  //폰트어썸에서 제공되는 눈이모지를 눌렀을 때 상태값을 변경해줄 자바스크립트 함수
  //토글버튼 처럼 누를때마다 true 아니면 false
  const passwordView = (e) => {
    const id = e.currentTarget.id
    if(id === "password"){
      if(!passwordType.visible){
        setPasswordType({...passwordType, type:'text', visible: true})
      }else{
        setPasswordType({...passwordType, type:'password', visible: false})
      }
    }
  }

  const toggleHover = () => {
    if(submitBtn.hover){
      setSubmitBtn({...submitBtn, hover: false, bgColor:'rgb(105, 175, 245'})
    }else{
      setSubmitBtn({...submitBtn, hover: true, bgColor:'rgb(58, 129, 200'})
    }
  }//토글 버튼 마우스 올려놓았을 때
  //오라클 서버에 회원가입을 받고 회원가입시 입력한 이메일과 비번으로 로그인 하기
  const loginE = () => {
    
  }
  //구글 로그인
  const loginG = async() => {
    try {
      //구글 로그인시 auth와 googleProvider가 필요하다. 이 두가지가 상태값이다.
      //reducer에서 action과 state값 두 가지로 처리
      const result = await loginGoogle(userAuth.auth, userAuth.googleProvider)
      //위에서 구글 로그인 성공하면 localStorage값을 재사용해야 합니다.
      //화면의 전환이 url변경이 아닌 부분 갱신으로 처리되는 경우 값을 못 가져온다.
      console.log(result)
      navigate("/")
      window.location.reload() //페이지 새로고침이 있어야 쿠키값이나 변경된 상태값을 다시 가져올 수 있다
      //페이지의 새로고침이 발생해야 변경된 상태값을 읽어올 수 있다. 
    } catch (error) {
      dispatch(setToastMsg("로그인 오류 입니다. : "+error))
    }

  }
  //카카오로그인
  const loginK = () => {

  }
  return (
    <>
      <LoginForm>
      <MyH1>로그인</MyH1>
      <MyLabel htmlFor="email"> 이메일     
          <MyInput type="email" id="mem_email" name="mem_email" placeholder="이메일를 입력해주세요." 
          onChange={(e)=>changeUser(e)}/>   
      </MyLabel>
      <MyLabel htmlFor="password"> 비밀번호
          <MyInput type={passwordType.type} autoComplete="off" id="mem_pw" name="mem_password" placeholder="비밀번호를 입력해주세요."
          onChange={(e)=>changeUser(e)}/>
          <div id="password" onClick={(e)=> {passwordView(e)}} style={{color: `${passwordType.visible?"gray":"lightgray"}`}}>
          <PwEye className="fa fa-eye fa-lg"></PwEye>
          </div>
      </MyLabel>
      <SubmitButton type="button" style={{backgroundColor:submitBtn.bgColor}}  
          onMouseEnter={toggleHover} onMouseLeave={toggleHover} onClick={()=>{loginE();}}>
          로그인
      </SubmitButton>
      <DividerDiv>
          <DividerHr />
          <DividerSpan>또는</DividerSpan>
      </DividerDiv>
      <GoogleButton type="button" onClick={()=>{loginG();}}>
          <i className= "fab fa-google-plus-g" style={{color: "red", fontSize: "18px"}}></i>&nbsp;&nbsp;Google 로그인
      </GoogleButton>
      <KakaoButton type="button" onClick={()=>{loginK();}}>
          <span style={{color: "red", fontSize: "18px"}}></span>&nbsp;&nbsp;Kakao 로그인
      </KakaoButton>
      <MyP style={{marginTop:"30px"}}>신규 사용자이신가요?&nbsp;<Link to="/auth/signup" className="text-decoration-none" style={{color: "blue"}}>계정 만들기</Link></MyP>
      <MyP>이메일를 잊으셨나요?&nbsp;<Link to="/login/findEmail" className="text-decoration-none" style={{color: "blue"}}>이메일 찾기</Link></MyP>
      <MyP>비밀번호를 잊으셨나요?&nbsp;<Link to="/login/resetPwd" className="text-decoration-none" style={{color: "blue"}}>비밀번호 변경</Link></MyP>
      </LoginForm>       
    </>
  )
}

export default LoginPage
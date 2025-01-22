import { Route, Routes, useLocation, useNavigate } from "react-router" 
import "bootstrap/dist/css/bootstrap.min.css"
import  HomePage from "./components/pages/HomePage";
import LoginPage from "./components/auth/LoginPage";
import NoticeDetail from "./components/notice/NoticeDetail";
import NoticeList from "./components/notice/NoticeList";
import NoticeTestList from "./components/noticeTest/NoticeTestList";
import NoticeTestDetail from "./components/noticeTest/NoticeTestDetail";
import Hello from "./components/tomcat/Hello";
import NoticeDBList from "./components/noticeDB/NoticeDBList";
import NoticeDBDetail from "./components/noticeDB/NoticeDBDetail";
import QuillWrite from "./components/board/QuillWrite";
import BoardDBDetail from "./components/board/BoardDBDetail";
import BoardDBList from "./components/board/BoardDBList";
import BoardDBWrite from "./components/board/BoardDBWrite";
import BoardDBUpdate from "./components/board/BoardDBUpdate";
import PaginationTest from "./components/board/PaginationTest";
import PayReadyPage from "./components/pay/PayReadyPage";
import KakaoPay from "./components/pay/KakaoPay";
import { toastStatus } from "./redux/toastStatus/state";
import Toast from "./components/Toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthChange } from "./service/authLogic";
import { memberListDB } from "./service/dbLogic";
import SignupPage from "./components/pages/auth/SignupPage";
import { setToastMsg } from "./redux/toastStatus/action";
import EmailVerifiedPage from "./components/pages/auth/EmailVerifiedPage";
//App이 실행될 때 로그인 상태인지를 체크하기
const App = () => {
  //Route의 path와 Header의 Link to는 일치해야 한다.
  //useEffect에 의존성 배열에 들어갈 변수들....
  const pathname = useLocation().pathname //현재 경로
  const navigate = useNavigate()
  const toastStatus = useSelector((state) => state.toastStatus)
  const userAuth = useSelector((state) => state.userAuth)
  const dispatch = useDispatch()
  const auth = localStorage.getItem("auth") //접근권한
  //status -> 0이면 일반회원, 1이면 코치
  useEffect(() => {
    const asyncCloud = async() => {
      //현재 로그인 상태가 유지되고 있을 때
      const user = await onAuthChange(userAuth.auth)
      console.log(user)
      console.log('auth : '+localStorage.getItem('auth'))
      //user가 무언가를 쥐고 있다면 즉 true 일때 - 로그인이 되어 있는 상태를 말함
      //로그인 되어 있는 상태에서 회원가입이 된 사람인지를 체크하기
      //너 구글로 로그인 한 경우라면 반드시 회원가입을 별도로 해야 돼
      //회원권 양도, 수업신청

      if(user){
        console.log(`${user.uid}, ${user.email} has signed in`)
        if(localStorage.getItem('auth') === null || !localStorage.getItem('auth')){
          //로그인은 되어 있는 상태인데 auth가 없다면 회원가입이 넌 안되어 있다.
          //일단 오라클 DB에서 member250120테이블에 해당 이메일이 있는지 체크
          const res = await memberListDB({MEM_UID: user.uid, type: 'auth'})
          console.log(res)
          //오라클 서버에서 사용자 정보가 존재하고 그 결과를 res에 담았다면 
          //로컬스토리지에 담기
          if(res.data){
            localStorage.setItem("uid", res.data.MEM_UID)
            localStorage.setItem("email", res.data.MEM_EMAIL)
            localStorage.setItem("nickname", res.data.MEM_NICKNAME)
            localStorage.setItem("status", res.data.MEM_STATUS)
            localStorage.setItem("auth", res.data.MEM_AUTH)
            localStorage.setItem("no", res.data.MEM_NO)
            //현재 로그인 되어 있는 상태인지 확인하였고 오라클 서버에서 응답으로 받은 정보들을
            //(res.data다음에 대문자 이름들은 모두 오라클 연동시 myBatis를 사용하여 map에 자동으로
            //담아주는 과정에서 myBatis가 키값을 무조건 디폴트로 대문자로 처리하는 과정으로 결정됨)
            //로컬 스토리지에 저장해둠.
            //화면 전환을 해준다.
            navigate("/")
            return
          }//end of if - 오라클 서버에서 응답으로 받은 정보를 로컬스토리지에 저장
        }//end of ath 정보가 없으면
        //로그인 성공이면 user.emailVerified = true
        if(!user.emailVerified){
          console.log('구글 로그인 상태가 아닐 때 실행됨')
          if(pathname !== '/auth/emailVerified'){
            navigate("/auth/emailVerified")
          }
        }//end of emailVerfied가 false일 때 실행됨
        else if(!localStorage.getItem('auth')||localStorage.getItem('auth')==='undefined'||localStorage.getItem('auth')===''){
          //회원 가입 대상이 아닌 경우에 메시지를 출력 하지 않음
          if(auth && auth!=='undefined'&&auth !==''){
            dispatch(setToastMsg('회원가입 정보가 이미 존재합니다.'))
            return
          }
          if(pathname !=='/auth/signup'){
            dispatch(setToastMsg("해당 구글 계정은 회원가입 대상 입니다. 회원가입을 부탁드립니다."))
            navigate('/auth/signup')
          }
        }//end else if

      }//end of user
    }//end of asyncCloud
    asyncCloud()
  },[userAuth.auth, pathname, auth, dispatch])//end of useEffect
  //사용자 정의 콤포넌트는 함수 이다.
  return (
    <>
    {/* Toast활용한 메시지가 출력될 물리적인 공간을 한정짓기 */}
      <div style={{ height: "100vh"}}>
        {toastStatus.status && <Toast />}
        <Routes>
            <Route path="/" exact={true} element={<HomePage />}/>
            {/* pay */}
            <Route path="/pay/ready" exact={true} element={<PayReadyPage />} />
            <Route path="/pay/action" exact={true} element={<KakaoPay />} />
            <Route path="/hello" exact={true} element={<Hello />}/>
            {/* 인증/인가 */}
            <Route path="/login" exact={true} element={<LoginPage />}/>
            <Route path="/auth/signup" exact={true} element={<SignupPage />}/>
            <Route path="/auth/emailVerified" exact={true} element={<EmailVerifiedPage />}/>
            <Route path="/board" exact={true} element={<BoardDBList />}/>
            <Route path="/board/write" exact={true} element={<BoardDBWrite />}/>
            <Route path="/board/:b_no" exact={true} element={<BoardDBDetail />}/>
            <Route path="/board/update/:b_no" exact={true} element={<BoardDBUpdate />}/>
            <Route path="/quill/write" exact={true} element={<QuillWrite />}/>
            <Route path="/noticeDB" exact={true} element={<NoticeDBList />}/>
            <Route path="/noticeDB/:n_no" exact={true} element={<NoticeDBDetail />}/>
            <Route path="/notice" exact={true} element={<NoticeList />}/>
            <Route path="/notice/:n_no" exact={true} element={<NoticeDetail />}/>
            <Route path="/noticeT" exact={true} element={<NoticeTestList />}/>
            <Route path="/noticeTD" exact={true} element={<NoticeTestDetail />}/>
            <Route path="/page" exact={true} element={<PaginationTest />}/>
        </Routes>
      </div>

    </>
  );
}

export default App;
/*
  - http://localhost:3000/index.html
  - <div id="root"></div>
  - root에 대한 정보는 index.js에서 참조 한다.
  document.querySelector("#root")
  - index.js에서 App import한다
  - App.jsx의 return에 있는 태그가 화면 출력된다.
  - 그런데 이번에는 App.jsx에 메뉴를 클릭했을 때 보여줄 페이지에
  대한 링크를 걸어 준다.
*/
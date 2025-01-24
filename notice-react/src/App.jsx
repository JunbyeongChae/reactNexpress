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
import FindEmailPage from "./components/pages/auth/FindEmailPage";
import ResetPwdPage from "./components/pages/auth/ResetPwdPage";
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
  //-> http://localhost:3000/index.html
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
      if(user !=null){
        //user.emailVerified값을 비교할 수 있다.
        if(!user.emailVerified){//false이면 true가 된다.
          //구글 로그인 상태가 아니다. -> 소셜로그인있고 사용자가 회원가입해서 진행되는 로그인 - 2가지가 존재함

        }else{//user.emailVerified가 true이다.
          //당신은 이미 회원가입이 되어 있습니다. - 기준값
          //uid or email 가지고 오라클 서버로 가서 SELECT * FROM member250120
          //WHERE mem_uid = 'google1';      
          //localStorage 있는 값 중에서 선택할 것.
          console.log(`${user.uid}, ${user.email} has signed in.`)
          if(user.uid !==null || user.email !==null){
            const res = await memberListDB({MEM_UID:user.uid, type:'auth'})
            console.log(res)//참이면 있다. 거짓이면 없다.
            //만일 조회결과가 존재한다면 이미 회원가입이 된 상태임
            //추가적인 상태값을 관리한다.(쿠키나 세션, localStorage)
            console.log(typeof res.data)
            console.log(res.data)
            console.log(res.data.length)
            if(res.data.length > 0){
              console.log('if문 실행')
              //상태값에 null이 오는 경우 미리 점검 - MemberController -> MemberLogic(memberList():Object3가지 경우의 수) -> MemberDao
              //1)이메일중복검사와 닉네임중복검사-하나로 묶음, 2)이메일 찾기, 3)회원 조회
              //리턴타입 1)list.size():0이면 사용할 수 있다. 1이면 사용불가하다. 왜냐면 이미 있는 이메일이니까
              //2)String- 너가 찾는 이메일 이거야, 3)List<Map<>> 4)Map - 한 건일 때 - 소셜로그인 처리경우를 비교해서 회원가입유도하기
              localStorage.setItem('uid', res.data.MEM_UID)
              localStorage.setItem('email', res.data.MEM_EMAIL)
              localStorage.setItem('nickname', res.data.MEM_NICKNAME)
              localStorage.setItem('status', res.data.MEM_STATUS) //다시 정리
              localStorage.setItem('auth', res.data.MEM_AUTH)
              localStorage.setItem('no', res.data.MEM_NO) //pk값은 관리
            }
            //너의 uid나 email로 오라클 서버에 member250120테이블에 찾아보니까 너가 없어
            else{
              console.log('else문 실행')
              //이 조건을 수렴하면 해당 구글 계정은 회원가입 대상입니다. 회원가입을 부탁드립니다.
              dispatch(setToastMsg(' 해당 구글 계정은 회원가입 대상입니다. 회원가입을 부탁드립니다.'))
              navigate('/auth/signup')
            }
          }
        }
      }//end of user - 크롬에서 로그인상태중이고 구글에서 쥐고 있는 값이 있을 때 처리하는 부분
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
            <Route path="/auth/findEmail" exact={true} element={<FindEmailPage />}/>
            <Route path="/auth/resetPwd" exact={true} element={<ResetPwdPage />}/>
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
import { Route, Routes } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/auth/LoginPage";
import NoticeDetail from "./components/notice/NoticeDetail";
import NoticeList from "./components/notice/NoticeList";
import NoticeTestList from "./components/noticeTest/NoticeTestList";
import NoticeTestDetail from "./components/noticeTest/NoticeTestDetail";
import NoticeDBList from "./components/noticeDB/NoticeDBList";

const App = () => {
  //Route의 path와 Header의 Link to는 일치해야 한다.
  //사용자 정의 콤포넌트는 함수 이다.
  return (
    <>
      <Routes>
        <Route path="/" exact={true} element={<HomePage />} />
        <Route path="/login" exact={true} element={<LoginPage />} />
        <Route path="/noticeDB" exact={true} element={<NoticeDBList />} />
        <Route path="/notice" exact={true} element={<NoticeList />} />
        <Route path="/notice/:n_no" exact={true} element={<NoticeDetail />} />
        <Route path="/noticeT" exact={true} element={<NoticeTestList />} />
        <Route path="/noticeTD" exact={true} element={<NoticeTestDetail />} />
      </Routes>
    </>
  );
};

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

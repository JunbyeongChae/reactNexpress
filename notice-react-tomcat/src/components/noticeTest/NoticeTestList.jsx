import React, { useEffect, useState } from "react";
import Header from "../include/Header";
import Footer from "../include/Footer";
import NoticeTestItem from "./NoticeTestItem";

const NoticeTestList = () => {
  const [notices, setNotices] = useState({
    1: {
      n_no: 1,
      n_title: "공지제목1",
      n_writer: "관리자",
      n_content: "제목1 내용",
    },
    2: {
      n_no: 2,
      n_title: "공지제목2",
      n_writer: "총무부",
      n_content: "제목2 내용",
    },
    3: {
      n_no: 3,
      n_title: "공지제목3",
      n_writer: "영업부",
      n_content: "제목3 내용",
    },
  });

  const [gubun, setGubun] = useState("");
  const [keyword, setKeyword] = useState("");
  const [notice, setNotice] = useState({
    n_no: 0,
    n_title: "",
    n_writer: "",
    n_content: "",
  });
  //db경유하여 공지글 목록 가져오기
  useEffect(() => {
    console.log("effect");
    console.log(notices);
  }, []); //의존성 배열이 빈통이니까 최초 한 번만 실행된다.
  //공지 글 쓰기
  const noticeAdd = async (event) => {
    event.preventDefault();
  };
  const noticeList = () => {};
  //조건 검색 구현하기
  const noticeSearch = () => {
    const gubun = document.querySelector("#gubun").value;
    const keyword = document.querySelector("#keyword").value;
    console.log(`${gubun}, ${keyword}`); // ''-false-> !false, 제목1
    //구분을 선택하지 않은 경우 선택하도록 유도한다.
    if (!gubun) {
      alert("구분을 선택하세요.");
      //구분(n_title, n_writer, n_content)을 선택하지 않으면
      return;
    }
    //구분(gubun)과 입력값(keyword)에 대한 초기화 처리할 것.
    //구분을 선택하고 입력값을 입력한 뒤에는 그 조건에 따라 필터링된 결과를 useState담기
    //mdn filter API - 깊은 복사 인가 아니면 얕은 복사 인가?
    //입력한 값이 db에 저장되어 있다. - 목록을 가져오는 것은 db에서 가져온다.
    //조건을 수렴하는 결과만 필터링한 뒤 setNotices(result)하고 있다.
    //db에서 가져온것이 아니다.
    const result = Object.values(notices).filter((notice) => {
      if (!notice) return false;
      switch (gubun) {
        case "n_title":
          return notice.n_title && notice.n_title.includes(keyword);
        case "n_writer":
          return notice.n_writer && notice.n_writer.includes(keyword);
        case "n_content":
          return notice.n_content && notice.n_content.includes(keyword);
        default:
          return false;
      } //end of switch
    }); //end of 조건검색 결과 담음.
    console.log("검색 결과 : " + JSON.stringify(result));
    setNotices(result);
    setGubun("");
    setKeyword("");
  };
  const handleChangeForm = (event) => {
    event.preventDefault();
    //사용자가 폼에 입력한 값을 notice useState훅에 담기
    setNotice({
      ...notice,
      n_no: Date.now(),
      [event.target.name]: event.target.value,
    });
  };
  //파라미터에 event객체는 이벤트가 감지 되었을 때 주입받는다.
  //만일 주입을 못 받으면 null출력된다 아니다. undefinded
  const handleGubun = (event) => {
    console.log(event.target.value); //n_title, n_writer, n_content- 왜냐면 select콤보이니까
    setGubun(event.target.value);
    noticeList();
  };
  const handleKeyword = (event) => {
    console.log(event.target.value); //사용자가 입력한 문자열
    setKeyword(event.target.value);
    noticeList();
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="page-header">
          <h2>
            공지사항<small>글목록</small>
          </h2>
          <hr />
        </div>

        <div className="row">
          <div className="col-sm-3">
            <select
              className="form-select"
              id="gubun"
              value={gubun}
              onChange={handleGubun}
            >
              <option value="">분류선택</option>
              <option value="n_title">제목</option>
              <option value="n_writer">작성자</option>
              <option value="n_content">내용</option>
            </select>
          </div>
          <div className="col-sm-6">
            <input
              type="text"
              className="form-control"
              placeholder="검색어를 입력하세요"
              value={keyword}
              id="keyword"
              onChange={handleKeyword}
            />
          </div>
          <div className="col-sm-3">
            <button
              type="button"
              className="btn btn-danger"
              onClick={noticeSearch}
            >
              검색
            </button>
          </div>
        </div>

        <table className="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>제목</th>
              <th>작성자</th>
              <th>내용</th>
            </tr>
          </thead>
          {/* 데이터셋 연동하기 */}
          {/* props로 넘어온 상태값이 빈 깡통이면 실행하지 않기 */}
          <tbody>
            {notices &&
              Object.keys(notices).map((key) => (
                <NoticeTestItem key={key} notice={notices[key]} />
              ))}
          </tbody>
          {/* 데이터셋 연동하기 */}
        </table>
        <hr />
        <div className="list-footer">
          <button className="btn btn-warning" onClick={noticeList}>
            전체조회
          </button>
          &nbsp;
          <button className="btn btn-success" onClick={noticeAdd}>
            글쓰기
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NoticeTestList;

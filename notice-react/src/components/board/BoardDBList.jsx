import React, { useEffect, useState } from "react";
import Header from "../include/Header";
import Footer from "../include/Footer";
import "./board.css";
import { useNavigate } from "react-router";
import BoardDBItem from "./BoardDBItem";
import { boardListDB } from "../../service/dbLogic";
import { Pagination } from "react-bootstrap";

const BoardDBList = () => {
  const navigate = useNavigate();
  const itemsPerPage = 5; //페이지 당 항목 수
  //현재 페이지에대한 상태를 관리하는 hook
  const [currentPage, setCurrentPage] = useState(1);
  const [gubun, setGubun] = useState("");
  const [keyword, setKeyword] = useState("");
  const [board, setBoard] = useState({
    b_no: 0,
    b_title: "",
    b_writer: "",
    b_content: "",
  });
  const [boards, setBoards] = useState([
    { b_no: 1, b_title: "제목", b_writer: "작성자" },
    { b_no: 1, b_title: "제목", b_writer: "작성자" },
    { b_no: 1, b_title: "제목", b_writer: "작성자" },
  ]);
  //useEffect는 최초 BoardDBList.jsx가 호출될 때 한 번 실행됨.
  useEffect(() => {
    const asyncDB = async () => {
      const board = { gubun: null, keyword: null };
      const res = await boardListDB(board);
      console.log(res.data);
      setBoards(res.data);
    };
    asyncDB();
  }, []);

  const boardSearch = async () => {
    const gubun = document.querySelector("#gubun").value;
    const keyword = document.querySelector("#keyword").value;
    const board = { gubun: gubun, keyword: keyword };
    const res = await boardListDB(board);
    console.log(res.data);
    setBoards(res.data);
    document.querySelector("#gubun").value = "";
    document.querySelector("#keyword").value = "";
  };
  //전체 조회 구현
  const boardList = async () => {
    //boardListDB의 파라미터 자리에 board는 어디서 가져오는걸까?
    const board = { gubun: null, keyword: null };
    const res = await boardListDB(board);
    console.log(res.data);
    setBoards(res.data);
  };
  const handleGubun = (event) => {
    //분류를 변경했을 때 호출됨
    console.log(event.target.value); //n_title, n_writer, n_content- 왜냐면 select콤보이니까
    setGubun(event.target.value);
    boardList();
  };
  const handleKeyword = (event) => {
    //키워드가 변경되었을 때 호출
    console.log(event.target.value); //사용자가 입력한 문자열
    setKeyword(event.target.value);
    boardList();
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  //첫번째 항목 인덱스 : 마지막 항목 인덱스에서 페이지당 항목 수를 뺀값
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //현재 페이지 항목 - 현재 페이지에 표시할 데이터를 추출하기
  const currentItems = boards.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(boards.length / itemsPerPage);
  const handlePageChange = (pageNumber) => {
    pageNumber = Math.max(1,Math.min(pageNumber, totalPages));
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <Header />
      <div className="container">
        <div className="page-header">
          <h2>
            게시판<small>글목록</small>
          </h2>
          <hr />
        </div>
        <div className="row">
          <div className="col-sm-3">
            <select className="form-select" id="gubun">
              <option value="">분류선택</option>
              <option value="b_title">제목</option>
              <option value="b_writer">작성자</option>
              <option value="b_content">내용</option>
            </select>
          </div>
          <div className="col-sm-6">
            <input
              type="text"
              className="form-control"
              placeholder="검색어를 입력하세요"
              id="keyword"
            />
          </div>
          <div className="col-sm-3">
            <button
              type="button"
              className="btn btn-danger"
              onClick={boardSearch}
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
            </tr>
          </thead>
          {/* 데이터셋 연동하기 */}
          {/* props로 넘어온 상태값이 빈 깡통이면 실행하지 않기 */}
          <tbody>
            {currentItems.map((board, index) => (
              <BoardDBItem key={index} board={board} />
            ))}
          </tbody>
          {/* 데이터셋 연동하기 */}
        </table>

        <div className="d-flex justify-content-center">
          <Pagination>
            <Pagination.First onClick={() => handlePageChange(1)} />
            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)}/>
            {Array.from({ length: totalPages}, (_, i) => i + 1).map((pageNumber) => (
              <Pagination.Item
                active={currentPage === pageNumber}
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}/>
            <Pagination.Last onClick={() => handlePageChange(totalPages)}/>
          </Pagination>
        </div>

        <hr />
        <div className="list-footer">
          <button className="btn btn-warning" onClick={boardList}>
            전체조회
          </button>
          &nbsp;
          <button
            className="btn btn-success"
            onClick={() => navigate("/board/write")}
          >
            글쓰기
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BoardDBList;

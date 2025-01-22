import React, { useEffect, useState } from 'react'
import Header from '../include/Header'
import Footer from '../include/Footer'
import './board.css'
import { useLocation, useNavigate } from 'react-router'
import BoardDBItem from './BoardDBItem'
import { boardListDB } from '../../service/dbLogic'
import { Pagination } from 'react-bootstrap'

const BoardDBList = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const itemsPerPage = 5 //페이지 당 항목 수
    //현재 페이지 상태 관리
    const [currentPage, setCurrentPage] = useState(1)
    const [boards, setBoards] = useState([])
    //현재 페이지 데이터 계산
    const indexOfLastItem = currentPage * itemsPerPage
    //첫번째 항목 인덱스 : 마지막 항목 인덱스에서 페이지당 항목 수를 뺀값
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    //현재 페이지 항목 - 현재 페이지에 표시할 데이터를 추출하기
    const currentItems = boards.slice(indexOfFirstItem,indexOfLastItem)
    //총페이지 수 구하기
    const totalPages = Math.ceil(boards.length / itemsPerPage)
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const [gubun, setGubun] = useState('')
    const [keyword, setKeyword] = useState('')
    const [board, setBoard] = useState({
        b_no: 0,
        b_title: '',
        b_writer: '',
        b_content: ''
    })

    useEffect(() => {
        console.log(location.search)
        //URL에서 현재 페이지 번호 가져오기
        const queryParams = new URLSearchParams(location.search)
        const page = queryParams.get("page")
        console.log('page : '+page)
        if(page) setCurrentPage(parseInt(page))
        console.log(currentPage)
    },[location.search])

    const [refresh, setFresh] = useState(0)

    //useEffect는 최초 BoardDBList.jsx가 호출될 때 한 번 실행됨.
    useEffect(()=>{
        const asyncDB = async () => {
            const board = { gubun: null, keyword: null }
            const res = await boardListDB(board)
            console.log(res.data)
            setBoards(res.data)
        }
        asyncDB()
    },[refresh])

    const boardSearch = async() => {
        const gubun = document.querySelector("#gubun").value
        const keyword = document.querySelector("#keyword").value
        const board = {gubun:gubun, keyword:keyword}
        const res = await boardListDB(board)
        console.log(res.data)
        setBoards(res.data)
        setCurrentPage(1) //검색시 첫 페이지로 이동
        document.querySelector("#gubun").value=''
        document.querySelector("#keyword").value = ''
    }
    //전체 조회 구현
    const boardList = async() => {
        //boardListDB의 파라미터 자리에 board는 어디서 가져오는걸까?
        const board = {gubun:null, keyword:null}
        const res = await boardListDB(board)
        console.log(res.data)
        setBoards(res.data)
        setCurrentPage(1)
    }
    const handleGubun = (event) => {//분류를 변경했을 때 호출됨
        console.log(event.target.value)//n_title, n_writer, n_content- 왜냐면 select콤보이니까
        setGubun(event.target.value)
        boardList()
    }
    const handleKeyword = (event) => {//키워드가 변경되었을 때 호출
        console.log(event.target.value)//사용자가 입력한 문자열
        setKeyword(event.target.value)
        boardList()
    }  

    return (
        <>
            <Header />
            <div className='container'>
                    <div className='page-header'>
                    <h2>게시판<small>글목록</small></h2>
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
                    <input type="text" className="form-control" placeholder="검색어를 입력하세요" id="keyword" />
                    </div>
                    <div className="col-sm-3">
                        <button type="button" className="btn btn-danger" onClick={boardSearch}>검색</button>
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
                        <BoardDBItem key={index} board={board} page={currentPage} />
                        ))}
                    </tbody>
                    {/* 데이터셋 연동하기 */}
                </table>

                <div className='d-flex justify-content-center'>
                    <Pagination>
                        <Pagination.First 
                            onClick={()=> handlePageChange(1)}
                            disabled={currentPage === 1}
                        />
                        <Pagination.Prev 
                            onClick={()=> handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        />
            {Array.from({length: Math.ceil(boards.length / itemsPerPage)}, (_, i) => i+1).map((pageNumber) => (
                        <Pagination.Item 
                            active={currentPage === pageNumber} 
                            key={pageNumber} 
                            onClick={()=> handlePageChange(pageNumber)}
                        >
                            {pageNumber}
                        </Pagination.Item>
            ))}
                        <Pagination.Next 
                            onClick={()=> handlePageChange(currentPage + 1)}
                            disabled={currentPage === Math.ceil(boards.length / itemsPerPage)}
                        />
                        <Pagination.Last 
                            onClick={() => handlePageChange(Math.ceil(boards.length / itemsPerPage))}
                            disabled={currentPage === Math.ceil(boards.length / itemsPerPage)}
                        />
                    </Pagination>
                </div>

                <hr />
                <div className='list-footer'>
                    <button className="btn btn-warning" onClick={boardList}>전체조회</button>
                    &nbsp;
                    <button  className="btn btn-success" onClick={()=> navigate('/board/write')}>글쓰기</button>
                </div>
                </div>
            <Footer />
        </>
    )
}

export default BoardDBList
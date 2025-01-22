import React, { useEffect, useState } from 'react'
import Header from '../include/Header'
import Footer from '../include/Footer'
import { ContainerDiv, FormDiv, HeaderDiv } from '../../styles/FormStyles'
import { useLocation, useParams } from 'react-router'
import { boardDetailDB } from '../../service/dbLogic'
import BoardHeader from './BoardHeader'

const BoardDBDetail = () => {
  const location = useLocation()
  //url에서 b_no값 받아오기
  let { b_no } = useParams()
  console.log('사용자가 선택한 글 번호 : '+b_no)
  const queryParams = new URLSearchParams(location.search)
  const page = queryParams.get('page')||1 
  const [board, setBoard] = useState({})
  //useEffect는 최초 한 번만 실행됨 - 의존성 배열이 빈통이면 
  //hashchange값이 변하면 새로운 상세보기 내용을 처리해야 한다.
  useEffect(() => {
    const asyncDB = async() => {
      const res = await boardDetailDB(b_no)
      console.log(res.data)
      setBoard(res.data)
    }
    asyncDB()
  },[b_no])//의존성 배열을 반드시 작성할 것. - 안하면 최초 한번만 실행되고 그 다음부터는 실행이 안됨 - 보던 화면만 계속 보게됨.
  return (
    <>
      <Header />
        <ContainerDiv>
          <HeaderDiv>
            <h3>게시글 상세보기</h3>
          </HeaderDiv>
          <FormDiv>
            <BoardHeader board={board} b_no={b_no} page={page} />
            <section>
              <div dangerouslySetInnerHTML={{__html:board.b_content}}></div>
            </section>
            <hr style={{height: "2px"}}/>
          </FormDiv>
        </ContainerDiv>
      <Footer />
    </>
  )
}

export default BoardDBDetail
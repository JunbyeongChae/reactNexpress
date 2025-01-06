import React, { useEffect, useState } from 'react'
import Footer from '../include/Footer';
import Header from '../include/Header';
import { ContainerDiv, FormDiv, HeaderDiv } from '../../styles/FormStyles';
import { useParams } from 'react-router';
import { boardDetailDB } from '../../service/dbLogic';
import BoardHeader from './BoardHeader';

const BoardDBDetail = () => {
  let {b_no} = useParams();
  const [board, setBoard] = useState({});
  useEffect(() => {
    const asyncDB = async () => {
      const res = await boardDetailDB(b_no);
      console.log(res.data);
      setBoard(res.data);
    }
    asyncDB();
  },[b_no])
  return (
    <>
      <Header/>
        <ContainerDiv>
          <HeaderDiv>
            <h3>게시글 상세보기</h3>
          </HeaderDiv>
          <FormDiv>
            <BoardHeader board ={board} b_no={b_no}>
              <section>
                <div dangerouslySetInnerHTML={{__html:board.b_content}}></div>
              </section>
              <hr style={{height: "2px"}}/>
            </BoardHeader>
            </FormDiv>
        </ContainerDiv>
      <Footer/>
    </>
  )
}

export default BoardDBDetail
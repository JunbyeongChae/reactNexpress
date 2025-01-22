import React, { useCallback, useRef, useState } from 'react'
import Header from '../include/Header'
import Footer from '../include/Footer'
import { BButton, ContainerDiv, FormDiv, HeaderDiv } from '../../styles/FormStyles'
import QuillEditor from './QuillEditor'
import { boardInsertDB } from '../../service/dbLogic'
import { useNavigate } from 'react-router'

const BoardDBWrite = () => {
  const navigate = useNavigate();
  //글제목
  const [title, setTitle] = useState('')
  //작성자
  const [writer, setWriter] = useState('')
  //글내용
  const [content, setContent] = useState('')
  const quillRef = useRef()
  //글쓰기 버튼 클릭했을 때
  const boardInsert = async () => {
    if(title.trim() === '' || content.trim() === ''){
      alert('게시글이 작성되지 않았습니다.')
      return
    }
    const board = {
      b_title: title,
      b_writer: writer,
      b_content: content
    }
    const res = await boardInsertDB(board)
    console.log(res.data) //{success:true, result:1}
    const isOk = res.data.success
    if(isOk === true){
      navigate("/board")
    }else{
      console.log("글쓰기 실패")
    }

  }
  //함수의 메모이제이션은 useCallback으로 처리하고 변수에 대한 메모이제이션은 useMemo처리함.
  const handleTitle = useCallback((value) => {
    setTitle(value)
  },[])
  const handleWriter = useCallback((value) => {
    setWriter(value)
  },[])
  const handleContent = useCallback((value) => {
    setContent(value)
  },[])
  return (
    <>
      <Header />
        <ContainerDiv>
          <HeaderDiv>
            <h3>게시글 작성</h3>
          </HeaderDiv>
          <FormDiv>
            <div style={{width:"100%", maxWidth:"2000px"}}>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
                  <h2>제목</h2> 
                  <div style={{display: 'flex'}}>
                      <BButton style={{marginLeft:'10px'}}onClick={boardInsert}>글쓰기</BButton>
                  </div>
              </div>
              <input id="dataset-title" type="text" maxLength="50" placeholder="제목을 입력하세요."
              style={{width:"100%",height:'40px' , border:'1px solid lightGray'}} onChange={(e)=>{handleTitle(e.target.value)}}/>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px', marginTop:'5px'}}>
                  <h2>작성자</h2> 
              </div>
              <input id="dataset-writer" type="text" maxLength="20" placeholder="작성자를 입력하세요."
              style={{width:"200px",height:'40px' , border:'1px solid lightGray'}} onChange={(e)=>{handleWriter(e.target.value)}}/>
              <hr style={{margin:'10px 0px 10px 0px'}}/>
              <h3>상세내용</h3>
              <QuillEditor value={content} handleContent={handleContent} quillRef={quillRef} />
            </div>            
          </FormDiv>
        </ContainerDiv>
      <Footer />
    </>
  )
}

export default BoardDBWrite
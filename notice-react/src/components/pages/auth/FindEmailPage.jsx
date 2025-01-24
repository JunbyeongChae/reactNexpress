import React, { useState } from 'react'
import { LoginForm, MyH1, MyInput, MyLabel, SubmitButton } from '../../../styles/FormStyles';

const FindEmailPage = () => {
    const [memInfo, setMemInfo] = useState({
        name: "", //MEM_NAME
        hp: "", //MEM_TEL
    })
//함수 안에 함수 선언이 가능하다.
//일급객체, 일급함수, 고차함수
    const [submitBtn, setSubmitBtn] = useState({
        disabled: true,
        bgColor: 'rgb(175, 210, 244)',
        hover: false
    })//end of submitBtn 
    const toggleHover = () => {
        if(submitBtn.hover){
            setSubmitBtn({...submitBtn, hover: false, bgColor:'rgb(105, 175, 245'})
        }else{
            setSubmitBtn({...submitBtn, hover: true, bgColor:'rgb(58, 129, 200'})
        }
    }//토글 버튼 마우스 올려놓았을 때    
    //사용자의 입력값이 변하면....
    //자바스크립트 함수에 사용하는 event는 자동으로 주입됨
    //이벤트 소스에 대한 정보를 취득
    const changeMemInfo = (e) => {
        const id = e.currentTarget.id
        const value = e.target.value
        setMemInfo({...memInfo, [id]: value})
    }
    const find = () => {
        
    }
    return (
        <LoginForm>
            <MyH1>이메일 찾기</MyH1>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',Content: 'center', marginTop: '20px', width:"100%"}}>
                <MyLabel> 이름
                <MyInput type="text" id="name" placeholder="이름을 입력해주세요." 
                onChange={(e)=>{changeMemInfo(e);}}/>
                </MyLabel>
                <MyLabel> 전화번호
                <MyInput type="number" id="hp" placeholder="전화번호를 입력해주세요." 
                onChange={(e)=>{changeMemInfo(e);}} />
                </MyLabel>
                <SubmitButton type="button"  disabled={submitBtn.disabled} style={{backgroundColor:submitBtn.bgColor }}
                    onClick={find} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
                        찾기
                </SubmitButton>
            </div>
        </LoginForm>
    )
}

export default FindEmailPage
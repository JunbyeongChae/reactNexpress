import React, { useState } from 'react'
import { LoginForm, MyH1, MyInput, MyLabel, SubmitButton } from '../../../styles/FormStyles';

const ResetPwdPage = () => {
  const [ memInfo, setMemInfo] = useState({
    name: "",
    hp: "",
    email:"",
  })
  const [submitBtn, setSubmitBtn] = useState({
    disabled: true,
    bgColor: 'rgb(175, 210, 244)',
    hover: false
  }) 
    const toggleHover = () => {
      if(submitBtn.hover){
        setSubmitBtn({...submitBtn, hover: false, bgColor:'rgb(105, 175, 245'})
      }else{
        setSubmitBtn({...submitBtn, hover: true, bgColor:'rgb(58, 129, 200'})
      }
    }
    const changeMemInfo = (e) => {
      const id = e.currentTarget.id;
      const value = e.target.value;
      setMemInfo({...memInfo, [id]: value});
    };
    const send = () => {
    }
  return (
    <LoginForm>
    <MyH1>비밀번호 변경</MyH1>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',Content: 'center', marginTop: '20px', width:"100%"}}>
        <MyLabel> 이름 
        <MyInput type="text" id="name" placeholder="이름을 입력해주세요." 
        onChange={(e)=>{changeMemInfo(e);}}/>
        </MyLabel>
        <MyLabel> 전화번호
        <MyInput type="number" id="hp" placeholder="전화번호를 입력해주세요." 
        onChange={(e)=>{changeMemInfo(e);}} />
        </MyLabel>
        <MyLabel> 이메일
        <MyInput type="email" id="email" placeholder="이메일를 입력해주세요." 
        onChange={(e)=>{changeMemInfo(e);}}/>
        </MyLabel>
        <SubmitButton type="button"  disabled={submitBtn.disabled} style={{backgroundColor:submitBtn.bgColor }}
        onClick={()=>{send()}} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
          메일 전송
        </SubmitButton>
    </div>
    </LoginForm>
  )
}

export default ResetPwdPage
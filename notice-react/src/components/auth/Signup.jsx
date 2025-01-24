/* global daum */
import React, { useState } from 'react'
import { MyButton, MyH1, MyInput, MyLabel, MyLabelAb, PwEye, SignupForm, SubmitButton, WarningButton } from '../../styles/FormStyles';
import { Form } from 'react-bootstrap';
import { checkPassword, validateBirthdate, validateEmail, validateHp, validateName, validateNickname, validatePassword } from '../../service/validateLogic';
import { data } from 'react-router';
import { setToastMsg } from '../../redux/toastStatus/action';
import { memberListDB } from '../../service/dbLogic';
//회원가입 페이지와 내정보 수정 페이지의 디자인 같다. - 고려해서 디자인 처리해 본다.
const Signup = ({update}) => {
    console.log('window.location.search : '+window.location.search)
    const type = window.location.search.split('&')[0].split('=')[1]
    console.log('type : '+type);
    const [reSignCheck, setReSignCheck] = useState(false)
    const [post, setPost] = useState({
        post: '',
        postDetail:'',
        postNum: ''
    })
    //사용자가 현재 화면에서 입력한 값 정보 관리
    const [ memInfo, setMemInfo] = useState({
        email:"",
        password: "",
        password2: "",
        name: "",
        birthday: "", 
        hp: "",
        nickname: "",
        gender: "없음"
    })
    //사용자가 입력한 정보에 대한 유효성 체크나 중복검사 후 처리 결과에 대한 메시지 처리
    //디폴트는 빈 문자열로 되어 있지만 유효성 체크나 중복검사 후에 결과 메시지 초기화해줌
    const [comment, setComment] = useState({
        email: "",
        password: "",
        password2: "",
        name: "",
        hp: "",
        nickname: "",
        birthday: "",
    })    


    //사용자 입력 화면에서 필수 입력창이나 중복검사 필드 또는 비밀번호, 비밀번호 확인
    const [star, setStar] = useState({
        email: "*",
        password: "*",
        password2: "*",
        name: "*",
        hp: "*",
        nickname: "*",
        birthday: "*",
    })
    const [googleEmail, setGoogleEmail] = useState('')
    //사용자가 정보를 입력하면 상태가 변경될 때마다 호출
    const changeMemInfo = (e) => {
        const id = e.currentTarget.id
        const value = e.target.value
        setMemInfo({...memInfo, [id]: value})
    }//end of changeMemInfo
    const validate = (key, e) => {
        let result;
        if(key === 'email'){
            result = validateEmail(e);
        }
        else if(key === 'nickname'){
            result = validateNickname(e);
        }
        else if(key === 'password'){
            result = validatePassword(e);
        }
        else if(key === 'password2'){
            result = checkPassword(memInfo.password, e);
        }
        else if(key === 'name'){
            result = validateName(e);
        }
        else if(key === 'hp'){
            result = validateHp(e);
        }
        else if(key === 'birthday'){
            result = validateBirthdate(e);
        }
    }
    //중복검사 대상 컬럼은  이메일 중복검사와 닉네임 중복 검사
    const overlap = async (key) => {//key :  email or nickname
      console.log('overlap')
        try {
          // if(comment[key] !=='중복확인을 해주세요.'){
          //   return;
          // }
          let params;
          if(key === 'email'){
            params = {MEM_EMAIL : memInfo[key], type : 'overlap'}
          }else{
            params = {MEM_NICKNAME : memInfo[key], type : 'overlap'}
          }
          console.log('Params being sent:', params);
          let response = {data:0};
          response = await memberListDB(params);
          console.log(response.data)
          if(response.data === 1){
            setComment({...comment, [key]: `${key==='email'?'이메일':'닉네임'}은 사용할 수 없습니다.`})
            dispatchEvent(setToastMsg(`${key==='email'?'이메일':'닉네임'}은 사용할 수 없습니다.`))
            setStar({...star, [key]: '*'})
          }else if(response.data === 0){
            setComment({...comment, [key]: `${key==='email'?'이메일':'닉네임'}은 사용할 수 있습니다.`})
            dispatchEvent(setToastMsg(`${key==='email'?'이메일':'닉네임'}은 사용할 수 있습니다.`))
            setStar({...star, [key]: ''})
          }
        } catch (error) {
            console.error(error)
        }
    }//end of overlap - 중복검사

    //비밀번호와 비밀번호 확인
    //fontawesome에서 눈모양 이모지 사용. 클릭하면 비번이 보이고 초기일때는 *처리
    const [passwordType, setPasswordType] = useState([
        {
            type: "password",
            visible: false
        },
        {
            type: "password",
            visible: false
        }
    ])

    //폰트어썸에서 제공되는 눈이모지를 눌렀을 때 상태값을 변경해줄 자바스크립트 함수
    //토글버튼 처럼 누를때마다 true 아니면 false
    const passwordView = (e) => {
        const id = e.currentTarget.id
        if(id === "password"){
            if(!passwordType[0].visible){
                setPasswordType([{type:'text', visible: true}, passwordType[1]])
            }else{
                setPasswordType([{type:'password', visible: true}, passwordType[1]])
            }
        }
        else if(id === "password2"){
            if(!passwordType[1].visible){
                setPasswordType([passwordType[0],{type:'text', visible: true}])
            }else{
                setPasswordType([passwordType[0],{type:'password', visible: false}])
            }
        }
    }//end of passwordView
    const pwdUpdate = () => {

    }
    const signup = () => {

    }
    const openZipcode = () => {
        new daum.Postcode({
            oncomplete: function(data) {
            let addr = ''; 
            if (data.userSelectedType === 'R') { 
                addr = data.roadAddress;
            } else { 
                addr = data.jibunAddress;
            }
            setPost({...post, postNum:data.zonecode, post:addr}) ;
            document.getElementById("post").value = addr;
            document.getElementById("postDetail").focus();
            }
        }).open();
    }
    const checkboxLable = ['없음','남자','여자']
    const Checkbox = checkboxLable.map((item, index) => (
        <Form.Check inline label={item} value={item} name="group1" type='radio' checked={memInfo.gender===item?true:false} readOnly
        id={`inline-radio-${item}`} key={index} onClick={(e)=> {setMemInfo({...memInfo, gender: e.target.value})}}/>
    ))
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
    }//토글 버튼 마우스 올려놓았을 때
    const signUpdate = () => {

    }
    const reSignAuth = () => {

    }
    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <div style={{display: 'flex', width:"100%"}}>
            <SignupForm  suggested={false}>
                <MyH1>{update?'내 정보수정':'회원가입'}</MyH1>
                <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                <div style={{padding: '30px 30px 0px 30px'}}>
                    { googleEmail
                    ?
                    <>
                        <MyLabel> 이메일 
                        <MyInput type="email" id="email" defaultValue={googleEmail} disabled={true} />
                        </MyLabel>
                    </>
                    :
                    <div style={{display: 'flex' , flexWrap: 'wrap'}}>
                        <MyLabel> 이메일 <span style={{color:"red"}}>{star.email}</span>
                        <MyInput type="email" id="email" placeholder="이메일를 입력해주세요." 
                        onChange={(e)=>{changeMemInfo(e); validate('email', e);}}/>
                        <MyLabelAb>{comment.email}</MyLabelAb>
                        </MyLabel>
                        <MyButton type="button" onClick={()=>{overlap('email');}}>중복확인</MyButton>
                    </div>
                    }
                    <div style={{display: 'flex'}}>
                    <MyLabel> 닉네임 <span style={{color:"red"}}>{star.nickname}</span>
                        <MyInput type="text" id="nickname" defaultValue={memInfo.nickname} placeholder="닉네임을 입력해주세요." 
                        onChange={(e)=>{changeMemInfo(e); validate('nickname', e);}}/>
                        <MyLabelAb>{comment.nickname}</MyLabelAb>
                    </MyLabel>
                    <MyButton type="button" onClick={()=>{overlap('nickname')}}>중복확인</MyButton>
                    </div>
                    <MyLabel> 비밀번호 <span style={{color:"red"}}>{star.password}</span>
                    <MyInput type={passwordType[0].type} id="password" autoComplete="off" placeholder="비밀번호를 입력해주세요." 
                    onKeyUp={(e)=>{setComment({...comment, password2: checkPassword(e.target.value,memInfo.password2)});}} 
                    onChange={(e)=>{changeMemInfo(e);  validate('password', e);}}/>
                    <div id="password" onClick={(e)=> {passwordView(e)}} style={{color: `${passwordType[0].visible?"gray":"lightgray"}`}}>
                        <PwEye className="fa fa-eye fa-lg"></PwEye>
                    </div>
                    <MyLabelAb>{comment.password}</MyLabelAb>
                    </MyLabel>
                    <MyLabel> 비밀번호 확인 <span style={{color:"red"}}>{star.password2}</span>
                    <MyInput type={passwordType[1].type} id="password2"  autoComplete="off" placeholder="비밀번호를 한번 더 입력해주세요."
                    onChange={(e)=>{changeMemInfo(e); validate('password2', e.target.value)}}/>
                    <div id="password2" onClick={(e)=> {passwordView(e)}} style={{color: `${passwordType[1].visible?"gray":"lightgray"}`}}>
                        <PwEye className="fa fa-eye fa-lg"></PwEye>
                    </div>
                    <MyLabelAb>{comment.password2}</MyLabelAb>
                    </MyLabel> 
                    { update&&
                    <MyButton type="button" style={{width:"275px", height:"48px"}} onClick={()=>{pwdUpdate()}}>비밀번호 변경</MyButton>
                    }         
                </div>
    
                <div style={{padding: '30px 30px 0px 30px'}}>
                    <MyLabel> 이름 <span style={{color:"red"}}>{star.name}</span>
                    <MyInput type="text" id="name" defaultValue={memInfo.name} placeholder="이름을 입력해주세요." 
                    onChange={(e)=>{changeMemInfo(e); validate('name', e);}}/>
                    <MyLabelAb>{comment.name}</MyLabelAb>
                    </MyLabel>
                    <MyLabel> 전화번호 <span style={{color:"red"}}>{star.hp}</span>
                    <MyInput type="text" id="hp" defaultValue={memInfo.hp} placeholder="전화번호를 입력해주세요." 
                    onChange={(e)=>{changeMemInfo(e); validate('hp', e);}} />
                    <MyLabelAb>{comment.hp}</MyLabelAb>
                    </MyLabel>
    
                    <MyLabel> 생년월일 <span style={{color:"red"}}>{star.birthday}</span>
                    <MyInput type="text" id="birthday" defaultValue={memInfo.birthday} placeholder="생년월일을 입력해주세요." 
                    onChange={(e)=>{changeMemInfo(e); validate('birthday', e);}}/>
                    <MyLabelAb>{comment.birthday}</MyLabelAb>
                    </MyLabel>
                    <div style={{display: 'flex'}}>
                    <MyLabel> 주소
                        <MyInput type="text" id="post"  readOnly placeholder="주소검색을 해주세요."/>
                    </MyLabel>
                    <MyButton type="button" onClick={()=>{openZipcode()}}>주소검색</MyButton>
                    </div>
                    <MyLabel> 상세주소
                    <MyInput type="text" id="postDetail" defaultValue={post.postDetail} readOnly={post.post?false:true}
                    onChange={(e)=>{setPost({...post, postDetail : e.target.value})}}/>
                    </MyLabel>
                </div>
                </div>
                <MyLabel style={{margin:0}}> 성별
                <div style={{marginTop:10}} key={`inline-radio`} className="mb-3">
                    {Checkbox}
                </div>
                </MyLabel>
                <SubmitButton type="button" disabled={submitBtn.disabled} style={{backgroundColor:submitBtn.bgColor }}
                onClick={()=>{if(update){signUpdate()}else{signup()}}} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
                    {update?'수정하기':'가입하기'}
                </SubmitButton>
                { update&&
                <>
                    <Form.Check type={'checkbox'} id={'checkbox'} name={'checkbox'} style={{margin:'5px'}}
                    label={`정말로 탈퇴하시겠나요?`} onChange={()=>{setReSignCheck(!reSignCheck)}}/>
                    <WarningButton type="button" onClick={()=>{reSignAuth()}}>
                    계정탈퇴
                    </WarningButton>
                </>
                }  
            </SignupForm>
            </div>
        </div>
        );
}

export default Signup
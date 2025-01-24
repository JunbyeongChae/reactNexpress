import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"

class AuthLogic {
    //생성자 함수 선언하기 - 초기화
    constructor(){
        this.auth = getAuth()
        this.googleProvider = new GoogleAuthProvider()
    }
    getUserAuth = () => {
        return this.auth
    }
    //구글인증제공자 정보 반환받기 -getter함수
    getGoogleAuthProvider = () => {
        return this.googleProvider
    }
}//end of AuthLogic

export default AuthLogic
//로그인 화면에서 호출할 함수 구현
//구글 로그인 버튼 클릭시 호출되는 함수로 파라미터인 auth와 googleProvider는 
//props로 받지 않고 리덕스 활용해서 직접 받아낸다.
//자바스크립트는 기본적으로 동기적 처리를 한다. 외부에 클라우드 서비스를 활용하면
//필연적으로 지연이 발생할 것이고 이것을 효율적으로 처리하는 방법은 기다림동안
//다른 업무를 처리할 수 있도록 코딩을 전개하는 것이다.
//표준에서 제공되는 protype Promise사용하여 성공시 resolve콜백호출이
//실패시에는 reject콜백호출이 일어난다.
export const loginGoogle = (auth, googleProvider) => {
    return new Promise((resolve, reject)=>{
        signInWithPopup(auth, googleProvider)
        .then(result => {
            const user = result.user //user가 라벨값임
            console.log(user)
            localStorage.setItem('uid', user.uid)
            localStorage.setItem('email', user.email)
            resolve(user)
        })
        .catch(e => reject(e))
    })
}//end of 구글 로그인 - 로그인 화면에 구글 로그인 추가

export const onAuthChange = (auth) => {
    return new Promise(resovle => {
        //firebase 웹로그인에서 제공하는 API이다. - 현재 네가 열은 크롬에 로그인이되어 있어? 체크
        //uid있음. ->회원가입 유도 함.
        //그럼 네 이메일로 오라클 서버에  가서 member250120테이블에서 이메일이 존재하는지를 체크할께
        auth.onAuthStateChanged(user => {
            resovle(user)
        })
    })
}

export const logout = (auth) => {
    return new Promise((resolve, reject) => {
        auth.signOut().catch((e) => reject(alert(e+": 로그아웃 오류입니다.")))
        //insert here - localStorage에 있는 모든 값 삭제하기
        localStorage.removeItem("email")
        localStorage.removeItem("nickname")
        localStorage.removeItem("uid")
        localStorage.removeItem("auth")
        localStorage.removeItem("no")
        localStorage.removeItem("status")
        resolve()
    })
}
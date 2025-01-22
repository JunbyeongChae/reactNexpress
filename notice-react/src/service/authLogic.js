import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

class AuthLogic {
  //생성자 함수 선언하기 - 초기화
  constructor() {
    this.auth = getAuth();
    this.googleProvider = new GoogleAuthProvider();
  }
  getUserAuth = () => {
    return this.auth;
  };
  //구글인증제공자 정보 반환받기 -getter함수
  getGoogleAuthProvider = () => {
    return this.googleProvider;
  };
} //end of AuthLogic

export default AuthLogic;
//로그인 화면에서 호출할 함수 구현
//구글 로그인 버튼 클릭시 호출되는 함수로 파라미터인 auth와 googleProvider는
//props로 받지 않고 리덕스 활용해서 직접 받아낸다.
//자바스크립트는 기본적으로 동기적 처리를 한다. 외부에 클라우드 서비스를 활용하면
//필연적으로 지연이 발생할 것이고 이것을 효율적으로 처리하는 방법은 기다림동안
//다른 업무를 처리할 수 있도록 코딩을 전개하는 것이다.
//표준에서 제공되는 protype Promise사용하여 성공시 resolve콜백호출이
//실패시에는 reject콜백호출이 일어난다.
export const loginGoogle = (auth, googleProvider) => {
  return new Promise((resolve, reject) => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user; //user가 라벨값임
        console.log(user);
        resolve(user);
      })
      .catch((e) => reject(e));
  });
}; //end of 구글 로그인 - 로그인 화면에 구글 로그인 추가

export const onAuthChange = (auth) => {
  return new Promise((resovle) => {
    auth.onAuthStateChanged((user) => {
      resovle(user);
    });
  });
};

export const logout = (auth) => {
  return new Promise((resolve, reject) => {
    auth.signOut().catch((e) => reject(alert(e + "logout error")));
    localStorage.removeItem("email");
    localStorage.removeItem("nickname");
    localStorage.removeItem("uid");
    localStorage.removeItem("auth");
    localStorage.removeItem("no");
    localStorage.removeItem("status");
    resolve();
  });
};

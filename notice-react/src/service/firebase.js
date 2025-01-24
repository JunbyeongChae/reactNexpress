import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FS_APIKEY,
  authDomain: process.env.REACT_APP_FS_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_FS_DATABASEURL,
  projectId: process.env.REACT_APP_FS_PROJECTID,
  storageBucket: process.env.REACT_APP_FS_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FS_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FS_APPID
};
// Initialize Firebase - 파이어베이스 플젝을 활용하여 웹서비스를 제공받기 위한 초기화 작업임
//앞에 export를 붙여야 외부에서 사용이 가능하다(ES6 모듈)
//<script type=module></script>
export const app = initializeApp(firebaseConfig); //초기화 - 인증 - 서버측 요청 - 응답(토큰값쥔다)
export const database = getDatabase(app);
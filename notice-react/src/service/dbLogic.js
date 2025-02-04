import axios from "axios";

//회원가입 구현 - 소설로그인한 경우, 일반회원, 코치회원
//비번이 포함되어 있어서 post방식

export const memberInsertDB = (datas) => {
    //파라미터로 넘어온 사용자가 입력한 값 확인하기
    console.log(datas) //postman 테스트할 때 body>raw>{} Object
    //함수의 리턴타입으로 함수를 쓸 수 있다. - 고차함수
    //리액트에서 회원가입 버튼을 클릭하면 이 함수가 호출됨.
    //백엔드 스프링부트(8000번)의 URL이름을 호출한다.
    //3000번에서 8000번으로 요청이 일어난다. - CORS
    //2개의 다른 서버를 활용하므로 지연이 발생함. - 비동기로 처리한다.
    //insert하는 동안 시간이 걸림 - waiting(자바스레드)- 
    //클라이언트에서는 주기적으로 서버에 확인한다. - 준비됐어.(0)
    //요청을 했어(전송했어-1- send{get,post, put,delete})- 처리중이야- 2
    //처리해서 업로드 중이야(3) - 도착했어(4)
    //4가지 상태를 파악하고 추적해서 4번일 때 함수를 호출해줘(함수 호출을 약속할께 -callback- 자동)
    //내가 호출하는 것이 아니다. 콜백함수는 개발자 호출하는게 아니야 -> 시스템이 -> 
    //0->1->2->3->4 - intercept(관여한다.)
    return new Promise((resolve, reject) => {//resolve와reject콜백함수이다.
        try {
            const res = axios({
                method: 'post',
                url: process.env.REACT_APP_SPRING_IP+'member/memberInsert',
                data: datas,
            })
            resolve(res)
        } catch (error) {
            //에러 발생
            reject(error)            
        }
    })
}//end of memberInsert - 회원가입(커밋과 롤백 : 환경설정-일괄처리)

//소셜 로그인한 경우 우리 회원테이블에 등록되어있는지 유무 체크
export const memberListDB = (params) => {
    console.log(params)//{MEM_UID:user.uid, type:'auth'}
    return new Promise((resolve, reject)=> {
        try {
            const response = axios({
                method: 'get',
                url: process.env.REACT_APP_SPRING_IP+'member/memberList',
                params: params
            })            
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}//end of memberListDB

//QuillEditor에서 이미지 선택시 express서버에 업로드 처리 요청하기
export const uploadImageDB = (file) => {
    //사용자가 입력한 값 출력하기
    console.log(file.name)
    return new Promise((resolve, reject) => {
        try{
            const response = axios({
                method: "post",
                url: process.env.REACT_APP_EXPRESS_IP+"users/board/imageUpload",
                headers: {
                    "Content-Type":"multipart/form-data"
                },
                data: file
            })
            resolve(response)
        }catch(error){
            reject(error)
        }
    })
}//end of noticeInsertDB

//게시글 목록 가져오기 구현
export  const boardListDB = (params) => {
    //파라미터 값을 출력해 보기 - SELECT * FROM notice WHERE n_content like '%'||?||'%'
    console.log(params)
    return new Promise((resolve, reject) => {
        try{
            const response = axios({
                method: "get",
                url: process.env.REACT_APP_EXPRESS_IP + "users/board/list",
                params: params,
            });
            resolve(response) //성공했을 때
        }catch(error){
            reject(error);//실패했을 때
        }//end of try..catch
    });
}//end of boardListDB

//게시글 쓰기구현
export const  boardInsertDB = (board) => {
    //사용자가 입력한 값 출력하기
    console.log(board)
    return new Promise((resolve, reject) => {
        try{
            const response = axios({
                method: "post",
                url: process.env.REACT_APP_EXPRESS_IP+"users/board/insert",
                headers: {
                    "Content-Type":"application/json"
                },
                data: board
            })
            resolve(response)
        }catch(error){
            reject(error)
        }
    })
}//end of boardInsertDB

export  const boardDetailDB = (b_no) => {
    //파라미터 값을 출력해 보기 - SELECT * FROM react_board WHERE b_no=?
    console.log(b_no) //목록에서 제목을 클릭했을 때 그 row의 n_no를 가져온다.
    return new Promise((resolve, reject) => {
        try{
            const response = axios({
                method: "get",
                url: process.env.REACT_APP_EXPRESS_IP + "users/board/detail/"+b_no,
            });
            resolve(response) //성공했을 때
        }catch(error){
            reject(error);//실패했을 때
        }//end of try..catch
    });
}//end of boardListDB

//게시글 수정하기
export const boardUpdateDB = (board) => {
    //사용자가 입력한 값 출력하기
    console.log(board)
    return new Promise((resolve, reject) => {
        try{
            const response = axios({
                method: "put",
                url: process.env.REACT_APP_EXPRESS_IP+"users/board/update/"+board.b_no,
                headers: {
                    "Content-Type":"application/json"
                },
                data: board //get방식 : params
            })
            resolve(response)
        }catch(error){
            reject(error)
        }
    })
}//end of boardUpdateDB

//게시글 삭제하기
//공지글 삭제
export  const boardDeleteDB = (b_no) => {
    //파라미터 값을 출력해 보기 - DELETE FROM notice WHERE n_no=?
    console.log(b_no) //목록에서 제목을 클릭했을 때 그 row의 n_no를 가져온다.
    return new Promise((resolve, reject) => {
        try{
            const response = axios({
                method: "delete",
                url: process.env.REACT_APP_EXPRESS_IP + "users/board/delete/"+b_no,
            });
            resolve(response) //성공했을 때
        }catch(error){
            reject(error);//실패했을 때
        }//end of try..catch
    });
}//end of noticeListDB


export  const noticeListDB = (params) => {
    //파라미터 값을 출력해 보기 - SELECT * FROM notice WHERE n_content like '%'||?||'%'
    console.log(params)
    return new Promise((resolve, reject) => {
        try{
            const response = axios({
                method: "get",
                url: process.env.REACT_APP_EXPRESS_IP + "users/notice/list",
                params: params,
            });
            resolve(response) //성공했을 때
        }catch(error){
            reject(error);//실패했을 때
        }//end of try..catch
    });
}//end of noticeListDB


export  const noticeDetailDB = (n_no) => {
    //파라미터 값을 출력해 보기 - SELECT * FROM notice WHERE n_no=?
    console.log(n_no) //목록에서 제목을 클릭했을 때 그 row의 n_no를 가져온다.
    return new Promise((resolve, reject) => {
        try{
            const response = axios({
                method: "get",
                url: process.env.REACT_APP_EXPRESS_IP + "users/notice/detail/"+n_no,
            });
            resolve(response) //성공했을 때
        }catch(error){
            reject(error);//실패했을 때
        }//end of try..catch
    });
}//end of noticeListDB

// const [notice, setNotice] = useState({})
//훅(HOOK) - 클래스 중심의 코드전개에서 this에 대한 헷갈림, 구분을 잘 못함.
export const noticeInsertDB = (notice) => {
    //사용자가 입력한 값 출력하기
    console.log(notice)
    return new Promise((resolve, reject) => {
        try{
            const response = axios({
                method: "post",
                url: process.env.REACT_APP_EXPRESS_IP+"users/notice/insert",
                headers: {
                    "Content-Type":"application/json"
                },
                data: notice
            })
            resolve(response)
        }catch(error){
            reject(error)
        }
    })
}//end of noticeInsertDB
//REST API -> get(조회), post(입력), put(수정), delete(삭제)
//useState({n_no:1, n_title:제목, n_writer:작성자, n_content:내용})
export const noticeUpdateDB = (notice) => {
    //사용자가 입력한 값 출력하기
    console.log(notice)
    return new Promise((resolve, reject) => {
        try{
            const response = axios({
                method: "put",
                url: process.env.REACT_APP_EXPRESS_IP+"users/notice/update/"+notice.n_no,
                headers: {
                    "Content-Type":"application/json"
                },
                data: notice //get방식 : params
            })
            resolve(response)
        }catch(error){
            reject(error)
        }
    })
}//end of noticeInsertDB

//공지글 삭제
export  const noticeDeleteDB = (n_no) => {
    //파라미터 값을 출력해 보기 - DELETE FROM notice WHERE n_no=?
    console.log(n_no) //목록에서 제목을 클릭했을 때 그 row의 n_no를 가져온다.
    return new Promise((resolve, reject) => {
        try{
            const response = axios({
                method: "delete",
                url: process.env.REACT_APP_EXPRESS_IP + "users/notice/delete/"+n_no,
            });
            resolve(response) //성공했을 때
        }catch(error){
            reject(error);//실패했을 때
        }//end of try..catch
    });
}//end of noticeListDB
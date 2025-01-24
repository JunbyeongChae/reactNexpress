export const toastStatus = {
    status: false,//false이면 메시지가 출력이 안됨. true일때 메시지 출력됨
    msg: '', //외부에 페이지마다 출력될 메세지가 다르다. - 정할 수 없다.- ''
    session_email:'',
}
//FLUX아키텍쳐에 의하면 화면에서 새로운 요청이 있을 때
//dispatch를 통해서 상태변화를 요청하는 함수를 호출하면
//state선언된 초기값들이 변한다.
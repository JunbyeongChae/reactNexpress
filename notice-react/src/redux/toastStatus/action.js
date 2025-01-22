export const SET_MSG = "TOAST_STATUS/SET_MSG";
export const SET_FALSE = "TOAST_STATUS/SET_FALSE";

export function setToastMsg(msg) {
  return {
    type: SET_MSG, //시그널
    msg: msg, //문자열 메시지값 담기
    bool: true, //디폴트값이 false로 있다가 true변경되면 화면 토스트 메시지 출력
  };
}

export function setToastFalse() {
  return {
    type: SET_FALSE,
    msg: "",
    bool: false, //메시지가 나가는 상태값을 변경해줌 - 토스 메시지 출력안됨
  };
}

import { toastStatus } from "./state";
import { SET_MSG, SET_FALSE } from './action'
//감속기에서는 각 콤포넌트(함수-대문자로쓴)마다 사용하고자 하는 상태값이 다르다.
//상태값은 사용자가 선택하는 정보를 전달받아서 처리함
//파라미터 자리는 사용자가 입력한 값이나 선택한 정보를 받는 자리
//그 시그널을 받아서
export default function toastInfo(state = toastStatus, action) {

  switch (action.type) {
    case SET_MSG:
      return {
        ...state,
        status: action.bool,
        msg: action.msg,
      };
      case SET_FALSE:
        return {
          ...state,
          status: action.bool,
          msg: action.msg,
        };
    default: 
      return state;
  }
  
}
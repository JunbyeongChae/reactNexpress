import { toastStatus } from "./state";
import { SET_MSG, SET_FALSE } from './action'

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
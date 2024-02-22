import { LOGIN,LOGOUT } from "../actions/loginActions";

const initialState = false;

export default function authReducer(state = initialState, action) {
  switch(action.type){
    case LOGIN:
      return true;
    case LOGOUT:
      return false;
    default:
      return state;
  }
}
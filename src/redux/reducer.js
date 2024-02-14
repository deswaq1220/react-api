import { OPEN_LOGIN_MODAL,CLOSE_LOGIN_MODAL } from "../actions/actions";

const initialState = {
  isLoginOpen: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_LOGIN_MODAL:
      return { ...state, isLoginOpen: true };
    case CLOSE_LOGIN_MODAL:
      return { ...state, isLoginOpen: false };
    default:
      return state;
  }
}
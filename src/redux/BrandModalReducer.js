import { OPEN_BRAND_MODAL,CLOSE_BRAND_MODAL } from "../actions/BrandModalActions";
const initialState = {
  isModalOpen: false,
};

export default function BrandModalReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_BRAND_MODAL:
      return { ...state, isModalOpen: true };
    case CLOSE_BRAND_MODAL:
      return { ...state, isModalOpen: false };
    default:
      return state;
  }
}
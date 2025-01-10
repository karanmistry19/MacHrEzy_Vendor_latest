import { addError } from "../actions/toast.action";

const initialState = { visible: false };
const modalManage = (state = initialState, action) => {
  switch (action.type) {
    case "MODAL_OPEN": {
      return { visible: true };
    }
    case "CREATE_TOUR_TXN_SUCCESS":
    case "CREATE_OD_TXN_SUCCESS": {
      return { visible: false, transaction: true };
    }
    case "MODAL_CLOSE": {
      return { visible: false };
    }
    case "LOGOUT": {
      return { visible: false };
    }

    default: {
      return state;
    }
  }
};

export default modalManage;

import { addError } from "../actions/toast.action";
const initialState = [];
const tourTxnUser = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USER_TOUR_TXN_SUCCESS": {
      return action.payload.data;
    }
    case "FETCH_USER_TOUR_TXN_FAIL": {
      action.asyncDispatch(
        addError(action.error?.response?.data?.message, 3000),
      );
      return state;
    }

    case "REMOVE_TOUR_TXN":
    case "LOGOUT": {
      return [];
    }
    case "DELETE_TOUR_TXN_SUCCESS":
    case "CREATE_TOUR_TXN_SUCCESS": {
      if (action.meta.previousAction.payload.request.data.behalf) {
        return state;
      } else {
        return action.payload.data;
      }
    }

    default: {
      return state;
    }
  }
};

export default tourTxnUser;

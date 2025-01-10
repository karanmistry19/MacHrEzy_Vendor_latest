import { addError } from "../actions/toast.action";
const initialState = [];
const odTxnUser = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_OD_TXN_USER_SUCCESS": {
      return action.payload.data;
    }
    case "FETCH_OD_TXN_USER_FAIL": {
      action.asyncDispatch(
        addError(action.error?.response?.data?.message, 3000),
      );
      return state;
    }
    case "DELETE_OD_TXN_SUCCESS":
    case "CREATE_OD_TXN_SUCCESS": {
      if (action.meta.previousAction.payload.request.data.behalf) {
        return state;
      } else {
        return action.payload.data;
      }
    }

    case "REMOVE_OD_DATA":
    case "LOGOUT": {
      return [];
    }

    default: {
      return state;
    }
  }
};

export default odTxnUser;

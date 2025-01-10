import { addError } from "../actions/toast.action";
const initialState = null;
const selectedODTransaction = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_SELECTED_OD_APPLICATION_SUCCESS": {
      return action.payload.data;
    }

    case "FETCH_SELECTED_OD_APPLICATION_FAIL": {
      action.asyncDispatch(
        addError(action.error?.response?.data?.message, 3000),
      );
      return state;
    }

    case "SET_SELECTED_OD_TRANSACTION": {
      return null;
    }

    case "LOGOUT": {
      return null;
    }

    default: {
      return state;
    }
  }
};

export default selectedODTransaction;

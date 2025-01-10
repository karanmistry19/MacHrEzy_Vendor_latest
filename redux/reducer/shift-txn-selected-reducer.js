import { addError } from "../actions/toast.action";
const initialState = null;
const selectedShiftTxn = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_SELECTED_SHIFT_TXN_SUCCESS": {
      return action.payload.data;
    }

    case "FETCH_SELECTED_SHIFT_TXN_FAIL": {
      action.asyncDispatch(
        addError(action.error?.response?.data?.message, 3000),
      );
      return state;
    }

    case "REMOVE_SELECTED_SHIFT_TXN": {
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

export default selectedShiftTxn;

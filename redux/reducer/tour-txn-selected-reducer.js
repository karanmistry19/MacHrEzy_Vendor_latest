import { addError } from "../actions/toast.action";
const initialState = null;
const selectedTourTxn = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_SELECTED_TOUR_TXN_SUCCESS": {
      return action.payload.data;
    }

    case "FETCH_SELECTED_TOUR_TXN_FAIL": {
      action.asyncDispatch(
        addError(action.error?.response?.data?.message, 3000),
      );
      return state;
    }

    case "REMOVE_SELECTED_TOUR_TXN": {
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

export default selectedTourTxn;

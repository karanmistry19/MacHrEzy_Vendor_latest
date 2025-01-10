import { addError } from "../actions/toast.action";
const initialState = [];
const selectedCompOffTxnTabDetails = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_COMP_OFF_TXN_TAB_DETAILS_SUCCESS": {
      return action.payload.data;
    }

    case "FETCH_COMP_OFF_TXN_TAB_DETAILS_FAIL": {
      action.asyncDispatch(
        addError(action.error?.response?.data?.message, 3000),
      );
      return state;
    }

    case "REMOVE_SELECTED_COMP_OFF_TXN_TABS": {
      return [];
    }

    case "LOGOUT": {
      return [];
    }

    default: {
      return state;
    }
  }
};

export default selectedCompOffTxnTabDetails;

import { addError } from "../actions/toast.action";
const initialState = [];
const selectedODTransactionTabDetails = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_OD_TAB_DETAILS_APPLICATIONS_SUCCESS": {
      return action.payload.data;
    }

    case "FETCH_OD_TAB_DETAILS_APPLICATIONS_FAIL": {
      action.asyncDispatch(
        addError(action.error?.response?.data?.message, 3000),
      );
      return state;
    }

    case "SET_SELECTED_OD_TRANSACTION_TABS": {
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

export default selectedODTransactionTabDetails;

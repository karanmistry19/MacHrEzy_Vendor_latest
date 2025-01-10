import { addError } from "../actions/toast.action";

const initialState = [];
const dwrAll = (state = initialState, action) => {
  switch (action.type) {
    case "DWR_APPLICATION_CREATE_TRANSACTION_SCREEN_SUCCESS":
    case "DWR_ALL_DETAILS_SUCCESS": {
      return action.payload.data;
    }
    case "DWR_APPLICATION_CREATE_TRANSACTION_SCREEN_FAIL":
    case "DWR_ALL_DETAILS_FAIL": {
      action.asyncDispatch(
        addError(action.error?.response?.data?.message, 3000),
      );
      return state;
    }
    case "LOGOUT": {
      return [];
    }

    default: {
      return state;
    }
  }
};

export default dwrAll;

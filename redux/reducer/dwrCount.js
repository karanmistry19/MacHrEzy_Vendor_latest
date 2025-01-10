import { addError } from "../actions/toast.action";

const initialState = {};
const dwrCount = (state = initialState, action) => {
  switch (action.type) {
    case "DWR_COUNT_DETAILS_SUCCESS": {
      return action.payload.data;
    }
    case "DWR_COUNT_DETAILS_FAIL": {
      action.asyncDispatch(
        addError(action.error?.response?.data?.message, 3000),
      );
      return state;
    }
    case "LOGOUT": {
      return {};
    }

    default: {
      return state;
    }
  }
};

export default dwrCount;

import { addError } from "../actions/toast.action";
const initialState = [];
const pendingTransactionCount = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_MY_PENDING_COUNT_SUCCESS": {
      return action.payload.data;
    }
    case "FETCH_MY_PENDING_COUNT_FAIL": {
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

export default pendingTransactionCount;

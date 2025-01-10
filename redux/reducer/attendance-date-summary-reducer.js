import { addError } from "../actions/toast.action";
const initialState = [];
const attendanceDateSummary = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_DATE_SUMMARY_SUCCESS": {
      return action.payload.data;
    }
    case "FETCH_DATE_SUMMARY_FAIL": {
      action.asyncDispatch(
        addError(action.error?.response?.data?.message, 3000),
      );
      return state;
    }

    case "REMOVE_DATE_SUMMARY_DATA":
    case "LOGOUT": {
      return [];
    }

    default: {
      return state;
    }
  }
};

export default attendanceDateSummary;

import { addError } from "../actions/toast.action";

const initialState = [];
const bdayOfCrrntMonths = (state = initialState, action) => {
  switch (action.type) {
    case "BDAY_CRRNT_MONTH_SUCCESS": {
      return action.payload.data;
    }
    case "BDAY_CRRNT_MONTH_FAIL": {
      action.asyncDispatch(
        addError(action.error?.response?.data?.message, 3000),
      );
      return state;
    }
    case "LOGOUT": {
      return null;
    }

    default: {
      return state;
    }
  }
};

export default bdayOfCrrntMonths;

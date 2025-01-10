import { addError } from "../actions/toast.action";

const initialState = [];
const dwrApplicationDetail = (state = initialState, action) => {
  switch (action.type) {
    case "DWR_APPLICATION_DETAILS_SUCCESS": {
      return action.payload.data;
    }
    case "DWR_APPLICATION_DETAILS_FAIL": {
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

export default dwrApplicationDetail;

import { addError } from "../actions/toast.action";
const initialState = [];
const allODApplications = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ALL_OD_APPLICATIONS_SUCCESS": {
      return action.payload.data;
    }
    case "FETCH_ALL_OD_APPLICATIONS_FAIL": {
      action.asyncDispatch(
        addError(action.error?.response?.data?.message, 3000),
      );
      return state;
    }

    case "REMOVE_OD_DATA":
    case "LOGOUT": {
      return [];
    }

    default: {
      return state;
    }
  }
};

export default allODApplications;

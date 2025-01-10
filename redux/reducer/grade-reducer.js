import { addError } from "../actions/toast.action";
const initialState = [];
const grades = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_GRADES_SUCCESS": {
      return action.payload.data;
    }
    case "FETCH_GRADES_FAIL": {
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

export default grades;

import { addError } from "../actions/toast.action";

const initialState = [];
const newJoiner = (state = initialState, action) => {
  switch (action.type) {
    case "NEW_JOIN_SUCCESS": {
      return action.payload.data;
    }
    case "NEW_JOIN_FAIL": {
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

export default newJoiner;

import { addError } from "../actions/toast.action";

const initialState = [];
const eisPersonal = (state = initialState, action) => {
  switch (action.type) {
    case "EIS_PERSONAL_SUCCESS": {
      return action.payload.data;
    }
    case "EIS_PERSONAL_FAIL": {
      action.asyncDispatch(
        addError(action.error?.response?.data?.message, 3000),
      );
      return state;
    }
    case "REMOVE_EIS_DATA":
    case "LOGOUT": {
      return [];
    }

    default: {
      return state;
    }
  }
};

export default eisPersonal;

import { addError } from "../actions/toast.action";

const initialState = [];
const eisAssets = (state = initialState, action) => {
  switch (action.type) {
    case "EIS_ASSETS_SUCCESS": {
      return action.payload.data;
    }
    case "EIS_ASSETS_FAIL": {
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

export default eisAssets;

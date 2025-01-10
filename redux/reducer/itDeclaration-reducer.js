import { addError } from "../actions/toast.action";
const initialState = [];
const itDeclaration = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_IT_DECLARATION_SUCCESS": {
      return action.payload.data;
    }
    case "SAVE_IT_DECLARATION_FAIL":
    case "FETCH_IT_DECLARATION_FAIL": {
      action.asyncDispatch(
        addError(action.error?.response?.data?.message, 3000),
      );
      return state;
    }

    case "REMOVE_IT_DECLARATION":
    case "LOGOUT": {
      return [];
    }
    default: {
      return state;
    }
  }
};
export default itDeclaration;

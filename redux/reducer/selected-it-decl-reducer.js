import { addError } from "../actions/toast.action";
const initialState = {};
const selectedITDeclaration = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SELECTED_IT_DECLARATION": {
      return action.payload.data;
    }

    case "REMOVE_SELECTED_IT_DECLARATION": {
      return {};
    }

    case "LOGOUT": {
      return {};
    }

    default: {
      return state;
    }
  }
};

export default selectedITDeclaration;

const initialState = [];
const filterParams = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FILTER_PARAMS": {
      return action.payload.data;
    }

    case "ADD_LAST_SCREEN": {
      return { ...state, lastScreen: "details" };
    }

    case "REMOVE_FILTER_PARAMS":
    case "LOGOUT": {
      return {};
    }

    default: {
      return state;
    }
  }
};

export default filterParams;

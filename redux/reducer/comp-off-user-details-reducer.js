const initialState = {
  compOffList: [],
};
const compOffUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USER_COMP_OFF_DETAIL_SUCCESS": {
      return { ...state, compOffList: action.payload.data };
    }

    case "REMOVE_COMP_OFF_TXN":
    case "LOGOUT": {
      return { ...state };
    }

    default: {
      return state;
    }
  }
};

export default compOffUserReducer;

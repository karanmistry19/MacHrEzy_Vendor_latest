const initialState = [];

const messages = (state = initialState, action) => {
  switch (action.type) {
    case "SEND_MESSAGE": {
      return [...state, action.payload.data];
    }

    case "LOGOUT": {
      return null;
    }

    default: {
      return state;
    }
  }
};

export default messages;

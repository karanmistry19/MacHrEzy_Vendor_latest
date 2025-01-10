import { fetchNotifications } from "../actions/notifications.action";

const initialState = {};
const token = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS": {
      action.asyncDispatch({
        type: "SET_DEVICE_TOKEN",
        payload: {
          user: action.payload.data._id,
        },
      });
      setTimeout(() => action.asyncDispatch(fetchNotifications()), 4000);
      return action.payload.data.token;
    }
    case "LOGOUT": {
      return null;
    }

    default: {
      return state;
    }
  }
};

export default token;

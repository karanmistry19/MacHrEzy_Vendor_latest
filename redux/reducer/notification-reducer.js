import { addError, addInfo } from "../actions/toast.action";

const initialState = [];
const notifications = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_NOTIFICATION": {
      return [...state, action.payload.data];
    }

    case "REMOVE_NOTIFICATION": {
      return [
        ...state.filter(
          (x) =>
            x.data._id != action.payload.data._id &&
            x.notification.title != action.payload.data.title,
        ),
      ];
    }
    case "CLEAR_NOTIFICATIONS": {
      return [...state.filter((x) => x?.data !== action.payload.data)];
    }

    case "SEEN_ALL_NOTIFICATION_SUCCESS":
    case "FETCH_NOTIFICATIONS_SUCCESS": {
      return action.payload.data;
    }

    case "SEND_NOTIFICATION_SUCCESS": {
      action.asyncDispatch(addInfo(action.payload.data?.message, 3000));
      return state;
    }

    case "MARK_AS_READ_SUCCESS": {
      let temp = state.findIndex((x) => x._id === action.payload.data._id);
      return [...state.map((x, i) => (i === temp ? action.payload.data : x))];
    }

    case "CLEAR_NOTIFICATION_FAIL":
    case "SEND_NOTIFICATION_FAIL":
    case "FETCH_NOTIFICATIONS_FAIL": {
      action.asyncDispatch(
        addError(action.error?.response?.data?.message, 3000),
      );
      return state;
    }

    case "CLEAR_NOTIFICATION_SUCCESS":
    case "LOGOUT": {
      return [];
    }

    default: {
      return state;
    }
  }
};

export default notifications;

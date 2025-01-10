import { addError, addInfo } from "../actions/toast.action";
const initialState = null;

const user = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS": {
      return action.payload.data;
    }
    case "LOGIN_FAIL": {
      action.asyncDispatch({
        type: "REMOVE_DEVICE_TOKEN",
        payload: {
          userId: state?.id,
        },
      });
      action.asyncDispatch(
        addError(action.error.response?.data?.message, 3000),
      );

      return null;
    }

    case "UPDATE_PASSWORD_SUCCESS": {
      action.asyncDispatch(addInfo(action.payload.data?.message, 3000));
      return state;
    }

    case "UPDATE_PASSWORD_FAIL": {
      action.asyncDispatch(
        addError(action.error.response?.data?.message, 3000),
      );

      return state;
    }
    case "LOGOUT": {
      action.asyncDispatch({
        type: "REMOVE_DEVICE_TOKEN",
        payload: {
          user: state._id,
        },
      });
      return null;
    }

    default: {
      return state;
    }
  }
};

export default user;

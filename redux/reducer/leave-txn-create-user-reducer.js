import { addError, addSuccess } from "../actions/toast.action";
const initialState = [];
const leaveTxnCreateUser = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_LEAVE_SUCCESS": {
      action.asyncDispatch(addSuccess("Leave Applied Successfully", 3000));
      return { success: true };
    }
    case "CREATE_LEAVE_FAIL": {
      action.asyncDispatch(
        addError(action.error?.response?.data?.message, 3000)
      );
      return { success: false };
    }

    case "REMOVE_LEAVE_DATA":
    case "LOGOUT": {
      return [];
    }

    default: {
      return state;
    }
  }
};

export default leaveTxnCreateUser;

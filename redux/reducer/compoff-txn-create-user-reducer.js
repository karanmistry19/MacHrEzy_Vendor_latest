import { addError, addSuccess } from "../actions/toast.action";
const initialState = [];
const CompOffTxnCreateUser = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_COMPOFF_TXN_SUCCESS": {
      action.asyncDispatch(addSuccess(action.payload?.data?.message, 3000));
      return { success: true };
    }
    case "CREATE_COMPOFF_TXN_FAIL": {
      action.asyncDispatch(
        addError(action.error?.response?.data?.message, 3000)
      );
      return { success: false };
    }

    case "RESET_DATA":
      return { success: false };

    case "LOGOUT": {
      return [];
    }

    default: {
      return state;
    }
  }
};

export default CompOffTxnCreateUser;

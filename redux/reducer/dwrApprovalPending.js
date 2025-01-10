import { addError } from "../actions/toast.action";

const initialState = [];
const dwrApprovalPendingList = (state = initialState, action) => {
  switch (action.type) {
    case "DWR_APPLICATION_APPROVE_SUCCESS":
    case "DWR_APPLICATION_REJECT_SUCCESS":
    case "DWR_APPROVAL_PENDING_SUCCESS": {
      return action.payload.data;
    }
    case "DWR_APPLICATION_APPROVE_FAIL":
    case "DWR_APPLICATION_REJECT_FAIL":
    case "DWR_APPROVAL_PENDING_FAIL": {
      action.asyncDispatch(
        addError(action.error?.response?.data?.message, 3000),
      );
      return state;
    }

    case "LOGOUT": {
      return [];
    }

    default: {
      return state;
    }
  }
};

export default dwrApprovalPendingList;

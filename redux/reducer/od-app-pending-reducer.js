import { addError } from "../actions/toast.action";
import { findMyPendingTransactionCount } from "../actions/transaction.action";
const initialState = [];
const pendingODApplications = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PENDING_OD_APPLICATIONS_SUCCESS": {
      return action.payload.data;
    }

    case "SANCTION_OD_APPLICATIONS_SUCCESS": {
      // action.asyncDispatch(fetchAllOdApplications());
      action.asyncDispatch(findMyPendingTransactionCount());
      return action.payload.data;
    }

    case "SANCTION_MULTIPLE_OD_APPLICATIONS_SUCCESS": {
      // action.asyncDispatch(fetchAllOdApplications());
      // action.asyncDispatch(fetchPendingOdApplications());
      action.asyncDispatch(findMyPendingTransactionCount());
      return state;
    }

    case "DELETE_OD_TXN_SUCCESS":
    case "CREATE_OD_TXN_SUCCESS": {
      action.asyncDispatch(findMyPendingTransactionCount());
      if (action.meta.previousAction.payload.request.data.behalf) {
        return action.payload.data;
      } else {
        return state;
      }
    }

    case "SANCTION_MULTIPLE_OD_APPLICATIONS_FAIL":
    case "SANCTION_OD_APPLICATIONS_FAIL":
    case "DELETE_OD_TXN_FAIL":
    case "CREATE_OD_TXN_FAIL":
    case "FETCH_PENDING_OD_APPLICATIONS_FAIL": {
      action.asyncDispatch(
        addError(action.error?.response?.data?.message, 3000),
      );
      return state;
    }

    case "REMOVE_OD_DATA":
    case "LOGOUT": {
      return [];
    }

    default: {
      return state;
    }
  }
};

export default pendingODApplications;

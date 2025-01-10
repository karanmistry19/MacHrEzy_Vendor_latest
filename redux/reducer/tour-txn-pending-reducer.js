import { addError } from "../actions/toast.action";
const initialState = [];
import { findMyPendingTransactionCount } from "../actions/transaction.action";

const tourTxnPending = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PENDING_TOUR_TXN_SUCCESS": {
      return action.payload.data;
    }

    case "SANCTION_TOUR_TXN_SUCCESS": {
      // action.asyncDispatch(fetchHistoryTourTxn());
      action.asyncDispatch(findMyPendingTransactionCount());
      return action.payload.data;
    }

    case "SANCTION_MULTIPLE_TOUR_TXN_SUCCESS": {
      // action.asyncDispatch(fetchHistoryTourTxn());
      // action.asyncDispatch(fetchPendingTourTxn());
      action.asyncDispatch(findMyPendingTransactionCount());
      return state;
    }

    case "DELETE_TOUR_TXN_FAIL":
    case "CREATE_TOUR_TXN_FAIL":
    case "SANCTION_MULTIPLE_TOUR_TXN_FAIL":
    case "SANCTION_TOUR_TXN_FAIL":
    case "FETCH_PENDING_TOUR_TXN_FAIL": {
      action.asyncDispatch(
        addError(action.error?.response?.data?.message, 3000),
      );
      return state;
    }

    case "DELETE_TOUR_TXN_SUCCESS":
    case "CREATE_TOUR_TXN_SUCCESS": {
      action.asyncDispatch(findMyPendingTransactionCount());
      if (action.meta.previousAction.payload.request.data.behalf) {
        return action.payload.data;
      } else {
        return state;
      }
    }

    case "REMOVE_TOUR_TXN":
    case "LOGOUT": {
      return [];
    }

    default: {
      return state;
    }
  }
};

export default tourTxnPending;

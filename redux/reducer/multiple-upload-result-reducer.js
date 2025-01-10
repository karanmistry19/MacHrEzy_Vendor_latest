import { addError } from "../actions/toast.action";
const initialState = [];
const multipleUploadResult = (state = initialState, action) => {
  switch (action.type) {
    case "SANCTION_MULTIPLE_TOUR_TXN_SUCCESS":
    case "SANCTION_MULTIPLE_SHIFT_TXN_SUCCESS":
    case "SANCTION_MULTIPLE_LEAVE_TXN_SUCCESS":
    case "SANCTION_MULTIPLE_COMP_OFF_TXN_SUCCESS":
    case "SANCTION_MULTIPLE_ATTENDANCE_TXN_SUCCESS":
    case "SANCTION_MULTIPLE_OD_APPLICATIONS_SUCCESS": {
      return action.payload.data;
    }

    case "SANCTION_MULTIPLE_TOUR_TXN_FAIL":
    case "SANCTION_MULTIPLE_SHIFT_TXN_FAIL":
    case "SANCTION_MULTIPLE_LEAVE_TXN_FAIL":
    case "SANCTION_MULTIPLE_COMP_OFF_TXN_FAIL":
    case "SANCTION_MULTIPLE_ATTENDANCE_TXN_FAIL":
    case "SANCTION_MULTIPLE_OD_APPLICATIONS_FAIL":
    case "REMOVE_MULTIPLE_APPROVAL_RESULT": {
      return [];
    }

    case "LOGOUT": {
      return [];
    }

    default: {
      return state;
    }
  }
};

export default multipleUploadResult;

import { addError, addInfo } from "../actions/toast.action";
const initialState = [];

const workflowEmployees = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_WORKFLOW_EMPLOYEE_SUCCESS": {
      return action.payload.data;
    }

    case "FETCH_WORKFLOW_EMPLOYEE_FAIL": {
      action.asyncDispatch(
        addError(action.error.response?.data?.message, 3000),
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

export default workflowEmployees;

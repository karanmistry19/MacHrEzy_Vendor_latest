import { addError } from "../actions/toast.action";

const initialState = [];
const employeeDetailsQR = (state = initialState, action) => {
	switch (action.type) {
		case "EMPLOYEE_DETAILS_QR_SUCCESS": {
			//console.log("API response data:", action.payload.data); // Log the data
			return action.payload.data;
		}
		case "EMPLOYEE_DETAILS_QR_FAIL": {
			console.log(
				"API request failed:",
				action.error?.response?.data?.message,
			); // Log the error
			action.asyncDispatch(
				addError(action.error?.response?.data?.message, 3000),
			);
			return state;
		}
		default: {
			return state;
		}
	}
};
export default employeeDetailsQR;

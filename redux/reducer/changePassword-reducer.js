import { addError } from "../actions/toast.action";

const initialState = [];
const officialMobileNumber = (state = initialState, action) => {
	switch (action.type) {
		case "OFFICIAL_MOBILENUMBER_SUCCESS": {
			return action.payload.data;
		}
		case "OFFICIAL_MOBILENUMBER_FAIL": {
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

export default officialMobileNumber;

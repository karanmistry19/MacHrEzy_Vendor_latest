export const fetchOfficialMobileNumber = (empCode) => (dispatch) => {
	return dispatch({
		type: "OFFICIAL_MOBILENUMBER",
		payload: {
			request: {
				url: `api/changePassword/fetchMobileNumber?empCode=${empCode}`,
				method: "GET",
			},
		},
	});
};

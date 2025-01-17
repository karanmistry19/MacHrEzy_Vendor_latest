export const CheckInOutMark = (obj) => (dispatch) => {
	return dispatch({
		type: "CHECK_IN",
		payload: {
			request: {
				url: `api/attendance/checkInOut`,
				method: "POST",
				data: obj,
			},
		},
	});
};

// export const CheckOutMark = (obj) => (dispatch) => {
// 	return dispatch({
// 		type: "CHECK_OUT",
// 		payload: {
// 			request: {
// 				url: `api/attendance/checkOut`,
// 				method: "POST",
// 				data: obj,
// 			},
// 		},
// 	});
// };

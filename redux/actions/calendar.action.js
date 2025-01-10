export const fetchAttendanceCalendar = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_ATTENDANCE_CALENDAR",
    payload: {
      request: {
        url: `api/calendar/txn/attendance`,
        method: "POST",
        data: obj,
      },
    },
  });
};

export const fetchDateSummary = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_DATE_SUMMARY",
    payload: {
      request: {
        url: `api/calendar/txn/date`,
        method: "POST",
        data: obj,
      },
    },
  });
};

export const fetchSalaryMonthSummary = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_SALARY_MONTH_SUMMARY",
    payload: {
      request: {
        url: `api/calendar/txn/salary/summary`,
        method: "POST",
        data: obj,
      },
    },
  });
};

export const removeCalendarData = (obj) => (dispatch) => {
  return dispatch({
    type: "REMOVE_CALENDAR_DATA",
  });
};

export const removeDateSummaryData = (obj) => (dispatch) => {
  return dispatch({
    type: "REMOVE_DATE_SUMMARY_DATA",
  });
};

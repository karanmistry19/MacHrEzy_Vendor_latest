export const fetchAttendance = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_ATTENDANCE",
    payload: {
      request: {
        url: `api/attendance?eventFromDate=${obj.eventFromDate}&eventToDate=${obj.eventToDate}`,
        method: "GET",
      },
    },
  });
};

export const fetchAttendanceSummary = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_ATTENDANCE_SUMMARY",
    payload: {
      request: {
        url: `api/attendance/summary?eventFromDate=${obj.eventFromDate}&eventToDate=${obj.eventToDate}`,
        method: "GET",
      },
    },
  });
};

export const fetchTeamAttendanceSummary = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_TEAM_ATTENDANCE_SUMMARY",
    payload: {
      request: {
        url: `api/attendance/summary/team?eventFromDate=${obj.eventFromDate}&eventToDate=${obj.eventToDate}`,
        method: "GET",
      },
    },
  });
};

export const fetchTeamAttendanceSummaryDetails = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_TEAM_ATTENDANCE_SUMMARY_DETAILS",
    payload: {
      request: {
        url: `api/attendance/summary/team/details?eventFromDate=${obj.eventFromDate}&eventToDate=${obj.eventToDate}`,
        method: "GET",
      },
    },
  });
};

export const fetchPendingAttendanceTransaction = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_ATTENDANCE_TXN_PENDING",
    payload: {
      request: {
        url: `api/attendance/txn/pending`,
        method: "POST",
        data: obj,
      },
    },
  });
};

export const fetchHistoryAttendanceTransaction = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_ATTENDANCE_TXN_HISTORY",
    payload: {
      request: {
        url: `api/attendance/txn/history`,
        method: "POST",
        data: obj,
      },
    },
  });
};

export const fetchSelectedAttendanceTxn = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_SELECTED_ATTENDANCE_TXN",
    payload: {
      request: {
        url: `api/attendance/txn/selected`,
        method: "POST",
        data: obj,
      },
    },
  });
};

export const fetchUserAttendanceTxn = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_USER_ATTENDANCE_TXN",
    payload: {
      request: {
        url: `api/attendance/txn/user`,
        method: "POST",
        data: obj,
      },
    },
  });
};

export const setSelectedAttendanceTxn = () => (dispatch) => {
  return dispatch({
    type: "SET_SELECTED_ATTENDANCE_TXN",
    payload: null,
  });
};

export const fetchTabDetailsAttendanceTxn = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_TAB_DETAILS_ATTENDANCE_TXN",
    payload: {
      request: {
        url: `api/attendance/txn/tab`,
        method: "POST",
        data: obj,
      },
    },
  });
};

export const setTabDetailsAttendanceTxn = () => (dispatch) => {
  return dispatch({
    type: "SET_ATTENDANCE_TXN_TABS",
    payload: null,
  });
};

export const removeAttendanceTxn = () => (dispatch) => {
  return dispatch({
    type: "REMOVE_ATTENDANCE_TXN",
    payload: null,
  });
};

export const sanctionAttendanceTxn = (obj) => (dispatch) => {
  return dispatch({
    type: "SANCTION_ATTENDANCE_TXN",
    payload: {
      request: {
        url: `api/attendance/sanction`,
        method: "POST",
        data: obj,
      },
    },
  });
};

export const sanctionMultipleAttendanceTxn = (obj) => (dispatch) => {
  return dispatch({
    type: "SANCTION_MULTIPLE_ATTENDANCE_TXN",
    payload: {
      request: {
        url: `api/attendance/sanction/multiple`,
        method: "POST",
        data: obj,
      },
    },
  });
};

export const fetchAttendanceDaywise = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_ATTENDANCE_DAYWISE",
    payload: {
      request: {
        url: `api/calendar/txn/attendance/web/${obj.user.empCode.trim()}/${obj.user.empSite.trim()}?StartDate=${
          obj.StartDate
        }&EndDate=${obj.EndDate}`,
        method: "GET",
      },
    },
  });
};

export const fetchAttendanceDaywiseForModal = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_ATTENDANCE_DAYWISE_FOR_MODAL",
    payload: {
      request: {
        url: `api/calendar/txn/attendance/web/${obj.user.empCode.trim()}/${obj.user.empSite.trim()}?StartDate=${
          obj.StartDate
        }&EndDate=${obj.EndDate}`,
        method: "GET",
      },
    },
    filter: obj.status,
  });
};
export const fetchEISPersonal = () => (dispatch) => {
  return dispatch({
    type: "EIS_PERSONAL",
    payload: {
      request: {
        url: "api/eis/personal",
        method: "GET",
      },
    },
  });
};
export const fetchEmployeeDetailsQr = (requestedEmpCode) => (dispatch) => {
  return dispatch({
    type: "EMPLOYEE_DETAILS_QR",
    payload: {
      request: {
        url: `api/eis/employeeDetails?empCode=${requestedEmpCode}`,
        method: "GET",
      },
    },
  });
};

export const fetchEISOfficial = () => (dispatch) => {
  return dispatch({
    type: "EIS_OFFICIAL",
    payload: {
      request: {
        url: "api/eis/official",
        method: "GET",
      },
    },
  });
};
export const fetchEISOfficialSecond = () => (dispatch) => {
  return dispatch({
    type: "EIS_OFFICIAL_SECOND",
    payload: {
      request: {
        url: "api/eis/official/second",
        method: "GET",
      },
    },
  });
};

export const fetchEISFamily = () => (dispatch) => {
  return dispatch({
    type: "EIS_FAMILY",
    payload: {
      request: {
        url: "api/eis/family",
        method: "GET",
      },
    },
  });
};

export const fetchEISMediclaim = () => (dispatch) => {
  return dispatch({
    type: "EIS_MEDICLAIM",
    payload: {
      request: {
        url: "api/eis/mediclaim",
        method: "GET",
      },
    },
  });
};

export const fetchEISStatutory = () => (dispatch) => {
  return dispatch({
    type: "EIS_STATUTORY",
    payload: {
      request: {
        url: "api/eis/statutory",
        method: "GET",
      },
    },
  });
};

export const fetchEISEducation = () => (dispatch) => {
  return dispatch({
    type: "EIS_EDUCATION",
    payload: {
      request: {
        url: "api/eis/education",
        method: "GET",
      },
    },
  });
};

export const fetchEISExperience = () => (dispatch) => {
  return dispatch({
    type: "EIS_EXPERIENCE",
    payload: {
      request: {
        url: "api/eis/experience",
        method: "GET",
      },
    },
  });
};

export const fetchEISAssets = () => (dispatch) => {
  return dispatch({
    type: "EIS_ASSETS",
    payload: {
      request: {
        url: "api/eis/assets",
        method: "GET",
      },
    },
  });
};

export const fetchEISTransferHistory = () => (dispatch) => {
  return dispatch({
    type: "EIS_TRANSFER_HISTORY",
    payload: {
      request: {
        url: "api/eis/transfer-history",
        method: "GET",
      },
    },
  });
};
export const fetchEISLanguage = () => (dispatch) => {
  return dispatch({
    type: "EIS_LANGUAGE",
    payload: {
      request: {
        url: "api/eis/language",
        method: "GET",
      },
    },
  });
};
export const removeEISData = () => ({
  type: "REMOVE_EIS_DATA",
});

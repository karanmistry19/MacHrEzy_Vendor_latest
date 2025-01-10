export const createSiteSqlMap = (obj) => (dispatch) => {
  return dispatch({
    type: "SITE_SQL_MAP_CREATE",
    payload: {
      request: {
        url: "api/site-sql-map",
        method: "POST",
        data: obj,
      },
    },
  });
};

export const fetchSiteSqlMap = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_SITE_SQL_MAP",
    payload: {
      request: {
        url: "api/site-sql-map",
        method: "GET",
      },
    },
  });
};

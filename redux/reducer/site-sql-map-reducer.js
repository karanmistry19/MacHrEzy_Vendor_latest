const initialState = [];
const siteSQLMap = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_SITE_SQL_MAP_SUCCESS": {
      return action.payload.data;
    }

    case "SITE_SQL_MAP_CREATE_SUCCESS": {
      let index = state.findIndex((x) => x._id === action.payload.data._id);
      return index > -1
        ? [
            ...state.map((x, i) =>
              i === index ? { ...action.payload.data } : { ...x },
            ),
          ]
        : [...state, action.payload.data];
    }

    case "LOGOUT": {
      return [];
    }

    default: {
      return state;
    }
  }
};

export default siteSQLMap;

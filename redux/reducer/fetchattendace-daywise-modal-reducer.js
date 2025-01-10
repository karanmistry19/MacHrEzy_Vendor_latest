import moment from "moment";
import { addError } from "../actions/toast.action";
const initialState = [];
const attendanceDaywiseModal = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ATTENDANCE_DAYWISE_FOR_MODAL_SUCCESS": {
      let filter = action.meta.previousAction.filter;
      let standardQuery;
      if (filter === "Regularize") {
        // standardQuery = "Absent";
      } else if (filter === "Present") {
        standardQuery = "I - ";
      } else if (filter === "Late") {
        standardQuery = "Late";
      } else if (filter === "Leave") {
        standardQuery = "Leave";
      }
      let filtered = [...action.payload.data];
      if (standardQuery === "Late") {
        const arr = [...filtered];
        let list = filtered.filter(
          (x) =>
            x.Subject === standardQuery &&
            new Date().toDateString() !== new Date(x.StartTime).toDateString()
        );
        list.map((x) => {
          const date = moment(x.StartTime).format("DD/MM/YYYY");
          const val = filtered.filter(
            (y) =>
              moment(y.StartTime).format("DD/MM/YYYY") == date &&
              y.Subject.includes("I -")
          );
          x.StartTime = val[0].StartTime;
          x.EndTime = val[0].EndTime;
          return x;
        });
        return list;
      } else {
        filtered = action.payload.data.filter(
          (x) =>
            (x.Subject === standardQuery ||
              x.Subject.includes(standardQuery) ||
              (filter === "Present" && x.Subject === "Day: 0.5") ||
              (filter === "Regularize" && x.Subject === "Day: 0.5")) &&
            new Date().toDateString() !== new Date(x.StartTime).toDateString()
        );
        return filtered;
      }
    }
    case "FETCH_ATTENDANCE_DAYWISE_FOR_MODAL_FAIL": {
      action.asyncDispatch(
        addError(action.error?.response?.data?.message, 3000)
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

export default attendanceDaywiseModal;

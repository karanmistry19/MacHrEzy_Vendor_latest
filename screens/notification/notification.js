import React, { useEffect } from "react";
import { useWindowDimensions } from "react-native";

import { connect } from "react-redux";
import { fetchDepartments } from "../../redux/actions/department.action";
import { fetchGrades } from "../../redux/actions/grade.action";
import { fetchSite } from "../../redux/actions/site.action";
import NotificationNarrow from "./notification.narrow";
import NotificationWide from "./notification.wide";

const mapStateToProps = ({ notifications, user }) => ({ notifications, user });
export const NotificationView = connect(mapStateToProps, {
  fetchDepartments,
  fetchGrades,
  fetchSite,
})(({ fetchDepartments, fetchGrades, fetchSite }) => {
  useEffect(() => {
    fetchDepartments();
    fetchSite();
    fetchGrades();
  }, []);
  const dimension = useWindowDimensions();
  return dimension.width > 550 ? <NotificationWide /> : <NotificationNarrow />;
});

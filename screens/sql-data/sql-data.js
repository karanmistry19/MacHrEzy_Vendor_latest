import React from "react";
import { useWindowDimensions } from "react-native";

import { connect } from "react-redux";
import SQLDataNarrow from "./sql-data.narrow";
import SQLDataWide from "./sql-data.wide";

const mapStateToProps = ({ notifications, user }) => ({ notifications, user });
export const SQLDataView = connect(
  mapStateToProps,
  {}
)(({}) => {
  const dimension = useWindowDimensions();
  return dimension.width > 550 ? <SQLDataWide /> : <SQLDataNarrow />;
});

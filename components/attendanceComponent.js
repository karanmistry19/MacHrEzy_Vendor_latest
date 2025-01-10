import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { connect } from "react-redux";
import { fetchAttendance } from "../redux/actions/attendance.action";
import { addError } from "../redux/actions/toast.action";
import { DimensionContext } from "./dimensionContext";
import FilterComponent from "./filter/filter";
import { ModularCard } from "./modularCard";
const { formatDate, formatDateNew } = require("../components/utils");

const AttendanceComponent = ({
  attendance,
  modularCardStyle,
  onFilterChange,
  addError,
}) => {
  const [variables, setVariables] = useState();

  useEffect(() => {
    let currentDate = new Date(),
      eventFromDate,
      eventToDate;
    eventFromDate = moment(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + (currentDate.getDate() > 15 ? 0 : -1),
        16,
        12
      )
    ).format("YYYY-MM-DD");
    eventToDate = moment(new Date()).format("YYYY-MM-DD");
    setVariables([eventFromDate, eventToDate]);
  }, []);

  const fetch = (vv) => {
    fetchAttendance({
      eventFromDate: moment(vv.value[0]).format("YYYY-MM-DD"),
      eventToDate: moment(vv.value[1]).format("YYYY-MM-DD"),
    });
    setVariables([vv.value[0], vv.value[1]]);
    if (onFilterChange) onFilterChange(vv);
  };

  const { window } = useContext(DimensionContext);

  return (
    <View
      style={{
        width:
          window.width < 700
            ? window.width - 30
            : window.width > 700 && window.width < 1130
            ? window.width - 50
            : "39%",
        // width:
        //   window.width < 700
        //     ? window.width - 30
        //     : window.width < 1130
        //     ? window.width * 0.87
        //     : window.width * 0.32,
        // marginLeft: window.width < 1300 ? 0 : 10,

        marginHorizontal: 10,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: "#383336",
          marginLeft: 10,
          marginVertical: 10,
        }}
      >
        Attendance
      </Text>
      <View>
        <ModularCard
          style={{
            maxHeight: Platform.OS === "web" ? window.height / 2.7 : 450,
            minHeight: Platform.OS === "web" ? window.height / 2.7 : 320,
            marginBottom: 10,
          }}
          cardContent={
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "flex-start",
                borderRadius: 5,
                margin: 5,
                maxHeight: 32,
              }}
            >
              <View
                style={{
                  maxHeight: 20,
                  minHeight: 20,
                  marginBottom: 10,
                }}
              >
                <FilterComponent
                  type={"dateRange"}
                  filterConfig={{
                    value: variables,
                  }}
                  onFilterChange={(vv) => fetch(vv)}
                  addError={addError}
                />
              </View>

              <View>
                {attendance && attendance.length > 0 ? (
                  <LineChart
                    data={{
                      labels: attendance
                        .filter(
                          (x, i) => i % Math.round(attendance.length / 4) === 0
                        )
                        .map((x) => x.eventDate.substr(0, 5)),
                      datasets: [
                        {
                          data: attendance.map((x) => x.totalHours || 0),
                        },
                      ],
                    }}
                    yAxisSuffix=" hr"
                    // width={width || Dimensions.get("window").width - 70} // from react-native
                    // height={220}
                    width={
                      window.width < 700
                        ? window.width - 65
                        : window.width > 700 && window.width < 1130
                        ? window.width - 90
                        : window.width * 0.39 - 50
                      // window.width < 700
                      //   ? window.width - 65
                      //   : window.width < 1130
                      //   ? window.width * 0.82
                      //   : window.width * 0.3
                    }
                    // width={width || Dimensions.get("window").width - 70} // from react-native
                    height={window.width < 550 ? 220 : window.height / 4}
                    chartConfig={{
                      backgroundColor: "#e26a00",
                      backgroundGradientFrom: "#fb8c00",
                      backgroundGradientTo: "#ffa726",
                      decimalPlaces: 0, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      style: {
                        borderRadius: 10,
                      },
                    }}
                    bezier
                    style={{
                      borderRadius: 10,
                    }}
                  />
                ) : (
                  <></>
                )}
              </View>
            </View>
          }
        ></ModularCard>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cellStyle: {
    width: 100,
  },
  tableContainer: {
    margin: 5,
  },
});
const mapStateToProps = ({ attendance }) => ({
  attendance,
});
export default connect(mapStateToProps, {
  fetchAttendance,
  addError,
})(AttendanceComponent);

import React from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { connect } from "react-redux";
import Icons from "../icons";
import { formatDateNew } from "../utils";
const TeamAttendanceSummary = ({
  teamAttendanceSummaryDetails,
  navigation,
}) => {
  const dimension = useWindowDimensions();
  const Details = ({ header, value, icon }) => {
    return (
      <View style={{ flexDirection: "row", flex: 1 }}>
        {header ? (
          <Text
            style={{
              color: "#303030",
              fontSize: 15,
              fontWeight: "400",
              marginLeft: 5,
              paddingHorizontal: 5,
              marginVertical: 5,
            }}
          >
            {header}
          </Text>
        ) : (
          <></>
        )}
        {icon ? (
          icon
        ) : (
          <Text
            style={{
              color: "#303030",
              fontSize: 15,
              marginVertical: 5,
              marginLeft: header ? 2 : 10,
            }}
          >
            {value}
          </Text>
        )}
      </View>
    );
  };
  const renderItem = ({ item, index }) => {
    return (
      <View
        key={item?.empCode + " " + index}
        style={{
          width: "95%",
          borderRadius: 7,
          // borderWidth: 2,
          // height: 40,
          marginTop: 5,
          // marginLeft: 10,
          padding: 10,
          marginVertical: 10,
          backgroundColor: "#D0D0D0",
          marginLeft: 10,
        }}
      >
        <View>
          <Details
            value={`${item?.shortName.trim()}(${item?.empCode.trim()})`}
          ></Details>
          {item?.leaves ? (
            <Details value={item?.leaves} header="Leave:"></Details>
          ) : (
            <Details
              value={`${item?.shiftName}${
                item?.status === "A" ? " (Absent)" : ""
              }`}
              header="Shift:"
            ></Details>
          )}
        </View>

        {item?.leaves ? (
          <></>
        ) : (
          [
            <View>
              {item?.inTime && item?.inTime != "" ? (
                <Details
                  value={`${formatDateNew(
                    item?.inTime,
                    "DD/MM/YYYY HH:mm:ss",
                    "HH:mm"
                  )}${item?.late ? " (Late)" : ""}`}
                  header="In Time :"
                ></Details>
              ) : (
                <></>
              )}
              {item?.outTime && item?.outTime != "" ? (
                <Details
                  value={`${formatDateNew(
                    item?.outTime,
                    "DD/MM/YYYY HH:mm:ss",
                    "HH:mm"
                  )}${
                    item?.earlyOut && item?.incompleteHrs
                      ? " (Early Out & Incomplete Hours)"
                      : item?.earlyOut
                      ? " (Early Out)"
                      : item?.incompleteHrs
                      ? " (Incomplete Hours)"
                      : ""
                  }`}
                  header="Out Time :"
                ></Details>
              ) : (
                <></>
              )}
            </View>,
            ...[
              item?.totalHours ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Details
                    value={item?.totalHours}
                    header="Total Hours:"
                  ></Details>
                </View>
              ) : (
                <></>
              ),
            ],
          ]
        )}
      </View>
    );
  };
  return (
    <View style={{ paddingBottom: 30 }}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{
            bottom: 10,
            position: "absolute",
            marginLeft: 10,
            zIndex: 1000,
          }}
          onPress={() => navigation.goBack()}
        >
          <Icons fill="#000" name="back"></Icons>
        </TouchableOpacity>

        <View style={{ flex: 1, alignItems: "center", marginRight: 20 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "700",
              height: 30,
              marginTop: 10,
              // alignSelf: "center",
            }}
          >
            Team Attendance Summary
          </Text>
        </View>
      </View>
      <FlatList
        keyExtractor={(item, index) => item.empCode + " " + index}
        pagingEnabled={true}
        data={teamAttendanceSummaryDetails}
        renderItem={renderItem}
      ></FlatList>
    </View>
  );
};
const mapStateToProps = ({ teamAttendanceSummaryDetails }) => ({
  teamAttendanceSummaryDetails,
});
export default connect(mapStateToProps, {})(TeamAttendanceSummary);

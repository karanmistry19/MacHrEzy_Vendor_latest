import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { connect } from "react-redux";
import {
  fetchAttendanceSummary,
  fetchTeamAttendanceSummary,
  fetchTeamAttendanceSummaryDetails,
} from "../redux/actions/attendance.action";
import { addError } from "../redux/actions/toast.action";
import { Card } from "./card";
import { DimensionContext } from "./dimensionContext";
import FilterComponent from "./filter/filter";
import ModalContainer from "./modalContainer/modal";
import { formatDate, formatDateNew } from "./utils";

const DasboardCardComponent = ({
  holidays,
  onPressHolidayCard,
  leaves,
  attendanceSummary,
  teamAttendanceSummary,
  fetchAttendanceSummary,
  fetchTeamAttendanceSummary,
  user,
  onAttendanceSummaryDateChange,
  onTeamAttendanceSummaryDateChange,
  addError,
  fetchTeamAttendanceSummaryDetails,
  teamAttendanceSummaryDetails,
  onPressTeamAttendanceCard,
  onPressMyAttendanceCard,
}) => {
  const { window } = useContext(DimensionContext);
  const { width } = useWindowDimensions();
  const [nextHoliday, setNextHoliday] = useState({});
  const [showHolidayModal, setShowHolidayModal] = useState(false);
  const [showTeamAttendanceDetails, setShowTeamAttendanceDetails] =
    useState(false);
  const [showMyAttendanceDetails, setShowMyAttendanceDetails] = useState(false);
  const [variables, setVariables] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    let nextHoliday = holidays?.find(
      (x) => new Date(x.dateOfHoliday).getTime() > new Date().getTime()
    );

    setNextHoliday(nextHoliday);
    // nextHoliday
    //   ? Math.ceil(
    //       (new Date(nextHoliday.dateOfHoliday).getTime() -
    //         new Date().getTime()) /
    //         (1000 * 3600 * 24)
    //     )
    //   : 0
  }, [holidays]);

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

  const fetchAttendanceSum = (vv) => {
    fetchAttendanceSummary({
      eventFromDate: formatDate(vv.value[0], "YYYY-MM-DD"),
      eventToDate: formatDate(vv.value[1], "YYYY-MM-DD"),
    });

    setVariables([vv.value[0], vv.value[1]]);
    if (onAttendanceSummaryDateChange) onAttendanceSummaryDateChange(vv.value);
  };

  const fetchTeamAttendanceSum = (vv) => {
    fetchTeamAttendanceSummary({
      eventFromDate: formatDate(vv.value, "YYYY-MM-DD"),
      eventToDate: formatDate(vv.value, "YYYY-MM-DD"),
    });
    fetchTeamAttendanceSummaryDetails({
      eventFromDate: formatDate(vv.value, "YYYY-MM-DD"),
      eventToDate: formatDate(vv.value, "YYYY-MM-DD"),
    });
    setDate(vv.value);
    if (onTeamAttendanceSummaryDateChange)
      onTeamAttendanceSummaryDateChange(vv.value);
  };
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
              // marginLeft: 10,
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
          width: "98%",
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Details
            value={`${item?.shortName.trim()}(${item?.empCode.trim()})`}
          ></Details>
          {item?.leaves ? (
            <Details value={item?.leaves} header="Leave:"></Details>
          ) : (
            <Details
              value={`${item?.shiftName} ${
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
            <View
              key={"inTime" + item?.inTime}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {item.inTime && item?.inTime != "" ? (
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
                  key={"outTime" + item?.outTime}
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
                  key={"totalHours" + item?.totalHours}
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
  let regularArray = attendanceSummary?.regularize?.split(",");
  return (
    <View
      style={[
        styles.displayCardContainer,
        {
          width: width < 1130 ? "100%" : "60%",
          marginTop: width < 550 ? 0 : 21,
        },
      ]}
    >
      <View style={{ padding: 10, marginLeft: width > 550 ? 10 : 0 }}>
        <Pressable
          onPress={
            Platform.OS == "web"
              ? () => setShowMyAttendanceDetails(true)
              : onPressMyAttendanceCard
          }
        >
          <Card
            widthChange={user.userType === "U"}
            descriptionJsx={
              <View>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  My Attendance
                </Text>
                <View
                  style={{
                    maxHeight: 20,
                    minHeight: 20,
                  }}
                >
                  <FilterComponent
                    type={"dateRange"}
                    filterConfig={{
                      value: variables,
                    }}
                    onFilterChange={(vv) => fetchAttendanceSum(vv)}
                    addError={addError}
                  />
                </View>
              </View>
            }
            renderInfo={
              <View style={{ marginBottom: 5 }}>
                <View style={styles.row}>
                  <Text style={styles.infoTextStyle}>{`Present Days: `}</Text>
                  <View
                    style={[
                      styles.box,
                      {
                        backgroundColor: "#09b03b",
                      },
                    ]}
                  >
                    <Text
                      adjustsFontSizeToFit={true}
                      style={styles.infoTextWithBold}
                    >
                      {`${attendanceSummary?.presentDays || 0}`}
                    </Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <Text style={styles.infoTextStyle}>{`Late: `}</Text>
                  <View style={[styles.box, { backgroundColor: "#f72819" }]}>
                    <Text
                      adjustsFontSizeToFit={true}
                      style={styles.infoTextWithBold}
                    >
                      {`${attendanceSummary?.late || 0}`}
                    </Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <Text style={styles.infoTextStyle}>{`Regularize: `}</Text>
                  <View style={[styles.box, { backgroundColor: "#f72819" }]}>
                    <Text
                      adjustsFontSizeToFit={true}
                      style={styles.infoTextWithBold}
                    >
                      {`${
                        attendanceSummary?.regularize
                          ?.split(",")
                          .filter((x) => x.trim().length > 0).length || 0
                      }`}
                    </Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <Text style={styles.infoTextStyle}>{`Leave: `}</Text>
                  <View style={[styles.box, { backgroundColor: "#0989eb" }]}>
                    <Text
                      adjustsFontSizeToFit={true}
                      style={styles.infoTextWithBold}
                    >
                      {`${attendanceSummary?.leaves || 0}`}
                    </Text>
                  </View>
                </View>
              </View>
            }
            infoStyle={{
              fontWeight: "bold",
              fontSize: 30,
              color: "#FFBA00",
            }}
          ></Card>
        </Pressable>
      </View>
      {user.userType === "U" ? (
        <></>
      ) : (
        <View style={{ padding: 10, marginRight: 10 }}>
          <Pressable
            onPress={
              Platform.OS == "web"
                ? () => setShowTeamAttendanceDetails(true)
                : onPressTeamAttendanceCard
            }
          >
            <Card
              renderInfo={
                <View style={{ marginBottom: 5 }}>
                  <View style={styles.row}>
                    <Text
                      style={styles.infoTextStyle}
                    >{`Total Present: `}</Text>
                    <Text style={styles.infoTextWithBold}>
                      {`${teamAttendanceSummary?.presentEmp || 0}`}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.infoTextStyle}>{`Late: `}</Text>
                    <Text style={styles.infoTextWithBold}>
                      {`${teamAttendanceSummary?.late || 0}`}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.infoTextStyle}>{`Early Out: `}</Text>
                    <Text style={styles.infoTextWithBold}>
                      {`${teamAttendanceSummary?.earlyOut || 0}`}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.infoTextStyle}>{`Leave: `}</Text>
                    <Text style={styles.infoTextWithBold}>
                      {`${teamAttendanceSummary?.leaves || 0}`}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text
                      style={styles.infoTextStyle}
                    >{`Incomplete Shift: `}</Text>
                    <Text style={styles.infoTextWithBold}>
                      {`${teamAttendanceSummary?.incompleteHrs || 0}`}
                    </Text>
                  </View>
                </View>
              }
              iconName={"payDate"}
              descriptionJsx={
                <View style={{ justifyContent: "center" }}>
                  <Text
                    adjustsFontSizeToFit={true}
                    style={{ fontSize: 18, fontWeight: "bold" }}
                  >
                    Team Attendance
                  </Text>
                  <View
                    style={{
                      maxHeight: 20,
                      minHeight: 20,
                    }}
                  >
                    <FilterComponent
                      type={"date"}
                      filterConfig={{
                        value: date,
                      }}
                      onFilterChange={(vv) => fetchTeamAttendanceSum(vv)}
                    />
                  </View>
                </View>
              }
              infoStyle={{
                fontWeight: "bold",
                fontSize: 30,
                color: "#9B2B2C",
              }}
            ></Card>
          </Pressable>
        </View>
      )}

      {/* <View style={{ padding: 10 }}>
        <Card imageSource={"../assets/Rectangle.png"}></Card>
      </View> */}
      <View style={{ padding: 10, marginLeft: width < 700 ? 0 : 10 }}>
        <Pressable
          onPress={
            Platform.OS == "web"
              ? () => setShowHolidayModal(true)
              : onPressHolidayCard
          }
        >
          <Card
            fixHeight={Platform.OS != "web"}
            info={
              nextHoliday?.dateOfHoliday ? (
                formatDate(new Date(nextHoliday?.dateOfHoliday))
              ) : (
                <Text>{`No Upcoming Holidays \nfor this year`}</Text>
              )
            }
            iconName={"umbrella"}
            description={
              <View>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {nextHoliday?.holiName}
                </Text>
                <Text style={{ fontSize: 12 }}>
                  {nextHoliday?.dateOfHoliday ? "Next Holiday" : ""}
                </Text>
              </View>
            }
            infoStyle={{
              fontWeight: "bold",
              fontSize: 20,
              color: "#375712",
            }}
          ></Card>
        </Pressable>
      </View>
      <View style={{ padding: 10, right: width < 700 ? 0 : 10 }}>
        <Card
          fixHeight={Platform.OS != "web"}
          fill="#FFBA00"
          renderInfo={
            <View style={{ justifyContent: "space-between", width: "100%" }}>
              <View style={styles.row}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 30,
                    color: "#000",
                  }}
                >
                  {leaves?.reduce((a, b) => a + b.leaveBalance, 0)}
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 30,
                    color: "#000",
                  }}
                >
                  Leaves
                </Text>
              </View>
            </View>
          }
          descriptionJsx={
            <ScrollView
              showsHorizontalScrollIndicator={false}
              nestedScrollEnabled={true}
              horizontal={true}
              style={{ width: "100%" }}
            >
              {leaves.map((x, i) => (
                <View
                  style={{
                    marginRight: 15,
                    alignSelf: "flex-end",
                    alignItems: "center",
                  }}
                  key={`${x.leaveAlias}${i}`}
                >
                  <Text
                    style={styles.infoTextWithBold}
                  >{`${x.leaveBalance}`}</Text>
                  <Text style={styles.infoTextStyle}>{`${x.leaveAlias}`}</Text>
                </View>
              ))}
            </ScrollView>
          }
        ></Card>
      </View>
      <ModalContainer
        title="Holiday List"
        onClose={() => setShowHolidayModal(false)}
        showModal={showHolidayModal}
        onRequestCloseModal={() => setShowHolidayModal(false)}
        modalContent={
          <ScrollView
            nestedScrollEnabled={true}
            contentContainerStyle={{ paddingBottom: 30 }}
          >
            {holidays.map((holiday, index) => (
              <View
                key={holiday.holiCode + " " + index}
                style={{
                  width: "95%",
                  borderRadius: 7,
                  // borderWidth: 2,
                  // height: 40,
                  marginTop: 5,
                  marginLeft: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  marginVertical: 10,
                  backgroundColor: "#D0D0D0",
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    color: "#303030",
                    alignSelf: "center",
                    fontSize: 15,
                    fontWeight: "600",
                    minWidth: "100%",
                    // maxWidth: 160,
                    marginLeft: 5,
                    paddingHorizontal: 5,
                    marginVertical: 5,
                  }}
                >
                  {holiday.holiName}
                </Text>
                <Text
                  style={{
                    color: "#303030",
                    alignSelf: "center",
                    marginTop: 2,
                    fontSize: 15,
                    fontWeight: "600",
                    marginRight: 20,
                    backgroundColor: "#FFBA00",
                    paddingHorizontal: 5,
                    marginLeft: 5,
                    marginVertical: 5,
                    borderRadius: 2,
                  }}
                >
                  {moment(new Date(holiday.dateOfHoliday)).format(
                    "dddd, MMM Do, YYYY"
                  )}
                </Text>
              </View>
            ))}
          </ScrollView>
        }
      ></ModalContainer>
      <ModalContainer
        title="Team Attendance Summary"
        onClose={() => setShowTeamAttendanceDetails(false)}
        showModal={showTeamAttendanceDetails}
        onRequestCloseModal={() => setShowTeamAttendanceDetails(false)}
        modalStyle={{
          minWidth: window.width / 2,
          maxWidth: window.width / 2,
          height: window.height * 0.4,
        }}
        maxWidth={window.width / 2}
        modalContentStyle={{
          width: window.width / 2,
          minHeight: 310,
          maxHeight: 310,
        }}
        modalContent={
          <FlatList
            keyExtractor={(item, i) => item.empCode + " " + i}
            pagingEnabled={true}
            data={teamAttendanceSummaryDetails}
            renderItem={renderItem}
          ></FlatList>
        }
      ></ModalContainer>
      <ModalContainer
        title="Regularize Dates"
        onClose={() => setShowMyAttendanceDetails(false)}
        showModal={showMyAttendanceDetails}
        onRequestCloseModal={() => setShowMyAttendanceDetails(false)}
        modalContent={
          <ScrollView
            nestedScrollEnabled={true}
            contentContainerStyle={{ paddingBottom: 30 }}
          >
            {regularArray?.map((item, index) => {
              return item.trim() === "" ? (
                <></>
              ) : (
                <View
                  key={`${item} " " ${index}`}
                  style={{
                    width: "95%",
                    borderRadius: 7,
                    // borderWidth: 2,
                    // height: 40,
                    marginTop: 5,
                    marginLeft: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    marginVertical: 10,
                    backgroundColor: "#D0D0D0",
                    height: 50,
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      color: "#303030",
                      alignSelf: "center",
                      fontSize: 15,
                      fontWeight: "600",
                      minWidth: "100%",
                      // maxWidth: 160,
                      marginLeft: 5,
                      paddingHorizontal: 5,
                      marginVertical: 5,
                    }}
                  >
                    {item}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        }
      ></ModalContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  displayCardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  infoTextStyle: {
    fontSize: 15,
  },
  infoTextWithBold: {
    fontWeight: "bold",
    fontSize: 17,
    alignSelf: "center",
    paddingHorizontal: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5,
    alignItems: "center",
  },
  box: {
    height: 22,
    minWidth: 25,
    color: "#FFF",
    borderRadius: 5,
    justifyContent: "center",
  },
});
const mapStateToProps = ({ user }) => ({
  user,
});
export default connect(mapStateToProps, {
  fetchAttendanceSummary,
  fetchTeamAttendanceSummary,
  addError,
  fetchTeamAttendanceSummaryDetails,
})(DasboardCardComponent);

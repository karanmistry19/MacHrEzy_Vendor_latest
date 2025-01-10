import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { connect } from "react-redux";
import { formatDate, formatDateNew } from "../../components/utils";
import {
  fetchAttendanceCalendar,
  fetchDateSummary,
  fetchSalaryMonthSummary,
  removeCalendarData,
  removeDateSummaryData,
} from "../../redux/actions/calendar.action";
import FilterDataComponent from "../leave/filterDataComponent";
import CalendarModal from "./calendar-modal";
import SalarySummaryModal from "./salary-summary-modal";

const CalendarForMobile = ({
  attendanceCalendar,
  fetchAttendanceCalendar,
  user,
  removeCalendarData,
  fetchDateSummary,
  attendanceDateSummary,
  removeDateSummaryData,
  salaryMonthSummary,
  fetchSalaryMonthSummary,
}) => {
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [data, setData] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [salarySummaryModal, setSalarySummaryModal] = useState(false);
  const [dataToReturn, setDataToReturn] = useState({});
  useFocusEffect(
    React.useCallback(() => {
      fetchCalendarData(true);
      return () => {
        removeCalendarData();
        setSelectedEmployee();
      };
    }, [])
  );

  const fetchCalendarData = (init = false) => {
    if (data || init) {
      let eventFromDate,
        eventToDate = new Date();
      if (init) {
        eventFromDate = moment(
          new Date(eventToDate.getFullYear(), eventToDate.getMonth())
        );
      } else {
        eventToDate.setMonth(data.month);
        eventToDate.setDate(0);
        if (data.year) {
          eventToDate.setFullYear(data.year);
        }

        eventFromDate = moment(new Date(data.year, data.month - 1)).format(
          "YYYY-MM-DD"
        );
      }

      if (selectedEmployee && selectedEmployee.data) {
        fetchAttendanceCalendar({
          empCode: selectedEmployee.data.empCode.trim(),
          empSite: selectedEmployee.data.empSite.trim(),
          eventDate: moment(eventFromDate).format("YYYY-MM-DD"),
          toDate: moment(eventToDate).format("YYYY-MM-DD"),
          // currentMonth: data.month ? true : false,
        });
      } else {
        fetchAttendanceCalendar({
          empCode: user.empCode.trim(),
          eventDate: moment(eventFromDate).format("YYYY-MM-DD"),
          toDate: moment(eventToDate).format("YYYY-MM-DD"),
          // currentMonth: data.month ? true : false,
        });
      }
    }
  };

  useEffect(() => {
    let currentDate = new Date(),
      eventFromDate,
      eventToDate;
    eventFromDate = moment(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 16, 12)
    ).format("YYYY-MM-DD");
    eventToDate = moment(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), 15, 12)
    ).format("YYYY-MM-DD");
    fetchSalaryMonthSummary({
      empCode: selectedEmployee
        ? selectedEmployee.data.empCode.trim()
        : user.empCode.trim(),
      eventDate: eventFromDate,
      toDate: eventToDate,
    });
  }, [selectedEmployee, user]);

  useEffect(() => {
    setDataToReturn(
      attendanceCalendar.reduce(
        (acc, curr) => ({
          ...acc,
          [formatDateNew(curr.eventDate, "YYYY-MM-DDTHH:mm:ss", "yyyy-MM-DD")]:
            [
              ...(curr.dayStatus
                ? [
                    {
                      dots: [],
                      selected: false,
                      name: curr.dayStatus,
                      backgroundColor: curr.bgColor,
                      fontColor: curr.fontColor,
                      eventDate: formatDateNew(
                        curr.eventDate,
                        "YYYY-MM-DDTHH:mm:ss",
                        "yyyy-MM-DD"
                      ),
                    },
                  ]
                : []),
              ...(curr.inTime && curr.outTime && curr.totalMinutes
                ? [
                    ...(curr.outTime.includes("N")
                      ? [
                          {
                            name: curr.inTime,
                            inTime: curr.inTime.split("- ")[1],
                            outTime: "24:00",
                            inTime1: "00:00",
                            outTime1: curr.outTime
                              .replace(/ *\([^)]*\) */g, "")
                              .split("- ")[1],
                            totalMinutes: curr.totalMinutes.split("- ")[1],
                            backgroundColor: curr.bgColor,
                            fontColor: curr.fontColor,
                            eventDate: formatDateNew(
                              curr.eventDate,
                              "YYYY-MM-DDTHH:mm:ss",
                              "yyyy-MM-DD"
                            ),
                          },
                        ]
                      : [
                          {
                            name: curr.inTime,
                            inTime: curr.inTime.split("- ")[1],
                            outTime: curr.outTime.split("- ")[1],
                            totalMinutes: curr.totalMinutes.split("- ")[1],
                            backgroundColor: curr.bgColor,
                            fontColor: curr.fontColor,
                            eventDate: formatDateNew(
                              curr.eventDate,
                              "YYYY-MM-DDTHH:mm:ss",
                              "yyyy-MM-DD"
                            ),
                          },
                        ]),
                  ]
                : []),
              ...(curr.inTime && !curr.outTime
                ? [
                    {
                      selected: false,
                      name: curr.outTime,
                      backgroundColor: curr.bgColor,
                      fontColor: curr.fontColor,
                      eventDate: formatDateNew(
                        curr.eventDate,
                        "YYYY-MM-DDTHH:mm:ss",
                        "yyyy-MM-DD"
                      ),
                    },
                  ]
                : []),
              ...(curr.od
                ? [
                    {
                      selected: false,
                      name: `OD`,
                      backgroundColor: curr.bgColor,
                      fontColor: curr.fontColor,
                      eventDate: formatDateNew(
                        curr.eventDate,
                        "YYYY-MM-DDTHH:mm:ss",
                        "yyyy-MM-DD"
                      ),
                    },
                  ]
                : []),
              ...(curr.late
                ? [
                    {
                      selected: false,
                      name: "Late",
                      backgroundColor: curr.bgColor,
                      fontColor: curr.fontColor,
                      eventDate: formatDateNew(
                        curr.eventDate,
                        "YYYY-MM-DDTHH:mm:ss",
                        "yyyy-MM-DD"
                      ),
                    },
                  ]
                : []),
              ...(curr.leaves
                ? [
                    {
                      selected: false,
                      name: `Leave ${curr.leaves}`,
                      backgroundColor: curr.bgColor,
                      fontColor: curr.fontColor,
                      eventDate: formatDateNew(
                        curr.eventDate,
                        "YYYY-MM-DDTHH:mm:ss",
                        "yyyy-MM-DD"
                      ),
                    },
                  ]
                : []),
              ...(curr.earlyOut
                ? [
                    {
                      selected: false,
                      name: "Early Out",
                      backgroundColor: curr.bgColor,
                      fontColor: curr.fontColor,
                      eventDate: formatDateNew(
                        curr.eventDate,
                        "YYYY-MM-DDTHH:mm:ss",
                        "yyyy-MM-DD"
                      ),
                    },
                  ]
                : []),
              ...(curr.incompleteHrs
                ? [
                    {
                      selected: false,
                      name: "Incomplete Hours",
                      backgroundColor: curr.bgColor,
                      fontColor: curr.fontColor,
                      eventDate: formatDateNew(
                        curr.eventDate,
                        "YYYY-MM-DDTHH:mm:ss",
                        "yyyy-MM-DD"
                      ),
                    },
                  ]
                : []),
              ...(curr.otMinutes
                ? [
                    {
                      selected: false,
                      name: `OT: ${curr.otMinutes}`,
                      backgroundColor: curr.bgColor,
                      fontColor: curr.fontColor,
                      eventDate: formatDateNew(
                        curr.eventDate,
                        "YYYY-MM-DDTHH:mm:ss",
                        "yyyy-MM-DD"
                      ),
                    },
                  ]
                : []),
              ...(curr.days
                ? [
                    {
                      selected: false,
                      name: `DAY: ${curr.days}`,
                      backgroundColor: curr.bgColor,
                      fontColor: curr.fontColor,
                      eventDate: formatDateNew(
                        curr.eventDate,
                        "YYYY-MM-DDTHH:mm:ss",
                        "yyyy-MM-DD"
                      ),
                    },
                  ]
                : []),
            ],
        }),
        {}
      )
    );
  }, [attendanceCalendar]);

  const dots = () => {
    return Object.entries(dataToReturn).reduce(
      (a, b) => ({
        ...a,
        [b[0]]: {
          dots: b[1].map((x) => ({
            key: x.name,
            color: x.backgroundColor,
            selectedDotColor: "blue",
          })),
          selected:
            formatDate(selectedDate, "yyyy-MM-DD") === b[0] ? true : false,
          selectedColor:
            formatDate(selectedDate, "yyyy-MM-DD") === b[0] ? "#FF0000" : "",
        },
      }),
      {}
    );
  };

  useEffect(() => {
    fetchCalendarData();
    setSelectedDate(new Date());
  }, [selectedEmployee, data]);
  // useEffect(() => {
  //   fetchCalendarData();
  //   setSelectedDate(new Date());
  // }, [selectedEmployee, data]);

  const removeSelected = () => {
    setSelectedEmployee();
  };

  const changeMonth = (month) => {
    setData(month);
  };

  const closeSalarySummaryModal = () => {
    setSalarySummaryModal(false);
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={{ marginHorizontal: 10, marginTop: 10 }}>
          {user.userType === "U" ? (
            <></>
          ) : (
            <FilterDataComponent
              data={selectedEmployee ? [selectedEmployee] : []}
              setData={(item) => {
                setSelectedEmployee({ ...item });
              }}
              removeData={() => removeSelected()}
              removeAll={() => removeSelected()}
              type={"Calendar"}
            ></FilterDataComponent>
          )}
        </View>
        <Calendar
          current={new Date()}
          onMonthChange={(month) => changeMonth(month)}
          onDayPress={(date) => {
            if (Object.entries(dataToReturn).length > 0) {
              setSelectedDate(new Date(date.dateString));
              setShowCalendarModal(!showCalendarModal);
            }
          }}
          markingType={"multi-dot"}
          markedDates={dots()}
        ></Calendar>
        <CalendarModal
          selectedDate={formatDateNew(selectedDate, null, "yyyy-MM-DD")}
          data={Object.entries(dataToReturn)}
          showModal={showCalendarModal}
          onCloseModal={() => setShowCalendarModal(!showCalendarModal)}
          index={Object.entries(dataToReturn).findIndex(
            (x) => formatDateNew(selectedDate, null, "yyyy-MM-DD") === x[0]
          )}
          selectedEmployee={selectedEmployee?.data || user}
          fetchSelectedDateSummary={fetchDateSummary}
          attendanceDateSummary={attendanceDateSummary}
          removeDateSummaryData={removeDateSummaryData}
        />
        <SalarySummaryModal
          showModal={salarySummaryModal}
          onCloseModal={closeSalarySummaryModal}
          salaryMonthSummary={salaryMonthSummary}
          fetchSalaryMonthSummary={fetchSalaryMonthSummary}
          user={selectedEmployee ? selectedEmployee.data : user}
        ></SalarySummaryModal>
      </View>
      <TouchableOpacity
        style={{
          // height: 60,
          position: "absolute",
          right: 20,
          backgroundColor: "#3743f0",
          bottom: 30,
          borderRadius: 10,
        }}
        onPress={() => setSalarySummaryModal(true)}
      >
        <Text
          style={{
            zIndex: 999,

            // padding: 15,
            margin: 15,

            color: "#FFF",
            fontWeight: "bold",
            // shadowOpacity: 0.8,
            // elevation: 6,
            shadowRadius: 5,
            // shadowOffset: { width: 3, height: 3 },
            // width: 100,
          }}
        >
          Summary
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
const mapStateToProps = ({
  attendanceCalendar,
  user,
  attendanceDateSummary,
  salaryMonthSummary,
}) => ({
  attendanceCalendar,
  user,
  attendanceDateSummary,
  salaryMonthSummary,
});
export default connect(mapStateToProps, {
  fetchAttendanceCalendar,
  removeCalendarData,
  fetchDateSummary,
  removeDateSummaryData,
  fetchSalaryMonthSummary,
})(CalendarForMobile);

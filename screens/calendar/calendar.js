import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// import { Linking } from "react-native";
import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";
import {
  Agenda,
  Day,
  Inject,
  Month,
  ScheduleComponent,
  ViewDirective,
  ViewsDirective,
  Week,
  WorkWeek,
} from "@syncfusion/ej2-react-schedule";
import moment from "moment";
import { connect } from "react-redux";
import "../../App.css";
import config from "../../config/config";
import {
  fetchDateSummary,
  fetchSalaryMonthSummary,
  removeDateSummaryData,
} from "../../redux/actions/calendar.action";
import FilterDataComponent from "../leave/filterDataComponent";
import DatePunchModal from "./date-punch-modal";
import SalarySummaryModal from "./salary-summary-modal";

const Calendar = ({
  user,
  fetchDateSummary,
  attendanceDateSummary,
  removeDateSummaryData,
  fetchSalaryMonthSummary,
  salaryMonthSummary,
}) => {
  let scheduleObj = useRef();
  function onEventRendered(args) {
    var categoryColor = args.data.Color;
    if (!args.element || !categoryColor) {
      return;
    }

    args.element.style.backgroundColor = categoryColor;
    args.element.style.color = args.data.fontColor;
    // args.element.style.padding = "2px";
    // let timeDocs = document.getElementsByClassName("e-time");
    // for (var i = 0; i < timeDocs.length; i++) {
    //   timeDocs[i].style.display = "none";
    // }

    // for (var i = 0; i < agendaTitle.length; i++) {
    //   console.log(agendaTitle[i]);
    //   agendaTitle[i].style.color = "#000";
    // }
  }
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [salarySummaryModal, setSalarySummaryModal] = useState(false);
  const [dataManger, setDataManager] = useState(
    new DataManager({
      url: `${
        config.baseUrl
      }api/calendar/txn/attendance/web/${user.empCode.trim()}/${user.empSite.trim()}`,
      adaptor: new WebApiAdaptor(),
      crossDomain: true,
    })
  );
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
    if (
      selectedEmployee &&
      selectedEmployee.data &&
      selectedEmployee.data.empCode &&
      selectedEmployee.data.empSite
    ) {
      setDataManager(
        new DataManager({
          url: `${
            config.baseUrl
          }api/calendar/txn/attendance/web/${selectedEmployee.data.empCode.trim()}/${selectedEmployee.data.empSite.trim()}`,
          adaptor: new WebApiAdaptor(),
          crossDomain: true,
        })
      );
    }
  }, [selectedEmployee]);

  const removeSelected = () => {
    setSelectedEmployee();
    setDataManager(
      new DataManager({
        url: `${
          config.baseUrl
        }api/calendar/txn/attendance/web/${user.empCode.trim()}/${user.empSite.trim()}`,
        adaptor: new WebApiAdaptor(),
        crossDomain: true,
      })
    );
  };
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("/");
  }

  const closeSummaryModal = () => {
    setShowSummaryModal(false);
    removeDateSummaryData();
  };

  const closeSalarySummaryModal = () => {
    setSalarySummaryModal(false);
  };

  return (
    <View style={styles.container}>
      <View style={{ padding: 7 }}>
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
      <DatePunchModal
        attendanceDateSummary={attendanceDateSummary}
        showModal={showSummaryModal}
        onCloseModal={closeSummaryModal}
      ></DatePunchModal>
      <SalarySummaryModal
        showModal={salarySummaryModal}
        onCloseModal={closeSalarySummaryModal}
        salaryMonthSummary={salaryMonthSummary}
        fetchSalaryMonthSummary={fetchSalaryMonthSummary}
        user={selectedEmployee ? selectedEmployee.data : user}
      ></SalarySummaryModal>
      <ScheduleComponent
        eventClick={(date) => {
          fetchDateSummary({
            empCode: selectedEmployee
              ? selectedEmployee.data.empCode
              : user.empCode,
            eventDate: convert(date.event.StartTime),
            toDate: convert(date.event.StartTime),
          });
          setTimeout(() => {
            setShowSummaryModal(true);
          }, 2000);
        }}
        showQuickInfo={false}
        width="100%"
        height="130%"
        enableAllDayScroll={true}
        ref={(schedule) => (scheduleObj = schedule)}
        eventSettings={{
          dataSource: dataManger,
        }}
        readonly={true}
        currentView={"Month"}
        eventRendered={onEventRendered.bind(this)}
        rowAutoHeight={true}
        // timeScale={{ enable: false }}
        startHour={"00:00"}
        endHour={"24:00"}
      >
        <ViewsDirective>
          <ViewDirective option="Day"></ViewDirective>
          <ViewDirective option="Week"></ViewDirective>
          <ViewDirective option="Month"></ViewDirective>
        </ViewsDirective>

        <Inject services={[Day, Week, WorkWeek, Month, Agenda]}></Inject>
      </ScheduleComponent>
      <TouchableOpacity onPress={() => setSalarySummaryModal(true)}>
        <Text
          style={{
            position: "absolute",
            zIndex: 999,
            right: 30,
            bottom: 30,
            padding: 20,
            borderRadius: 10,
            backgroundColor: "#0000FFA0",
            color: "#FFF",
            fontWeight: "bold",
            shadowColor: "#696969",
            shadowOpacity: 0.8,
            elevation: 6,
            shadowRadius: 5,
            shadowOffset: { width: 3, height: 3 },
            width: 110,
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
    marginHorizontal: 10,
  },
});
const mapStateToProps = ({
  user,
  token,
  attendanceDateSummary,
  salaryMonthSummary,
}) => ({
  user,
  token,
  attendanceDateSummary,
  salaryMonthSummary,
});
export default connect(mapStateToProps, {
  fetchDateSummary,
  removeDateSummaryData,
  fetchSalaryMonthSummary,
})(Calendar);

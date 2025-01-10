import moment from "moment";
import React, { useEffect, useReducer, useState } from "react";
import CalendarPicker from "react-native-calendar-picker";
import DropDownPicker from "react-native-dropdown-picker";

import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import ModalContainer from "../../components/modalContainer/modal";
import Button from "../buttons/button";

if (Platform.OS !== "web") {
  DropDownPicker.setListMode("MODAL");
}

const dateRangeReducer = (state, action) => {
  return action.action === "INIT"
    ? action.value
    : action.action === "END_DATE"
    ? [state[0], action.date]
    : [action.date, state[1]];
};

const FilterComponent = ({
  filterConfig,
  onFilterChange,
  type,
  update,
  addError,
  maxDate,
  dateStyle,
  minDate,
  fontSize,
  containerStyle,
  disabled,
  viewType,
}) => {
  //   console.log("filter fil",filterConfig);imp
  //   console.log("filter onF",onFilterChange);imp
  //   console.log("filter ty",type);imp
  // console.log("filter up",update);
  // console.log("filter add",addError);
  // console.log("filter max",maxDate);
  // console.log("filter date",dateStyle);
  // console.log("filter min",minDate);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const { width, height } = useWindowDimensions();
  const [datesSelected, setDatesSelected] = useReducer(dateRangeReducer, [
    new Date(),
    moment().subtract(1, "y").toDate(),
  ]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  useEffect(() => {
    if (filterConfig?.value) {
      setDatesSelected({ value: filterConfig.value, action: "INIT" });
    } else {
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
      ).toDate();
      eventToDate = moment(new Date()).toDate();
      setDatesSelected({ value: [eventFromDate, eventToDate], action: "INIT" });
    }
  }, [filterConfig]);

  const setDateForRangePicker = (obj) => {
    if (obj.action == "START_DATE") {
      setStartDate(obj.date);
    } else if (obj.action == "END_DATE") {
      setEndDate(obj.date);
    } else if (obj.action == "SET_DATE") {
      setDatesSelected({
        action: "END_DATE",
        startDate: startDate,
        endDate: endDate,
      });
    }
  };

  const onCloseCalendarModal = () => {
    setShowDatePicker(false);
    if ((type === "date" && selectedDate) || (startDate && endDate)) {
      setDateForRangePicker({ action: "SET_DATE" });
      let obj =
        type === "date"
          ? {
              value: selectedDate,
            }
          : {
              value: [startDate, endDate],
            };
      onFilterChange(obj);
    } else {
      addError(
        type === "date"
          ? "Please select a Date"
          : "Please select a valid date range",
        3000
      );
    }
  };
  const handleCallback = () => {
    setShowDatePicker(showDatePicker ? false : true);
  };

  return (
    <View
      style={[
        {
          // flex: 1,
          backgroundColor: viewType ? "#C7BEF0" : "white",
          width: "100%",
        },
        containerStyle && containerStyle,
      ]}
    >
      <TouchableOpacity
        style={{
          // flex: 1,
          justifyContent: "center",
        }}
        disabled={disabled}
        onPress={() => {
          setShowDatePicker(showDatePicker || update ? false : true);
        }}
      >
        {type === "date" ? (
          <Text
            style={
              dateStyle
                ? dateStyle
                : {
                    color: "black",
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: fontSize,
                  }
            }
          >
            {filterConfig?.value || filterConfig?.defaultValue1
              ? `${moment(
                  new Date(filterConfig?.value || filterConfig?.defaultValue)
                ).format("DD/MM/yyyy")}`
              : "Please Select!"}
          </Text>
        ) : (
          <Text
            style={{
              color: "black",
              fontSize: fontSize,
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            {filterConfig?.value || filterConfig?.defaultValue
              ? `${moment(
                  new Date(
                    (filterConfig?.value || filterConfig?.defaultValue)[0]
                  )
                ).format("DD/MM/yyyy")}-${moment(
                  new Date(
                    (filterConfig?.value || filterConfig?.defaultValue)[1]
                  )
                ).format("DD/MM/yyyy")}`
              : ""}
          </Text>
        )}
      </TouchableOpacity>
      {showDatePicker ? (
        <ModalContainer
          showModal={showDatePicker}
          onRequestCloseModal={handleCallback}
          titleDisable={true}
          modalStyle={{
            minWidth: 280,
            maxWidth: 350,
          }}
          modalContentStyle={{
            width: 310,
            minHeight: 320,
            maxHeight: 320,
          }}
          modalContent={
            <View
              style={{
                flexDirection: "column",
                flex: 1,
                justifyContent: "space-between",
              }}
            >
              <View style={{ marginTop: 20 }}>
                {type === "dateRange" ? (
                  <CalendarPicker
                    allowRangeSelection={true}
                    minDate={new Date("2016-1-1")}
                    maxDate={maxDate || new Date()}
                    todayBackgroundColor="#e6ffe6"
                    selectedDayColor="rgb(155, 43, 44)"
                    selectedDayTextColor="#000000"
                    textStyle={{
                      color: "#000000",
                    }}
                    width={Math.min(width, 300)}
                    height={Math.min(height, 400)}
                    onDateChange={(date, startOrEnd) => {
                      setDateForRangePicker({
                        date: date?.toDate(),
                        action: startOrEnd,
                      });
                    }}
                    allowBackwardRangeSelect={false}
                    scaleFactor={365}
                    selectedStartDate={datesSelected && datesSelected[0]}
                    selectedEndDate={datesSelected && datesSelected[1]}
                  />
                ) : (
                  <CalendarPicker
                    allowRangeSelection={false}
                    minDate={minDate}
                    maxDate={maxDate || new Date()}
                    todayBackgroundColor="#e6ffe6"
                    selectedDayColor="rgb(155, 43, 44)"
                    selectedDayTextColor="#000000"
                    textStyle={{
                      color: "#000000",
                    }}
                    width={Math.min(width, 300)}
                    height={Math.min(height, 400)}
                    onDateChange={(date) => {
                      setSelectedDate(date);
                    }}
                    allowBackwardRangeSelect={false}
                    scaleFactor={365}
                    selectedStartDate={datesSelected}
                  />
                )}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginHorizontal: 5,
                  marginBottom: 20,
                  justifyContent: "space-evenly",
                }}
              >
                <Button
                  onPress={() => onCloseCalendarModal()}
                  title="Select"
                  color="rgb(155, 43, 44)"
                ></Button>
                <Button
                  onPress={() => {
                    setShowDatePicker(false);
                  }}
                  title="Cancel"
                  color="rgb(155, 43, 44)"
                ></Button>
              </View>
            </View>
          }
        ></ModalContainer>
      ) : (
        <></>
      )}
    </View>
  );
};

export default FilterComponent;
const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 16,
    height: 44,
    borderBottomWidth: 1,
    borderColor: "#D3D3D3",
    minWidth: "95%",
    textAlign: "center",
  },
});

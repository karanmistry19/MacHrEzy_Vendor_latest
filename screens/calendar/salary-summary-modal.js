import moment from "moment";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Icon from "../../components/icons";
import ModalContainer from "../../components/modalContainer/modal";
import PopUp from "../../components/popUp/popUp";
import CardData from "./card-data";
const DatePunchModal = ({
  showModal,
  onCloseModal,
  salaryMonthSummary,
  fetchSalaryMonthSummary,
  user,
  currentDate = new Date(),
}) => {
  let year = new Date().getFullYear() - 20;
  const monthData = [
    { name: "January", index: 0 },
    { name: "February", index: 1 },
    { name: "March", index: 2 },
    { name: "April", index: 3 },
    { name: "May", index: 4 },
    { name: "June", index: 5 },
    { name: "July", index: 6 },
    { name: "August", index: 7 },
    { name: "September", index: 8 },
    { name: "October", index: 9 },
    { name: "November", index: 10 },
    { name: "December", index: 11 },
  ];
  const yearData = Array.from({ length: 42 }, (_, i) => ({
    name: year + i,
  }));
  const [selectedMonth, setSelectedMonth] = useState({
    ...monthData.find((x) => x.index === currentDate.getMonth()),
  });
  const [selectedYear, setSelectedYear] = useState({
    name: new Date().getFullYear(),
  });

  useEffect(() => {
    if (selectedMonth && selectedYear) {
      let eventFromDate, eventToDate;
      eventFromDate = moment(
        new Date(selectedYear.name, selectedMonth.index - 1, 16, 12)
      ).format("YYYY-MM-DD");
      eventToDate = moment(
        new Date(selectedYear.name, selectedMonth.index, 15, 12)
      ).format("YYYY-MM-DD");
      fetchSalaryMonthSummary({
        empCode: user.empCode.trim(),
        eventDate: eventFromDate,
        toDate: eventToDate,
      });
    }
  }, [selectedMonth, selectedYear]);

  const closeModal = () => {
    onCloseModal();
    setSelectedMonth({
      ...monthData.find((x) => x.index === new Date().getMonth()),
    });
    setSelectedYear({
      name: new Date().getFullYear(),
    });
  };

  return (
    <ModalContainer
      showModal={showModal}
      modalStyle={{
        minWidth: 400,
        maxWidth: 500,
        height: 300,
      }}
      modalContentStyle={{
        width: "100%",
        minHeight: 300,
        maxHeight: 300,
      }}
      title={`Salary Summary`}
      onClose={() => closeModal()}
      modalContent={
        <View
          style={
            ([styles.modalView],
            {
              paddingHorizontal: 10,
              top: 10,
              marginLeft: 10,
            })
          }
        >
          <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
            <View style={{ justifyContent: "center" }}>
              <Icon name={"calendar"} width={20} height={20}></Icon>
            </View>
            <PopUp
              renderData={monthData}
              placeholder="Select Month"
              iconStyle={{ color: "#BBBBBB" }}
              placeholderStyle={{ fontSize: 15 }}
              readOnly={false}
              style={{
                minHeight: 25,
                maxHeight: 25,
                width: "90%",
                borderColor: "#BBBBBB",
                flex: 1,
                fontSize: 15,
                marginHorizontal: 5,
              }}
              selectedItemStyle={{ marginBottom: 0 }}
              onSelection={(item) => setSelectedMonth({ ...item })}
              selectionValue={selectedMonth}
              index={monthData.findIndex(
                (x) => x.index === selectedMonth.index
              )}
            ></PopUp>
            <PopUp
              renderData={yearData}
              placeholder="Select Year"
              iconStyle={{ color: "#BBBBBB" }}
              placeholderStyle={{ fontSize: 15 }}
              readOnly={false}
              style={{
                minHeight: 25,
                maxHeight: 25,
                width: "90%",
                borderColor: "#BBBBBB",
                flex: 1,
                fontSize: 15,
                marginHorizontal: 5,
              }}
              onSelection={(item) => setSelectedYear({ ...item })}
              selectionValue={selectedYear}
              index={yearData.findIndex((x) => x.name === selectedYear.name)}
            ></PopUp>
          </View>
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}
          >
            <CardData
              style={styles.contentView}
              label={"Present Days"}
              data={salaryMonthSummary?.presentDays}
            ></CardData>

            <CardData
              style={styles.contentView}
              label="Paid Days"
              data={salaryMonthSummary?.paidDays}
            ></CardData>
            <CardData
              style={styles.contentView}
              label="Absent Days"
              data={salaryMonthSummary?.absentDays}
            ></CardData>
            <CardData
              style={styles.contentView}
              label="DWR Days"
              data={salaryMonthSummary?.dwrDays}
            ></CardData>
            <CardData
              style={styles.contentView}
              label="Meal Amount"
              data={salaryMonthSummary?.mealAmt}
            ></CardData>
            {user.category === "STAFF" ? (
              <CardData
                style={styles.contentView}
                label="PP Amount"
                data={salaryMonthSummary?.ppAmt}
              ></CardData>
            ) : (
              <CardData
                style={styles.contentView}
                label="OT Hours"
                data={salaryMonthSummary?.otHours}
              ></CardData>
            )}
          </View>
        </View>
      }
      onRequestCloseModal={() => closeModal()}
    ></ModalContainer>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
  },
  modalView: {
    backgroundColor: "#EAEAEA",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.77,
    shadowOffset: { width: 3, height: 2 },
    shadowRadius: 10,
    elevation: 20,
    zIndex: 999,
  },
  item: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "center",
  },
  date: {
    alignItems: "center",
    marginRight: 10,
    marginTop: 2,
  },
  dateText: {
    fontSize: 14,
    lineHeight: 15,
    fontWeight: "bold",
  },
  title: {
    width: "100%",
    flex: 1,
  },
  datePunchTitle: {
    color: "#9B2B2C",
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 15,
    marginVertical: 5,
  },
  contentView: {
    minWidth: "50%",
    maxWidth: "50%",
    marginVertical: 10,
  },
  contentText: {
    fontSize: 14,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
});
export default DatePunchModal;

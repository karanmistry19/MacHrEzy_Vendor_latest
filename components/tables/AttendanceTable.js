import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { DimensionContext } from "../dimensionContext";

const data = [
  {
    id: 1,
    appliedOn: "2022-03-28",
    leaveDate: "2022-03-29",
    approved: "Yes",
    type: "Sick Leave",
    reason: "Fever",
  },
  {
    id: 2,
    appliedOn: "2022-03-29",
    leaveDate: "2022-03-30",
    approved: "No",
    type: "Casual Leave",
    reason: "Personal reasons",
  },
  {
    id: 3,
    appliedOn: "2022-03-30",
    leaveDate: "2022-03-31",
    approved: "Yes",
    type: "Annual Leave",
    reason: "Vacation",
  },
  {
    id: 4,
    appliedOn: "2022-03-30",
    leaveDate: "2022-03-31",
    approved: "Yes",
    type: "Annual Leave",
    reason: "Vacation",
  },
  {
    id: 5,
    appliedOn: "2022-04-01",
    leaveDate: "2022-04-02",
    approved: "Yes",
    type: "Sick Leave",
    reason: "Migraine",
  },
  {
    id: 6,
    appliedOn: "2022-04-02",
    leaveDate: "2022-04-03",
    approved: "Yes",
    type: "Casual Leave",
    reason: "Family Function",
  },
  {
    id: 7,
    appliedOn: "2022-04-05",
    leaveDate: "2022-04-06",
    approved: "No",
    type: "Annual Leave",
    reason: "Visiting Relatives",
  },
  {
    id: 8,
    appliedOn: "2022-04-07",
    leaveDate: "2022-04-08",
    approved: "Yes",
    type: "Sick Leave",
    reason: "Food Poisoning",
  },
  {
    id: 9,
    appliedOn: "2022-04-09",
    leaveDate: "2022-04-13",
    approved: "Yes",
    type: "Annual Leave",
    reason: "Holiday",
  },
  {
    id: 9,
    appliedOn: "2022-04-14",
    leaveDate: "2022-04-15",
    approved: "No",
    type: "Sick Leave",
    reason: "Allergic Reaction",
  },
  {
    id: 11,
    appliedOn: "2022-04-17",
    leaveDate: "2022-04-18",
    approved: "Yes",
    type: "Casual Leave",
    reason: "Personal reasons",
  },
  {
    id: 12,
    appliedOn: "2022-04-20",
    leaveDate: "2022-04-21",
    approved: "Yes",
    type: "Annual Leave",
    reason: "Vacation",
  },
  {
    id: 13,
    appliedOn: "2022-04-22",
    leaveDate: "2022-04-23",
    approved: "No",
    type: "Sick Leave",
    reason: "Fever",
  },
];

const AttendanceTable = ({ mobile }) => {
  const { window } = useContext(DimensionContext);
  const [page, setPage] = useState(0);
  const [tableData, setTableData] = useState(data.slice(0, 4));
  const onPageClick = (item) => {
    setPage(item);
    console.log(item);
    setTableData(data.slice(item * 4, (item + 1) * 4));
  };
  return (
    <View>
      <View
        style={
          mobile
            ? [
                styles.container,
                {
                  padding: 0,
                  borderRadius: 0,
                },
              ]
            : [
                styles.container,
                {
                  backgroundColor: "#F5F5FB",
                  shadowColor: "#696969",
                  shadowOpacity: 0.8,
                  elevation: 6,
                  shadowRadius: 5,
                  shadowOffset: { width: 3, height: 3 },
                },
              ]
        }
      >
        <View style={styles.header}>
          <View style={styles.cell}>
            <Text
              style={[
                styles.headerText,
                { fontSize: window.width > 600 ? 16 : 9 },
              ]}
            >
              Sr. No.
            </Text>
          </View>
          <View style={styles.cell}>
            <Text
              style={[
                styles.headerText,
                { fontSize: window.width > 600 ? 16 : 9 },
              ]}
            >
              Applied On
            </Text>
          </View>
          <View style={styles.cell}>
            <Text
              style={[
                styles.headerInActiveText,
                { fontSize: window.width > 600 ? 16 : 9, padding: 3 },
              ]}
            >
              Leave Date
            </Text>
          </View>
          <View style={styles.cell}>
            <Text
              style={[
                styles.headerText,
                { fontSize: window.width > 600 ? 16 : 9 },
              ]}
            >
              Approved
            </Text>
          </View>
          <View style={styles.cell}>
            <Text
              style={[
                styles.headerInActiveText,
                { fontSize: window.width > 600 ? 16 : 9 },
              ]}
            >
              Type
            </Text>
          </View>
          <View style={styles.cell}>
            <Text
              style={[
                styles.headerText,
                { fontSize: window.width > 600 ? 16 : 9 },
              ]}
            >
              Reason
            </Text>
          </View>
        </View>
        {tableData.map((item) => (
          <View key={item.id} style={styles.row}>
            <View style={styles.cell}>
              <Text
                style={[
                  styles.content,
                  { fontSize: window.width > 600 ? 16 : 9 },
                ]}
              >
                {item.id}
              </Text>
            </View>
            <View style={styles.cell}>
              <Text
                style={[
                  styles.content,
                  { fontSize: window.width > 600 ? 16 : 9 },
                ]}
              >
                {item.appliedOn}
              </Text>
            </View>
            <View style={styles.cell}>
              <Text
                style={[
                  styles.content,
                  { fontSize: window.width > 600 ? 16 : 9 },
                ]}
              >
                {item.leaveDate}
              </Text>
            </View>
            <View style={styles.cell}>
              <Text
                style={[
                  styles.content,
                  { fontSize: window.width > 600 ? 16 : 9 },
                ]}
              >
                {item.approved}
              </Text>
            </View>
            <View style={styles.cell}>
              <Text
                style={[
                  styles.content,
                  { fontSize: window.width > 600 ? 16 : 9 },
                ]}
              >
                {item.type}
              </Text>
            </View>
            <View style={styles.cell}>
              <Text
                style={[
                  styles.content,
                  { fontSize: window.width > 600 ? 16 : 9 },
                ]}
              >
                {item.reason}
              </Text>
            </View>
          </View>
        ))}
      </View>
      <View style={{ marginLeft: "auto", marginRight: 9 }}>
        <View style={{ flexDirection: "row" }}>
          <FontAwesome
            name="chevron-left"
            onPress={() => {
              if (page >= 1) onPageClick(page - 1);
            }}
            size={20}
            color="#6C757D"
            style={{ padding: 5 }}
          />
          {Array(4)
            .fill()
            .map((item, index) => (
              <Text
                key={index}
                onPress={() => onPageClick(index)}
                style={
                  index == page
                    ? styles.paginationItemActive
                    : styles.paginationItem
                }
              >
                {index + 1}
              </Text>
            ))}
          <FontAwesome
            onPress={() => {
              if (page < 3) onPageClick(page + 1);
            }}
            name="chevron-right"
            size={20}
            color="#6C757D"
            style={{ padding: 5 }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  paginationItem: {
    height: 30,
    width: 30,
    textAlign: "center",
    fontFamily: "Roboto",
    color: "#6C757D",
    justifyContent: "center",
    padding: 5,
    borderRadius: 2,
  },
  paginationItemActive: {
    height: 30,

    width: 30,
    textAlign: "center",
    fontFamily: "Roboto",
    color: "white",
    justifyContent: "center",
    backgroundColor: "#9F232B",
    padding: 5,
    borderRadius: 2,
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,

    margin: 9,
    marginTop: 20,
    borderRadius: 9,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 9,
    backgroundColor: "#e6e6e8",
    paddingVertical: 8,
  },
  content: { fontSize: 16, color: "#6F6C99" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E8F2",
    paddingVertical: 15,
  },
  cell: {
    flex: 1,
    alignItems: "center",
    margin: 2,
  },
  headerText: {
    fontWeight: "500",
    fontSize: 16,
    fontFamily: "Roboto",
    color: "#9F232B",
  },
  headerInActiveText: {
    fontWeight: "500",
    fontSize: 16,
    fontFamily: "Roboto",
    backgroundColor: "#9F232B",
    color: "white",
    borderRadius: 400,
    textAlign: "center",
    width: "90%",
    paddingTop: 5,
    paddingBottom: 5,
  },
});

export default AttendanceTable;

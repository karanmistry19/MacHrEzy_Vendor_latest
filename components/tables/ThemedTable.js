import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DimensionContext } from "../dimensionContext";

const ThemedTable = ({ header, mobile, tableDataNew }) => {
  const { window } = useContext(DimensionContext);

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
          {header.map((item) => (
            <View style={styles.cell}>
              <Text
                style={[
                  styles.headerText,
                  {
                    fontSize: window.width > 600 ? 16 : 9,
                    margin: window.width > 600 ? 10 : 2,
                  },
                ]}
              >
                {item.label}
              </Text>
            </View>
          ))}
        </View>

        {tableDataNew.map((item) => (
          <View key={item.id} style={styles.row}>
            {header.map((info) => (
              <View style={styles.cell}>
                <Text
                  style={[
                    styles.content,
                    { fontSize: window.width > 600 ? 16 : 9 },
                  ]}
                >
                  {item[info.value]}
                </Text>
              </View>
            ))}
          </View>
        ))}
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
    // paddingTop: 30,

    margin: 9,
    // marginTop: 20,
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
    paddingVertical: 5,
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

export default ThemedTable;

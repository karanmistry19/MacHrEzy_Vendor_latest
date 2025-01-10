import * as WebBrowser from "expo-web-browser";
import React, { useContext, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { connect } from "react-redux";
import Button from "../../components/compensation/btn";
import { DimensionContext } from "../../components/dimensionContext";
import Icon from "../../components/icons";
import PopUp from "../../components/popUp/popUp";
import config from "../../config/config";
import { addError } from "../../redux/actions/toast.action";

const PaySlipScreen = ({ user, addError, navigation }) => {
  const dimension = useContext(DimensionContext);

  let year = new Date().getFullYear() - 20;
  const yearData = Array.from({ length: 21 }, (_, i) => ({
    name: year + i,
  }));
  const monthData = [
    { name: "January", index: "01" },
    { name: "February", index: "02" },
    { name: "March", index: "03" },
    { name: "April", index: "04" },
    { name: "May", index: "05" },
    { name: "June", index: "06" },
    { name: "July", index: "07" },
    { name: "August", index: "08" },
    { name: "September", index: "09" },
    { name: "October", index: "10" },
    { name: "November", index: "11" },
    { name: "December", index: "12" },
  ];
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedYear, setSelectedYear] = useState();
  const [selectedEmployee, setSelectedEmployee] = useState();

  const downloadDocument = async () => {
    if (selectedMonth && selectedYear) {
      if (Platform.OS != "web") {
        await WebBrowser.openBrowserAsync(
          `${config.baseUrl}api/compensation/download/payslip?empCode=${
            selectedEmployee?.data?.empCode?.trim() || user.empCode.trim()
          }&period=${selectedYear.name + "" + selectedMonth.index}&type=PaySlip`
        );
      } else {
        window
          .open(
            `${config.baseUrl}api/compensation/download/payslip?empCode=${
              selectedEmployee?.data?.empCode?.trim() || user.empCode.trim()
            }&period=${
              selectedYear.name + "" + selectedMonth.index
            }&type=PaySlip`,
            "_blank"
          )
          .focus();
      }
    } else {
      addError("Please select a valid month and year first!", 3000);
    }
  };

  const removeSelected = () => {
    setSelectedEmployee();
  };

  return (
    <View style={{ margin: 10 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="back"></Icon>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 17,
            fontWeight: "bold",
            padding: 10,
          }}
        >
          Payslip
        </Text>
      </View>
      {/* <View style={{ padding: 7 }}>
        {user.userType === "U" ? (
          <></>
        ) : (
          <FilterDataComponent
            data={selectedEmployee ? [selectedEmployee] : []}
            setData={(item) => {
              setSelectedEmployee({ ...item });
            }}
            iconDisable={true}
            removeData={() => removeSelected()}
            removeAll={() => removeSelected()}
            type={"Calendar"}
            style={{
              backgroundColor: "#FFF",
              minHeight: 50,
              alignItems: "center",
            }}
          ></FilterDataComponent>
        )}
      </View> */}
      <View style={styles.selectContainer}>
        <View style={{ width: dimension.window.width / 2 - 20 }}>
          <PopUp
            renderData={monthData}
            placeholder="Select Month"
            iconStyle={{ color: "#BBBBBB", marginTop: 10 }}
            placeholderContainerStyle={{
              marginHorizontal: 3,
              color: "gray",
            }}
            placeholderStyle={{
              fontSize: 16,
              alignSelf: "center",
            }}
            selectedItemStyle={{
              fontSize: 16,
              marginHorizontal: 5,
              marginVertical: 3,
            }}
            style={styles.popup}
            onSelection={(item) => setSelectedMonth(item)}
            index={
              monthData.find((x) => Number(x.index) === new Date().getMonth())
                .index
            }
          />
        </View>
        <View style={{ width: dimension.window.width / 2 - 20 }}>
          <PopUp
            renderData={yearData}
            placeholder="Select Year"
            iconStyle={{ color: "#BBBBBB", marginTop: 10 }}
            placeholderContainerStyle={{
              marginHorizontal: 3,
              color: "gray",
            }}
            placeholderStyle={{
              fontSize: 16,
            }}
            readOnly={false}
            selectedItemStyle={{ fontSize: 16, margin: 5 }}
            style={styles.popup}
            onSelection={(item) => setSelectedYear(item)}
            index={yearData.findIndex(
              (x) => x.name === new Date().getFullYear()
            )}
          />
        </View>
      </View>
      <View style={{ marginTop: 80 }}>
        <Button
          onPress={() => downloadDocument()}
          textStyle={{ padding: 5 }}
          title={"Download Report"}
          icon={"pdf"}
        />
      </View>
    </View>
  );
};

const mapStateToProps = ({ user }) => ({
  user,
});
export default connect(mapStateToProps, { addError })(PaySlipScreen);

const styles = StyleSheet.create({
  selectContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  popup: {
    minHeight: 50,
    maxHeight: 50,
    borderRadius: 5,
    marginLeft: 1,
    padding: 7,
    backgroundColor: "white",
    borderColor: "#ffffff",
    width: "100%",
    shadowColor: "#696969",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 1 },
  },
});

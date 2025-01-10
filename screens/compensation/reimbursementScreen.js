import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { connect } from "react-redux";
import Button from "../../components/compensation/btn";
import Icon from "../../components/icons";
import PopUp from "../../components/popUp/popUp";
import config from "../../config/config";
import { addError } from "../../redux/actions/toast.action";

const ReimbursementScreen = ({
  user,
  addError,
  route,
  navigation,
  accountingPeriods,
}) => {
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [selectedPeriod, setSelectedPeriod] = useState();

  let data = route.params?.destination;
  const downloadDocument = async () => {
    if (selectedPeriod) {
      if (Platform.OS != "web") {
        await WebBrowser.openBrowserAsync(
          `${config.baseUrl}api/compensation/download/${data}?empCode=${
            selectedEmployee?.data?.empCode?.trim() || user.empCode.trim()
          }&period=${selectedPeriod.code.trim()}`
        );
      } else {
        window
          .open(
            `${config.baseUrl}api/compensation/download/${data}?empCode=${
              selectedEmployee?.data?.empCode?.trim() || user.empCode.trim()
            }&period=${selectedPeriod.code.trim()}`,
            "_blank"
          )
          .focus();
      }
    } else {
      addError("Please select a valid period first!", 3000);
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
          {data === "ledger" ? "Ledger" : "Reimbursment"}
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
            removeData={() => removeSelected()}
            removeAll={() => removeSelected()}
            type={"Calendar"}
            iconDisable={true}
            style={{
              backgroundColor: "#FFF",
              minHeight: 50,
              alignItems: "center",
            }}
          ></FilterDataComponent>
        )}
      </View> */}

      <View>
        <PopUp
          renderData={accountingPeriods}
          placeholder="Select a Period"
          iconStyle={{ color: "#BBBBBB", marginTop: 10 }}
          placeholderContainerStyle={{
            color: "gray",
            marginLeft: 10,
            marginTop: 5,
          }}
          placeholderStyle={{
            fontSize: 16,
          }}
          readOnly={false}
          style={styles.list}
          displayField={"code"}
          selectedItemStyle={{ fontSize: 16, alignSelf: "center" }}
          onSelection={(item) => setSelectedPeriod(item)}
        />
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

const mapStateToProps = ({ user, accountingPeriods }) => ({
  user,
  accountingPeriods,
});
export default connect(mapStateToProps, { addError })(ReimbursementScreen);

const styles = StyleSheet.create({
  selectContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
    width: "100%",
  },
  month: {
    minHeight: 50,
    maxHeight: 50,
    borderRadius: 5,

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
  year: {
    minHeight: 50,
    maxHeight: 50,
    borderRadius: 5,

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
  list: {
    minHeight: 50,
    maxHeight: 50,
    borderRadius: 5,
    // margin: 2,
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

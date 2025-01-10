import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PopUp from "../../components/popUp/popUp";

import * as WebBrowser from "expo-web-browser";
import { connect } from "react-redux";
import Button from "../../components/compensation/btn";
import Icon from "../../components/icons";
import config from "../../config/config";
import { addError } from "../../redux/actions/toast.action";

const FormSixteenScreen = ({
  user,
  addError,
  navigation,
  accountingPeriods,
}) => {
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [selectedPeriod, setSelectedPeriod] = useState();

  const downloadDocument = async (part) => {
    if (selectedPeriod) {
      if (Platform.OS != "web") {
        await WebBrowser.openBrowserAsync(
          `${config.baseUrl}api/compensation/download/form16?empCode=${
            selectedEmployee?.data?.empCode?.trim() || user.empCode.trim()
          }&period=${selectedPeriod.code.trim()}&part=${part}`
        );
      } else {
        window
          .open(
            `${config.baseUrl}api/compensation/download/form16?empCode=${
              selectedEmployee?.data?.empCode?.trim() || user.empCode.trim()
            }&period=${selectedPeriod.code.trim()}&part=${part}`,
            "_blank"
          )
          .focus();
      }
    } else {
      addError("Please select a valid period!", 3000);
    }
  };
  const removeSelected = () => {
    setSelectedEmployee();
  };

  return (
    <View style={styles.Container}>
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
          Form 16
        </Text>
      </View>
      {/* {user.userType === "U" ? (
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
      )} */}
      <View style={styles.popHeight}>
        <PopUp
          renderData={accountingPeriods}
          placeholder="Select Assessment Period"
          iconStyle={{ color: "#BBBBBB", marginTop: 10 }}
          placeholderContainerStyle={{
            marginHorizontal: 3,
            color: "gray",
          }}
          placeholderStyle={{
            alignSelf: "center",
            fontSize: 16,
          }}
          readOnly={false}
          selectedItemStyle={{ fontSize: 16, margin: 5 }}
          style={styles.popupView}
          onSelection={(item) => setSelectedPeriod(item)}
          displayField={"code"}
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Button
          onPress={() => downloadDocument("A")}
          title={"Download Part-A"}
          icon={"pdf"}
        />
        <Button
          onPress={() => downloadDocument("B")}
          title={"Download Part-B"}
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
export default connect(mapStateToProps, { addError })(FormSixteenScreen);

const styles = StyleSheet.create({
  popHeight: {
    height: 150,
  },
  Container: {
    flex: 1,
    margin: 10,
  },
  popupView: {
    minHeight: 50,
    maxHeight: 50,
    borderRadius: 5,
    marginTop: 10,
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

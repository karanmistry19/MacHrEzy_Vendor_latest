import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import Avatar from "../../components/avatar";
import config from "../../config/config";
import Icon from "../icons";
import ModalContainer from "../modalContainer/modal";

export const WishListTable = ({
  pressFunc,
  bdayOfCrrntMonths,
  newJoiner,
  date,
  birthUser,
  onPressSubmit,
  currentEmployeeData,
  tabWish,
  user,
}) => {
  const dimension = useWindowDimensions();

  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const closeModal = () => {
    setModalVisible(false);
    setMessage("");
  };
  const onPressSend = () => {
    if (message.trim() !== "") {
      onPressSubmit({
        users:
          birthUser === "all"
            ? (tabWish === "Birthdays" ? bdayOfCrrntMonths : newJoiner).map(
                (x) => x.empCode?.trim()
              )
            : [birthUser.empCode.trim()],
        emailList:
          birthUser === "all"
            ? (tabWish === "Birthdays" ? bdayOfCrrntMonths : newJoiner).map(
                (x) => x.emailIdOff?.trim()
              )
            : [birthUser.emailIdOff.trim()],
        subject: "Birthday Wish",
        text: message,
      });
      setModalVisible(false);
      setMessage("");
    }
  };

  return (
    <View style={styles.rowStyle}>
      <Avatar
        source={{
          uri: `${config.baseUrl}api/user/dp?empCode=${currentEmployeeData?.empCode}`,
        }}
        style={{ marginRight: 5, borderRadius: 10, height: 50, width: 50 }}
      />
      <View>
        <View style={{ alignItems: "flex-start" }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 14 }}>{currentEmployeeData?.empName}</Text>
          </View>
          <Text
            style={{
              // marginLeft: 10,
              backgroundColor: "#FFBA00",
              padding: 2,
              borderRadius: 5,
              fontSize: 12,
            }}
          >
            {currentEmployeeData?.designation
              ? currentEmployeeData.designation.trim()
              : ""}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "space-between" }}>
            <View style={{ marginTop: 5, flexDirection: "row" }}>
              <Icon height="12" width="12" name="birthday"></Icon>
              <Text style={{ fontSize: 12, marginLeft: 3 }}>
                {currentEmployeeData?.dob}
              </Text>
            </View>
            <View
              style={{
                marginLeft: 20,
                flexDirection: "row",
              }}
            >
              <Image
                style={{ height: 12, width: 12, top: 5 }}
                source={require("../../assets/location.png")}
              ></Image>
              {/* <Icon fi name="location"></Icon> */}
              <Text style={{ fontSize: 12, marginTop: 5 }}>
                {" "}
                {currentEmployeeData?.siteName}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
          setMessage(
            (tabWish === "Birthdays"
              ? `Hi ${birthUser?.empName}, Wish you a very happy birthday.`
              : `Hi ${birthUser?.empName}, Welcome to Macleods `) +
              `\n\nFrom ${user.empName}`
          );
          pressFunc(date);
        }}
        style={{ position: "absolute", right: 5, top: 20 }}
      >
        <Icon name="send" fill="rgb(155, 43, 44)"></Icon>
      </TouchableOpacity>
      <ModalContainer
        showModal={modalVisible}
        modalStyle={{
          minWidth: 300,
          maxWidth: 400,
          height: dimension.height * 0.4,
        }}
        modalContentStyle={{
          width: "100%",
          minHeight: 310,
          maxHeight: 310,
        }}
        title={`Send a Wish to ${
          birthUser === "all" ? "All" : birthUser?.empName
        }`}
        onClose={() => closeModal()}
        modalContent={
          <View
            style={{
              // minHeight: 300,
              width: "100%",
              borderRadius: 10,
              padding: 10,
            }}
          >
            <View style={styles.textAreaContainer}>
              <TextInput
                style={styles.textArea}
                underlineColorAndroid="transparent"
                placeholder="Your message"
                placeholderTextColor="grey"
                numberOfLines={10}
                onChangeText={(x) => setMessage(x)}
                multiline={true}
                value={message}
                editable={false}
              />
              <TouchableOpacity
                onPress={() => onPressSend()}
                style={{ position: "absolute", right: 5, bottom: 5 }}
              >
                <Icon name="send" fill="rgb(155, 43, 44)"></Icon>
              </TouchableOpacity>
            </View>
          </View>
        }
        onRequestCloseModal={() => closeModal()}
      ></ModalContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  rowStyle: {
    flexDirection: "row",
    width: "100%",
    // height: 50,
    backgroundColor: "#D0D0D0",
    borderRadius: 5,
    justifyContent: "flex-start",
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  textAreaContainer: {
    borderColor: "gray",
    borderWidth: 1,
    height: 250,
    borderRadius: 10,
    width: "100%",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  textArea: {
    justifyContent: "flex-start",
    flex: 1,
    padding: 8,
    textAlignVertical: "top",
  },
  Text: {
    fontSize: 25,
    margin: 20,
    color: "white",
  },
  displayCardContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  textStyle: {
    fontSize: 30,
    color: "#FFBA00",
    fontWeight: "bold",
  },
  tableContainer: {
    margin: 5,
  },
  cellStyle: {
    width: 100,
  },
});

import React, { useState } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import config from "../../config/config";
import ModalContainer from "../modal/modal";
import RadiusButton from "../RadiusButton";
export const NotificationCard = ({
  pressFunc,
  bdayOfCrrntMonths,
  newJoiner,
  date,
  birthUser,
  onPressSubmit,
  currentEmployeeData,
  tabWish,
  user,
  BirthdayWish = false,
  description,
  width = 600,
  SendButtonFontsize,
  nameFontSize = 14,
}) => {
  const dimension = useWindowDimensions();

  const [modalVisible, setModalVisible] = useState(false);
  const [userMessage, setUserMessage] = useState("");
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
                (x) => x.empCode?.trim(),
              )
            : [birthUser.empCode.trim()],
        emailList:
          birthUser === "all"
            ? (tabWish === "Birthdays" ? bdayOfCrrntMonths : newJoiner).map(
                (x) => x.emailIdOff?.trim(),
              )
            : [birthUser.emailIdOff.trim()],
        subject: "Birthday Wish",
        text: message,
      });
      setModalVisible(false);
      setMessage("");
    }
  };
  function imageResize() {
    if (Platform.OS == "android") {
      return { width: "100%" };
    } else if (Platform.OS == "web") {
      return {
        width:
          dimension.width > 650
            ? "100%"
            : dimension.width < 450
            ? "80%"
            : "60%",
      };
    }
  }
  const [modalWidth, setModalWidth] = useState(0);
  function find_modalWidth(layout) {
    const { x, y, width, height } = layout;
    setModalWidth(width);
  }
  return (
    <View
      style={[
        styles.container,
        { width: width, marginVertical: 2, height: "100%" },
      ]}
    >
      <View style={[styles.Left, { height: "100%" }]}>
        <View style={[{ height: "80%", width: "65%" }]}>
          <Image
            source={{
              uri: `${config.baseUrl}api/user/dp?empCode=${currentEmployeeData?.empCode}`,
            }}
            style={{ width: "100%", height: "100%", borderRadius: 100 }}
          />
        </View>
      </View>
      <View style={[styles.Right, { flex: 0.8 }]}>
        <View style={[styles.btnWishContainer, {}]}>
          <View style={styles.textContainer}>
            <Text style={[styles.text, { fontSize: width * 0.035 }]}>
              {currentEmployeeData?.empName?.slice(0, 7)}
            </Text>
          </View>
          {
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
                setMessage(
                  tabWish === "Birthdays"
                    ? `a Birthday wish`
                    : `a Welcome wish`,
                );
                pressFunc(date);
              }}
            >
              <RadiusButton
                title="Send Wish"
                BColor="#08D641"
                BRadius={10}
                PY={2}
                PX={10}
                fontWeight="bold"
                color="white"
                fontSize={width * 0.034}
              />
            </TouchableOpacity>
          }
        </View>
        <Text
          style={[
            styles.description,
            {
              paddingRight: 5,
              marginVertical: 5,
              fontSize: width * 0.038,
            },
          ]}
        >
          {description}
        </Text>
      </View>

      <ModalContainer
        showModal={modalVisible}
        modalStyle={{
          minWidth: 300,
          maxWidth: 400,
          height: dimension.height * 0.5,
        }}
        modalContentStyle={{
          width: "90%",
          minHeight: 310,
          maxHeight: dimension.height * 0.5,
          backgroundColor: "#FFFFFF",
        }}
        onClose={() => closeModal()}
        modalContent={
          <View
            style={{
              // minHeight: 300,
              width: "100%",
              // borderRadius: 10,
              padding: 10,
              backgroundColor: "#FFFFFF",
              // height:Platform.OS=="android"?dimension.height *0.55:dimension.width>700?dimension.height *0.8:dimension.height *0.4,
            }}
          >
            <View style={{ paddingLeft: 20 }}>
              {tabWish === "Birthdays" ? (
                <Text
                  style={{
                    color: "#CA0000",
                    fontSize: modalWidth * 0.0554,
                    fontWeight: Platform.OS === "web" ? "800" : "bold",
                  }}
                >
                  Birthday Wishes
                </Text>
              ) : (
                <Text
                  style={{
                    color: "#CA0000",
                    fontSize: modalWidth * 0.0554,
                    fontWeight: Platform.OS === "web" ? "800" : "bold",
                  }}
                >
                  Welcome Wishes
                </Text>
              )}
            </View>
            <View
              style={{ width: "100%", backgroundColor: "white", padding: 20 }}
              onLayout={(event) => {
                find_modalWidth(event.nativeEvent.layout);
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize:
                      Platform.OS === "android"
                        ? modalWidth * 0.0654
                        : modalWidth * 0.0354,
                    fontWeight: "600",
                  }}
                >
                  Send
                </Text>
                <Text
                  style={{
                    fontSize:
                      Platform.OS === "android"
                        ? modalWidth * 0.0854
                        : modalWidth * 0.0554,
                    fontWeight: "bold",
                  }}
                >
                  {birthUser?.empName?.slice(0, 16)}
                </Text>
                <Text
                  style={{
                    fontSize:
                      Platform.OS === "android"
                        ? modalWidth * 0.0654
                        : modalWidth * 0.0354,
                    fontWeight: "600",
                  }}
                >
                  {message}
                </Text>
              </View>
            </View>

            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View style={styles.textAreaContainer}>
                <TextInput
                  style={[styles.textArea, {}]}
                  underlineColorAndroid="transparent"
                  placeholder="Write wishes here"
                  placeholderTextColor="grey"
                  numberOfLines={5}
                  onChangeText={(x) => setUserMessage(x)}
                  multiline={true}
                  value={userMessage}
                  editable={false}
                />
              </View>
            </View>
            <View
              style={{
                marginTop: 10,
                width: "100%",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => onPressArrow()}
                style={{
                  width: "20%",
                  backgroundColor: "#CA0000",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 5,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "700",
                    fontSize:
                      Platform.OS === "android"
                        ? modalWidth * 0.0454
                        : modalWidth * 0.0354,
                  }}
                >
                  Send
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        onRequestCloseModal={() => closeModal()}
      ></ModalContainer>
    </View>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  textAreaContainer: {
    borderColor: "gray",
    borderWidth: 1,
    height: 150,
    // borderRadius: 10,
    width: "90%",
  },
  textArea: {
    justifyContent: "flex-start",
    flex: 1,
    padding: 8,
    textAlignVertical: "top",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  Left: {
    alignItems: "center",
    justifyContent: "center",
    width: "20%",
  },
  Right: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
  btnContainer: {
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  btnWishContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "700",
    color: "#011F3B",
  },
  description: {
    // paddingRight: 5,
    // marginVertical: 5,
    textAlign: "left",
    color: "#83919E",
  },
});

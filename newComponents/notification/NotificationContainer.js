import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { birthdayWish } from "../../redux/actions/dashboard.action";
import ModalContainer from "../modal/modal";
import NotificationCard from "../notification/NotificationCard";

const NotificationContainer = ({
  title,
  width = 350,
  isBirthdayWish = false,
  SendButtonFontsize = 12,
  titleFontSize = 18,
  nameFontSize,
  onPressSend,
  bdayOfCrrntMonths,
  newJoiner,
  birthdayWish,
  user,
  marginTop,
}) => {
  const [message, setMessage] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalWidth, setModalWidth] = useState(0);
  function find_modalWidth(layout) {
    const { x, y, width, height } = layout;
    setModalWidth(width);
  }
  const dimension = useWindowDimensions();
  const [selectedTab, setSelectedTab] = useState(
    isBirthdayWish ? "Birthdays" : "",
  );

  const closeModal = () => {
    setModalVisible(false);
    setMessage("");
  };
  const onPressArrow = () => {
    if (message.trim() !== "") {
      birthdayWish({
        users: (selectedTab === "Birthdays"
          ? bdayOfCrrntMonths
          : newJoiner
        ).map((x) => x.empCode?.trim()),
        subject:
          selectedTab === "Birthdays" ? "Birthday Wish" : "Welcome to Macleods",
        text: message,
        emailList: (selectedTab === "Birthdays"
          ? bdayOfCrrntMonths
          : newJoiner
        ).map((x) => x.emailIdOff?.trim()),
      });
      setModalVisible(false);
      setMessage("");
    }
  };
  const retrivalLogic = ({ row }) => {
    if (isBirthdayWish) {
      return [
        {
          component: () => (
            <NotificationCard
              newJoiner={newJoiner}
              bdayOfCrrntMonths={bdayOfCrrntMonths}
              tabWish={"Birthdays"}
              onPressSubmit={birthdayWish}
              birthUser={row}
              currentEmployeeData={row}
              pressFunc={onPressArrow}
              user={user}
              nameFontSize={nameFontSize}
              SendButtonFontsize={SendButtonFontsize}
              isBirthdayWish={isBirthdayWish}
              width={width}
              description={"have a birthday today.Send Wishes"}
            ></NotificationCard>
          ),
        },
      ];
    }
    return [
      {
        component: () => (
          <NotificationCard
            newJoiner={newJoiner}
            bdayOfCrrntMonths={bdayOfCrrntMonths}
            tabWish={""}
            onPressSubmit={birthdayWish}
            birthUser={row}
            currentEmployeeData={row}
            pressFunc={onPressArrow}
            user={user}
            nameFontSize={nameFontSize}
            SendButtonFontsize={SendButtonFontsize}
            isBirthdayWish={isBirthdayWish}
            width={width}
            description={"have joined today.Send Wishes"}
          ></NotificationCard>
        ),
      },
    ];
  };
  return (
    <>
      <View
        style={{
          width: width,
          backgroundColor: "#f2f2f2",
          marginBottom: width * 0.1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: width * 0.05,
          }}
        >
          <Text
            style={{
              fontWeight: Platform.OS === "web" ? "900" : "bold",
              fontSize: Platform.OS === "web" ? width * 0.044 : width * 0.054,
              color: "#011F3B",
            }}
          >
            {title}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setMessage(
                isBirthdayWish ? `a Birthday wish` : "Welcome message",
              );
              setModalVisible(true);
            }}
          >
            <View
              style={{
                backgroundColor: "#08D641",
                paddingVertical: 4,
                paddingHorizontal: 10,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: width * 0.034,
                }}
              >
                Send Wishes All
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ height: width * 0.15 * 4 + 7 * 5 }}>
          <ScrollView
            scrollEnabled={true}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            style={
              {
                // marginTop: 10,
                // height: Platform.OS === "web" ? 300 : 300,
              }
            }
          >
            {!isBirthdayWish &&
              newJoiner?.map((row, i) => {
                return (
                  <View
                    key={`row-${row._id ? row._id : i}`}
                    style={[
                      {
                        backgroundColor: "",
                        margin: 5,
                        width: "100%",
                        height: width * 0.15,
                      },
                    ]}
                  >
                    {retrivalLogic({ row, index: i }).map((value, index) => {
                      return (
                        <View
                          key={i + ""}
                          style={[
                            {
                              textAlign: "center",
                              flex: 1,
                              zIndex: 9,
                              //backgroundColor: "",
                              width: "100%",
                              height: "100%",
                            },
                          ]}
                        >
                          {value.component()}
                        </View>
                      );
                    })}
                  </View>
                );
              })}
            {isBirthdayWish &&
              bdayOfCrrntMonths?.map((row, i) => {
                return (
                  <View
                    key={`row-${row._id ? row._id : i}`}
                    style={[
                      {
                        //   flex: 1,
                        // flexWrap: "wrap",
                        // flexDirection: "row",
                        margin: 5,
                        //backgroundColor:"",
                        width: "100%",
                        height: width * 0.15,
                      },
                      // rowStyle,
                    ]}
                  >
                    {retrivalLogic({ row, index: i }).map((value, index) => {
                      return (
                        <View
                          key={i + ""}
                          style={[
                            {
                              textAlign: "center",
                              flex: 1,
                              zIndex: 9,
                              width: "100%",
                              height: "100%",
                            },
                          ]}
                        >
                          {value.component()}
                        </View>
                      );
                    })}
                  </View>
                );
              })}
          </ScrollView>
        </View>
      </View>
      <ModalContainer
        onRequestCloseModal={() => closeModal()}
        showModal={modalVisible} //modalVisible
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
          // maxWidth:320
        }}
        onClose={() => closeModal()}
        modalContent={
          <View
            style={{
              width: "100%",
              // borderRadius: 10,
              padding: 10,
              backgroundColor: "white",
              // height:Platform.OS=="android"?dimension.height *0.55:dimension.width>700?dimension.height *0.65:dimension.height *0.4,
            }}
          >
            <View style={{ paddingLeft: 20 }}>
              {isBirthdayWish ? (
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
                  ALL
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
                  {message ? message : "a Birthday wish"}
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
      ></ModalContainer>
    </>
  );
};
const mapStateToProps = ({ bdayOfCrrntMonths, newJoiner, user }) => ({
  bdayOfCrrntMonths,
  newJoiner,
  user,
});
export default connect(mapStateToProps, {
  birthdayWish,
})(NotificationContainer);

const styles = StyleSheet.create({
  containerMargin: {
    marginVertical: 15,
  },
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
});

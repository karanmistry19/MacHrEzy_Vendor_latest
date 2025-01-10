import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { connect } from "react-redux";
import { CardList } from "../components/cardList";
import { DimensionContext } from "../components/dimensionContext";
import Icons from "../components/icons";
import ModalContainer from "../components/modalContainer/modal";
import PopUp from "../components/popUp/popUp";
import { fetchAllNotifications } from "../redux/actions/allNotification";
import {
  fetchEmployee,
  sendNotification,
} from "../redux/actions/notifications.action";

const Notification = ({
  fetchAllNotifications,
  allNotifications,
  fetchEmployee,
  employees,
  sendNotification,
}) => {
  useEffect(() => {
    fetchAllNotifications();
    fetchEmployee();
  }, []);
  const onRequestCloseModal = () => {
    setMessage("");
    setModalVisible(false);
    setEmployeeList([]);
  };
  const [message, setMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const { window } = useContext(DimensionContext);
  const [employeeList, setEmployeeList] = useState([]);

  const send = () => {
    let obj = {
      message: message,
      user:
        employeeList.length > 0
          ? employeeList.map((x) => x.empCode.trim())
          : "all",
    };

    sendNotification(obj);
    setEmployeeList([]);
    setMessage("");
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {window.width < 550 ? (
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 10,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                alignSelf: "center",
                marginTop: 10,
                paddingBottom: 10,
              }}
            >
              Notifications
            </Text>
            <View style={{ marginTop: 5 }}>
              <Button
                onPress={() => {
                  setModalVisible(true);
                }}
                title="Send Notification"
                color="rgb(155, 43, 44)"
              ></Button>
            </View>
          </View>

          <CardList
            cardStyle={{ minHeight: "100%", maxHeight: "100%", marginLeft: 10 }}
            data={allNotifications}
            refreshHandler={fetchAllNotifications}
          ></CardList>
          <ModalContainer
            showModal={modalVisible}
            modalViewStyle={{
              maxHeight: 570,
              width: window.width > 550 ? 400 : 340,
            }}
            modalContent={
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 10,
                  }}
                >
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    Send Notification To All
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setMessage("");
                      setModalVisible(false);
                      setEmployeeList([]);
                    }}
                  >
                    <Icons fill="#000" name="cross"></Icons>
                  </TouchableOpacity>
                </View>

                <PopUp
                  placeholder={"Select employees or send to all"}
                  multiSelect={true}
                  renderData={employees}
                  onSelection={(data) => setEmployeeList(data)}
                  id="empCode"
                  style={{ maxWidth: 270, maxHeight: 35 }}
                ></PopUp>
                <View
                  style={{
                    borderColor: "gray",
                    borderWidth: 1,
                    marginTop: 10,
                    height: 420,
                    width: 300,
                    borderRadius: 10,
                    marginBottom: 60,
                  }}
                >
                  <TextInput
                    style={{
                      height: 420,
                      width: 300,
                      justifyContent: "flex-start",
                      padding: 8,
                      textAlignVertical: "top",
                    }}
                    underlineColorAndroid="transparent"
                    placeholder="Your message"
                    placeholderTextColor="grey"
                    numberOfLines={10}
                    onChangeText={(x) => setMessage(x)}
                    multiline={true}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      send();
                      setModalVisible(false);
                      setMessage("");
                      setEmployeeList([]);
                    }}
                    style={{ position: "absolute", right: 5, bottom: 5 }}
                  >
                    <Icons
                      height={30}
                      width={30}
                      name="send"
                      fill="rgb(155, 43, 44)"
                    ></Icons>
                  </TouchableOpacity>
                </View>
              </View>
            }
            onRequestCloseModal={onRequestCloseModal}
          ></ModalContainer>
        </View>
      ) : (
        <View style={{ flex: 3, flexDirection: "row" }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              flex: 3,
              borderRightWidth: 1,
              borderRightColor: "#A0A0A0",
            }}
            nestedScrollEnabled={true}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                alignSelf: "center",
                marginTop: 20,
                paddingBottom: 7,
              }}
            >
              Notifications
            </Text>
            <CardList
              cardStyle={{ minHeight: "100%", maxHeight: "100%" }}
              data={allNotifications}
              refreshHandler={fetchAllNotifications}
            ></CardList>
          </ScrollView>
          <View style={{ flex: 7 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
                marginLeft: 20,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  resizeMode={"cover"}
                  style={{ height: 40, width: 40 }}
                  source={require("../assets/mImage.png")}
                />
                <View style={{ paddingTop: 15, marginLeft: 5 }}>
                  <Text>Send Notification To All</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                marginVertical: 5,
                marginHorizontal: 20,
              }}
            >
              <PopUp
                placeholder={"Select employees or send to all"}
                multiSelect={true}
                renderData={employees}
                onSelection={(data) => setEmployeeList(data)}
                id="empCode"
              ></PopUp>
            </View>
            <View style={styles.textAreaContainer}>
              <TextInput
                style={styles.textArea}
                underlineColorAndroid="transparent"
                placeholder="Your message"
                placeholderTextColor="grey"
                numberOfLines={10}
                onChangeText={(x) => setMessage(x)}
                multiline={true}
              />
              <TouchableOpacity
                onPress={() => {
                  send();
                  setEmployeeList([]);
                  setMessage("");
                }}
                style={{ position: "absolute", right: 5, bottom: 5 }}
              >
                <Icons
                  height={30}
                  width={30}
                  name="send"
                  fill="rgb(155, 43, 44)"
                ></Icons>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textAreaContainer: {
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    height: 400,
    width: "95%",
    borderRadius: 10,
    marginLeft: 20,
  },
  textArea: {
    height: 400,
    width: "95%",
    justifyContent: "flex-start",
    flex: 1,
    padding: 8,
    textAlignVertical: "top",
  },
});

const mapStateToProps = ({ allNotifications, employees }) => ({
  allNotifications,
  employees,
});
export default connect(mapStateToProps, {
  fetchAllNotifications,
  fetchEmployee,
  sendNotification,
})(Notification);

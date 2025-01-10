import React, { useState, useEffect, useReducer } from "react";
import { useContext } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  Platform,
} from "react-native";

import { connect } from "react-redux";
import { CardList } from "../../components/cardList";
import { DimensionContext } from "../../components/dimensionContext";
import Icons from "../../components/icons";
import PopUp from "../../components/popUp/popUp";
import ModalContainer from "../../components/modalContainer/modal";
import { fetchAllNotifications } from "../../redux/actions/allNotification";
import { addError } from "../../redux/actions/toast.action";
import {
  fetchEmployee,
  sendNotification,
} from "../../redux/actions/notifications.action";
import MultipleSelectModal from "../../components/multiselect-modal/multiple-select-modal";
import Checkbox from "../../components/checkbox";
import { useFocusEffect } from "@react-navigation/native";

const reducer = (state, action) => {
  switch (action.type) {
    case "REMOVE_DATA":
    case "INIT_DATA":
      return [];
    case "ADD_DATA":
      return action.data;
    default:
      return state;
  }
};
const NotificationNarrow = ({
  fetchAllNotifications,
  allNotifications,
  fetchEmployee,
  employees,
  sendNotification,
  addError,
  departments,
  sites,
  grades,
}) => {
  useEffect(() => {
    setToList({
      type: "INIT_DATA",
    });
    setRenderData({
      key: "empCode",
      data: [...employees],
      displayField: "name",
      selected: "employee(s)",
    });
  }, [employees]);

  const [message, setMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [recipientModal, viewRecipientModal] = useState(false);
  const { window } = useContext(DimensionContext);
  const [toList, setToList] = useReducer(reducer, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchAllNotifications();
      fetchEmployee();
      return () => {
        setToList({
          type: "REMOVE_DATA",
        });
      };
    }, []),
  );

  let initData = {
    data: employees,
    displayField: "name",
    selected: "employee(s)",
    key: "",
  };
  const [renderData, setRenderData] = useState(initData);
  const dataColumnMap = {
    "employee(s)": {
      key: "empCode",
      data: employees,
      displayField: "name",
      selected: "employee(s)",
    },
    "department(s)": {
      key: "deptCode",
      data: departments,
      displayField: "descr",
      selected: "department(s)",
    },
    "site(s)": {
      key: "siteCode",
      data: sites,
      displayField: "descr",
      selected: "site(s)",
    },
    "grade(s)": {
      key: "gradeCode",
      data: grades,
      displayField: "descr",
      selected: "grade(s)",
    },
  };

  const onRequestCloseModal = () => {
    setMessage("");
    setModalVisible(false);
    setToList({
      type: "REMOVE_DATA",
    });
    setRenderData(initData);
  };

  const changeSelected = (value) => {
    setToList({
      type: "REMOVE_DATA",
    });
    setRenderData({ ...dataColumnMap[value] });
  };

  const recipientSubmit = () => {
    setModalVisible(true);
    viewRecipientModal(false);
  };

  const onRecipientModalClose = () => {
    setToList({ type: "REMOVE_DATA" });
    viewRecipientModal(false);
  };

  const send = () => {
    if (message && message !== "") {
      let obj = {
        message: message,
        user:
          toList.length > 0
            ? toList.map((x) => x[renderData.key].trim())
            : "all",
        type: toList.length > 0 ? renderData.selected : "all",
      };

      sendNotification(obj);
      setToList({
        type: "REMOVE_DATA",
      });
      setModalVisible(false);
      setMessage("");
    } else {
      addError("Please provide some message!", 3000);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
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
                changeSelected("employee(s)");
                viewRecipientModal(true);
              }}
              title="Send Notification"
              color="rgb(155, 43, 44)"
            ></Button>
          </View>
        </View>

        <CardList
          cardStyle={{
            minHeight: "100%",
            maxHeight: "100%",
            marginHorizontal: 10,
          }}
          data={allNotifications}
          refreshHandler={fetchAllNotifications}
        ></CardList>
        <ModalContainer
          onClose={onRecipientModalClose}
          title="Select recipient group"
          showModal={recipientModal}
          modalStyle={{
            minHeight: 220,
            maxHeight: 270,
          }}
          modalContentStyle={{
            minHeight: 220,
            maxHeight: 270,
          }}
          modalContent={
            <View style={[{ marginBottom: 5 }]}>
              <View style={styles.row}>
                <Checkbox
                  style={styles.checkbox}
                  value={renderData.selected === "employee(s)"}
                  setValue={() => changeSelected("employee(s)")}
                ></Checkbox>
                <Text style={styles.label}>From List</Text>
              </View>
              <View style={styles.row}>
                <Checkbox
                  value={renderData.selected === "department(s)"}
                  setValue={() => changeSelected("department(s)")}
                  style={styles.checkbox}
                ></Checkbox>
                <Text style={styles.label}>By Department</Text>
              </View>
              <View style={styles.row}>
                <Checkbox
                  value={renderData.selected === "grade(s)"}
                  setValue={() => changeSelected("grade(s)")}
                  style={styles.checkbox}
                ></Checkbox>
                <Text style={styles.label}>By Grade</Text>
              </View>
              <View style={styles.row}>
                <Checkbox
                  value={renderData.selected === "site(s)"}
                  setValue={() => changeSelected("site(s)")}
                  style={styles.checkbox}
                ></Checkbox>
                <Text style={styles.label}>By Site</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Button
                  onPress={() => recipientSubmit()}
                  color="rgb(155, 43, 44)"
                  title="  Next   "
                ></Button>
                <Button
                  onPress={() => {
                    viewRecipientModal(false);
                    setRenderData(initData);
                  }}
                  color="rgb(155, 43, 44)"
                  title="Cancel"
                ></Button>
              </View>
            </View>
          }
          onRequestCloseModal={onRecipientModalClose}
        ></ModalContainer>

        <ModalContainer
          onClose={onRequestCloseModal}
          title="Send Notification"
          showModal={modalVisible}
          modalStyle={{
            minHeight: 420,
            maxHeight: 470,
          }}
          modalContent={
            <View
              style={{
                // flex: 1,
                flexDirection: "column",
                margin: 10,
                justifyContent: "flex-start",
              }}
            >
              <MultipleSelectModal
                id={renderData.key}
                buttonName="Employee"
                selectionValue={toList}
                // label={"Select employees or send to all"}
                onSelection={(data) =>
                  setToList({
                    type: "ADD_DATA",
                    data: data,
                  })
                }
                renderData={renderData.data}
                name={`Select ${renderData.selected} or send to all`}
                multiSelect={true}
                displayField={renderData.displayField}
              ></MultipleSelectModal>

              <View
                style={{
                  borderColor: "gray",
                  borderWidth: 1,

                  borderRadius: 10,
                  marginTop: Platform.OS === "web" ? 10 : 40,
                }}
              >
                <TextInput
                  style={{
                    maxHeight: 380,
                    minHeight: 300,
                    // width: 300,
                    // flex: 1,
                    justifyContent: "flex-start",
                    padding: 8,
                    textAlignVertical: "top",
                  }}
                  underlineColorAndroid="transparent"
                  placeholder="Your message"
                  placeholderTextColor="grey"
                  numberOfLines={10}
                  onChangeText={setMessage}
                  multiline={true}
                />
                <TouchableOpacity
                  onPress={() => {
                    send();
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkbox: {
    minHeight: 30,
    width: 30,
    marginHorizontal: 15,
  },
  label: {
    fontSize: 17,
    fontWeight: "bold",
  },
});

const mapStateToProps = ({
  allNotifications,
  employees,
  departments,
  sites,
  grades,
}) => ({
  allNotifications,
  employees,
  departments,
  sites,
  grades,
});
export default connect(mapStateToProps, {
  fetchAllNotifications,
  fetchEmployee,
  sendNotification,
  addError,
})(NotificationNarrow);

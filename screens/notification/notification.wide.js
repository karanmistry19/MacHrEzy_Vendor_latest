import React, { useEffect, useReducer, useRef, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { connect } from "react-redux";
import { CardList } from "../../components/cardList";
import Checkbox from "../../components/checkbox";
import Icons from "../../components/icons";
import MultipleSelectModal from "../../components/multiselect-modal/multiple-select-modal";
import { fetchAllNotifications } from "../../redux/actions/allNotification";
import {
  fetchEmployee,
  sendNotification,
} from "../../redux/actions/notifications.action";
import { addError } from "../../redux/actions/toast.action";

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

const NotificationWide = ({
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
    fetchAllNotifications();
    fetchEmployee();
  }, []);
  var msg;
  const setMessage1 = (e) => {
    msg = e;
  };
  const [toList, setToList] = useReducer(reducer, []);
  const [renderData, setRenderData] = useState({
    data: [],
    displayField: "name",
    selected: "employee(s)",
    key: "",
  });
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
  const send = () => {
    if (msg && msg !== "") {
      let obj = {
        message: msg,
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
      textInput.current.value = "";
      setMessage1("");
    } else {
      addError("Please provide some message!", 3000);
    }
  };

  const changeSelected = (value) => {
    setRenderData({
      ...dataColumnMap[value],
      data: [...dataColumnMap[value]["data"]],
    });
    setToList({
      type: "REMOVE_DATA",
    });
  };
  const textInput = useRef();
  return (
    <ScrollView
      contentContainerStyle={{ flex: 1, backgroundColor: "#fff" }}
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ flex: 3, flexDirection: "row" }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          style={{
            flex: 3,
            borderRightWidth: 1,
            borderRightColor: "#A0A0A0",
          }}
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
            cardStyle={{
              minHeight: "100%",
              maxHeight: "100%",
              marginHorizontal: 10,
            }}
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
              marginHorizontal: 20,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                resizeMode={"cover"}
                style={{ height: 40, width: 40 }}
                source={require("../../assets/mImage.png")}
              />
              <View style={{ paddingTop: 5, marginLeft: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Send Notification
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              marginVertical: 5,
              marginHorizontal: 20,
            }}
          >
            <View style={[styles.row, { marginBottom: 5 }]}>
              <View style={styles.row}>
                <Checkbox
                  style={{ minHeight: 20, width: 20, marginRight: 5 }}
                  value={renderData.selected === "employee(s)"}
                  setValue={() => changeSelected("employee(s)")}
                ></Checkbox>
                <Text>From List</Text>
              </View>
              <View style={styles.row}>
                <Checkbox
                  value={renderData.selected === "department(s)"}
                  setValue={() => changeSelected("department(s)")}
                  style={{ minHeight: 20, width: 20, marginRight: 5 }}
                ></Checkbox>
                <Text>By Department</Text>
              </View>
              <View style={styles.row}>
                <Checkbox
                  value={renderData.selected === "grade(s)"}
                  setValue={() => changeSelected("grade(s)")}
                  style={{ minHeight: 20, width: 20, marginRight: 5 }}
                ></Checkbox>
                <Text>By Grade</Text>
              </View>
              <View style={styles.row}>
                <Checkbox
                  value={renderData.selected === "site(s)"}
                  setValue={() => changeSelected("site(s)")}
                  style={{ minHeight: 20, width: 20, marginRight: 5 }}
                ></Checkbox>
                <Text>By Site</Text>
              </View>
            </View>
            <MultipleSelectModal
              id={renderData.key}
              buttonName="Employee"
              selectionValue={toList}
              onSelection={(data) =>
                setToList({
                  type: "ADD_DATA",
                  data: data,
                })
              }
              renderData={renderData.data || []}
              name={`Select ${renderData.selected} or send to all`}
              multiSelect={true}
              displayField={renderData.displayField}
            ></MultipleSelectModal>
          </View>
          <View style={styles.textAreaContainer}>
            <TextInput
              ref={textInput}
              style={styles.textArea}
              underlineColorAndroid="transparent"
              placeholder="Your message"
              placeholderTextColor="grey"
              numberOfLines={10}
              onChangeText={setMessage1}
              multiline={true}
              value={msg}
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
      </View>
    </ScrollView>
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
    justifyContent: "space-around",
    alignItems: "center",
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
})(NotificationWide);

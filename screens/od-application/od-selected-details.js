import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import {
  BackHandler,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { connect } from "react-redux";
import Button from "../../components/buttons/button";
import { DimensionContext } from "../../components/dimensionContext";
import HourAndMinutePicker from "../../components/hourAndminutePicker";
import Icon from "../../components/icons";
import ModalContainer from "../../components/modalContainer/modal";
import RangeComponent from "../../components/range-component/rangeComponent";
import { formatDateNew } from "../../components/utils";
import {
  sanctionOdApplications,
  setSelectedODTransaction,
  setSelectedODTransactionTabDetails,
} from "../../redux/actions/od-app.action";
import { addError } from "../../redux/actions/toast.action";

const ODSelectedTransactionDetails = ({
  selectedODTransaction,
  route,
  selectedODTransactionTabDetails,
  sanctionOdApplications,
  navigation,
  setSelectedODTransaction,
  setSelectedODTransactionTabDetails,
  addError,
}) => {
  const { window } = useContext(DimensionContext);
  const [sanctioned, setSanctioned] = useState("");
  const [lastScreen, setLastScreen] = useState("");
  const [message, setMessage] = useState("");
  const [remarks, setRemarks] = useState("");
  const [rejectModal, viewRejectModal] = useState(false);
  const [acceptModal, viewAcceptModal] = useState(false);
  const [fromDate, setFromDate] = useState(
    new Date(selectedODTransaction?.fromDate)
  );
  const timePickerInitData = {
    for: "",
    dislay: false,
    currentValue: null,
    hour: false,
    minute: false,
  };
  const [toDate, setToDate] = useState(new Date(selectedODTransaction?.toDate));
  const [timePicker, setTimePicker] = useState(timePickerInitData);
  useEffect(() => {
    if (route && route.params) {
      const { sanctioned, lastScreen } = route.params;
      setSanctioned(sanctioned);
      setLastScreen(lastScreen);
    }
  }, [route]);
  const updateInterval = (initValue, value, updateFunction, toUpdate) => {
    let x = new Date(initValue);
    if (toUpdate === "hr") {
      x.setHours(value || 0);
    } else {
      x.setMinutes(value || 0);
    }
    updateFunction(x);

    setTimePicker(timePickerInitData);
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setSelectedODTransaction();
        setSelectedODTransactionTabDetails();
      };
    }, [])
  );

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);
  function handleBackButtonClick() {
    navigation.navigate("on-duty-application", {
      lastScreen: lastScreen,
    });
    return true;
  }

  const approve = () => {
    let obj = {
      mode: "SANCTION",
      tranId: selectedODTransaction.tranId,
      eventDate: formatDateNew(
        selectedODTransaction.eventDate,
        "DD/MM/YYYY",
        "YYYY-MM-DD"
      ),
      remarks: selectedODTransaction.remarks,
      empCode: selectedODTransaction.empCode,
      chgUser: "HR",
      fromDate: formatDateNew(
        selectedODTransaction.fromDate,
        "YYYY-MM-DDTHH:mm:ss",
        "YYYY-MM-DD HH:mm"
      ),
      toDate: formatDateNew(
        selectedODTransaction.toDate,
        "YYYY-MM-DDTHH:mm:ss",
        "YYYY-MM-DD HH:mm"
      ),
      sanctionFromDate: formatDateNew(
        selectedODTransaction.fromDate,
        "YYYY-MM-DDTHH:mm:ss",
        "YYYY-MM-DD HH:mm"
      ),
      sanctionToDate: formatDateNew(
        selectedODTransaction.toDate,
        "YYYY-MM-DDTHH:mm:ss",
        "YYYY-MM-DD HH:mm"
      ),
    };
    sanctionOdApplications(obj);
    viewAcceptModal(false);
    navigation.navigate("on-duty-application", {
      sanctioned: sanctioned,
      lastScreen: lastScreen,
    });
  };

  const reject = () => {
    if (message && message != "") {
      let obj = {
        mode: "REJECT",
        tranId: selectedODTransaction.tranId,
        eventDate: formatDateNew(
          selectedODTransaction.eventDate,
          "DD/MM/YYYY",
          "YYYY-MM-DD"
        ),
        rejectReason: message,
        empCode: selectedODTransaction.empCode,
        isAdminApply: "N",
        isAdminReject: 0,
        chgUser: "HR",
        fromDate: formatDateNew(
          selectedODTransaction.fromDate,
          "YYYY-MM-DDTHH:mm:ss",
          "YYYY-MM-DD HH:mm"
        ),
        toDate: formatDateNew(
          selectedODTransaction.toDate,
          "YYYY-MM-DDTHH:mm:ss",
          "YYYY-MM-DD HH:mm"
        ),
        sanctionFromDate: formatDateNew(
          selectedODTransaction.fromDate,
          "YYYY-MM-DDTHH:mm:ss",
          "YYYY-MM-DD HH:mm"
        ),
        sanctionToDate: formatDateNew(
          selectedODTransaction.toDate,
          "YYYY-MM-DDTHH:mm:ss",
          "YYYY-MM-DD HH:mm"
        ),
      };
      sanctionOdApplications(obj);
      viewRejectModal(false);
      navigation.navigate("on-duty-application", {
        sanctioned: sanctioned,
        lastScreen: lastScreen,
      });
    } else {
      addError(
        "Transaction can't be rejected without any reason. Please provide reason!",
        3000
      );
    }
  };
  const onCloseAcceptModal = () => {
    viewAcceptModal(false);
    setTimePicker(timePickerInitData);
    setFromDate(new Date(selectedODTransaction.fromDate));
    setToDate(new Date(selectedODTransaction.toDate));
  };

  return (
    <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, margin: 10 }}>
        <View
          style={{ flexDirection: "row", alignItems: "center", margin: 10 }}
        >
          <TouchableOpacity onPress={() => handleBackButtonClick()}>
            <Icon name="back"></Icon>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              padding: 10,
            }}
          >
            OD Application Details
          </Text>
        </View>

        <View>
          <View style={[{ margin: 10, padding: 10 }, styles.itemContainer]}>
            <View style={styles.transHeaderwrapper}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>Employee Name:</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text>
                  {selectedODTransaction?.empName
                    ? selectedODTransaction?.empName
                    : ""}
                </Text>
              </View>
            </View>
            <View style={styles.transHeaderwrapper}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>Employee Code:</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text>
                  {selectedODTransaction?.empCode
                    ? selectedODTransaction?.empCode
                    : ""}
                </Text>
              </View>
            </View>
            <View style={styles.transHeaderwrapper}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>Transaction ID:</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text>
                  {selectedODTransaction?.tranId
                    ? selectedODTransaction?.tranId
                    : ""}
                </Text>
              </View>
            </View>
            <View style={styles.transHeaderwrapper}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>Transaction Date:</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text>
                  {selectedODTransaction?.tranDate
                    ? formatDateNew(selectedODTransaction?.tranDate)
                    : ""}
                </Text>
              </View>
            </View>
            <View style={styles.transHeaderwrapper}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>Event Date:</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text>
                  {selectedODTransaction?.eventDate
                    ? selectedODTransaction?.eventDate
                    : ""}
                </Text>
              </View>
            </View>
            <View style={styles.transHeaderwrapper}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>From Date:</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text>
                  {selectedODTransaction?.fromDate
                    ? formatDateNew(selectedODTransaction?.fromDate)
                    : ""}
                </Text>
              </View>
            </View>
            <View style={styles.transHeaderwrapper}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>To Date:</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text>
                  {selectedODTransaction?.toDate
                    ? formatDateNew(selectedODTransaction?.toDate)
                    : ""}
                </Text>
              </View>
            </View>
            <View style={styles.transHeaderwrapper}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>Remarks:</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text>{selectedODTransaction?.remarks || ""}</Text>
              </View>
            </View>
            <View style={styles.transHeaderwrapper}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>OD Hours:</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text>{selectedODTransaction?.odHrs || ""}</Text>
              </View>
            </View>
            <View style={styles.transHeaderwrapper}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>Approval Authority:</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text>{selectedODTransaction?.sanctionBy || ""}</Text>
              </View>
            </View>
            {selectedODTransaction ? (
              <View style={styles.transHeaderwrapper}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "bold" }}>Status:</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text>
                    {selectedODTransaction.rejected
                      ? "Rejected"
                      : selectedODTransaction.finalsanction
                      ? "Sanctioned"
                      : "Processing"}
                  </Text>
                </View>
              </View>
            ) : (
              <></>
            )}

            {selectedODTransaction?.rejected ? (
              <View style={styles.transHeaderwrapper}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "bold" }}>Rejected Reason:</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text>{selectedODTransaction?.rejectReason || ""}</Text>
                </View>
              </View>
            ) : (
              <></>
            )}
          </View>
        </View>

        {sanctioned === "done" ? (
          <></>
        ) : (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginRight: 7,
              margin: 10,
            }}
          >
            <Button
              onPress={() => viewAcceptModal(true)}
              title="Approve"
              color={"#9b2b2c"}
            ></Button>

            <Button
              onPress={() => viewRejectModal(true)}
              title="Reject"
              color="#9b2b2c"
            ></Button>
          </View>
        )}
        {selectedODTransactionTabDetails.length ? (
          <View>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                color: "#000",
                margin: 10,
              }}
            >
              Attendance Details
            </Text>
          </View>
        ) : (
          <></>
        )}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 70 }}
          nestedScrollEnabled={true}
          scrollEnabled={true}
        >
          {selectedODTransactionTabDetails.map((tab, i) => {
            return (
              <View
                key={tab.location + i}
                style={[
                  {
                    width: window.width - 40,
                  },
                  styles.itemContainer,
                ]}
              >
                <View style={{ flexDirection: "row", marginBottom: 7 }}>
                  {/* <View>
                    <Icon name="location"></Icon>
                  </View> */}
                  <Text
                    style={{ fontWeight: "700", marginTop: 2, marginLeft: 5 }}
                  >
                    {moment(tab.inDateTime, "DD/MM/YYYY HH:mm:ss")
                      .format("HH:mm")
                      .trim() ===
                      formatDateNew(selectedODTransaction?.fromDate)
                        .slice(11, selectedODTransaction?.fromDate.length)
                        .trim() &&
                    moment(tab.outDateTime, "DD/MM/YYYY HH:mm:ss ")
                      .format("HH:mm")
                      .trim() ===
                      formatDateNew(selectedODTransaction?.toDate)
                        .slice(11, selectedODTransaction?.toDate.length)
                        .trim()
                      ? "OD"
                      : tab.location}
                  </Text>
                </View>
                <RangeComponent
                  startTimeSuffix=""
                  endTimeSuffix=""
                  highlightColor="rgb(155, 43, 44)"
                  backgroundColor="#A9A9A9"
                  startTimeTextColor="black"
                  endTimeTextColor="black"
                  pointerColor="rgb(155, 43, 44)"
                  startTime={moment(
                    tab.inDateTime,
                    "DD/MM/YYYY HH:mm:ss"
                  ).format("HH:mm")}
                  endTime={
                    tab.outDateTime === "00:00"
                      ? 23.59
                      : moment(tab.outDateTime, "DD/MM/YYYY HH:mm:ss ").format(
                          "HH:mm"
                        )
                  }
                  start={
                    tab.inDateTime === "00:00"
                      ? 1
                      : Math.floor(
                          parseInt(
                            moment(
                              tab.inDateTime,
                              "DD/MM/YYYY HH:mm:ss"
                            ).format("HH:mm")
                          )
                        ) / 24
                  }
                  end={
                    tab.outDateTime === "00:00"
                      ? 1
                      : Math.floor(
                          parseInt(
                            moment(
                              tab.outDateTime,
                              "DD/MM/YYYY HH:mm:ss "
                            ).format("HH:mm")
                          )
                        ) / 24
                  }
                ></RangeComponent>
              </View>
            );
          })}
        </ScrollView>
      </View>

      <ModalContainer
        showModal={acceptModal}
        modalStyle={{
          minWidth: 300,
          maxWidth: 400,
          height: window.height * 0.4,
        }}
        modalContentStyle={{
          width: "100%",
          minHeight: 310,
          maxHeight: 310,
        }}
        title="Sanction Transaction"
        onClose={() => onCloseAcceptModal()}
        modalContent={
          <View
            style={{
              width: "100%",
              height: 295,
              padding: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                height: 30,
              }}
            >
              <Text style={{ marginTop: 10 }}>{`Timing From: ${moment(
                selectedODTransaction?.fromDate,
                `YYYY/MM/DD HH:mm:ss`
              ).format("HH:mm")} To: ${moment(
                selectedODTransaction?.toDate,
                "YYYY/MM/DD HH:mm:ss"
              ).format("HH:mm")}`}</Text>
            </View>
            <View style={styles.remarksContainer}>
              <TextInput
                style={styles.textArea}
                underlineColorAndroid="transparent"
                placeholder="Please provide remarks!"
                placeholderTextColor="grey"
                numberOfLines={20}
                onChangeText={(x) => setRemarks(x)}
                multiline={true}
                value={selectedODTransaction?.remarks}
                editable={false}
              />
            </View>
            <View
              style={{
                flexDirection: "row-reverse",
                marginVertical: 3,

                // right: Platform.OS === "web" ? null : 70,
              }}
            >
              <View>
                <Button
                  onPress={() => onCloseAcceptModal()}
                  title="Cancel"
                  color="rgb(155, 43, 44)"
                ></Button>
              </View>
              <View style={{ marginRight: 10 }}>
                <Button
                  onPress={() => {
                    approve();
                  }}
                  title="Approve"
                  color="rgb(155, 43, 44)"
                ></Button>
              </View>
            </View>
          </View>
        }
        onRequestCloseModal={() => onCloseAcceptModal()}
      ></ModalContainer>
      <ModalContainer
        showModal={rejectModal}
        modalStyle={{
          minWidth: 300,
          maxWidth: 400,
          height: window.height * 0.4,
        }}
        modalContentStyle={{
          width: "100%",
          minHeight: 310,
          maxHeight: 310,
        }}
        title="Reject Reason"
        onClose={() => viewRejectModal(false)}
        modalContent={
          <View
            style={{
              width: "100%",
              height: 295,
              padding: 10,
            }}
          >
            <View style={styles.textAreaContainer}>
              <TextInput
                style={styles.textArea}
                underlineColorAndroid="transparent"
                placeholder="Please provide reject reason!"
                placeholderTextColor="grey"
                numberOfLines={20}
                onChangeText={(x) => setMessage(x)}
                multiline={true}
              />
            </View>
            <View
              style={{
                flexDirection: "row-reverse",
                marginVertical: 3,
                // right: Platform.OS === "web" ? null : 70,
              }}
            >
              <View>
                <Button
                  onPress={() => {
                    viewRejectModal(false);
                  }}
                  title="Cancel"
                  color="rgb(155, 43, 44)"
                ></Button>
              </View>
              <View style={{ marginRight: 10 }}>
                <Button
                  onPress={() => {
                    reject();
                  }}
                  title="Reject"
                  color="rgb(155, 43, 44)"
                ></Button>
              </View>
            </View>
          </View>
        }
        onRequestCloseModal={() => viewRejectModal(false)}
      ></ModalContainer>
      <ModalContainer
        showModal={timePicker.dislay}
        modalStyle={{
          minWidth: 200,
          maxWidth: 200,
          height: window.height * 0.5,
        }}
        modalContentStyle={{
          width: "100%",
          minHeight: timePicker.hour
            ? window.height / 2.3
            : window.height / 2.2,
          maxHeight: timePicker.hour
            ? window.height / 2.3
            : window.height / 2.2,
        }}
        title={`${timePicker.for} ${timePicker.hour ? " Hour" : " Minute"}`}
        onClose={() => setTimePicker(timePickerInitData)}
        modalContent={
          <View
            style={{
              width: "100%",
              height: 250,
              padding: 10,
            }}
          >
            <HourAndMinutePicker
              onChange={(e) =>
                updateInterval(
                  timePicker.currentValue,
                  e,
                  timePicker.for === "From" ? setFromDate : setToDate,
                  timePicker.hour ? "hr" : "min"
                )
              }
              type={timePicker.hour ? "hour" : "minute"}
              data={timePicker.currentValue}
            ></HourAndMinutePicker>
          </View>
        }
        onRequestCloseModal={() => setTimePicker(timePickerInitData)}
      ></ModalContainer>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#696969",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 1 },
    margin: 10,
    padding: 15,
  },
  headerStyle: {
    fontSize: 15,
    fontWeight: "900",
    color: "#000",
    alignSelf: "flex-start",
    marginLeft: 30,
  },
  valueStyle: {
    fontSize: 15,
    marginRight: 35,
    alignSelf: "flex-start",
  },
  textAreaContainer: {
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    height: 250,
    borderRadius: 10,
  },
  remarksContainer: {
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    height: 220,
    borderRadius: 10,
  },
  timePicker: {
    maxWidth: 30,
    borderBottomWidth: 2,
    borderBottomColor: "#000",
    marginHorizontal: 10,
    padding: 5,
  },
  textArea: {
    justifyContent: "flex-start",
    flex: 1,
    padding: 8,
    textAlignVertical: "top",
  },
  transHeaderwrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
    marginTop: 5,
  },
});
const mapStateToProps = ({
  selectedODTransaction,
  selectedODTransactionTabDetails,
}) => ({
  selectedODTransaction,
  selectedODTransactionTabDetails,
});
export default connect(mapStateToProps, {
  sanctionOdApplications,
  setSelectedODTransaction,
  setSelectedODTransactionTabDetails,
  addError,
})(ODSelectedTransactionDetails);

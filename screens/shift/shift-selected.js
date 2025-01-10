import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import {
  BackHandler, StyleSheet, Text, TextInput, TouchableOpacity, View
} from "react-native";
import { connect } from "react-redux";
import Button from "../../components/buttons/button";
import { DimensionContext } from "../../components/dimensionContext";
import FilterComponent from "../../components/filter/filter";
import Icon from "../../components/icons";
import ModalContainer from "../../components/modalContainer/modal";
import {
  sanctionShiftTxn,
  setSelectedShiftTxn
} from "../../redux/actions/shift.action";
import { addError } from "../../redux/actions/toast.action";

const SelectedShift = ({
  route,
  navigation,
  shiftTxnSelected,
  addError,
  sanctionShiftTxn,
  setSelectedShiftTxn,
}) => {
  const { window } = useContext(DimensionContext);
  const [sanctioned, setSanctioned] = useState("");
  const [lastScreen, setLastScreen] = useState("");
  const [message, setMessage] = useState("");
  const [remarks, setRemarks] = useState("");
  const [rejectModal, viewRejectModal] = useState(false);
  const [acceptModal, viewAcceptModal] = useState(false);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();

  useEffect(() => {
    if (shiftTxnSelected) {
      // setRemarks(shiftTxnSelected?.remarks);
      setFromDate(
        moment(shiftTxnSelected?.fromDate, "DD/MM/YYYY").format("YYYY-MM-DD"),
      );
      setToDate(
        moment(shiftTxnSelected?.toDate, "DD/MM/YYYY").format("YYYY-MM-DD"),
      );
    }
  }, [shiftTxnSelected]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setSelectedShiftTxn();
      };
    }, []),
  );

  useEffect(() => {
    if (route && route.params) {
      const { sanction, lastScreen } = route.params;
      setSanctioned(sanction);
      setLastScreen(lastScreen);
    }
  }, [route]);

  const updateInterval = (values) => {
    setFromDate(values[0]);
    setToDate(values[1]);
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick,
      );
    };
  }, []);
  function handleBackButtonClick() {
    navigation.navigate("shift", { lastScreen: lastScreen });
    return true;
  }

  const approve = () => {
    let obj = {
      mode: "SANCTION",
      tranId: shiftTxnSelected.tranId,
      empCode: shiftTxnSelected.empCode,
      fromDate: moment(shiftTxnSelected.fromDate, "DD/MM/YYYY").format(
        "YYYY-MM-DD",
      ),
      toDate: moment(shiftTxnSelected.toDate, "DD/MM/YYYY").format(
        "YYYY-MM-DD",
      ),
      remarks: shiftTxnSelected.remarks,
      contactDetails: shiftTxnSelected.contactDetails,
      sanctionFromDate: moment(shiftTxnSelected.fromDate, "DD/MM/YYYY").format(
        "YYYY-MM-DD",
      ),
      sanctionToDate: moment(shiftTxnSelected.toDate, "DD/MM/YYYY").format(
        "YYYY-MM-DD",
      ),
      sanctionDays:
        Math.ceil(Math.abs(fromDate - toDate) / (1000 * 60 * 60 * 24)) || 1,
      shiftCode: shiftTxnSelected.shiftCode,
      halfDay: 0,
      rejectReason: "",
    };
    sanctionShiftTxn(obj);
    viewAcceptModal(false);
    navigation.navigate("shift", {
      sanctioned: sanctioned,
      lastScreen: lastScreen,
    });
  };

  const reject = () => {
    if (message && message != "") {
      let obj = {
        mode: "REJECT",
        tranId: shiftTxnSelected.tranId,
        empCode: shiftTxnSelected.empCode,
        fromDate: moment(shiftTxnSelected.fromDate, "DD/MM/YYYY").format(
          "YYYY-MM-DD",
        ),
        toDate: moment(shiftTxnSelected.toDate, "DD/MM/YYYY").format(
          "YYYY-MM-DD",
        ),
        rejectReason: message,
        contactDetails: shiftTxnSelected.contactDetails,
        shiftCode: shiftTxnSelected.shiftCode,
        sanctionFromDate: moment(
          shiftTxnSelected.fromDate,
          "DD/MM/YYYY",
        ).format("YYYY-MM-DD"),
        sanctionToDate: moment(shiftTxnSelected.toDate, "DD/MM/YYYY").format(
          "YYYY-MM-DD",
        ),
      };
      sanctionShiftTxn(obj);
      viewRejectModal(false);
      navigation.navigate("shift", {
        sanctioned: sanctioned,
        lastScreen: lastScreen,
      });
    } else {
      addError(
        "Transaction can't be rejected without any reason. Please provide reason!",
        3000,
      );
    }
  };
  const onCloseAcceptModal = () => {
    viewAcceptModal(false);
  };

  return (
    <View nestedScrollEnabled={true} style={{ margin: 10, flex: 1 }}>
      <View
        style={{ marginBottom: 10, flexDirection: "row", alignItems: "center" }}
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
          Shift Application Details
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
                {shiftTxnSelected?.empName ? shiftTxnSelected?.empName : ""}
              </Text>
            </View>
          </View>
          <View style={styles.transHeaderwrapper}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold" }}>Employee Code:</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>
                {shiftTxnSelected?.empCode ? shiftTxnSelected?.empCode : ""}
              </Text>
            </View>
          </View>
          <View style={styles.transHeaderwrapper}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold" }}>Transaction ID: </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>
                {shiftTxnSelected?.tranId ? shiftTxnSelected?.tranId : ""}
              </Text>
            </View>
          </View>
          <View style={styles.transHeaderwrapper}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold" }}>Department Name: </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>
                {shiftTxnSelected?.deptName ? shiftTxnSelected?.deptName : ""}
              </Text>
            </View>
          </View>
          <View style={styles.transHeaderwrapper}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold" }}>Site Name: </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>
                {shiftTxnSelected?.siteName ? shiftTxnSelected?.siteName : ""}
              </Text>
            </View>
          </View>

          <View style={styles.transHeaderwrapper}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold" }}>Transaction Date:</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>
                {shiftTxnSelected?.tranDate
                  ? moment(
                      shiftTxnSelected?.tranDate,
                      "YYYY-MM-DDTHH:mm:ss",
                    ).format("DD/MM/YYYY HH:mm")
                  : ""}
              </Text>
            </View>
          </View>

          <View style={styles.transHeaderwrapper}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold" }}>From - To Date:</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>
                {shiftTxnSelected?.fromDate && shiftTxnSelected?.toDate
                  ? `${shiftTxnSelected?.fromDate} - ${shiftTxnSelected?.toDate}`
                  : ""}
              </Text>
            </View>
          </View>
          <View style={styles.transHeaderwrapper}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold" }}>Shift Details: </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>
                {shiftTxnSelected
                  ? `${shiftTxnSelected.shiftName}(${shiftTxnSelected.shiftFromTime} - ${shiftTxnSelected.shiftToTime})`
                  : ""}
              </Text>
            </View>
          </View>
          <View style={styles.transHeaderwrapper}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold" }}>Remarks:</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>
                {shiftTxnSelected?.remarks ? shiftTxnSelected?.remarks : ""}
              </Text>
            </View>
          </View>
          <View style={styles.transHeaderwrapper}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold" }}>Approval Authority: </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>{shiftTxnSelected?.sanctionBy || ""}</Text>
            </View>
          </View>
          {shiftTxnSelected?.rejected ? (
            <View style={styles.transHeaderwrapper}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>Reject Reason: </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text>{shiftTxnSelected?.rejectReason || ""}</Text>
              </View>
            </View>
          ) : (
            <></>
          )}

          <View style={styles.transHeaderwrapper}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold" }}>Status: </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>{shiftTxnSelected?.status || ""}</Text>
            </View>
          </View>
        </View>
        {sanctioned === "done" ? (
          <></>
        ) : (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              margin: 10,
            }}
          >
            <Button
              onPress={() => viewAcceptModal(true)}
              title="Approve"
              color="rgb(155, 43, 44)"
            ></Button>
            <Button
              onPress={() => viewRejectModal(true)}
              title="Reject"
              color="rgb(155, 43, 44)"
            ></Button>
          </View>
        )}
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
                maxHeight: 20,
                minHeight: 20,
                marginBottom: 10,
              }}
            >
              <FilterComponent
                type={"dateRange"}
                filterConfig={{
                  value: [fromDate, toDate],
                }}
                onFilterChange={(vv) => updateInterval(vv.value)}
                addError={addError}
              />
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
                value={shiftTxnSelected?.remarks}
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
    </View>
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
  shiftTxnSelected,
  leaveTxnApplied,
  leaveBalanceByEmployee,
}) => ({
  selectedODTransaction,
  shiftTxnSelected,
  leaveTxnApplied,
  leaveBalanceByEmployee,
});
export default connect(mapStateToProps, {
  addError,
  sanctionShiftTxn,
  setSelectedShiftTxn,
})(SelectedShift);

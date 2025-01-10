import { useFocusEffect } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
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
import Icon from "../../components/icons";
import ModalContainer from "../../components/modalContainer/modal";
import TextWrapper from "../../components/textWrapper";
import { formatDate, formatDateNew } from "../../components/utils";
import {
  sanctionAttendanceTxn,
  setSelectedAttendanceTxn,
  setTabDetailsAttendanceTxn,
} from "../../redux/actions/attendance.action";
import { addError } from "../../redux/actions/toast.action";

const AttendanceSelected = ({
  route,
  sanctionAttendanceTxn,
  navigation,
  selectedAttendanceTransaction,
  setSelectedAttendanceTxn,
  setTabDetailsAttendanceTxn,
  selectedAttendanceTransactionTabDetails,
  setSelectedCompOffTxnHolidays,
  addError,
}) => {
  const { window } = useContext(DimensionContext);
  const [sanctioned, setSanctioned] = useState("");
  const [message, setMessage] = useState("");
  const [remarks, setRemarks] = useState("");
  const [rejectModal, viewRejectModal] = useState(false);
  const [acceptModal, viewAcceptModal] = useState(false);
  useEffect(() => {
    if (selectedAttendanceTransaction) {
      setRemarks(selectedAttendanceTransaction.remarks);
    }
  }, [selectedAttendanceTransaction]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setSelectedAttendanceTxn();
        setTabDetailsAttendanceTxn();
      };
    }, [])
  );

  useEffect(() => {
    if (route && route.params) {
      const { sanctioned } = route.params;
      setSanctioned(sanctioned);
    }
  }, [route]);

  const approve = () => {
    let obj = {
      mode: "SANCTION",
      tranId: selectedAttendanceTransaction.tranId,
      empCode: selectedAttendanceTransaction.empCode,
      eventDate: formatDateNew(
        selectedAttendanceTransaction.eventDate,
        "DD/MM/YYYY",
        "YYYY-MM-DD"
      ),
      fromDate: formatDateNew(
        selectedAttendanceTransaction.fromDate,
        "YYYY-MM-DDTHH:mm:ss",
        "YYYY-MM-DD HH:mm"
      ),
      toDate: formatDateNew(
        selectedAttendanceTransaction.toDate,
        "YYYY-MM-DDTHH:mm:ss",
        "YYYY-MM-DD HH:mm"
      ),
      remarks: remarks,
      sanctionFromDate: formatDateNew(
        selectedAttendanceTransaction.fromDate,
        "YYYY-MM-DDTHH:mm:ss",
        "YYYY-MM-DD HH:mm"
      ),
      sanctionToDate: formatDateNew(
        selectedAttendanceTransaction.toDate,
        "YYYY-MM-DDTHH:mm:ss",
        "YYYY-MM-DD HH:mm"
      ),
      tranType: selectedAttendanceTransaction.tranType,
      canteenMode: selectedAttendanceTransaction.canteenMode,
    };
    sanctionAttendanceTxn(obj);
    viewAcceptModal(false);
    navigation.navigate("attendance", {
      sanctioned: sanctioned,
    });
  };

  const reject = () => {
    if (message && message != "") {
      let obj = {
        mode: "REJECT",
        tranId: selectedAttendanceTransaction.tranId,
        empCode: selectedAttendanceTransaction.empCode,
        eventDate: formatDateNew(
          selectedAttendanceTransaction.eventDate,
          "DD/MM/YYYY",
          "YYYY-MM-DD"
        ),
        fromDate: formatDateNew(
          selectedAttendanceTransaction.fromDate,
          "YYYY-MM-DDTHH:mm:ss",
          "YYYY-MM-DD HH:mm"
        ),
        toDate: formatDateNew(
          selectedAttendanceTransaction.toDate,
          "YYYY-MM-DDTHH:mm:ss",
          "YYYY-MM-DD HH:mm"
        ),
        sanctionFromDate: formatDateNew(
          selectedAttendanceTransaction.fromDate,
          "YYYY-MM-DDTHH:mm:ss",
          "YYYY-MM-DD HH:mm"
        ),
        sanctionToDate: formatDateNew(
          selectedAttendanceTransaction.toDate,
          "YYYY-MM-DDTHH:mm:ss",
          "YYYY-MM-DD HH:mm"
        ),
        tranType: selectedAttendanceTransaction.tranType,
        canteenMode: selectedAttendanceTransaction.canteenMode,
        rejectReason: message,
      };
      sanctionAttendanceTxn(obj);
      viewRejectModal(false);
      navigation.navigate("attendance", {
        sanctioned: sanctioned,
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
  };

  return (
    <View nestedScrollEnabled={true} style={{ margin: 10, flex: 1 }}>
      <View
        style={{ marginBottom: 10, flexDirection: "row", alignItems: "center" }}
      >
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
          Attendance Transaction Details
        </Text>
      </View>

      <View>
        <View style={[{ margin: 10, padding: 10 }, styles.itemContainer]}>
          <View style={styles.transHeaderwrapper}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold" }}>Transaction ID:</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>
                {selectedAttendanceTransaction?.tranId
                  ? selectedAttendanceTransaction?.tranId
                  : ""}
              </Text>
            </View>
          </View>

          <View style={styles.transHeaderwrapper}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold" }}>Employee:</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>
                {selectedAttendanceTransaction?.empName &&
                selectedAttendanceTransaction?.empCode
                  ? `${
                      selectedAttendanceTransaction?.empName
                    } (${selectedAttendanceTransaction?.empCode.trim()})`
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
                {selectedAttendanceTransaction?.eventDate
                  ? selectedAttendanceTransaction?.eventDate
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
                {selectedAttendanceTransaction?.tranDate
                  ? formatDate(
                      new Date(selectedAttendanceTransaction?.tranDate)
                    )
                  : ""}
              </Text>
            </View>
          </View>
          <View style={styles.transHeaderwrapper}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold" }}>Transaction Type:</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>
                {selectedAttendanceTransaction?.transactionType || ""}
              </Text>
            </View>
          </View>
          <View style={styles.transHeaderwrapper}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold" }}>Location:</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>{selectedAttendanceTransaction?.siteName || ""}</Text>
            </View>
          </View>
          <View style={styles.transHeaderwrapper}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold" }}>From-To Time:</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>
                {selectedAttendanceTransaction?.fromDate &&
                selectedAttendanceTransaction?.toDate
                  ? `${formatDateNew(
                      selectedAttendanceTransaction.fromDate,
                      "YYYY-MM-DDTHH:mm:ss",
                      "DD/MM/YYYY HH:mm"
                    )} - ${formatDateNew(
                      selectedAttendanceTransaction.toDate,
                      "YYYY-MM-DDTHH:mm:ss",
                      "DD/MM/YYYY HH:mm"
                    )}`
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
                {selectedAttendanceTransaction?.remarks
                  ? selectedAttendanceTransaction?.remarks
                  : ""}
              </Text>
            </View>
          </View>
          <View style={styles.transHeaderwrapper}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold" }}>Approval Authority: </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>{selectedAttendanceTransaction?.sanctionBy || ""}</Text>
            </View>
          </View>

          {selectedAttendanceTransaction?.rejected ? (
            <View style={styles.transHeaderwrapper}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>Reject Reason: </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text>{selectedAttendanceTransaction?.rejectReason || ""}</Text>
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
              <Text>{selectedAttendanceTransaction?.status || ""}</Text>
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
              marginBottom: 20,
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
      {selectedAttendanceTransactionTabDetails?.length > 0 ? (
        <View style={{ margin: 10 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#000",
            }}
          >
            Tab Details
          </Text>
        </View>
      ) : (
        <></>
      )}
      <ScrollView nestedScrollEnabled={true}>
        {selectedAttendanceTransactionTabDetails?.map((compOff, i) => {
          return (
            // <View style={[styles.itemContainer]}>
            <View
              key={compOff.empCode + i}
              style={[
                {
                  flexDirection: "row",
                  margin: 10,
                  // marginLeft: 10,
                  // marginTop: window.width < 760 ? 25 : 10,
                  flexWrap: "wrap",
                  padding: 10,
                },
                styles.itemContainer,
              ]}
            >
              <TextWrapper
                // style={{maxWidth: window - 40 }}
                leaveBalance={true}
                header={"Emp Code"}
                value={compOff.empCode}
              ></TextWrapper>
              <TextWrapper
                leaveBalance={true}
                header={"From-To Time"}
                value={`${
                  formatDateNew(
                    compOff.inDateTime,
                    "DD/MM/YYYY HH:mm:ss",
                    "HH:mm"
                  ) || "00:00"
                }-${
                  formatDateNew(
                    compOff.outDateTime,
                    "DD/MM/YYYY HH:mm:ss",
                    "HH:mm"
                  ) || "00:00"
                }`}
              ></TextWrapper>
              {/* <TextWrapper
              leaveBalance={true}
              header={"To Time"}
              value={`${formatDate(new Date(compOff.outDateTime), "HH:mm")}`}
            ></TextWrapper> */}

              {/* <TextWrapper
              leaveBalance={true}
              header={"Total Hours"}
              value={compOff.totalHours}
            ></TextWrapper> */}
              <TextWrapper
                leaveBalance={true}
                header={"Total Time"}
                value={`${compOff.totalHours} (in HRs) ${compOff.totalMinutes} (in mins)`}
              ></TextWrapper>
              <TextWrapper
                leaveBalance={true}
                header={"Location"}
                value={compOff.location}
              ></TextWrapper>
            </View>
            // </View>
          );
        })}
      </ScrollView>

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
            <View style={styles.remarksContainer}>
              <TextInput
                style={styles.textArea}
                underlineColorAndroid="transparent"
                placeholder="Please provide remarks!"
                placeholderTextColor="grey"
                numberOfLines={20}
                onChangeText={(x) => setRemarks(x)}
                multiline={true}
                value={remarks}
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
    height: 250,
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
    // justifyContent: "space-between",
    marginLeft: 10,
    marginTop: 5,
  },
});
const mapStateToProps = ({
  selectedODTransaction,
  selectedAttendanceTransaction,
  selectedAttendanceTransactionTabDetails,
  compOffTxnHoliday,
}) => ({
  selectedODTransaction,
  selectedAttendanceTransaction,
  selectedAttendanceTransactionTabDetails,
  compOffTxnHoliday,
});
export default connect(mapStateToProps, {
  sanctionAttendanceTxn,
  setSelectedAttendanceTxn,
  setTabDetailsAttendanceTxn,
  addError,
})(AttendanceSelected);

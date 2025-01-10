import { useFocusEffect } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  BackHandler,
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
import { formatDateNew } from "../../components/utils";
import {
  sanctionCompOffTxn,
  setSelectedCompOffTxn,
  setSelectedCompOffTxnHolidays,
  setSelectedCompOffTxnTabDetails,
} from "../../redux/actions/comp-off.action";
import { addError } from "../../redux/actions/toast.action";

const CompOffSelected = ({
  route,
  sanctionCompOffTxn,
  navigation,
  compOffTxnSelected,
  setSelectedCompOffTxn,
  setSelectedCompOffTxnTabDetails,
  compOffTxnTabDetails,
  setSelectedCompOffTxnHolidays,
  compOffTxnHoliday,
  addError,
}) => {
  const { window } = useContext(DimensionContext);
  const [sanctioned, setSanctioned] = useState("");
  const [lastScreen, setLastScreen] = useState("");
  const [message, setMessage] = useState("");
  const [remarks, setRemarks] = useState("");
  const [rejectModal, viewRejectModal] = useState(false);
  const [acceptModal, viewAcceptModal] = useState(false);
  const [specialDay, setSpecialDay] = useState("");
  useEffect(() => {
    if (compOffTxnSelected) {
      setRemarks(compOffTxnSelected.remarks);
    }
  }, [compOffTxnSelected]);

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
    navigation.navigate("comp-off", { lastScreen: lastScreen });
    return true;
  }

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setSelectedCompOffTxn();
        setSelectedCompOffTxnTabDetails();
        setSelectedCompOffTxnHolidays();
      };
    }, [])
  );

  useEffect(() => {
    if (route && route.params) {
      const { sanctioned, lastScreen } = route.params;
      setSanctioned(sanctioned);
      setLastScreen(lastScreen);
    }
  }, [route]);

  useEffect(() => {
    if (compOffTxnHoliday)
      setSpecialDay(
        compOffTxnHoliday.weeklyOff
          ? "Weekly Off"
          : compOffTxnHoliday.holiday
          ? "Holiday"
          : ""
      );
  }, [compOffTxnHoliday]);

  const approve = () => {
    let obj = {
      mode: "SANCTION",
      tranId: compOffTxnSelected.tranId,
      empCode: compOffTxnSelected.empCode,
      eventDate: formatDateNew(
        compOffTxnSelected.eventDate,
        "DD/MM/YYYY",
        "YYYY-MM-DD"
      ),
      fromTime: compOffTxnSelected.fromTime,
      toTime: compOffTxnSelected.toTime,
      hoursWorked: compOffTxnSelected.totalHours,
      remarks: compOffTxnSelected.remarks,
      days: compOffTxnSelected.days,
    };
    sanctionCompOffTxn(obj);
    viewAcceptModal(false);
    navigation.navigate("comp-off", {
      sanctioned: sanctioned,
      lastScreen: lastScreen,
    });
  };

  const reject = () => {
    if (message && message != "") {
      let obj = {
        mode: "REJECT",
        tranId: compOffTxnSelected.tranId,
        empCode: compOffTxnSelected.empCode,
        eventDate: formatDateNew(
          compOffTxnSelected.eventDate,
          "DD/MM/YYYY",
          "YYYY-MM-DD"
        ),
        fromTime: compOffTxnSelected.fromTime,
        toTime: compOffTxnSelected.toTime,
        hoursWorked: compOffTxnSelected.totalHours,
        rejectReason: message,
      };
      sanctionCompOffTxn(obj);
      viewRejectModal(false);
      navigation.navigate("comp-off", {
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
          Compensatory Off Details
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
                {compOffTxnSelected?.tranId ? compOffTxnSelected?.tranId : ""}
              </Text>
            </View>
          </View>

          <View style={styles.transHeaderwrapper}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold" }}>Employee:</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>
                {compOffTxnSelected?.empName && compOffTxnSelected?.empCode
                  ? `${compOffTxnSelected?.empName} (${compOffTxnSelected?.empCode})`
                  : ""}
              </Text>
            </View>
          </View>

          <View style={styles.transHeaderwrapper}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold" }}>Working Date:</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>
                {compOffTxnSelected?.eventDate
                  ? compOffTxnSelected?.eventDate
                  : ""}
                {specialDay != "" ? `(${specialDay})` : ""}
              </Text>
            </View>
          </View>
          {compOffTxnSelected && compOffTxnSelected.fromTime ? (
            <View style={styles.transHeaderwrapper}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>From To Time:</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text>
                  {formatDateNew(
                    compOffTxnSelected.fromTime,
                    "YYYY-MM-DDTHH:mm:ss",
                    "HH:mm"
                  ) +
                    " to " +
                    formatDateNew(
                      compOffTxnSelected.toTime,
                      "YYYY-MM-DDTHH:mm:ss",
                      "HH:mm"
                    )}
                </Text>
              </View>
            </View>
          ) : (
            <></>
          )}
          <View style={styles.transHeaderwrapper}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold" }}>Total Hours:</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>{compOffTxnSelected?.totalHours}</Text>
            </View>
          </View>
          <View style={styles.transHeaderwrapper}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold" }}>Transaction Date:</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>
                {compOffTxnSelected?.tranDate
                  ? formatDateNew(
                      compOffTxnSelected?.tranDate,
                      "YYYY-MM-DDTHH:mm:ss.sssz",
                      "DD/MM/YYYY"
                    )
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
                {compOffTxnSelected?.remarks ? compOffTxnSelected?.remarks : ""}
              </Text>
            </View>
          </View>

          <View style={styles.transHeaderwrapper}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold" }}>Approval Authority: </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>{compOffTxnSelected?.sanctionBy || ""}</Text>
            </View>
          </View>
          <View style={styles.transHeaderwrapper}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold" }}>Status:</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>
                {compOffTxnSelected?.status ? compOffTxnSelected?.status : ""}
              </Text>
            </View>
          </View>
          {compOffTxnSelected?.rejected ? (
            <View style={styles.transHeaderwrapper}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>Reject Reason: </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text>{compOffTxnSelected?.rejectReason || ""}</Text>
              </View>
            </View>
          ) : (
            <></>
          )}
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
      {compOffTxnTabDetails.length > 0 ? (
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

      {compOffTxnTabDetails?.map((compOff, i) => {
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
              value={`${formatDateNew(
                compOff.inDateTime,
                "DD/MM/YYYY HH:mm:ss",
                "HH:mm"
              )}-${formatDateNew(
                compOff.outDateTime,
                "DD/MM/YYYY HH:mm:ss",
                "HH:mm"
              )}`}
            ></TextWrapper>

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
                value={compOffTxnSelected?.remarks}
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
    height: 240,
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
  compOffTxnSelected,
  compOffTxnTabDetails,
  compOffTxnHoliday,
}) => ({
  selectedODTransaction,
  compOffTxnSelected,
  compOffTxnTabDetails,
  compOffTxnHoliday,
});
export default connect(mapStateToProps, {
  sanctionCompOffTxn,
  setSelectedCompOffTxn,
  setSelectedCompOffTxnTabDetails,
  addError,
  setSelectedCompOffTxnHolidays,
})(CompOffSelected);

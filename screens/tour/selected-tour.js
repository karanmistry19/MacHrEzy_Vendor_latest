import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
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
import FilterComponent from "../../components/filter/filter";
import Icon from "../../components/icons";
import ModalContainer from "../../components/modalContainer/modal";
import { formatDate, formatDateNew } from "../../components/utils";
import { addError } from "../../redux/actions/toast.action";
import {
  removeTourTxn,
  sanctionTourTxn,
} from "../../redux/actions/tour.action";

const SelectedTourApp = ({
  route,
  removeTourTxn,
  sanctionTourTxn,
  navigation,
  tourTxnSelected,
  addError,
}) => {
  const { window } = useContext(DimensionContext);
  const [sanctioned, setSanctioned] = useState("");
  const [message, setMessage] = useState("");
  const [remarks, setRemarks] = useState("");
  const [rejectModal, viewRejectModal] = useState(false);
  const [acceptModal, viewAcceptModal] = useState(false);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [lastScreen, setLastScreen] = useState("");

  useEffect(() => {
    if (tourTxnSelected) {
      setFromDate(
        moment(tourTxnSelected?.fromDate, "DD/MM/YYYY").format("YYYY-MM-DD")
      );
      setToDate(
        moment(tourTxnSelected?.toDate, "DD/MM/YYYY").format("YYYY-MM-DD")
      );
    }
  }, [tourTxnSelected]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        removeTourTxn();
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

  const updateInterval = (values) => {
    setFromDate(values[0]);
    setToDate(values[1]);
  };

  const approve = () => {
    let obj = {
      mode: "SANCTION",
      tranId: tourTxnSelected.tranId,
      empCode: tourTxnSelected.empCode,
      fromDate: formatDateNew(
        tourTxnSelected.fromDate,
        "DD/MM/YYYY",
        "YYYY-MM-DD"
      ),
      toDate: formatDateNew(tourTxnSelected.toDate, "DD/MM/YYYY", "YYYY-MM-DD"),
      remarks: tourTxnSelected.remarks,
      sanctionFromDate: formatDateNew(
        tourTxnSelected.fromDate,
        "DD/MM/YYYY",
        "YYYY-MM-DD"
      ),
      sanctionToDate: formatDateNew(
        tourTxnSelected.toDate,
        "DD/MM/YYYY",
        "YYYY-MM-DD"
      ),
    };
    sanctionTourTxn(obj);
    viewAcceptModal(false);
    navigation.navigate("tour", {
      sanctioned: sanctioned,
      lastScreen: lastScreen,
    });
  };

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
    navigation.navigate("tour", { lastScreen: lastScreen });
    return true;
  }

  const reject = () => {
    if (message && message != "") {
      let obj = {
        mode: "REJECT",
        tranId: tourTxnSelected.tranId,
        empCode: tourTxnSelected.empCode,
        fromDate: formatDateNew(
          tourTxnSelected.fromDate,
          "DD/MM/YYYY",
          "YYYY-MM-DD"
        ),
        toDate: formatDateNew(
          tourTxnSelected.toDate,
          "DD/MM/YYYY",
          "YYYY-MM-DD"
        ),
        rejectReason: message,
        sanctionFromDate: formatDateNew(
          tourTxnSelected.fromDate,
          "DD/MM/YYYY",
          "YYYY-MM-DD"
        ),
        sanctionToDate: formatDateNew(
          tourTxnSelected.toDate,
          "DD/MM/YYYY",
          "YYYY-MM-DD"
        ),
      };
      sanctionTourTxn(obj);
      viewRejectModal(false);
      navigation.navigate("tour", {
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
    setFromDate(
      moment(tourTxnSelected?.fromDate, "DD/MM/YYYY").format("YYYY-MM-DD")
    );
    setToDate(
      moment(tourTxnSelected?.toDate, "DD/MM/YYYY").format("YYYY-MM-DD")
    );
  };

  const currentDate = new Date();
  return (
    <View style={{ margin: 10, flex: 1 }}>
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
          Tour Details
        </Text>
      </View>

      <View style={[{ margin: 10, padding: 10 }, styles.itemContainer]}>
        <View style={styles.transHeaderwrapper}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "bold" }}>Transaction ID:</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text>
              {tourTxnSelected?.tranId ? tourTxnSelected?.tranId : ""}
            </Text>
          </View>
        </View>
        <View style={styles.transHeaderwrapper}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "bold" }}>Employee:</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text>
              {tourTxnSelected?.empName && tourTxnSelected?.empCode
                ? `${tourTxnSelected?.empName}(${tourTxnSelected?.empCode})`
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
              {tourTxnSelected?.tranDate
                ? formatDateNew(tourTxnSelected?.tranDate)
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
              {tourTxnSelected?.fromDate
                ? formatDate(tourTxnSelected?.fromDate)
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
              {tourTxnSelected?.toDate
                ? formatDate(tourTxnSelected?.toDate)
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
              {tourTxnSelected?.remarks ? tourTxnSelected?.remarks : ""}
            </Text>
          </View>
        </View>
        <View style={styles.transHeaderwrapper}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "bold" }}>Approval Authority: </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text>{tourTxnSelected?.sanctionBy || ""}</Text>
          </View>
        </View>
        {tourTxnSelected?.rejected ? (
          <View style={styles.transHeaderwrapper}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold" }}>Reject Reason: </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>{tourTxnSelected?.rejectReason || ""}</Text>
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
            <Text>{tourTxnSelected?.status || ""}</Text>
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
            minHeight: 60,
          }}
        >
          <View style={{ marginRight: 10 }}>
            <Button
              onPress={() => viewAcceptModal(true)}
              title="Approve"
              color="rgb(155, 43, 44)"
            ></Button>
          </View>
          <View style={{ marginRight: 10 }}>
            <Button
              onPress={() => viewRejectModal(true)}
              title="Reject"
              color="rgb(155, 43, 44)"
            ></Button>
          </View>
        </View>
      )}
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
                maxDate={
                  new Date(
                    currentDate.getFullYear() + 1,
                    currentDate.getMonth(),
                    currentDate.getDate()
                  )
                }
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
                value={tourTxnSelected?.remarks}
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
const mapStateToProps = ({ tourTxnSelected }) => ({
  tourTxnSelected,
});
export default connect(mapStateToProps, {
  sanctionTourTxn,
  removeTourTxn,
  addError,
})(SelectedTourApp);

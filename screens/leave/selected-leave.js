import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import {
  BackHandler,
  Image,
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
import { ModularCard } from "../../components/modularCard";
import { Table } from "../../components/tables/table";
import { Tab } from "../../components/tabs/tab";
import TextWrapper from "../../components/textWrapper";
import { formatDate } from "../../components/utils";
import {
  initAppliedLeave,
  initLeaveBalance,
  removeSelectedTxn,
  sanctionLeaveTxn,
} from "../../redux/actions/leave.action";
import { addError } from "../../redux/actions/toast.action";

const SelectedLeaveApp = ({
  route,
  sanctionLeaveTxn,
  navigation,
  selectedLeaveTransaction,
  leaveTxnApplied,
  leaveBalanceByEmployee,
  initAppliedLeave,
  removeSelectedTxn,
  initLeaveBalance,
  addError,
  style,
  tableStyle,
}) => {
  const [selectedTab, setSelectedTab] = useState("");
  const [tableData, setTableData] = useState([]);
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
    if (selectedLeaveTransaction) {
      setRemarks(selectedLeaveTransaction.remarks);
      setFromDate(
        moment(selectedLeaveTransaction.fromDate, "DD/MM/YYYY").format(
          "YYYY-MM-DD"
        )
      );
      setToDate(
        moment(selectedLeaveTransaction.toDate, "DD/MM/YYYY").format(
          "YYYY-MM-DD"
        )
      );
    }
  }, [selectedLeaveTransaction]);

  useFocusEffect(
    React.useCallback(() => {
      setSelectedTab(`Leave Balance for ${new Date().getFullYear()}`);
      return () => {
        initAppliedLeave();
        removeSelectedTxn();
        initLeaveBalance();
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
    setTableData(
      selectedTab === `Leave Balance for ${new Date().getFullYear()}`
        ? [...leaveBalanceByEmployee]
        : [...leaveTxnApplied]
    );
  }, [leaveBalanceByEmployee, leaveTxnApplied, selectedTab]);

  const updateInterval = (values) => {
    setFromDate(values[0]);
    setToDate(values[1]);
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
    navigation.navigate("leave", { lastScreen: lastScreen });
    return true;
  }

  const approve = () => {
    let obj = {
      mode: "SANCTION",
      tranId: selectedLeaveTransaction.tranId,
      empCode: selectedLeaveTransaction.empCode,
      fromDate: moment(selectedLeaveTransaction.fromDate, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
      ),
      toDate: moment(selectedLeaveTransaction.toDate, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
      ),
      remarks: remarks,
      contactDetails: selectedLeaveTransaction.contactDetails,
      days: selectedLeaveTransaction.days,
      chgUser: "HR",
      lvHeadCode: selectedLeaveTransaction.lvHeadCode,
      sanctionFromDate: moment(
        selectedLeaveTransaction.fromDate,
        "DD/MM/YYYY"
      ).format("YYYY-MM-DD"),
      sanctionToDate: moment(
        selectedLeaveTransaction.toDate,
        "DD/MM/YYYY"
      ).format("YYYY-MM-DD"),
      sanctionDays: selectedLeaveTransaction.days,
      halfDay: selectedLeaveTransaction.halfDay,
      rejectReason: "",
    };
    sanctionLeaveTxn(obj);
    viewAcceptModal(false);
    navigation.navigate("leave", {
      sanctioned: sanctioned,
      lastScreen: lastScreen,
    });
  };

  const reject = () => {
    if (message && message != "") {
      let obj = {
        mode: "REJECT",
        tranId: selectedLeaveTransaction.tranId,
        empCode: selectedLeaveTransaction.empCode,
        fromDate: moment(
          selectedLeaveTransaction.fromDate,
          "DD/MM/YYYY"
        ).format("YYYY-MM-DD"),
        toDate: moment(selectedLeaveTransaction.toDate, "DD/MM/YYYY").format(
          "YYYY-MM-DD"
        ),
        rejectReason: message,
        contactDetails: selectedLeaveTransaction.contactDetails,
        days: selectedLeaveTransaction.days,
        chgUser: "HR",
        lvHeadCode: selectedLeaveTransaction.lvHeadCode,
        sanctionFromDate: moment(
          selectedLeaveTransaction.fromDate,
          "DD/MM/YYYY"
        ).format("YYYY-MM-DD"),
        sanctionToDate: moment(
          selectedLeaveTransaction.toDate,
          "DD/MM/YYYY"
        ).format("YYYY-MM-DD"),
      };
      sanctionLeaveTxn(obj);
      viewRejectModal(false);
      navigation.navigate("leave", {
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
      moment(selectedLeaveTransaction.fromDate, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
      )
    );
    setToDate(
      moment(selectedLeaveTransaction.toDate, "DD/MM/YYYY").format("YYYY-MM-DD")
    );
  };

  const setRow = ({ row }) => {
    return [
      {
        component: () => (
          <View
            style={[
              {
                width: window.width - 60,
              },
              styles.itemContainer,
            ]}
          >
            {selectedTab.startsWith("Leave Balance")
              ? [
                  <TextWrapper
                    style={{
                      maxWidth: (window.width - 180) / 3.8,
                      minWidth: (window.width - 180) / 3.8,
                    }}
                    leaveBalance={true}
                    header={"Leave Type"}
                    value={`${row.leaveAlias} `}
                  ></TextWrapper>,

                  <TextWrapper
                    style={{
                      maxWidth: (window.width - 180) / 3.8,
                      minWidth: (window.width - 180) / 3.8,
                    }}
                    leaveBalance={true}
                    header={"OP Balance"}
                    value={row.opBal}
                  ></TextWrapper>,

                  <TextWrapper
                    style={{
                      maxWidth: (window.width - 180) / 3.8,
                      minWidth: (window.width - 180) / 3.8,
                    }}
                    leaveBalance={true}
                    header={"Entitled"}
                    value={row.entitled}
                  ></TextWrapper>,

                  <TextWrapper
                    style={{
                      maxWidth: (window.width - 180) / 3.8,
                      minWidth: (window.width - 180) / 3.8,
                    }}
                    leaveBalance={true}
                    header={"Accucumulated"}
                    value={row.accumulated}
                  ></TextWrapper>,

                  <TextWrapper
                    style={{
                      maxWidth: (window.width - 180) / 3.8,
                      minWidth: (window.width - 180) / 3.8,
                    }}
                    leaveBalance={true}
                    header={"Used Leaves"}
                    value={row.usedLeaves}
                  ></TextWrapper>,

                  <TextWrapper
                    style={{
                      maxWidth: (window.width - 180) / 3.8,
                      minWidth: (window.width - 180) / 3.8,
                    }}
                    leaveBalance={true}
                    header={"Leave Balance"}
                    value={row.leaveBalance}
                  ></TextWrapper>,
                ]
              : [
                  <TextWrapper
                    style={{
                      maxWidth: (window.width - 180) / 3,
                      minWidth: (window.width - 180) / 3,
                    }}
                    leaveBalance={true}
                    header={"From - To Date"}
                    value={`${row.fromDate} - ${row.toDate}`}
                    textStyle={{ flex: 1 }}
                  ></TextWrapper>,

                  <TextWrapper
                    style={{
                      maxWidth: (window.width - 180) / 3,
                      minWidth: (window.width - 180) / 3,
                    }}
                    leaveBalance={true}
                    header={"Leave Type"}
                    value={row.leaveAlias}
                  ></TextWrapper>,
                  <TextWrapper
                    style={{
                      maxWidth: (window.width - 180) / 3,
                      minWidth: (window.width - 180) / 3,
                    }}
                    leaveBalance={true}
                    header={"Remarks"}
                    value={row.remarks}
                  ></TextWrapper>,
                ]}
          </View>
        ),
      },
    ];
  };

  return (
    <ScrollView
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={false}
      style={{
        marginVertical: 10,
        marginHorizontal: 10,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => handleBackButtonClick()}>
          <Icon name="back"></Icon>
        </TouchableOpacity>
        <Text style={{ fontWeight: "bold", padding: 10, fontSize: 17 }}>
          Leave Application Details
        </Text>
      </View>
      <View style={[{ margin: 10, padding: 10 }, styles.itemStyle]}>
        <View style={styles.transHeaderwrapper}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "bold" }}>Transaction ID: </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text>
              {selectedLeaveTransaction?.tranId
                ? selectedLeaveTransaction?.tranId
                : ""}
            </Text>
          </View>
        </View>
        <View style={styles.transHeaderwrapper}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "bold" }}>Leave Type: </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text>
              {selectedLeaveTransaction?.leaveAlias
                ? selectedLeaveTransaction?.leaveAlias
                : ""}
            </Text>
          </View>
        </View>
        <View style={styles.transHeaderwrapper}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "bold" }}>No of Leaves: </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text>
              {selectedLeaveTransaction?.days
                ? selectedLeaveTransaction?.days
                : ""}
            </Text>
          </View>
        </View>
        {selectedLeaveTransaction?.halfDay ? (
          <View style={styles.transHeaderwrapper}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold" }}>Half Day Status: </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>
                {selectedLeaveTransaction?.halfDay === 1
                  ? "First half"
                  : "Second Half"}
              </Text>
            </View>
          </View>
        ) : selectedLeaveTransaction?.halfDay === 0 ? (
          <></>
        ) : (
          <></>
        )}

        <View style={styles.transHeaderwrapper}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "bold" }}>Employee: </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text>
              {selectedLeaveTransaction?.empName &&
              selectedLeaveTransaction?.empCode
                ? `${selectedLeaveTransaction?.empName} (${selectedLeaveTransaction?.empCode})`
                : ""}
            </Text>
          </View>
        </View>

        <View style={styles.transHeaderwrapper}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "bold" }}>Contact Details: </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text>
              {selectedLeaveTransaction?.contactDetails
                ? selectedLeaveTransaction?.contactDetails
                : ""}
            </Text>
          </View>
        </View>
        <View style={styles.transHeaderwrapper}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "bold" }}>Transaction Date: </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text>
              {selectedLeaveTransaction?.tranDate
                ? formatDate(new Date(selectedLeaveTransaction?.tranDate))
                : ""}
            </Text>
          </View>
        </View>

        <View style={styles.transHeaderwrapper}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "bold" }}>From - To Date: </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text>
              {selectedLeaveTransaction?.fromDate &&
              selectedLeaveTransaction?.toDate
                ? `${selectedLeaveTransaction?.fromDate} - ${selectedLeaveTransaction?.toDate}`
                : ""}
            </Text>
          </View>
        </View>
        <View style={styles.transHeaderwrapper}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "bold" }}>Remarks: </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text>
              {selectedLeaveTransaction?.remarks
                ? selectedLeaveTransaction?.remarks
                : ""}
            </Text>
          </View>
        </View>
        <View style={styles.transHeaderwrapper}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "bold" }}>Approval Authority: </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text>{selectedLeaveTransaction?.sanctionBy || ""}</Text>
          </View>
        </View>
        {selectedLeaveTransaction?.rejectReason ? (
          <View style={styles.transHeaderwrapper}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold" }}>Reject Reason: </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>{selectedLeaveTransaction?.rejectReason || ""}</Text>
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
            <Text>{selectedLeaveTransaction?.status || ""}</Text>
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
      <ModularCard
        style={{
          height: 420,
          // width: window.width - 40,
          margin: 10,
          marginTop: 20,
          borderRadius: 5,
        }}
        cardContent={
          <View
            style={{
              maxHeight: 410,
            }}
          >
            <Tab
              displayContent={[
                `Leave Balance for ${new Date().getFullYear()}`,
                `Leave Applied ${
                  selectedLeaveTransaction
                    ? selectedLeaveTransaction?.fromDate ===
                      selectedLeaveTransaction?.toDate
                      ? " on " + selectedLeaveTransaction?.fromDate
                      : "between " +
                        selectedLeaveTransaction?.fromDate +
                        " and " +
                        selectedLeaveTransaction?.toDate
                    : ""
                }`,
              ]}
              selectedTab={selectedTab}
              onTabChange={(v) => {
                setSelectedTab(v);
              }}
            ></Tab>
            {tableData?.length < 1 ? (
              <Image
                source={require("../../assets/sorry.png")}
                style={{
                  height: 200,
                  width: Math.min(window.width - 50, 500),
                  alignSelf: "center",
                }}
              ></Image>
            ) : (
              <ScrollView
                scrollEnabled={true}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                style={[
                  {
                    marginTop: 10,
                    marginBottom: 25,
                  },
                  style,
                ]}
              >
                <Table
                  tableStyle={tableStyle}
                  tableData={tableData}
                  retrivalLogic={setRow}
                ></Table>
              </ScrollView>
            )}
          </View>
        }
      ></ModularCard>
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
              {/* <FilterComponent
                type={"dateRange"}
                filterConfig={{
                  value: [fromDate, toDate],
                }}
                onFilterChange={(vv) => updateInterval(vv.value)}
                addError={addError}
              /> */}
              <Text>{`${moment(fromDate, "YYYY-MM-DD").format(
                "DD/MM/YYYY"
              )}-${moment(toDate, "YYYY-MM-DD").format("DD/MM/YYYY")}`}</Text>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    margin: 5,
  },
  rowStyle: {
    width: "100%",
    backgroundColor: "#D0D0D0",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  itemContainer: {
    // backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#fff",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 1 },
    // margin: 10,
    flexWrap: "wrap",
    flexDirection: "row",

    backgroundColor: "#D0D0D0",
    paddingTop: 5,
  },
  itemStyle: {
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
    marginRight: 30,
    alignSelf: "flex-start",
  },
  transHeaderwrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
    marginTop: 5,
  },
  remarksContainer: {
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    height: 220,
    borderRadius: 10,
  },
  textArea: {
    justifyContent: "flex-start",
    flex: 1,
    padding: 8,
    textAlignVertical: "top",
  },
  textAreaContainer: {
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    height: 250,
    borderRadius: 10,
  },
});
const mapStateToProps = ({
  selectedODTransaction,
  selectedLeaveTransaction,
  leaveTxnApplied,
  leaveBalanceByEmployee,
}) => ({
  selectedODTransaction,
  selectedLeaveTransaction,
  leaveTxnApplied,
  leaveBalanceByEmployee,
});
export default connect(mapStateToProps, {
  sanctionLeaveTxn,
  initAppliedLeave,
  removeSelectedTxn,
  initLeaveBalance,
  addError,
})(SelectedLeaveApp);

import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import React, { useContext, useEffect, useReducer, useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { connect } from "react-redux";
import ApprovalDataPopup from "../../components/ApprovalDataPopup/approvalDataPopup";
import Button from "../../components/buttons/button";
import Checkbox from "../../components/checkbox";
import { DimensionContext } from "../../components/dimensionContext";
import Icons from "../../components/icons";
import ModalContainer from "../../components/modalContainer/modal";
import { ModularCard } from "../../components/modularCard";
import { Table } from "../../components/tables/table";
import { Tab } from "../../components/tabs/tab";
import TextWrapper from "../../components/textWrapper";
import { removeMultipleUploadResult } from "../../redux/actions/dashboard.action";
import {
  removeFilterParams,
  setFilterParams,
} from "../../redux/actions/filter-params.action";
import {
  fetchHistoryShiftTxn,
  fetchMyShiftForUser,
  fetchPendingShiftTxn,
  fetchSelctedShiftTxn,
  removeShiftData,
  sanctionMultipleShiftTxn,
} from "../../redux/actions/shift.action";
import { addError } from "../../redux/actions/toast.action";
import FilterDataComponent from "../leave/filterDataComponent";
const reducer = (state, obj) => {
  switch (obj.type) {
    case "ADD_ITEM":
      let temp = state.filter((x) => x.type != obj.data.type);
      return [...temp, obj.data];
    case "REMOVE_ITEM":
      return state.filter((x) => x.type != obj.data.type);
    case "REMOVE_ALL":
      return [];
    case "INIT_DATA":
      return obj.data;
    default:
      return state;
  }
};
const Shift = ({
  style,
  modularCardStyle,
  tableStyle,
  shiftTxnHistory,
  shiftTxnPending,
  fetchPendingShiftTxn,
  fetchHistoryShiftTxn,
  fetchSelctedShiftTxn,
  navigation,
  sanctionMultipleShiftTxn,
  addError,
  multipleUploadResult,
  removeMultipleUploadResult,
  removeShiftData,
  user,
  fetchMyShiftForUser,
  shiftTxnUser,
  setFilterParams,
  filterParams,
  removeFilterParams,
  route,
}) => {
  const [selectedTxn, setSelectedTxn] = useState([]);
  const [selectedTab, setSelectedTab] = useState("Pending");
  const [tableData, setTableData] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const { window } = useContext(DimensionContext);
  const [message, setMessage] = useState("");
  const [data, setData] = useReducer(reducer, []);
  const [rejectModal, viewRejectModal] = useState(false);
  const [acceptModal, viewAcceptModal] = useState(false);
  const [approvalModal, viewApprovalModal] = useState(false);
  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    if (route && route.params && route.params.lastScreen) {
      setSelectedTab(route.params.lastScreen);
    }
  }, [route.params]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setData({ type: "REMOVE_ALL" });
        setFetch(false);
        setSelectedTxn([]);
        removeShiftData();
        setAllSelected(false);
        setSelectedTab("");
      };
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      if (user) {
        if (
          Object.keys(filterParams).length > 0 &&
          filterParams.params.length > 0
        ) {
          setFetch(true);
          setData({ type: "INIT_DATA", data: [...filterParams.params] });
          removeFilterParams();
        } else {
          fetchMyShiftForUser({ tranId: "0", empCode: user.empCode });

          if (user.userType === "U") {
            setSelectedTab("My Shift");
          } else {
            fetchPendingShiftTxn();
            fetchHistoryShiftTxn();
          }
        }
      }
    }, [user, filterParams])
  );

  useEffect(() => {
    if (user && user.userType != "U" && !fetch && !route.params?.lastScreen) {
      setSelectedTab(shiftTxnPending.length > 0 ? "Pending" : "History");
    }
  }, [shiftTxnPending]);

  const navigateToSelected = (item) => {
    setFilterParams({ params: data });
    setSelectedTxn([]);
    setAllSelected(false);
    fetchSelctedShiftTxn({
      empCode: item.empCode,
      tranId: item.tranId,
    });

    navigation.navigate("selected-shift", {
      sanction: ["History", "My Shift"].includes(selectedTab)
        ? "done"
        : "pending",
      lastScreen: selectedTab,
    });
  };

  const setRow = ({ row }) => {
    return [
      {
        component: () => (
          <TouchableOpacity
            onPress={() => navigateToSelected(row)}
            key={row.tranId}
            style={[
              {
                width: window.width - 60,
              },
              styles.itemContainer,
            ]}
          >
            {["History", "My Shift"].includes(selectedTab) ? (
              <Icons
                style={{
                  position: "absolute",
                  left:
                    window.width < 600 ? window.width - 90 : window.width - 180,
                  top: window.width < 600 ? 5 : 5,
                }}
                fill={
                  row.status.toLowerCase() === "sanctioned"
                    ? "#0D9C11"
                    : row.status.toLowerCase() === "processing"
                    ? "#c76408"
                    : "#C82E24"
                }
                name={
                  row.status.toLowerCase() === "sanctioned"
                    ? "sanctioned"
                    : row.status.toLowerCase() === "processing"
                    ? "processing"
                    : "rejected"
                }
              ></Icons>
            ) : (
              <></>
            )}
            <TextWrapper
              title={true}
              value={`${row.empName} (${row.empCode.trim()})`}
            ></TextWrapper>
            <TextWrapper
              textStyle={{
                // marginLeft: 10,
                backgroundColor: "#FFBA00",
                padding: 2,
                borderRadius: 5,
                fontSize: 14,
              }}
              value={`${row.fromDate} - ${row.toDate}`}
            ></TextWrapper>
            <TextWrapper
              value={
                row ? `Timing :${row.shiftFromTime} - ${row.shiftToTime}` : ""
              }
            ></TextWrapper>
            {["History", "My Shift"].includes(selectedTab) ? (
              <TextWrapper
                value={`Approval Date: ${row.approvalDate}`}
              ></TextWrapper>
            ) : (
              <></>
            )}
            <TextWrapper
              value={row?.remarks}
              textStyle={{
                fontSize: 10,
                alignSelf: "flex-end",
              }}
            ></TextWrapper>
            {["History", "My Shift"].includes(selectedTab) ? (
              <></>
            ) : (
              <View style={{ position: "absolute", right: 10, top: 20 }}>
                <Checkbox
                  value={selectedTxn.find((x) => x.tranId === row.tranId)}
                  setValue={() => selectItem(row)}
                  style={{
                    borderRadius: 0,
                    maxWidth: 25,
                    minHeight: 25,
                    maxHeight: 25,
                    minWidth: 25,
                  }}
                ></Checkbox>
              </View>
            )}
          </TouchableOpacity>
        ),
      },
    ];
  };
  const selectItem = (newElement) => {
    let temp = selectedTxn.findIndex((x) => x.tranId === newElement.tranId);
    if (temp > -1) {
      setAllSelected(false);
      setSelectedTxn([...selectedTxn.filter((x, i) => i !== temp)]);
    } else {
      setAllSelected(selectedTxn.length + 1 === shiftTxnPending.length);
      setSelectedTxn([...selectedTxn, newElement]);
    }
  };
  const selectAll = () => {
    if (allSelected) {
      setAllSelected(false);
      setSelectedTxn([]);
    } else {
      setAllSelected(true);
      setSelectedTxn([...shiftTxnPending]);
    }
  };

  const approvalModalClose = () => {
    viewApprovalModal(false);
    removeMultipleUploadResult();
  };

  useFocusEffect(
    React.useCallback(() => {
      if (multipleUploadResult && multipleUploadResult.length > 0) {
        viewApprovalModal(true);
        fetchData(data);
      }
      return () => {};
    }, [multipleUploadResult])
  );

  useEffect(() => {
    setTableData(
      selectedTab === "History"
        ? [...shiftTxnHistory]
        : selectedTab === "My Shift"
        ? [...shiftTxnUser].sort(
            (a, b) => new Date(b.tranDate) - new Date(a.tranDate)
          )
        : [...shiftTxnPending]
    );
  }, [shiftTxnHistory, shiftTxnPending, selectedTab, shiftTxnUser]);

  const approveAll = () => {
    let list = selectedTxn.map((x) => ({
      mode: "SANCTION",
      tranId: x.tranId,
      empCode: x.empCode,
      fromDate: moment(x.fromDate, "DD/MM/YYYY").format("YYYY-MM-DD"),
      toDate: moment(x.toDate, "DD/MM/YYYY").format("YYYY-MM-DD"),
      remarks: x.remarks,
      contactDetails: x.contactDetails,
      sanctionFromDate: moment(x.fromDate, "DD/MM/YYYY").format("YYYY-MM-DD"),
      sanctionToDate: moment(x.toDate, "DD/MM/YYYY").format("YYYY-MM-DD"),
      shiftCode: x.shiftCode,
      sanctionDays:
        Math.ceil(
          Math.abs(
            moment(x.fromDate, "DD/MM/YYYY").format("YYYY-MM-DD") -
              moment(x.toDate, "DD/MM/YYYY").format("YYYY-MM-DD")
          ) /
            (1000 * 60 * 60 * 24)
        ) || 1,
      rejectReason: "",
    }));
    viewAcceptModal(false);
    sanctionMultipleShiftTxn({ data: list });
    setSelectedTxn([]);
    setAllSelected(false);
  };
  const rejectAll = () => {
    if (message && message != "") {
      let list = selectedTxn.map((x) => ({
        mode: "REJECT",
        tranId: x.tranId,
        empCode: x.empCode,
        fromDate: moment(x.fromDate, "DD/MM/YYYY").format("YYYY-MM-DD"),
        toDate: moment(x.toDate, "DD/MM/YYYY").format("YYYY-MM-DD"),
        shiftCode: x.shiftCode,
        rejectReason: message,
        contactDetails: x.contactDetails,
        sanctionFromDate: moment(x.fromDate, "DD/MM/YYYY").format("YYYY-MM-DD"),
        sanctionToDate: moment(x.toDate, "DD/MM/YYYY").format("YYYY-MM-DD"),
      }));
      viewRejectModal(false);
      sanctionMultipleShiftTxn({ data: list });
      setSelectedTxn([]);
      setAllSelected(false);
    } else {
      addError(
        "Transaction can't be rejected without any reason. Please provide reason!",
        3000
      );
    }
  };

  useEffect(() => {
    if (fetch) {
      fetchData(data);
    }
  }, [data]);

  const fetchData = (data) => {
    let filterObj = data.reduce((a, b) => {
      if (b.type === "employee") {
        return { ...a, empCode: b.data[b.uniqueKey] };
      } else if (b.type === "dept") {
        return { ...a, deptCode: b.data[b.uniqueKey] };
      } else if (b.type === "grade") {
        return { ...a, gradeCode: b.data[b.uniqueKey] };
      } else if (b.type === "site") {
        return { ...a, siteCode: b.data[b.uniqueKey] };
      } else {
        return a;
      }
    }, {});
    fetchMyShiftForUser({
      ...filterObj,
      tranId: "0",
      empCode: user.empCode,
    });
    if (user.userType != "U") {
      fetchPendingShiftTxn(filterObj);
      fetchHistoryShiftTxn(filterObj);
    }

    setSelectedTxn([]);
    setAllSelected(false);
  };
  const removeAll = () => {
    removeFilterParams();
    setFetch(false);
    setData({ type: "REMOVE_ALL" });
    fetchMyShiftForUser({ tranId: "0", empCode: user.empCode });
    if (user.userType != "U") {
      fetchPendingShiftTxn();
      fetchHistoryShiftTxn();
    }
  };
  return (
    <View
      style={{
        width: window.width - 20,
        marginVertical: 10,
        marginHorizontal: 10,
        flex: 1,
        // height: screen.height - 125,
      }}
    >
      {user.userType === "U" ? (
        <></>
      ) : (
        <FilterDataComponent
          data={data}
          setData={(item) => {
            setFetch(true);
            setData({ type: "ADD_ITEM", data: item });
          }}
          removeData={(item) => setData({ type: "REMOVE_ITEM", data: item })}
          removeAll={() => removeAll()}
          search={() => search()}
        ></FilterDataComponent>
      )}
      <ModularCard
        style={{
          // height:
          //   window.height -
          //   (Platform.OS === "web" ? 150 : 140 + StatusBar.currentHeight),
          flex: 1,
          width: window.width,
          marginTop: 10,
        }}
        cardContent={
          <View
            style={{
              flex: 1,
              // height: "100%",
              // window.height -
              // (Platform.OS === "web" ? 150 : 140 + StatusBar.currentHeight),
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                color: `rgb(155, 43, 44)`,
                marginBottom: 2,
              }}
            >
              Shift Transaction
            </Text>
            <Tab
              displayContent={
                user.userType === "U"
                  ? ["My Shift"]
                  : ["Pending", "History", "My Shift"]
              }
              selectedTab={selectedTab}
              onTabChange={(v) => {
                setSelectedTab(v);
              }}
            ></Tab>
            {selectedTab === "Pending" && tableData?.length > 0 ? (
              <View
                style={{
                  marginTop: 20,
                  alignSelf: "flex-end",
                  marginRight: 13,
                  flexDirection: "row",
                }}
              >
                <Text style={{ fontSize: 17, marginRight: 7, marginTop: 2 }}>
                  Select All
                </Text>
                <Checkbox
                  value={allSelected}
                  setValue={() => selectAll()}
                  style={{
                    borderRadius: 0,
                    maxWidth: 25,
                    minHeight: 25,
                    maxHeight: 25,
                    minWidth: 25,
                  }}
                ></Checkbox>
              </View>
            ) : (
              <></>
            )}
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
                contentContainerStyle={{ paddingBottom: 30 }}
                scrollEnabled={true}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl refreshing={false} onRefresh={removeAll} />
                }
                style={[
                  {
                    marginTop: 10,
                    // marginBottom: 25,
                  },
                  // style,
                ]}
              >
                <Table
                  tableStyle={tableStyle}
                  tableData={tableData}
                  retrivalLogic={setRow}
                ></Table>
              </ScrollView>
            )}
            {selectedTxn.length > 0 && selectedTab === "Pending" ? (
              <View
                style={{
                  flexDirection: "row",
                  // bottom: 15,
                  marginTop: 10,
                  justifyContent:
                    window.width < 600 ? "space-around" : "flex-end",
                }}
              >
                <Button
                  onPress={() => viewAcceptModal(true)}
                  style={{
                    minWidth: 150,
                    maxWidth: 150,
                  }}
                  title={"Approve"}
                ></Button>
                <Button
                  onPress={() => viewRejectModal(true)}
                  style={{
                    minWidth: 150,
                    maxWidth: 150,
                  }}
                  title={"Reject"}
                ></Button>
              </View>
            ) : (
              <></>
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
          minHeight: 150,
          maxHeight: 150,
        }}
        title="Sanction Transaction"
        onClose={() => viewAcceptModal(false)}
        modalContent={
          <View
            style={{
              width: "100%",
              height: 150,
              padding: 10,
            }}
          >
            <Text style={{ padding: 15, fontWeight: "300", fontSize: 17 }}>
              Are You Sure To Sanction These Transactions ?
            </Text>
            <View
              style={{
                flexDirection: "row-reverse",
                marginVertical: 3,

                // right: Platform.OS === "web" ? null : 70,
              }}
            >
              <View style={{ marginTop: 20 }}>
                <Button
                  onPress={() => viewAcceptModal(false)}
                  title="Cancel"
                  color="rgb(155, 43, 44)"
                ></Button>
              </View>
              <View style={{ marginRight: 10, marginTop: 20 }}>
                <Button
                  onPress={() => {
                    approveAll();
                  }}
                  title="Approve"
                  color="rgb(155, 43, 44)"
                ></Button>
              </View>
            </View>
          </View>
        }
        onRequestCloseModal={() => viewAcceptModal(false)}
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
                    rejectAll();
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
      <ApprovalDataPopup
        data={multipleUploadResult}
        showModal={approvalModal}
        navigation={navigation}
        onRequestCloseModal={approvalModalClose}
      ></ApprovalDataPopup>
    </View>
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
  shiftTxnHistory,
  shiftTxnPending,
  multipleUploadResult,
  user,
  shiftTxnUser,
  filterParams,
}) => ({
  shiftTxnHistory,
  shiftTxnPending,
  multipleUploadResult,
  user,
  shiftTxnUser,
  filterParams,
});
export default connect(mapStateToProps, {
  fetchPendingShiftTxn,
  fetchHistoryShiftTxn,
  fetchSelctedShiftTxn,
  sanctionMultipleShiftTxn,
  addError,
  removeMultipleUploadResult,
  removeShiftData,
  fetchMyShiftForUser,
  setFilterParams,
  removeFilterParams,
})(Shift);

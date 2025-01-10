import { useFocusEffect } from "@react-navigation/native";
import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
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
import { connect, useDispatch } from "react-redux";
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
import UserTypeSelectionModal from "../../components/user-type-select-modal";
import { formatDateNew } from "../../components/utils";
import {
  fetchCompOffHolidays,
  fetchCompOffTabDeatils,
  fetchHistoryCompOffTxn,
  fetchPendingCompOffTxn,
  fetchSelctedCompOffTxn,
  fetchUserCompOffTxn,
  removeCompOffTxn,
  resetCreateStatusData,
  sanctionMultipleCompOffTxn,
  setSelectedCompOffTxnTabDetails,
} from "../../redux/actions/comp-off.action";
import { removeMultipleUploadResult } from "../../redux/actions/dashboard.action";
import {
  removeFilterParams,
  setFilterParams,
} from "../../redux/actions/filter-params.action";
import { addError } from "../../redux/actions/toast.action";
import FilterDataComponent from "../leave/filterDataComponent";
import ApplyCompOff from "./applyCompOff";

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
const CompOff = ({
  style,
  modularCardStyle,
  tableStyle,
  fetchCompOffHolidays,
  fetchCompOffTabDeatils,
  fetchSelctedCompOffTxn,
  fetchPendingCompOffTxn,
  fetchHistoryCompOffTxn,
  compOffTxnPending,
  compOffTxnHistory,
  navigation,
  sanctionMultipleCompOffTxn,
  addError,
  multipleUploadResult,
  removeMultipleUploadResult,
  removeCompOffTxn,
  user,
  fetchUserCompOffTxn,
  compOffTxnUser,
  filterParams,
  setFilterParams,
  route,
  removeFilterParams,
  resetCreateStatusData,
  CompOffTxnCreateUser,
}) => {
  const [allSelected, setAllSelected] = useState(false);
  const [selectedTxn, setSelectedTxn] = useState([]);
  const [selectedTab, setSelectedTab] = useState("");
  const [tableData, setTableData] = useState([]);
  const [rejectModal, viewRejectModal] = useState(false);
  const [acceptModal, viewAcceptModal] = useState(false);
  const { window } = useContext(DimensionContext);
  const [message, setMessage] = useState("");
  const [data, setData] = useReducer(reducer, []);
  const [approvalModal, viewApprovalModal] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [applyCompoff, setApplyCompoff] = useState(false);
  const [showAction, setActionVisible] = useState({
    visible: false,
    index: null,
  });
  const selectedItem = useRef({});
  const dispatch = useDispatch();
  const [optionModal, setOptionModal] = useState(false);
  const [behalfOther, setBehlafOther] = useState(false);

  useEffect(() => {
    if (route && route.params && route.params.lastScreen) {
      setSelectedTab(route.params.lastScreen);
    }
  }, [route.params]);

  useEffect(() => {
    if (CompOffTxnCreateUser?.success) {
      setApplyCompoff(false);
      dispatch(resetCreateStatusData());
      fetchUserCompOffTxn({ tranId: "0", empCode: user.empCode });
    }
  }, [CompOffTxnCreateUser]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setFetch(false);
        setData({ type: "REMOVE_ALL" });
        setSelectedTxn([]);
        removeCompOffTxn();
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
          fetchUserCompOffTxn({ tranId: "0", empCode: user.empCode });
          if (user.userType === "U") {
            setSelectedTab("My Comp-off");
          } else {
            fetchPendingCompOffTxn();
            fetchHistoryCompOffTxn();
          }
        }
      }
    }, [user, filterParams])
  );

  useEffect(() => {
    if (user && user.userType != "U" && !fetch && !route.params?.lastScreen) {
      setSelectedTab(compOffTxnPending.length > 0 ? "Pending" : "History");
    }
  }, [compOffTxnPending]);

  const navigateToSelected = (compOff) => {
    setFilterParams({ params: data });
    fetchSelctedCompOffTxn({
      empCode: compOff.empCode,
      tranId: compOff.tranId,
    });
    fetchCompOffTabDeatils({
      empCode: compOff.empCode.trim(),
      eventDate: formatDateNew(compOff.eventDate, "DD/MM/YYYY", "YYYY-MM-DD"),
    });
    fetchCompOffHolidays({
      empCode: compOff.empCode.trim(),
      eventDate: formatDateNew(compOff.eventDate, "DD/MM/YYYY", "YYYY-MM-DD"),
      eventDateTo: formatDateNew(compOff.eventDate, "DD/MM/YYYY", "YYYY-MM-DD"),
    });
    navigation.navigate("comp-off-selected", {
      sanctioned: ["History", "My Comp-off"].includes(selectedTab)
        ? "done"
        : "pending",
      lastScreen: selectedTab,
    });
  };
  const selectItem = (newElement) => {
    let temp = selectedTxn.findIndex((x) => x.tranId === newElement.tranId);
    if (temp > -1) {
      setAllSelected(false);
      setSelectedTxn([...selectedTxn.filter((x, i) => i !== temp)]);
    } else {
      setAllSelected(selectedTxn.length + 1 === compOffTxnPending.length);
      setSelectedTxn([...selectedTxn, newElement]);
    }
  };

  const selectAll = () => {
    if (allSelected) {
      setAllSelected(false);
      setSelectedTxn([]);
    } else {
      setAllSelected(true);
      setSelectedTxn([...compOffTxnPending]);
    }
  };

  const canEdit = (row) => {
    if (selectedTab === "History") {
      return false;
    } else if (
      row.sanctioned === 0 &&
      row.rejected === 0 &&
      ((["A", "P", "H"].includes(user.userType) && selectedTab === "Pending") ||
        (["A", "P", "H", "U", "R"].includes(user.userType) &&
          selectedTab === "My Comp-off"))
    ) {
      return true;
    } else {
      return false;
    }
  };

  const removeSelectedAction = () => {
    setActionVisible({
      visible: false,
      index: null,
    });
  };

  const setRow = ({ row, index }) => {
    return [
      {
        component: () => (
          <View style={styles.itemContainer}>
            <TouchableOpacity
              onPress={() => navigateToSelected(row)}
              key={row.tranId}
              style={{
                width: "90%",
                flexDirection: window.width > 600 ? "row" : "column",
                alignItems: window.width > 600 ? "center" : "flex-start",
              }}
            >
              <View style={{ width: "50%" }}>
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
                  value={`${row.eventDate} - ${
                    row.fromToTime ||
                    formatDateNew(
                      row.fromTime,
                      "YYYY-MM-DDTHH:mm:ss",
                      "HH:mm"
                    ) +
                      " to " +
                      formatDateNew(row.toTime, "YYYY-MM-DDTHH:mm:ss", "HH:mm")
                  } (${row.totalHours})`}
                ></TextWrapper>
                <TextWrapper
                  value={row?.remarks}
                  textStyle={{
                    fontSize: 14,
                    alignSelf: "flex-end",
                  }}
                ></TextWrapper>
              </View>
              <View style={{ width: "50%" }}>
                {["History", "My Comp-off"].includes(selectedTab) ? (
                  <TextWrapper
                    value={`Approval Date: ${row.approvalDate}`}
                  ></TextWrapper>
                ) : (
                  <></>
                )}
              </View>
            </TouchableOpacity>
            <View
              style={{
                width: "10%",
                alignItems: "flex-end",
              }}
            >
              <View
                style={{
                  top: 5,
                  right: 2,
                  justifyContent: "space-between",
                  maxHeight: 105,
                  bottom: 10,
                }}
              >
                {canEdit(row) ? (
                  <TouchableOpacity
                    style={{
                      alignItems: "flex-start",
                      maxHeight: 40,
                      maxWidth: 40,
                      right: 4,
                    }}
                    onPress={() => {
                      if (showAction.index === index) {
                        setActionVisible({ visible: false, index: null });
                      } else {
                        setActionVisible({ visible: true, index: index });
                      }
                    }}
                  >
                    <Icons
                      width={25}
                      height={25}
                      fill={showAction.index === index ? "#20B2AA" : "#000"}
                      name={"option"}
                    ></Icons>
                  </TouchableOpacity>
                ) : (
                  <></>
                )}
                <View
                  style={{
                    // bottom: row.sanctioned === 0 && row.rejected === 0 ? 10 : 2,
                    maxHeight: 40,
                    marginRight: 5,
                    // marginTop: canEdit(row) ? 0 : 10,
                  }}
                >
                  {["History", "My Comp-off"].includes(selectedTab) ? (
                    <View style={{ paddingRight: 5, paddingTop: 20 }}>
                      <Icons
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
                    </View>
                  ) : (
                    <Checkbox
                      value={selectedTxn.find((x) => x.tranId === row.tranId)}
                      setValue={() => selectItem(row)}
                      style={{
                        borderRadius: 5,
                        maxWidth: 20,
                        minHeight: 20,
                        maxHeight: 20,
                        minWidth: 20,
                      }}
                    ></Checkbox>
                  )}
                </View>
              </View>

              {showAction.visible && showAction.index === index ? (
                <View
                  style={{
                    top: 5,
                    position: "absolute",
                    right: 30,
                    backgroundColor: "#FFF",
                    paddingHorizontal: 7,
                    paddingVertical: 2,
                    borderRadius: 5,
                    borderColor: "#A9A9A9",
                    borderWidth: 1,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      marginBottom: 5,
                      alignItems: "center",
                      marginLeft: 1,
                    }}
                    onPress={() => {
                      // CompOffTxnCreateUser?.success &&
                      //   dispatch(resetCreateStatusData());
                      dispatch(setSelectedCompOffTxnTabDetails());
                      removeSelectedAction();
                      selectedItem.current = row;
                      setApplyCompoff(true);
                    }}
                  >
                    <Icons
                      fill={"#045FB4"}
                      width={22}
                      height={22}
                      name={"edit"}
                    ></Icons>
                    <Text style={{ marginLeft: 5, fontWeight: "600" }}>
                      Edit
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      borderBottomColor: "#A9A9A9",
                      borderBottomWidth: 1,
                      marginBottom: 5,
                    }}
                  />

                  {/* <TouchableOpacity
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                    onPress={() => {
                      // viewDeleteModal({ visible: true, item: row });
                      // removeSelectedAction();
                    }}
                  >
                    <Icons
                      width={22}
                      height={22}
                      fill={"rgb(155, 43, 44)"}
                      name={"delete"}
                    ></Icons>
                    <Text style={{ marginLeft: 5, fontWeight: "600" }}>
                      Delete
                    </Text>
                  </TouchableOpacity> */}
                </View>
              ) : (
                <></>
              )}
            </View>
          </View>
        ),
      },
    ];
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
  const onCloseAcceptModal = () => {
    viewAcceptModal(false);
  };
  useEffect(() => {
    setTableData(
      selectedTab === "History"
        ? [...compOffTxnHistory]
        : selectedTab === "My Comp-off"
          ? [...compOffTxnUser].sort(
              (a, b) => new Date(b.tranDate) - new Date(a.tranDate)
            )
          : [...compOffTxnPending]
    );
  }, [compOffTxnHistory, compOffTxnPending, selectedTab, compOffTxnUser]);

  const approveAll = () => {
    let list = selectedTxn.map((x) => ({
      mode: "SANCTION",
      tranId: x.tranId,
      empCode: x.empCode,
      eventDate: formatDateNew(x.eventDate, "DD/MM/YYYY", "YYYY-MM-DD"),
      fromTime: x.fromTime,
      toTime: x.toTime,
      hoursWorked: x.totalHours,
      remarks: x.remarks,
    }));
    viewAcceptModal(false);
    sanctionMultipleCompOffTxn({ data: list });
    setSelectedTxn([]);
    setAllSelected(false);
  };
  const rejectAll = () => {
    if (message && message != "") {
      let list = selectedTxn.map((x) => ({
        mode: "REJECT",
        tranId: x.tranId,
        empCode: x.empCode,
        eventDate: formatDateNew(x.eventDate, "DD/MM/YYYY", "YYYY-MM-DD"),
        fromTime: x.fromTime,
        toTime: x.toTime,
        hoursWorked: x.totalHours,
        rejectReason: message,
      }));
      viewRejectModal(false);
      sanctionMultipleCompOffTxn({ data: list });
      setMessage("");
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
    fetchUserCompOffTxn({
      ...filterObj,
      empCode: user.empCode,
      tranId: "0",
    });
    if (user.userType != "U") {
      fetchPendingCompOffTxn(filterObj);
      fetchHistoryCompOffTxn(filterObj);
    }
    setSelectedTxn([]);
    setAllSelected(false);
  };

  const removeAll = () => {
    removeFilterParams();
    setFetch(false);
    setData({ type: "REMOVE_ALL" });
    fetchUserCompOffTxn({ tranId: "0", empCode: user.empCode });
    if (user.userType != "U") {
      fetchPendingCompOffTxn();
      fetchHistoryCompOffTxn();
    }
  };

  const onCloseOptionModal = (data, transaction) => {
    setSelectedTransaction(transaction);
    setApplyCompoff(true);
    setBehlafOther(data);
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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
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
                Comp-Off Transaction
              </Text>
              <Button
                style={styles.btn1}
                title={"Add New"}
                textStyle={styles.textStyle}
                onPress={() => {
                  selectedItem.current = {};
                  dispatch(setSelectedCompOffTxnTabDetails());
                  setApplyCompoff(true);
                }}
              ></Button>
            </View>
            <Tab
              displayContent={
                user.userType === "U"
                  ? ["My Comp-off"]
                  : ["Pending", "History", "My Comp-off"]
              }
              selectedTab={selectedTab}
              onTabChange={(v) => {
                setSelectedTab(v);
              }}
            ></Tab>
            {selectedTab === "Pending" && tableData.length > 0 ? (
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
        onClose={() => onCloseAcceptModal()}
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
                  onPress={() => onCloseAcceptModal()}
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
      {Boolean(applyCompoff) && (
        <ApplyCompOff
          showModal={applyCompoff}
          onPressCancel={() => setApplyCompoff(false)}
          addError={addError}
          selectedDate={""}
          selectedTransaction={selectedItem.current}
          behalfOther={behalfOther}
        />
      )}
      {Boolean(optionModal) && (
        <UserTypeSelectionModal
          showModal={optionModal}
          onRequestCloseModal={() => setOptionModal(!optionModal)}
          closeModal={(data) => onCloseOptionModal(data, null)}
        ></UserTypeSelectionModal>
      )}
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
  textStyle: {
    fontSize: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  btn1: {
    width: 100,
    backgroundColor: "#9B2B2C",
    marginBottom: 5,
  },
});

const mapStateToProps = ({
  compOffTxnHistory,
  compOffTxnPending,
  multipleUploadResult,
  user,
  compOffTxnUser,
  filterParams,
  CompOffTxnCreateUser,
}) => ({
  compOffTxnHistory,
  compOffTxnPending,
  multipleUploadResult,
  user,
  compOffTxnUser,
  filterParams,
  CompOffTxnCreateUser,
});

export default connect(mapStateToProps, {
  fetchCompOffHolidays,
  fetchCompOffTabDeatils,
  fetchSelctedCompOffTxn,
  fetchPendingCompOffTxn,
  fetchHistoryCompOffTxn,
  sanctionMultipleCompOffTxn,
  addError,
  removeMultipleUploadResult,
  removeCompOffTxn,
  fetchUserCompOffTxn,
  setFilterParams,
  removeFilterParams,
  resetCreateStatusData,
})(CompOff);

import { useFocusEffect } from "@react-navigation/native";
import React, { useContext, useEffect, useReducer, useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView, StyleSheet, Text,
  TextInput,
  TouchableOpacity,
  View
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
import UserTypeSelectModal from "../../components/user-type-select-modal";
import { formatDateNew } from "../../components/utils";
import {
  fetchTabDetailsAttendanceTxn,
  setTabDetailsAttendanceTxn
} from "../../redux/actions/attendance.action";
import { removeMultipleUploadResult } from "../../redux/actions/dashboard.action";
import {
  removeFilterParams,
  setFilterParams
} from "../../redux/actions/filter-params.action";
import { closeModal, openModal } from "../../redux/actions/modal-manage.action";
import {
  createOD,
  deleteOD, fetchAllOdApplications, fetchMyOdForUser, fetchOdTabDeatils, fetchPendingOdApplications, fetchSelctedOdApplication, removeOdData, sanctionMultipleOdApplications
} from "../../redux/actions/od-app.action";
import { addError } from "../../redux/actions/toast.action";
import FilterDataComponent from "../leave/filterDataComponent";
import CreateOdModal from "./create-odModal";

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
const OdApplication = ({
  tableStyle,
  fetchPendingOdApplications,
  fetchAllOdApplications,
  fetchSelctedOdApplication,
  fetchOdTabDeatils,
  pendingODApplications,
  allODApplications,
  navigation,
  sanctionMultipleOdApplications,
  addError,
  multipleUploadResult,
  removeMultipleUploadResult,
  removeOdData,
  user,
  fetchMyOdForUser,
  odTxnUser,
  route,
  setFilterParams,
  filterParams,
  fetchTabDetailsAttendanceTxn,
  selectedAttendanceTransactionTabDetails,
  setTabDetailsAttendanceTxn,
  createOD,
  removeFilterParams,
  deleteOD,
  modalManage,
  openModal,
  closeModal,
}) => {
  const [selectedTxn, setSelectedTxn] = useState([]);
  const [selectedTab, setSelectedTab] = useState("");
  const [tableData, setTableData] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [rejectModal, viewRejectModal] = useState(false);
  const [acceptModal, viewAcceptModal] = useState(false);
  const [showAction, setActionVisible] = useState({
    visible: false,
    index: null,
  });
  const [deleteModal, viewDeleteModal] = useState({ visible: false, item: {} });
  const { window } = useContext(DimensionContext);
  const [data, setData] = useReducer(reducer, []);
  const [fetch, setFetch] = useState(false);
  const [message, setMessage] = useState("");
  const [approvalModal, viewApprovalModal] = useState(false);
  const [optionModal, setOptionModal] = useState(false);
  const [behalfOther, setBehlafOther] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState();
  const [createOdModal, setCreateOdModal] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      removeSelectedAction();
      return () => {
        setData({ type: "REMOVE_ALL" });
        setFetch(false);
        setSelectedTxn([]);
        removeOdData();
        setAllSelected(false);
        setSelectedTab("");
      };
    }, []),
  );

  useEffect(() => {
    if (route && route.params && route.params.lastScreen) {
      setSelectedTab(route.params.lastScreen);
    }
  }, [route.params]);

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
          fetchMyOdForUser({
            tranId: "0",
            empCode: user.empCode,
          });
          if (user.userType === "U") {
            setSelectedTab("My OD");
          } else {
            fetchPendingOdApplications();
            fetchAllOdApplications();
          }
        }
      }
    }, [user, filterParams]),
  );

  useEffect(() => {
    if (user && user.userType != "U" && !route.params?.lastScreen && !fetch) {
      setSelectedTab(pendingODApplications.length > 0 ? "Pending" : "History");
    }
  }, [pendingODApplications]);

  const approvalModalClose = () => {
    viewApprovalModal(false);
    removeMultipleUploadResult();
  };

  const navigateToSelected = (od) => {
    setFilterParams({ params: data });

    setSelectedTxn([]);
    setAllSelected(false);
    fetchSelctedOdApplication({
      empCode: od.empCode,
      tranId: od.tranId,
    });
    fetchOdTabDeatils({
      eventDate: formatDateNew(od.eventDate, "DD/MM/YYYY", "YYYY-MM-DD"),
      empCode: od.empCode,
    });
    navigation.navigate("selected-od-app", {
      sanctioned: ["History", "My OD"].includes(selectedTab)
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
      setAllSelected(selectedTxn.length + 1 === pendingODApplications.length);
      setSelectedTxn([...selectedTxn, newElement]);
    }
  };

  const selectAll = () => {
    if (allSelected) {
      setAllSelected(false);
      setSelectedTxn([]);
    } else {
      setAllSelected(true);
      setSelectedTxn([...pendingODApplications]);
    }
  };
  const onCloseAcceptModal = () => {
    viewAcceptModal(false);
  };
  const onCloseDeleteModal = () => {
    viewDeleteModal({ visible: false, item: {} });
  };
  const canEdit = (row) => {
    if (selectedTab === "History") {
      return false;
    } else if (
      row.sanctioned === 0 &&
      row.rejected === 0 &&
      ((["A", "P", "H"].includes(user.userType) && selectedTab === "Pending") ||
        (["A", "P", "H", "U", "R"].includes(user.userType) &&
          selectedTab === "My OD"))
    ) {
      return true;
    } else {
      return false;
    }
  };

  const setRow = ({ row, index }) => {
    return [
      {
        component: () => (
          <View style={styles.itemContainer}>
            <TouchableOpacity
              onPress={() => navigateToSelected(row)}
              key={row.tranId}
              style={[
                {
                  width: window.width - 90,
                },
                styles.rowData,
              ]}
            >
              <TextWrapper
                title={true}
                value={`${row.empName} (${row.empCode.trim()})`}
              ></TextWrapper>
              {["History", "My OD"].includes(selectedTab) ? (
                <TextWrapper
                  textStyle={{
                    // marginLeft: 10,
                    backgroundColor: "#FFBA00",
                    padding: 2,
                    borderRadius: 5,
                    fontSize: 14,
                  }}
                  value={`${row?.eventDate} (${row?.fromToTime?.slice(
                    0,
                    5,
                  )} -${row?.fromToTime?.slice(
                    9,
                    row?.fromToTime?.toString().length,
                  )}) (${row?.odHrs})`}
                ></TextWrapper>
              ) : (
                <></>
              )}
              {["History", "My OD"].includes(selectedTab) ? (
                <></>
              ) : (
                <TextWrapper
                  textStyle={{
                    // marginLeft: 10,
                    backgroundColor: "#FFBA00",
                    padding: 2,
                    borderRadius: 5,
                    fontSize: 14,
                  }}
                  value={`${formatDateNew(row.fromDate).slice(
                    0,
                    11,
                  )} (${formatDateNew(row.fromDate).slice(
                    11,
                    16,
                  )} - ${formatDateNew(row.toDate).slice(11, 16)})  (${
                    row.odHrs
                  })`}
                ></TextWrapper>
              )}
              {["History", "My OD"].includes(selectedTab) ? (
                <TextWrapper
                  value={`Approval Date: ${row.approvalDate}`}
                ></TextWrapper>
              ) : (
                <></>
              )}

              <TextWrapper
                value={row?.remarks}
                // title="true"
                textStyle={{
                  fontSize: 10,
                  alignSelf: "flex-end",
                  marginLeft: 2,
                }}
              ></TextWrapper>
            </TouchableOpacity>
            <View
              style={{
                top: 5,
                right: 2,
                justifyContent: "space-between",
                maxHeight: 105,
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
                  bottom: 10,
                  maxHeight: 40,
                  marginRight: 5,
                  marginTop: canEdit(row) ? 0 : 10,
                }}
              >
                {["History", "My OD"].includes(selectedTab) ? (
                  <Icons
                    style={{}}
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
                  padding: 7,
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
                    removeSelectedAction();
                    onCloseOptionModal(selectedTab === "Pending", row);
                  }}
                >
                  <Icons
                    fill={"#045FB4"}
                    width={22}
                    height={22}
                    name={"edit"}
                  ></Icons>
                  <Text style={{ marginLeft: 5, fontWeight: "600" }}>Edit</Text>
                </TouchableOpacity>
                <View
                  style={{
                    borderBottomColor: "#A9A9A9",
                    borderBottomWidth: 1,
                    marginBottom: 5,
                  }}
                />

                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                  onPress={() => {
                    viewDeleteModal({ visible: true, item: row });
                    removeSelectedAction();
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
                </TouchableOpacity>
              </View>
            ) : (
              <></>
            )}
          </View>
        ),
      },
    ];
  };

  const removeSelectedAction = () => {
    setActionVisible({
      visible: false,
      index: null,
    });
  };

  useEffect(() => {
    setTableData(
      selectedTab === "History"
        ? [...allODApplications]
        : selectedTab === "My OD"
        ? [...odTxnUser].sort(
            (a, b) => new Date(b.tranDate) - new Date(a.tranDate),
          )
        : [...pendingODApplications],
    );
  }, [allODApplications, pendingODApplications, selectedTab, odTxnUser]);

  const approveAll = () => {
    let list = selectedTxn.map((x) => ({
      mode: "SANCTION",
      tranId: x.tranId,
      eventDate: formatDateNew(x.eventDate, "DD/MM/YYYY", "YYYY-MM-DD"),
      remarks: x.remarks,
      empCode: x.empCode,
      fromDate: formatDateNew(
        x.fromDate,
        "YYYY-MM-DDTHH:mm:ss",
        "YYYY-MM-DD HH:mm",
      ),
      toDate: formatDateNew(
        x.toDate,
        "YYYY-MM-DDTHH:mm:ss",
        "YYYY-MM-DD HH:mm",
      ),
      sanctionFromDate: formatDateNew(
        x.fromDate,
        "YYYY-MM-DDTHH:mm:ss",
        "YYYY-MM-DD HH:mm",
      ),
      sanctionToDate: formatDateNew(
        x.toDate,
        "YYYY-MM-DDTHH:mm:ss",
        "YYYY-MM-DD HH:mm",
      ),
    }));
    viewAcceptModal(false);
    sanctionMultipleOdApplications({ data: list });
    setSelectedTxn([]);
    setAllSelected(false);
  };
  const rejectAll = () => {
    if (message && message != "") {
      let list = selectedTxn.map((x) => ({
        mode: "REJECT",
        tranId: x.tranId,
        eventDate: formatDateNew(x.eventDate, "DD/MM/YYYY", "YYYY-MM-DD"),
        rejectReason: message,
        empCode: x.empCode,
        isAdminApply: "N",
        isAdminReject: 0,
        fromDate: formatDateNew(
          x.fromDate,
          "YYYY-MM-DDTHH:mm:ss",
          "YYYY-MM-DD HH:mm",
        ),
        toDate: formatDateNew(
          x.toDate,
          "YYYY-MM-DDTHH:mm:ss",
          "YYYY-MM-DD HH:mm",
        ),
        sanctionFromDate: formatDateNew(
          x.fromDate,
          "YYYY-MM-DDTHH:mm:ss",
          "YYYY-MM-DD HH:mm",
        ),
        sanctionToDate: formatDateNew(
          x.toDate,
          "YYYY-MM-DDTHH:mm:ss",
          "YYYY-MM-DD HH:mm",
        ),
      }));
      onCloseRejectModal();
      sanctionMultipleOdApplications({ data: list });
      setSelectedTxn([]);
      setAllSelected(false);
    } else {
      addError(
        "Transaction can't be rejected without any reason. Please provide reason!",
        3000,
      );
    }
  };

  const deleteODTransaction = () => {
    let item = deleteModal.item;
    let obj = {
      mode: "DELETE",
      tranId: item.tranId,
      eventDate: formatDateNew(item.eventDate, "DD/MM/YYYY", "YYYY-MM-DD"),
      empCode: item.empCode,
      fromDate: formatDateNew(
        item.fromDate,
        "YYYY-MM-DDTHH:mm:ss",
        "YYYY-MM-DD HH:mm",
      ),
      toDate: formatDateNew(
        item.toDate,
        "YYYY-MM-DDTHH:mm:ss",
        "YYYY-MM-DD HH:mm",
      ),
      sanctionFromDate: formatDateNew(
        item.fromDate,
        "YYYY-MM-DDTHH:mm:ss",
        "YYYY-MM-DD HH:mm",
      ),
      sanctionToDate: formatDateNew(
        item.toDate,
        "YYYY-MM-DDTHH:mm:ss",
        "YYYY-MM-DD HH:mm",
      ),
      behalf: selectedTab === "Pending",
      filter: data.reduce((a, b) => {
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
      }, {}),
    };
    deleteOD(obj);
    onCloseDeleteModal();
  };
  const onCloseRejectModal = () => {
    viewRejectModal(false);
    setMessage("");
  };

  useEffect(() => {
    if (fetch) {
      fetchData(data);
    }
  }, [data]);
  const removeAll = () => {
    removeFilterParams();
    setData({ type: "REMOVE_ALL" });
    setFetch(false);
    fetchMyOdForUser({ tranId: "0", empCode: user.empCode });
    if (user.userType != "U") {
      fetchPendingOdApplications();
      fetchAllOdApplications();
    }
  };

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
    fetchMyOdForUser({
      ...filterObj,
      tranId: "0",
      empCode: user.empCode,
    });
    if (user.userType != "U") {
      fetchPendingOdApplications(filterObj);
      fetchAllOdApplications(filterObj);
    }

    setSelectedTxn([]);
    setAllSelected(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      if (multipleUploadResult && multipleUploadResult.length > 0) {
        viewApprovalModal(true);
        fetchData(data);
      }
      return () => {};
    }, [multipleUploadResult]),
  );

  const onCloseOptionModal = (data, transaction) => {
    setTabDetailsAttendanceTxn();
    setOptionModal(false);
    openModal();
    if (window.width < 550) {
      navigation.navigate("create-od", {
        data: {
          for: data ? "employee" : "self",
          transaction: transaction ? transaction.tranId : null,
        },
      });
    } else {
      setSelectedTransaction(transaction);
      setCreateOdModal(true);
      setBehlafOther(data);
    }
  };
  const onComplete = () => {
    setCreateOdModal(false);
    closeModal();
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
          // height: "92%",
          flex: 1,
          // window.height -
          // (Platform.OS === "web" ? 150 : 140 + StatusBar.currentHeight),
          // width: window.width,
          marginTop: 10,
        }}
        cardContent={
          <View
            style={{
              height: "100%",
              // window.height -
              // (Platform.OS === "web" ? 150 : 140 + StatusBar.currentHeight),
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: `rgb(155, 43, 44)`,
                  marginBottom: 2,
                }}
              >
                OD Transaction
              </Text>
              <Button
                style={{ minWidth: 100, margin: 5 }}
                title="Create"
                onPress={() => {
                  if (["A", "P", "H"].includes(user.userType)) {
                    setOptionModal(true);
                  } else {
                    onCloseOptionModal(false);
                  }
                }}
              ></Button>
            </View>
            <Tab
              displayContent={
                user.userType === "U"
                  ? ["My OD"]
                  : ["Pending", "History", "My OD"]
              }
              selectedTab={selectedTab}
              onTabChange={(v) => {
                removeSelectedAction();
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
                contentContainerStyle={{ paddingBottom: 20 }}
                scrollEnabled={true}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={false}
                    onRefresh={() => removeAll()}
                  />
                }
                style={[
                  {
                    marginVertical: 10,
                  },
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
                  marginTop: 7,
                  // bottom: 10,
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
        title="Reject Transaction"
        onClose={() => onCloseRejectModal()}
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
                    onCloseRejectModal();
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
        onRequestCloseModal={() => onCloseRejectModal()}
      ></ModalContainer>
      <ModalContainer
        showModal={deleteModal.visible}
        modalStyle={{
          minWidth: 300,
          maxWidth: 400,
          height: 200,
        }}
        modalContentStyle={{
          width: "100%",
          minHeight: 150,
          maxHeight: 150,
        }}
        title="Delete Transaction"
        onClose={() => onCloseDeleteModal()}
        modalContent={
          <View
            style={{
              width: "100%",
              height: 150,
              padding: 10,
            }}
          >
            <Text style={{ padding: 15, fontWeight: "300", fontSize: 17 }}>
              Are You Sure To Delete this transaction ?
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
                  onPress={() => onCloseDeleteModal()}
                  title="Cancel"
                  color="rgb(155, 43, 44)"
                ></Button>
              </View>
              <View style={{ marginRight: 10, marginTop: 20 }}>
                <Button
                  onPress={() => {
                    deleteODTransaction();
                  }}
                  title="Delete"
                  color="rgb(155, 43, 44)"
                ></Button>
              </View>
            </View>
          </View>
        }
        onRequestCloseModal={() => onCloseDeleteModal()}
      ></ModalContainer>
      <ApprovalDataPopup
        data={multipleUploadResult}
        showModal={approvalModal}
        navigation={navigation}
        onRequestCloseModal={approvalModalClose}
      ></ApprovalDataPopup>
      <UserTypeSelectModal
        showModal={optionModal}
        onRequestCloseModal={() => setOptionModal(!optionModal)}
        closeModal={(data) => onCloseOptionModal(data, null)}
      ></UserTypeSelectModal>
      {createOdModal ? (
        <CreateOdModal
          onPressCancel={onComplete}
          onClose={onComplete}
          showModal={createOdModal}
          behalfOther={behalfOther}
          selectedTransaction={selectedTransaction}
          user={user}
          fetchTabDetailsAttendanceTxn={fetchTabDetailsAttendanceTxn}
          selectedAttendanceTransactionTabDetails={
            selectedAttendanceTransactionTabDetails
          }
          addError={addError}
          createOD={createOD}
          modalManage={modalManage}
        ></CreateOdModal>
      ) : (
        <></>
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
    flexDirection: "row",

    backgroundColor: "#D0D0D0",
    paddingTop: 5,
    justifyContent: "space-between",
  },
  rowData: {
    flexWrap: "wrap",
    flexDirection: "row",
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
  header: {
    margin: 7,
    fontWeight: "bold",
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
  allODApplications,
  pendingODApplications,
  multipleUploadResult,
  user,
  odTxnUser,
  filterParams,
  selectedAttendanceTransactionTabDetails,
  modalManage,
}) => ({
  allODApplications,
  pendingODApplications,
  multipleUploadResult,
  user,
  odTxnUser,
  filterParams,
  selectedAttendanceTransactionTabDetails,
  modalManage,
});

export default connect(mapStateToProps, {
  fetchPendingOdApplications,
  fetchAllOdApplications,
  fetchSelctedOdApplication,
  fetchOdTabDeatils,
  sanctionMultipleOdApplications,
  addError,
  removeMultipleUploadResult,
  removeOdData,
  fetchMyOdForUser,
  setFilterParams,
  fetchTabDetailsAttendanceTxn,
  setTabDetailsAttendanceTxn,
  createOD,
  removeFilterParams,
  deleteOD,
  openModal,
  closeModal,
})(OdApplication);

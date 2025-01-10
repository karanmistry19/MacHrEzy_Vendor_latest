import { useFocusEffect } from "@react-navigation/native";
import React, { useContext, useEffect, useReducer, useState } from "react";
import {
  Image, RefreshControl, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity,
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
import { formatDateNew } from "../../components/utils";
import { removeMultipleUploadResult } from "../../redux/actions/dashboard.action";
import {
  removeFilterParams, setFilterParams
} from "../../redux/actions/filter-params.action";
import { closeModal, openModal } from "../../redux/actions/modal-manage.action";
import { addError } from "../../redux/actions/toast.action";
import {
  createTourTxn,
  deleteTourTxn, fetchHistoryTourTxn, fetchMyTourTxnForUser, fetchPendingTourTxn, fetchSelctedTourTxn, removeTourData, sanctionMultipleTourTxn
} from "../../redux/actions/tour.action";
import FilterDataComponent from "../leave/filterDataComponent";
import CreateTourModal from "./create-tour-modal";
import TourCreation from "./tour-creation";
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
const Tour = ({
  style,
  modularCardStyle,
  tableStyle,
  tourTxnHistory,
  tourTxnPending,
  fetchPendingTourTxn,
  fetchHistoryTourTxn,
  fetchSelctedTourTxn,
  navigation,
  sanctionMultipleTourTxn,
  addError,
  eisPersonal,
  multipleUploadResult,
  removeMultipleUploadResult,
  removeTourData,
  user,
  fetchMyTourTxnForUser,
  tourTxnUser,
  createTourTxn,
  filterParams,
  setFilterParams,
  removeFilterParams,
  route,
  deleteTourTxn,
  modalManage,
  closeModal,
  openModal,
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
  const [optionModal, setOptionModal] = useState(false);
  const [createTourModal, setCreateTourModal] = useState(false);
  const [behalfOther, setBehlafOther] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState();
  const [deleteModal, viewDeleteModal] = useState({ visible: false, item: {} });
  const [showAction, setActionVisible] = useState({
    visible: false,
    index: null,
  });
  useFocusEffect(
    React.useCallback(() => {
      removeSelectedAction();
      return () => {
        setFetch(false);
        setData({ type: "REMOVE_ALL" });
        setSelectedTxn([]);
        removeTourData();
        setAllSelected(false);
        setSelectedTab("");
      };
    }, []),
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
          fetchMyTourTxnForUser({ tranId: "0", empCode: user.empCode });
          if (user.userType === "U") {
            setSelectedTab("My Tour");
          } else {
            fetchPendingTourTxn();
            fetchHistoryTourTxn();
          }
        }
      }
    }, [user, filterParams]),
  );

  useEffect(() => {
    if (route && route.params && route.params.lastScreen) {
      setSelectedTab(route.params.lastScreen);
    }
  }, [route.params]);

  useEffect(() => {
    if (user && user.userType != "U" && !fetch && !route.params?.lastScreen) {
      setSelectedTab(tourTxnPending.length > 0 ? "Pending" : "History");
    }
  }, [tourTxnPending]);

  const navigateToSelected = (tour) => {
    setFilterParams({ params: data });
    fetchSelctedTourTxn({
      empCode: tour.empCode,
      tranId: tour.tranId,
    });

    navigation.navigate("selected-tour-app", {
      sanctioned: ["History", "My Tour"].includes(selectedTab)
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
      setAllSelected(selectedTxn.length + 1 === tourTxnPending.length);
      setSelectedTxn([...selectedTxn, newElement]);
    }
  };

  const selectAll = () => {
    if (allSelected) {
      setAllSelected(false);
      setSelectedTxn([]);
    } else {
      setAllSelected(true);
      setSelectedTxn([...tourTxnPending]);
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
          selectedTab === "My Tour"))
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
              {["History", "My Tour"].includes(selectedTab) ? (
                <TextWrapper
                  value={`Approval Date: ${row.approvalDate}`}
                ></TextWrapper>
              ) : (
                <></>
              )}
              <TextWrapper
                // header={"Transaction ID"}
                value={row?.remarks}
                // title="true"
                textStyle={{
                  fontSize: 10,
                  alignSelf: "flex-end",
                }}
              ></TextWrapper>
            </TouchableOpacity>

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
                  bottom: row.sanctioned === 0 && row.rejected === 0 ? 10 : 2,
                  maxHeight: 40,
                  marginRight: 5,
                  marginTop: canEdit(row) ? 0 : 10,
                }}
              >
                {["History", "My Tour"].includes(selectedTab) ? (
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
    }, [multipleUploadResult]),
  );

  useEffect(() => {
    setTableData(
      selectedTab === "History"
        ? [...tourTxnHistory]
        : selectedTab === "My Tour"
        ? [...tourTxnUser].sort(
            (a, b) => new Date(b.tranDate) - new Date(a.tranDate),
          )
        : [...tourTxnPending],
    );
  }, [tourTxnHistory, tourTxnPending, selectedTab, tourTxnUser]);

  const approveAll = () => {
    let list = selectedTxn.map((x) => ({
      mode: "SANCTION",
      tranId: x.tranId,
      empCode: x.empCode,
      fromDate: formatDateNew(x.fromDate, "DD/MM/YYYY", "YYYY-MM-DD"),
      toDate: formatDateNew(x.toDate, "DD/MM/YYYY", "YYYY-MM-DD"),
      remarks: x.remarks,
      sanctionFromDate: formatDateNew(x.fromDate, "DD/MM/YYYY", "YYYY-MM-DD"),
      sanctionToDate: formatDateNew(x.toDate, "DD/MM/YYYY", "YYYY-MM-DD"),
    }));
    viewAcceptModal(false);
    sanctionMultipleTourTxn({ data: list });
    setSelectedTxn([]);
    setAllSelected(false);
  };
  const rejectAll = () => {
    if (message && message != "") {
      let list = selectedTxn.map((x) => ({
        mode: "REJECT",
        tranId: x.tranId,
        empCode: x.empCode,
        fromDate: formatDateNew(x.fromDate, "DD/MM/YYYY", "YYYY-MM-DD"),
        toDate: formatDateNew(x.toDate, "DD/MM/YYYY", "YYYY-MM-DD"),
        rejectReason: message,
        sanctionFromDate: formatDateNew(x.fromDate, "DD/MM/YYYY", "YYYY-MM-DD"),
        sanctionToDate: formatDateNew(x.toDate, "DD/MM/YYYY", "YYYY-MM-DD"),
      }));
      viewRejectModal(false);
      sanctionMultipleTourTxn({ data: list });
      setMessage("");
      setSelectedTxn([]);
      setAllSelected(false);
    } else {
      addError(
        "Transaction can't be rejected without any reason. Please provide reason!",
        3000,
      );
    }
  };
  const onCloseDeleteModal = () => {
    viewDeleteModal({ visible: false, item: {} });
  };

  const deleteTourTransaction = () => {
    let item = deleteModal.item;
    let obj = {
      mode: "DELETE",
      tranId: item.tranId,
      empCode: item.empCode,
      fromDate: formatDateNew(item.fromDate, "DD/MM/YYYY", "YYYY-MM-DD"),
      toDate: formatDateNew(item.toDate, "DD/MM/YYYY", "YYYY-MM-DD"),
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
    deleteTourTxn(obj);
    onCloseDeleteModal();
    removeSelectedAction();
  };
  const removeSelectedAction = () => {
    setActionVisible({
      visible: false,
      index: null,
    });
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
    fetchMyTourTxnForUser({
      ...filterObj,
      tranId: "0",
      empCode: user.empCode,
    });
    if (user.userType != "U") {
      fetchPendingTourTxn(filterObj);
      fetchHistoryTourTxn(filterObj);
    }
    setSelectedTxn([]);
    setAllSelected(false);
  };

  useEffect(() => {
    if (fetch) {
      fetchData(data);
    }
  }, [data]);
  const removeAll = () => {
    removeFilterParams();
    setFetch(false);
    setData({ type: "REMOVE_ALL" });
    fetchMyTourTxnForUser({ tranId: "0", empCode: user.empCode });
    if (user.userType != "U") {
      fetchPendingTourTxn();
      fetchHistoryTourTxn();
    }
  };

  const onCloseOptionModal = (data, transaction) => {
    openModal();
    setOptionModal(false);
    if (window.width < 550) {
      navigation.navigate("new-tour", {
        data: {
          for: data ? "employee" : "self",
          transaction: transaction ? transaction.tranId : null,
        },
      });
    } else {
      setSelectedTransaction(transaction);
      setCreateTourModal(true);
      setBehlafOther(data);
    }
  };
  const onComplete = () => {
    setCreateTourModal(false);
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
          flex: 1,
          width: window.width,
          marginTop: 10,
        }}
        cardContent={
          <View
            style={{
              flex: 1,
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
                Tour Transaction
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
                  ? ["My Tour"]
                  : ["Pending", "History", "My Tour"]
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
                    deleteTourTransaction();
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

      <TourCreation
        showModal={optionModal}
        onRequestCloseModal={() => setOptionModal(!optionModal)}
        closeModal={(data) => onCloseOptionModal(data)}
      ></TourCreation>
      {createTourModal ? (
        <CreateTourModal
          showModal={createTourModal}
          onRequestCloseModal={onComplete}
          user={user}
          behalfOther={behalfOther}
          createTourTxn={createTourTxn}
          selectedTransaction={selectedTransaction}
          onComplete={onComplete}
          addError={addError}
          modalManage={modalManage}
        ></CreateTourModal>
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
  tourTxnHistory,
  tourTxnPending,
  multipleUploadResult,
  user,
  tourTxnUser,
  filterParams,
  modalManage,
}) => ({
  tourTxnHistory,
  tourTxnPending,
  multipleUploadResult,
  user,
  tourTxnUser,
  filterParams,
  modalManage,
});
export default connect(mapStateToProps, {
  fetchPendingTourTxn,
  fetchHistoryTourTxn,
  fetchSelctedTourTxn,
  sanctionMultipleTourTxn,
  addError,
  removeMultipleUploadResult,
  removeTourData,
  fetchMyTourTxnForUser,
  createTourTxn,
  setFilterParams,
  removeFilterParams,
  deleteTourTxn,
  closeModal,
  openModal,
})(Tour);

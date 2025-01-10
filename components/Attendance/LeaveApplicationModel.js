import { Picker } from "@react-native-picker/picker";
import * as DocumentPicker from "expo-document-picker";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Modal from "react-native-modal";
import { Checkbox } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import ModalContainer1 from "../../components/modal/model2";
import DateInput from "../../newComponents/DateInput/DateInput";
import { fetchUserCompOffDetail } from "../../redux/actions/comp-off.action";
import {
  createLeave,
  fetchLeaveBalanceByEmployee,
} from "../../redux/actions/leave.action";
import { addError } from "../../redux/actions/toast.action";
import Button from "../buttons/button";
import { DimensionContext } from "../dimensionContext";
import { ModularCard } from "../modularCard";
import CompoffTable from "../tables/compOffTable";
import ThemedTable from "../tables/ThemedTable";
import { formatDateNew } from "../utils";
import MaterialUITextField from "./MaterialUITextField";

const daysCount = {
  first_half: 0.5,
  second_half: 0.5,
  no_half_day: 0,
  firstHalf: 0.5,
  secondHalf: 0.5,
};

const leaveStatus = {
  CO: "1",
  PL: "2",
  CL: "5",
  SL: "6",
  LWP: "7",
};

const daysCountStatus = {
  first_half: 1,
  1: "first_half",
  second_half: 2,
  2: "ssecond_half",
  no_half_day: 0,
  0: "no_half_day",
  firstHalf: 1,
  secondHalf: 2,
};

const LeaveApplicationModel = ({
  user,
  leave,
  setLeave,
  selectedDate,
  data,
}) => {
  //   const [leave, setLeave] = useState(true);
  const dispatch = useDispatch();
  const { window } = useContext(DimensionContext);
  const leaveBalanceByEmployee = useSelector(
    (state) => state.leaveBalanceByEmployee
  );
  const compOffUserReducer = useSelector((state) => state.compOffUserReducer);
  const leaveTxnCreateUser = useSelector((state) => state.leaveTxnCreateUser);
  const getValue = (key, defaultValue = "") => {
    return data?.[key] ? data?.[key] : defaultValue;
  };
  const [initialObj, setInitialObj] = useState({
    transactionId: data?.tranId ? data.tranId : "Auto generated",
    department: user.deptName,
    mobileNumber: user.mobileNo,
    employeeCode: user.empCode,
    employeeName: user.empName,
    leaveType: getValue("leaveAlias"),
    startDate: data?.fromDate
      ? moment(data?.fromDate, "DD/MM/YYYY")
      : selectedDate
        ? selectedDate
        : "",
    endDate: data?.toDate
      ? moment(data?.toDate, "DD/MM/YYYY")
      : selectedDate
        ? selectedDate
        : "",
    numberOfDays: getValue("days", selectedDate ? 1 : ""),
    // approval: "",
    reason: getValue("remarks"),
    isDiff: !data?.tranId
      ? 0
      : data?.fromDate === data?.toDate
        ? 0
        : data?.days,
    halfDayStatusDropdown: !data?.tranId
      ? ""
      : data?.fromDate === data?.toDate
        ? daysCountStatus[data?.halfDay]
        : "",
    halfDayStatusCheckbx: {
      firstHalf: !data?.tranId
        ? false
        : data?.fromDate !== data?.toDate &&
            (data?.halfDay === "3" || data?.halfDay === "1")
          ? true
          : false,
      lastDayHalf: !data?.tranId
        ? false
        : data?.fromDate !== data?.toDate &&
            (data?.halfDay === "3" || data?.halfDay === "2")
          ? true
          : false,
    },
  });
  const [leaveInfo, setLeaveInfo] = useState({});
  const [checkedCoF, setCheckedCof] = useState([]);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileRemoved, setFileRemoved] = useState(false);
  const [leaveInfoMsg, setLeaveinfoMsg] = useState("");
  useEffect(() => {
    dispatch(
      fetchLeaveBalanceByEmployee({
        empCode: user.empCode?.trim(),
        year: initialObj.endDate
          ? moment(initialObj.endDate).get("years")
          : new Date().getFullYear(),
      })
    );
    dispatch(fetchUserCompOffDetail({ empCode: user.empCode?.trim() }));
  }, []);

  useEffect(() => {
    if (compOffUserReducer.compOffList)
      setCheckedCof(
        new Array(compOffUserReducer.compOffList.length).fill(false)
      );
  }, [compOffUserReducer.compOffList]);

  useEffect(() => {
    const obj = {};
    leaveBalanceByEmployee?.map((item) => {
      obj[item.leaveAlias] = {
        minApply: item.minApply,
        maxApply: item.maxApply,
        leaveBalance: item.leaveBalance,
        pendingLeave: item.pendingLeave,
      };
    });
    setLeaveInfo(obj);
  }, [leaveBalanceByEmployee]);

  useEffect(() => {
    if (initialObj.endDate)
      dispatch(
        fetchLeaveBalanceByEmployee({
          empCode: user.empCode?.trim(),
          year: moment(initialObj.endDate).get("years"),
        })
      );
  }, [initialObj.endDate]);

  const onCloseAcceptModal = () => {
    setLeave(false);
  };

  const onChangeText = (key, value) => {
    setInitialObj((pre) => {
      return { ...pre, [key]: value };
    });
  };

  const handleCofCheck = (index) => {
    const arr = [...checkedCoF];
    arr[index] = !arr[index];
    setCheckedCof(arr);
  };

  const onDateChange = (key, value) => {
    const obj = { ...initialObj };
    if (key && value) obj[key] = value;
    if (key === "startDate") {
      obj.endDate = "";
      obj.numberOfDays = "";
    }
    obj.halfDayStatusDropdown = "";
    obj.halfDayStatusCheckbx = {
      firstHalf: false,
      lastDayHalf: false,
    };
    if (obj.startDate && obj.endDate) {
      const diff = moment(obj.endDate).diff(obj.startDate, "days");
      obj.isDiff = diff;
      obj.numberOfDays = diff + 1;
    }
    setInitialObj(obj);
  };

  const onChangHalfDayStatusDropdown = (val) => {
    const obj = { ...initialObj };
    obj["halfDayStatusDropdown"] = val;
    obj.numberOfDays = moment(obj.endDate).diff(obj.startDate, "days") + 1;
    if (val === "first_half" || val === "second_half") {
      obj.numberOfDays = obj.numberOfDays - 0.5;
    }
    setInitialObj(obj);
  };

  const onChangHalfDayStatusCheck = (key1, key2) => {
    let obj = { ...initialObj };
    obj["halfDayStatusCheckbx"] = {
      [key1]: !initialObj.halfDayStatusCheckbx[key1],
      [key2]: initialObj.halfDayStatusCheckbx[key2],
    };
    const val = moment(obj.endDate).diff(obj.startDate, "days") + 1;
    obj.numberOfDays =
      val -
      (obj.halfDayStatusCheckbx.firstHalf ? 0.5 : 0) -
      (obj.halfDayStatusCheckbx.lastDayHalf ? 0.5 : 0);
    setInitialObj(obj);
  };

  const renderCoTableData = () => {
    return (
      <View>
        <CompoffTable
          tableDataNew={compOffUserReducer?.compOffList}
          checkedList={checkedCoF}
          handleCofCheck={handleCofCheck}
        />
      </View>
    );
  };

  const renderCheckBox = () => (
    <View style={{ marginRight: 10 }}>
      <Text
        style={{
          fontSize: 18,
          paddingLeft: 10,
          paddingRight: 10,
          // fontFamily: "Roboto",
          color: "#000000",
          fontWeight: "500",
        }}
      >
        Half Day Status
      </Text>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Checkbox
            status={
              initialObj.halfDayStatusCheckbx.firstHalf
                ? "checked"
                : "unchecked"
            }
            onPress={() =>
              onChangHalfDayStatusCheck("firstHalf", "lastDayHalf")
            }
          />
          <Text>First Day Half</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Checkbox
            status={
              initialObj.halfDayStatusCheckbx.lastDayHalf
                ? "checked"
                : "unchecked"
            }
            onPress={() =>
              onChangHalfDayStatusCheck("lastDayHalf", "firstHalf")
            }
          />
          <Text>Last Day Half</Text>
        </View>
      </View>
    </View>
  );

  const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

  const getExt = (fileName) => {
    const fileParts = fileName.split(".");
    return fileParts[fileParts.length - 1];
  };

  function DataURIToBlob(dataURI) {
    const splitDataURI = dataURI.split(",");
    return splitDataURI.length > 1
      ? b64toBlob(splitDataURI[1])
      : b64toBlob(dataURI);
  }

  const selectFile = async () => {
    if (fileName) {
      setFile(null);
      setFileName("");
      setFileRemoved(true);
    } else {
      try {
        const res = await DocumentPicker.getDocumentAsync({
          type: "*/*",
        }).then(async (result) => {
          return {
            name: result.name,
            base64: result.uri,
            type: result.type,
          };
        });
        if (res.type === "success") {
          setFileName(res.name);
          // if (Platform.OS === "web") {
          //   setFile(DataURIToBlob(res.base64));
          // } else {
          setFile({
            uri: res.base64,
            type: `application/${getExt(res.name)}`,
            name: res.name,
          });
          // }
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (initialObj?.numberOfDays) {
      if (
        initialObj?.numberOfDays >
        leaveInfo?.[initialObj?.leaveType]?.leaveBalance
      ) {
        setLeaveinfoMsg(
          "Leave Balance" +
            " " +
            leaveInfo?.[initialObj?.leaveType]?.leaveBalance +
            " " +
            "days"
        );
      } else if (
        initialObj?.numberOfDays < leaveInfo?.[initialObj?.leaveType]?.minApply
      ) {
        setLeaveinfoMsg(
          "Min Leave Apply is" +
            " " +
            leaveInfo?.[initialObj?.leaveType]?.minApply +
            " " +
            "days"
        );
      } else if (
        initialObj?.numberOfDays > leaveInfo?.[initialObj?.leaveType]?.maxApply
      ) {
        setLeaveinfoMsg(
          "Min Leave Apply is" +
            " " +
            leaveInfo?.[initialObj?.leaveType]?.maxApply +
            " " +
            "days"
        );
      } else {
        setLeaveinfoMsg("");
      }
    } else {
      setLeaveinfoMsg("");
    }
  }, [initialObj.numberOfDays, initialObj?.leaveType]);

  const validate = () => {
    const compArrLength = checkedCoF.filter((item) => item)?.length;
    const {
      startDate,
      endDate,
      mobileNumber,
      reason,
      leaveType,
      numberOfDays,
      isDiff,
      halfDayStatusDropdown,
    } = initialObj;
    return new Promise((resolve, reject) => {
      if (!startDate) {
        reject("Please Select Leave From Date.");
      } else if (!endDate) {
        reject("Please Select Leave To Date.");
      } else if (!leaveType) {
        reject("Please Select Leave Type.");
      } else if (!reason) {
        reject("Please Provide Purpose for Leave.");
      } else if (!mobileNumber) {
        reject("Please Provide Contact Details.");
      } else if (
        leaveType == "CO" &&
        !compOffUserReducer?.compOffList?.length
      ) {
        reject("Compensatory Off Working Days Not Found.");
      } else if (startDate && endDate && !isDiff && !halfDayStatusDropdown) {
        reject("Please Select Half Day Status.");
      } else if (
        leaveType === "CO" &&
        initialObj.numberOfDays !== compArrLength
      ) {
        reject("Applied Leave Days And CO Selected Days Does Not Match.");
      } else if (mobileNumber && mobileNumber.length < 10) {
        reject("Mobile Number Should be Minimum 10 Digits.");
      } else if (
        !initialObj.numberOfDays >= 3 &&
        !initialObj.leaveType == "SL" &&
        !fileName
      ) {
        reject("Please Upload File");
      } else {
        resolve();
      }
    });
  };

  const save = () => {
    validate()
      .then(() => {
        const { isDiff, halfDayStatusCheckbx, halfDayStatusDropdown } =
          initialObj;
        const { firstHalf, lastDayHalf } = halfDayStatusCheckbx;
        const halfDayValue = isDiff
          ? firstHalf && lastDayHalf
            ? "3"
            : firstHalf || lastDayHalf
              ? firstHalf
                ? "1"
                : "2"
              : "0"
          : halfDayStatusDropdown
            ? daysCountStatus[halfDayStatusDropdown]
            : "0";
        let compArr = [];
        if (initialObj?.leaveType === "CO") {
          checkedCoF.map((item, index) => {
            if (item) {
              compArr.push(compOffUserReducer?.compOffList?.[index].TRAN_ID);
            }
          });
        }
        const payload = {
          lvHeadCode: leaveStatus[initialObj.leaveType],
          fromDate: formatDateNew(initialObj.startDate, "", "YYYY-MM-DD"),
          toDate: formatDateNew(initialObj.endDate, "", "YYYY-MM-DD"),
          deptCode: initialObj.department,
          empName: initialObj.employeeName,
          days: `${initialObj.numberOfDays}`,
          purpose: initialObj.reason,
          contactDetails: initialObj.mobileNumber,
          MODE: data.tranId ? "EDIT" : "NEW",
          mode: data.tranId ? "EDIT" : "NEW",
          tranId_COFF: compArr?.length ? compArr.join(",") : "",
          halfDay: `${halfDayValue}`,
          empCode: initialObj.employeeCode?.trim(),
          tranId: data?.tranId ? data?.tranId : "SYS_GEN",
        };
        payload["mode"] = data.tranId ? "EDIT" : "NEW";
        if (
          initialObj?.leaveType === "SL" &&
          initialObj?.numberOfDays >= 3 &&
          file
        ) {
          payload["file"] = file?.uri;
        }
        dispatch(createLeave(payload));
      })
      .catch((error) => {
        dispatch(addError(error, 3000));
      });
  };

  const renderTransactionField = () => {
    return (
      <MaterialUITextField
        label="Transaction ID"
        value={initialObj.transactionId}
        onChangeText={(text) => onChangeText("transactionId", text)}
        style={styles.field}
        disabled={true}
      />
    );
  };

  const renderDepartmentField = () => (
    <MaterialUITextField
      label="Department"
      value={initialObj?.department}
      style={styles.field}
    />
  );

  const renderEmployeeCodeField = () => (
    <MaterialUITextField
      label="Employee Code"
      value={initialObj?.employeeCode}
      style={styles.field}
    />
  );

  const renderEmployeeNameField = () => (
    <MaterialUITextField
      label="Employee Name"
      value={initialObj?.employeeName}
      style={styles.field}
    />
  );

  const renderBottomview = () => (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginBottom: 10,
        }}
      >
        <Button
          style={styles.btn1}
          title={"Cancel"}
          textStyle={styles.textStyle}
          onPress={onCloseAcceptModal}
        ></Button>
        <Button
          style={styles.btn2}
          title={"Save"}
          textStyle={styles.textStyle}
          onPress={save}
          // disabled={leaveInfoMsg}
        ></Button>
      </View>
      <View style={{ flex: 1, marginBottom: 10 }}>
        <Text
          style={{
            color: "#9F232B",
            // fontFamily: "Roboto",
            fontWeight: "500",
            fontSize: 24,
          }}
        >
          Leave Register -{" "}
          {initialObj.endDate
            ? moment(initialObj.endDate).get("year")
            : moment().get("year")}
        </Text>
      </View>
      <View
        style={[
          styles.row,
          { flexDirection: window.width > 600 ? "row" : "column" },
        ]}
      >
        <View style={{ width: window.width > 600 ? "60%" : "100%" }}>
          <ThemedTable
            header={[
              { label: "Leave type", value: "leaveAlias" },
              { label: "Op-bal", value: "opBal" },
              { label: "Entitled", value: "entitled" },
              { label: "Accumulated", value: "accumulated" },
              { label: "Used-leaves", value: "usedLeaves" },
              { label: "Bal-leaves", value: "leaveBalance" },
            ]}
            tableDataNew={leaveBalanceByEmployee}
          />
        </View>
        <View style={{ width: window.width > 600 ? "40%" : "100%" }}>
          <ModularCard
            style={{
              borderRadius: 10,
              margin: 9,
              minHeight: "auto",
            }}
            cardContent={
              <View>
                <Text style={styles.title}>Balances</Text>
                <Text style={styles.text}>
                  Leave balance :{" "}
                  {leaveInfo?.[initialObj?.leaveType]?.leaveBalance ?? 0} days
                </Text>
                <Text style={styles.text}>
                  In-process :{" "}
                  {leaveInfo?.[initialObj?.leaveType]?.pendingLeave ?? 0} days
                </Text>
                <Text style={styles.text}>
                  min-apply :{" "}
                  {leaveInfo?.[initialObj?.leaveType]?.minApply ?? 0} days
                </Text>
                <Text style={styles.text}>
                  max-apply :{" "}
                  {leaveInfo?.[initialObj?.leaveType]?.maxApply ?? 0} days
                </Text>
              </View>
            }
          />
        </View>
      </View>
    </>
  );

  const renderReasonField = () => (
    <MaterialUITextField
      label="Reason"
      value={initialObj.reason}
      onChangeText={(text) => onChangeText("reason", text)}
      style={styles.field}
      multiline={true}
      required={true}
    />
  );

  const renderNumberOfDays = () => (
    <MaterialUITextField
      label="Number of Days"
      value={initialObj.numberOfDays}
      style={styles.field}
      multiline={true}
      disabled={true}
    />
  );

  const renderMobileField = () => (
    <MaterialUITextField
      label="Mobile Number"
      value={initialObj?.mobileNumber}
      keyboardType="phone-pad"
      style={styles.field}
      onChangeText={(text) => onChangeText("mobileNumber", text)}
      required={true}
    />
  );
  const renderStartDate = () => (
    <DateInput
      label="Start Date"
      value={initialObj.startDate}
      onChangeText={(text) => onDateChange("startDate", text)}
      style={styles.field}
      // disabled={selectedDate}
      required={true}
    />
  );
  const renderEndDate = () => (
    <DateInput
      label="End Date"
      value={initialObj.endDate}
      onChangeText={(text) => onDateChange("endDate", text)}
      style={styles.field}
      // disabled={selectedDate}
      required={true}
      minDate={initialObj.startDate}
    />
  );

  const renderMedicalField = () => (
    <>
      {Boolean(
        initialObj.leaveType === "SL" && initialObj.numberOfDays >= 3
      ) && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 18,
              paddingLeft: 10,
              paddingRight: 10,
              // fontFamily: "Roboto",
              color: "#000000",
              fontWeight: "500",
            }}
          >
            Medical Certificate
          </Text>
          <View>
            <Button
              onPress={selectFile}
              title={`${fileName ? "Remove" : "Add"} Document`}
              color="rgb(155, 43, 44)"
            ></Button>
            {fileName ? (
              <TouchableOpacity>
                <Text>{fileName}</Text>
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>
        </View>
      )}
    </>
  );

  return (
    <>
      {Platform.OS === "web" ? (
        <ModalContainer1
          showModal={leave}
          maxWidth={window.width}
          modalStyle={{
            minWidth: window.width - 20,
            maxWidth: window.width,
            maxHeight: window.height * 0.9,
          }}
          modalContentStyle={
            {
              // width:window.width-20
            }
          }
          title="Leave Application"
          onClose={() => onCloseAcceptModal()}
          modalContent={
            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
              <View style={[styles.container]}>
                <View
                  style={[
                    styles.row,
                    { flexDirection: window.width > 600 ? "row" : "column" },
                  ]}
                >
                  {renderTransactionField()}
                  {renderEmployeeNameField()}

                  {renderEmployeeCodeField()}
                  {renderDepartmentField()}
                </View>
                <View
                  style={[
                    styles.row,
                    { flexDirection: window.width > 600 ? "row" : "column" },
                  ]}
                >
                  {renderMobileField()}
                  {renderStartDate()}
                  {renderEndDate()}

                  <View style={styles.field}>
                    <Picker
                      selectedValue={initialObj.leaveType}
                      style={{
                        width: "100%",
                        marginTop: 10,
                        borderWidth: 1,
                        height: 42,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: "#bdbdbd",
                        padding: 10,
                        // fontFamily: "Roboto",
                      }}
                      onValueChange={(itemValue, itemIndex) =>
                        onChangeText("leaveType", itemValue)
                      }
                    >
                      <Picker.Item label="Leave Type" value="" />
                      <Picker.Item label="CL" value="CL" />
                      <Picker.Item label="CO" value="CO" />
                      <Picker.Item label="LWP" value="LWP" />
                      <Picker.Item label="PL" value="PL" />
                      <Picker.Item label="SL" value="SL" />
                    </Picker>
                  </View>
                </View>
                {Boolean(leaveInfoMsg) && (
                  <View
                    style={{
                      width: "100%",
                      alignItems: "center",
                      marginBottom: 5,
                    }}
                  >
                    <Text
                      style={{
                        color: "#9F232B",
                        // fontFamily: "Roboto",
                        fontWeight: "500",
                        fontSize: 16,
                      }}
                    >
                      {leaveInfoMsg}
                    </Text>
                  </View>
                )}

                {Boolean(initialObj.leaveType === "CO") && renderCoTableData()}
                <View
                  style={[
                    styles.row,
                    { flexDirection: window.width > 600 ? "row" : "column" },
                  ]}
                >
                  {Boolean(
                    initialObj.startDate &&
                      initialObj.endDate &&
                      initialObj.isDiff === 0
                  ) && (
                    <View style={styles.field}>
                      <Picker
                        selectedValue={initialObj.halfDayStatusDropdown}
                        style={{
                          width: "100%",
                          marginTop: 10,
                          borderWidth: 1,
                          height: 42,
                          borderRadius: 5,
                          borderWidth: 1,
                          borderColor: "#bdbdbd",
                          padding: 10,
                          // fontFamily: "Roboto",
                        }}
                        onValueChange={onChangHalfDayStatusDropdown}
                      >
                        <Picker.Item label="Half Day Status" value="" />
                        <Picker.Item label="No Half Day" value="no_half_day" />
                        <Picker.Item label="First Half" value="first_half" />
                        <Picker.Item label="Second Half" value="second_half" />
                      </Picker>
                    </View>
                  )}
                  {Boolean(
                    initialObj.startDate &&
                      initialObj.endDate &&
                      initialObj.isDiff > 0
                  ) && renderCheckBox()}
                  {renderNumberOfDays()}
                  {/* <MaterialUITextField
                   label="Approval"
                   value={initialObj.approval}
                   onChangeText={(text) => onChangeText("approval", text)}
                   style={styles.field}
                 /> */}
                  {renderReasonField()}
                </View>
                {renderMedicalField()}
                {renderBottomview()}
              </View>
            </ScrollView>
          }
        />
      ) : (
        <Modal isVisible={true}>
          <SafeAreaView style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                backgroundColor: "white",
                borderRadius: 20,
                padding: 16,
              }}
            >
              <ScrollView showsHorizontalScrollIndicator={false}>
                <View
                  style={[
                    styles.row,
                    { flexDirection: window.width > 600 ? "row" : "column" },
                  ]}
                >
                  {renderTransactionField()}
                  {renderEmployeeNameField()}
                  {renderEmployeeCodeField()}
                  {renderDepartmentField()}
                </View>
                <View>
                  {renderMobileField()}
                  {renderStartDate()}
                  {renderEndDate()}

                  {/* <View style={styles.field}>
                    <Picker
                      selectedValue={initialObj.leaveType}
                      style={{
                        width: "100%",
                        marginTop: 10,
                        borderWidth: 1,
                        height: 42,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: "#bdbdbd",
                        padding: 10,
                        backgroundColor: "white",
                        // fontFamily: "Roboto",
                      }}
                      onValueChange={(itemValue, itemIndex) =>
                        onChangeText("leaveType", itemValue)
                      }
                    >
                      <Picker.Item label="Leave Type" value="" />
                      <Picker.Item label="CL" value="CL" />
                      <Picker.Item label="CO" value="CO" />
                      <Picker.Item label="LWP" value="LWP" />
                      <Picker.Item label="PL" value="PL" />
                      <Picker.Item label="SL" value="SL" />
                    </Picker>
                  </View> */}
                </View>
                <View style={{ marginBottom: 10, paddingHorizontal: 5 }}>
                  <Dropdown
                    dropdownPosition="bottom"
                    data={[
                      { label: "CL", value: "CL" },
                      { label: "CO", value: "CO" },
                      { label: "LWP", value: "LWP" },
                      { label: "PL", value: "PL" },
                      { label: "SL", value: "SL" },
                    ]}
                    maxHeight={100}
                    labelField="label"
                    valueField="value"
                    containerStyle={{
                      borderRadius: 10,
                      backgroundColor: "white",
                      elevation: 5,
                    }}
                    style={{
                      borderWidth: 1,
                      borderRadius: 4,
                      borderColor: "#bdbdbd",
                      paddingHorizontal: 10,
                      height: 40,
                      width: "100%",
                    }}
                    placeholder="Leave Type"
                    onChange={(item) => onChangeText("leaveType", item.value)}
                    value={initialObj.leaveType}
                  />
                </View>
                {Boolean(leaveInfoMsg) && (
                  <View
                    style={{
                      width: "100%",
                      alignItems: "center",
                      marginBottom: 5,
                    }}
                  >
                    <Text
                      style={{
                        color: "#9F232B",
                        // fontFamily: "Roboto",
                        fontWeight: "500",
                        fontSize: 16,
                      }}
                    >
                      {leaveInfoMsg}
                    </Text>
                  </View>
                )}

                {Boolean(initialObj.leaveType === "CO") && renderCoTableData()}
                <View
                  style={[
                    styles.row,
                    { flexDirection: window.width > 600 ? "row" : "column" },
                  ]}
                >
                  {Boolean(
                    initialObj.startDate &&
                      initialObj.endDate &&
                      initialObj.isDiff === 0
                  ) && (
                    <View style={styles.field}>
                      <View style={{ marginBottom: 15 }}>
                        <Dropdown
                          dropdownPosition="bottom"
                          data={[
                            { label: "No Half Day", value: "no_half_day" },
                            { label: "First Half", value: "first_half" },
                            { label: "Second Half", value: "second_half" },
                          ]}
                          maxHeight={100}
                          labelField="label"
                          valueField="value"
                          // fontFamily={THEMES.light.fontFamily.regular}
                          containerStyle={{
                            borderRadius: 10,
                            backgroundColor: "white",
                            elevation: 5,
                          }}
                          style={{
                            borderWidth: 1,
                            borderRadius: 4,
                            borderColor: "#bdbdbd",
                            paddingHorizontal: 10,
                            height: 42,
                            width: "100%",
                          }}
                          placeholder="Half Day Status"
                          onChange={(item) =>
                            onChangHalfDayStatusDropdown(item.value)
                          }
                          value={initialObj.halfDayStatusDropdown}
                        />
                      </View>
                    </View>
                  )}
                  {Boolean(
                    initialObj.startDate &&
                      initialObj.endDate &&
                      initialObj.isDiff > 0
                  ) && renderCheckBox()}
                  {renderNumberOfDays()}
                  {renderReasonField()}
                </View>
                {renderMedicalField()}
                {renderBottomview()}
              </ScrollView>
            </View>
          </SafeAreaView>
        </Modal>
      )}
    </>
  );
};

export default LeaveApplicationModel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    color: "#9F232B",
    fontWeight: "500",
    // fontFamily: "Roboto",
    fontSize: 20,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  field: {
    flex: 1,
    marginHorizontal: 5,
  },
  reasonField: {
    height: 100,
  },
  text: {
    // fontFamily: "Roboto",
    marginTop: 20,
    marginLeft: 10,
    fontWeight: "400",
  },
  textStyle: {
    fontSize: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  btn2: {
    width: 100,
    backgroundColor: "#FF9300",
    marginTop: 5,
  },
  btn1: {
    width: 100,
    backgroundColor: "#9B2B2C",
    marginTop: 5,
  },
});

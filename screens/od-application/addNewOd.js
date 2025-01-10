import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import CardComponent from "../../components/cardComponent/cardComponent";
import { fetchTabDetailsAttendanceTxn } from "../../redux/actions/attendance.action";
import { closeModal } from "../../redux/actions/modal-manage.action";
import { createOD } from "../../redux/actions/od-app.action";
import { addError } from "../../redux/actions/toast.action";
import CreateODScreen from "./od-create-screen";

const OdCreation = ({
  route,
  user,
  odTxnUser,
  pendingODApplications,
  fetchTabDetailsAttendanceTxn,
  selectedAttendanceTransactionTabDetails,
  addError,
  navigation,
  createOD,
  modalManage,
  closeModal,
}) => {
  const data = route?.params?.data;
  const [selectedTransaction, setSelectedTransaction] = useState();

  useFocusEffect(
    React.useCallback(() => {
      if (data?.transaction) {
        setSelectedTransaction(
          (data.for === "employee" ? pendingODApplications : odTxnUser).find(
            (x) => x.tranId === data.transaction
          )
        );
      }
      return () => {
        setSelectedTransaction(null);
      };
    }, [data])
  );
  const onPressCancel = () => {
    navigation.navigate("on-duty-application", { lastScreen: null });
    closeModal();
  };
  return (
    <View style={{ flex: 1 }}>
      <CardComponent>
        <Text
          style={{ fontSize: 18, fontWeight: "bold", color: "#9B2B2C" }}
          adjustsFontSizeToFit={true}
        >{`${selectedTransaction ? "Update" : "Create"} OD Transaction`}</Text>
        <CreateODScreen
          onPressCancel={onPressCancel}
          behalfOther={data?.for === "employee"}
          user={user}
          fetchTabDetailsAttendanceTxn={fetchTabDetailsAttendanceTxn}
          selectedAttendanceTransactionTabDetails={
            selectedAttendanceTransactionTabDetails
          }
          addError={addError}
          selectedTransaction={selectedTransaction}
          createOD={createOD}
          modalManage={modalManage}
        ></CreateODScreen>
      </CardComponent>
    </View>
  );
};
const styles = StyleSheet.create({});

const mapStateToProps = ({
  user,
  odTxnUser,
  pendingODApplications,
  selectedAttendanceTransactionTabDetails,
  modalManage,
}) => ({
  user,
  odTxnUser,
  pendingODApplications,
  selectedAttendanceTransactionTabDetails,
  modalManage,
});
export default connect(mapStateToProps, {
  fetchTabDetailsAttendanceTxn,
  addError,
  createOD,
  closeModal,
})(OdCreation);

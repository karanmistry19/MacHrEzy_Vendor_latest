import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import ModalContainer from "../../components/modalContainer/modal";
import CreateOD from "./od-create-screen";
const CreateOdModal = ({
  isselectEmployee,
  showModal,
  onPressCancel,
  selectedTransaction,
  behalfOther,
  user,
  fetchTabDetailsAttendanceTxn,
  selectedAttendanceTransactionTabDetails,
  addError,
  createOD,
  modalManage,
  selectedDate,
}) => {
  const dimension = useWindowDimensions();
  return (
    <ModalContainer
      modalContentStyle={{
        minHeight: dimension.height * 0.6,
        maxHeight: dimension.height * 0.8,
      }}
      showModal={showModal}
      modalStyle={{
        maxWidth: dimension.width > 550 ? 550 : dimension.width - 20,
        minHeight: dimension.height * 0.6,
        maxHeight: dimension.height * 0.8,
        zIndex: 1,
      }}
      title={`${selectedTransaction ? "Update" : "Create"} OD Transaction`}
      modalContent={
        <View style={styles.textArea}>
          <CreateOD
            onPressCancel={onPressCancel}
            isselectEmployee={isselectEmployee}
            behalfOther={behalfOther}
            user={user}
            fetchTabDetailsAttendanceTxn={fetchTabDetailsAttendanceTxn}
            selectedAttendanceTransactionTabDetails={
              selectedAttendanceTransactionTabDetails
            }
            addError={addError}
            createOD={createOD}
            modalManage={modalManage}
            selectedTransaction={selectedTransaction}
            selectedDate={selectedDate}
          ></CreateOD>
        </View>
      }
      onClose={onPressCancel}
      onRequestCloseModal={onPressCancel}
    ></ModalContainer>
  );
};
export default CreateOdModal;
const styles = StyleSheet.create({
  containeer: {
    flex: 1,
  },
  textArea: {
    margin: 10,
    height: "95%",
  },
});

import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import ModalContainer from "../../components/modalContainer/modal";
import CreateTour from "./create-tour";

const CreateTourModal = ({
  showModal,
  onRequestCloseModal,
  behalfOther,
  user,
  createTourTxn,
  selectedTransaction,
  onComplete,
  addError,
  closeModal,
  modalManage,
  selectedDate,
}) => {
  const dimension = useWindowDimensions();

  return (
    <ModalContainer
      modalContentStyle={{ minHeight: 550, maxHeight: 550 }}
      showModal={showModal}
      modalViewStyle={{
        width: dimension.width > 550 ? 400 : dimension.width - 20,
      }}
      title={`${selectedTransaction ? "Update" : "Create"} Tour`}
      modalContent={
        <View style={{ flex: 1, margin: 10 }}>
          <CreateTour
            behalfOther={behalfOther}
            user={user}
            createTourTxn={createTourTxn}
            selectedTransaction={selectedTransaction}
            onComplete={onComplete}
            addError={addError}
            modalManage={modalManage}
            selectedDate={selectedDate}
          />
        </View>
      }
      onRequestCloseModal={onRequestCloseModal}
      onClose={onRequestCloseModal}
    ></ModalContainer>
  );
};
export default CreateTourModal;
const styles = StyleSheet.create({
  textArea: {
    margin: 10,
    height: "95%",
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: "#9B2B2C",
    paddingBottom: 10,
    fontWeight: "bold",
  },
  txt: {
    fontSize: 14,
    color: "#9A9A9A",
  },

  textStyle: {
    fontSize: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  btn1: {
    width: 100,
    backgroundColor: "#9B2B2C",
    marginTop: 5,
  },
  btn2: {
    width: 100,
    backgroundColor: "#FF9300",
    marginTop: 5,
  },
});

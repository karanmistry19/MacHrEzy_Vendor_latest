import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ModalContainer from "./modalContainer/modal";
const UserTypeSelectionModal = ({
  showModal,
  closeModal,
  onRequestCloseModal,
}) => {
  return (
    <ModalContainer
      title="Please select User Type"
      onClose={onRequestCloseModal}
      showModal={showModal}
      modalStyle={{ minHeight: 190, maxHeight: 270 }}
      modalContentStyle={{ maxHeight: 150, minHeight: 150 }}
      onRequestCloseModal={onRequestCloseModal}
      modalContent={
        <View style={styles.modalcontainer}>
          <TouchableOpacity
            style={styles.opacity}
            onPress={() => closeModal(false)}
          >
            <Text style={styles.text}>Self OD transaction</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.opacity}
            onPress={() => closeModal(true)}
          >
            <Text style={styles.text}> Behalf Of Employee</Text>
          </TouchableOpacity>
        </View>
      }
    ></ModalContainer>
  );
};
export default UserTypeSelectionModal;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  modalcontainer: {
    margin: 5,
    height: "80%",
    borderRadius: 5,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  opacity: {
    minHeight: 50,
    maxHeight: 50,
    borderRadius: 5,
    marginTop: 10,
    // padding: 7,
    backgroundColor: "white",
    borderColor: "#ffffff",
    width: "100%",
    shadowColor: "#696969",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 1 },
    justifyContent: "center",
  },
});
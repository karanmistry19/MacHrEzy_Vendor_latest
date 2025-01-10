import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import Modal from "../modal/modal";

const addModal = ({
  showModal,
  onSelection,
  modalViewStyle,
  add,
  nestedScroll,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const size = useWindowDimensions();

  const closeModal = () => {
    // this.ref._scrollView.scrollTo(0)
    onSelection(false);
    setModalVisible(true);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      presentationStyle="overFullScreen"
      animationIn="slideInUp"
      visible={showModal}
      onRequestClose={() => {
        closeModal();
      }}
      ariaHideApp={false}
      style={{
        backgroundColor: "white",
      }}
    >
      <TouchableWithoutFeedback onPress={() => closeModal()}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback>
            <View>
              <ScrollView
                nestedScrollEnabled={true}
                contentContainerStyle={{ flexGrow: 1 }}
                scrollEventThrottle={16}
                style={[
                  styles.modalView,
                  modalViewStyle,
                  { flex: 1, maxHeight: 0.8 * size.height, height: "20%" },
                ]}
              >
                {add ? add : <></>}
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalView: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DFE0E3",
  },
});
export default addModal;

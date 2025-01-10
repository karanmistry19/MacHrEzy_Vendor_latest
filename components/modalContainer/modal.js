import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import Icons from "../icons";
import Modal from "../modal/modal";
import Toast from "../toast";

const ModalContainer = ({
  showModal,
  modalViewStyle,
  modalContent,
  onRequestCloseModal,
  title,
  subTitle,
  onClose,
  titleDisable,
  modalStyle,
  modalContentStyle,
  maxWidth,
}) => {
  const size = useWindowDimensions();

  const closeModal = () => {
    onRequestCloseModal();
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
      style={[
        {
          backgroundColor: "white",
          borderRadius: 7,
          maxWidth: size.width * 0.8,
          minHeight: 700,
        },
        modalStyle,
      ]}
    >
      <TouchableWithoutFeedback onPress={() => closeModal()}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback>
            <View
              style={[
                {
                  flex: 1,
                  // maxHeight: 0.8 * size.height,

                  maxWidth: maxWidth ? maxWidth : 420,
                  width: "90%",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,

                  // backgroundColor: "#FFF",
                },
              ]}
            >
              <Toast></Toast>

              {titleDisable ? (
                <></>
              ) : (
                <View
                  style={[
                    styles.modalView,
                    {
                      width: "100%",
                      backgroundColor: "#fff",
                      flexDirection: "row",
                      flex: 1,
                      justifyContent: "space-between",
                      padding: 7,
                      borderTopLeftRadius: 7,
                      borderTopRightRadius: 7,
                    },
                    { maxHeight: Platform.OS === "ios" ? 80 : 50 },
                  ]}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      resizeMode={"cover"}
                      style={{ height: 40, width: 40 }}
                      source={require("../../assets/mImage.png")}
                    />
                    <View
                      style={{
                        paddingTop: 5,
                        marginLeft: 10,
                        maxWidth: Platform.OS === "web" ? 300 : 250,
                      }}
                    >
                      <Text
                        numberOfLines={1}
                        style={{ fontSize: 18, fontWeight: "bold" }}
                        adjustsFontSizeToFit={true}
                      >
                        {title}
                      </Text>
                      {subTitle ? (
                        <Text
                          numberOfLines={1}
                          style={{ fontSize: 12, fontWeight: "bold" }}
                          adjustsFontSizeToFit={true}
                        >
                          {subTitle}
                        </Text>
                      ) : (
                        <></>
                      )}
                    </View>
                  </View>

                  <TouchableOpacity onPress={onClose}>
                    <Icons fill="#000" name="cross"></Icons>
                  </TouchableOpacity>
                </View>
              )}

              <View
                contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
                style={[
                  styles.modalView,
                  {
                    flex: 1,
                    // maxHeight: 0.8 * size.height,
                    minHeight: 400,
                    maxHeight: 400,
                    width: "100%",
                    borderBottomRightRadius: 7,
                    borderBottomLeftRadius: 7,
                  },
                  modalContentStyle,
                ]}
              >
                {modalContent ? modalContent : <></>}
              </View>
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
    zIndex: 1000,
  },
  modalView: {
    backgroundColor: "#FFFFFF",
    // borderRadius: 8,
    // borderWidth: 1,
    // borderColor: "#DFE0E3",
  },
});
export default ModalContainer;

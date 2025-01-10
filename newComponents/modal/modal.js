import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import Icons from "../../components/icons";
import Modal from "../modalNativeWeb/modal";

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
  modalDate,
  titleColor,
  titlePaddingX,
  titlePaddingY,
}) => {
  const size = useWindowDimensions();

  const closeModal = () => {
    onRequestCloseModal();
  };
  function centerOnWeb() {
    if (Platform.OS === "web") {
      return {
        alignItems: "center",
      };
    }
  }
  const [modalWidth, setModalWidth] = useState(0);
  const [modalHeight, setModalHeight] = useState(0);
  function find_modalWidth(layout) {
    const { x, y, width, height } = layout;
    setModalWidth(width);
    setModalHeight(height);
  }
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
          borderRadius: 7,
          maxWidth: size.width * 0.8,
          minHeight: 700,
        },
        modalStyle,
      ]}
    >
      <TouchableWithoutFeedback onPress={() => closeModal()}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback style={{ backgroundColor: "white" }}>
            <View
              style={[
                {
                  flex: 1,
                  maxWidth: size.width > 700 ? "40%" : "80%",
                  // maxHeight:Platform.OS==="android"&&400,
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                },
              ]}
            >
              {titleDisable ? (
                <></>
              ) : (
                <View
                  style={[
                    styles.modalView,
                    {
                      width: "100%",
                      flexDirection: "row",
                      flex: 1,
                      justifyContent: "flex-end",
                      borderTopLeftRadius: 7,
                      borderTopRightRadius: 7,
                      backgroundColor: "white",
                    },
                    { maxHeight: 50 },
                  ]}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "white",
                    }}
                    onLayout={(event) => {
                      find_modalWidth(event.nativeEvent.layout);
                    }}
                  >
                    <View
                      style={{
                        paddingTop: 10,
                        // marginLeft: 10,
                        // maxWidth: Platform.OS === "web" ? 300 : 250,
                        backgroundColor: "",
                      }}
                    >
                      <Text
                        numberOfLines={1}
                        style={{
                          fontWeight: "bold",
                          fontSize: modalWidth * 0.12,
                          color: titleColor,
                          // paddingVertical:titlePaddingY,
                        }}
                        // adjustsFontSizeToFit={true}
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
                  <View
                    style={{
                      flex: 2,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      backgroundColor: "white",
                    }}
                  >
                    {modalDate && (
                      <View
                        style={{
                          backgroundColor: "#AB4E54",
                          borderRadius: 100,
                          paddingVertical: 5,
                          paddingHorizontal: 5,
                        }}
                      >
                        <Text
                          style={{
                            color: "#FFFFFF",
                            fontWeight: "500",
                            fontSize: modalWidth * 0.07,
                          }}
                        >
                          {modalDate}
                        </Text>
                      </View>
                    )}
                    <TouchableOpacity
                      style={{ marginLeft: 10 }}
                      onPress={onClose}
                    >
                      <Icons fill="#000" name="cross"></Icons>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              <View
                style={[
                  styles.modalView,
                  {
                    width: "100%",
                    borderBottomRightRadius: 7,
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderBottomLeftRadius: 7,
                    backgroundColor: "#FFFFFF",
                  },
                  // modalContentStyle,
                  // centerOnWeb()
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
  },
});
export default ModalContainer;

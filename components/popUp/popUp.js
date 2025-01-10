import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Icon from "../icons";
import Modal from "../modal/modal";
import MultiplePopUp from "./multiplePopUp";
export default function PopUp({
  placeholder,
  style,
  renderData,
  placeholderStyle,
  placeholderContainerStyle,
  selectedItemStyle,
  labelStyle,
  iconStyle,
  onSelection,
  selectionValue,
  readOnly,
  multiSelect,
  addSkill,
  validate,
  visible = false,
  label,
  removeOnpress,
  displayField,
  id,
  index,
  displayStyle,
  onRequestCloseModal,
}) {
  let myList = useRef();

  const [modalVisible, setModalVisible] = useState(false);
  const [valid, setValid] = useState(true);
  const [selected, setSelected] = useState(
    selectionValue ? selectionValue : ""
  );
  useEffect(() => {
    setSelected(selectionValue);
  }, [selectionValue]);
  const selectItem = (item) => {
    setSelected(item);
    onSelection(item);
    setModalVisible(false);
  };
  useEffect(() => {
    setModalVisible(visible ? true : false);
  }, [visible]);

  useEffect(() => {
    if (index < renderData.length) {
      setTimeout(() => {
        myList?.current?.scrollToIndex({
          animated: true,
          index: index < 0 ? 0 : index,
          viewPosition: 0,
        });
      }, 2000);
    }
  }, [index]);

  const modalOnClose = () => {
    if (onRequestCloseModal && typeof onRequestCloseModal === "function") {
      onRequestCloseModal();
    }
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      {multiSelect ? (
        <MultiplePopUp
          placeholder={placeholder}
          label={label}
          style={style}
          renderData={renderData}
          placeholderStyle={placeholderStyle}
          placeholderContainerStyle={placeholderContainerStyle}
          selectedItemStyle={selectedItemStyle}
          labelStyle={labelStyle}
          iconStyle={iconStyle}
          onSelection={onSelection}
          selectionValue={selected}
          readOnly={readOnly}
          visible={visible}
          removeOnpress={removeOnpress}
          displayField={displayField}
          id={id}
        ></MultiplePopUp>
      ) : (
        <View style={[{ flex: 1 }]}>
          <View
            style={[
              {
                flex: 1,
                width: "83%",
                borderBottomWidth: 1,
                paddingLeft: 0,
                maxHeight: 60,
                minHeight: 60,
              },
              style,
              displayStyle,
            ]}
          >
            {label ? (
              <Text style={[styles.label, labelStyle]}>{label}</Text>
            ) : (
              <></>
            )}

            {readOnly ? (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignContent: "center",
                }}
              >
                {selected ? (
                  <Text style={[styles.selected, selectedItemStyle]}>
                    {displayField ? selected[displayField] : selected.name}
                  </Text>
                ) : (
                  <Text style={[styles.placeholder, placeholderStyle]}>
                    {placeholder}
                  </Text>
                )}
                <Icon
                  name="selectDownArrow"
                  style={[{ marginTop: 7 }, iconStyle]}
                ></Icon>
              </View>
            ) : (
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                <View
                  style={[
                    {
                      flex: 1,
                      flexDirection: "row",
                    },
                    placeholderContainerStyle,
                  ]}
                >
                  {selected ? (
                    <Text style={[styles.selected, selectedItemStyle]}>
                      {displayField ? selected[displayField] : selected.name}
                    </Text>
                  ) : (
                    <Text style={[styles.placeholder, placeholderStyle]}>
                      {placeholder}
                    </Text>
                  )}
                  <Icon
                    name="selectDownArrow"
                    style={[{ marginTop: 7 }, iconStyle]}
                  ></Icon>
                </View>
              </TouchableOpacity>
            )}
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            presentationStyle="overFullScreen"
            visible={modalVisible}
            onRequestClose={() => modalOnClose()}
            ariaHideApp={false}
          >
            <TouchableWithoutFeedback onPress={() => modalOnClose()}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text
                    style={{
                      width: "80%",
                      fontWeight: "bold",
                      textAlign: "center",
                      marginTop: 15,
                      fontSize: 18,
                    }}
                  >
                    {label}
                  </Text>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    data={renderData}
                    ref={myList}
                    initialScrollIndex={index}
                    onScrollToIndexFailed={(info) => {
                      const wait = new Promise((resolve) =>
                        setTimeout(resolve, 500)
                      );
                      wait.then(() => {
                        // setTimeout(() => {
                        myList.current?.scrollToIndex({
                          index: index,
                          animated: true,
                          viewPosition: 0,
                        });
                        // }, 2000);
                      });
                    }}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity
                        key={"menu" + index}
                        style={{ flex: 1 }}
                        onPress={() => selectItem(item)}
                      >
                        <Text style={styles.item}>
                          {displayField ? item[displayField] : item.name}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    fontSize: 12,
    color: "#B1B1B1",
    marginBottom: 10,
    flex: 1,
  },
  selected: {
    fontSize: 12,
    color: "#000000",
    marginBottom: 10,
    flex: 1,
  },
  item: {
    padding: 10,
    fontSize: 16,
    height: 44,
    borderBottomWidth: 1,
    borderColor: "#D3D3D3",
    minWidth: "95%",
    textAlign: "center",
  },
  label: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalView: {
    width: "100%",
    maxWidth: 400,
    maxHeight: 400,
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: "absolute",
    bottom: 0,
    paddingBottom: 30,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

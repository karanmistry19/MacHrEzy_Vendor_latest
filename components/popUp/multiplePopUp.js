import React, { Fragment, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Checkbox from "../../components/checkbox";
import Icon from "../icons";
import Modal from "../modal/modal";
const Item = ({ item, selected, selectItem, id }) => (
  <TouchableOpacity
    style={{
      flex: 1,
      flexDirection: "row",
      borderBottomWidth: 1,
      borderColor: "#D3D3D3",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10,
    }}
    onPress={() => {
      selectItem(item);
    }}
  >
    <Text style={styles.item}>{item.name}</Text>
    <View>
      <Checkbox
        disable={selected}
        value={
          selected.findIndex((x) => x[id].trim() === item[id].trim()) !== -1
        }
      ></Checkbox>
    </View>
  </TouchableOpacity>
);

export default function MultiplePopUp({
  placeholder,
  renderData,
  onSelection,
  selectionValue,
  visible,
  style,
  placeholderStyle,
  displayField,
  label,
  id,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState([]);
  const [renderDatas, setRenderDatas] = useState([]);
  const selectItem = (newElement) => {
    let index = selected.findIndex(
      (x) => x[id].trim() === newElement[id].trim()
    );
    if (index === -1) {
      setSelected([...selected, newElement]);
    } else {
      setSelected(
        selected.filter((x) => x[id].trim() !== newElement[id].trim())
      );
    }
  };

  useEffect(() => {
    setSelected(selectionValue ? [...selectionValue] : []);
  }, [selectionValue]);
  useEffect(() => {
    setRenderDatas(renderData ? [...renderData] : []);
  }, [renderData]);

  const toggle = () => {
    onSelection(selected);
    setModalVisible(false);
  };

  useEffect(() => {
    setModalVisible(visible ? true : false);
  }, [visible]);

  const removeSelected = (index) => {
    setSelected([...selected.filter((x, i) => i != index)]);
    onSelection([...selected.filter((x, i) => i != index)]);
  };
  return (
    <Fragment>
      <Text style={{ padding: 2 }}>{label}</Text>
      <ScrollView
        nestedScrollEnabled={true}
        horizontal={true}
        contentContainerStyle={{
          justifyContent: "space-between",
          paddingRight: 20,
        }}
        style={[
          {
            flex: 1,
            borderColor: "#E8E9EC",
            minHeight: 30,
            flexDirection: "row",
            backgroundColor: "#F8F8F8",
            borderRadius: 7,
          },
          style,
        ]}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            paddingLeft: 0,
            flexDirection: "row",
            alignItems: "center",
            alignContent: "center",

            // zIndex: 1,
            // flexWrap: "wrap",
          }}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          {selected.length > 0 ? (
            selected.map((element, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    marginLeft: 10,
                    backgroundColor: "#D3D3D3",
                    padding: 5,
                    borderRadius: 10,
                  }}
                >
                  <View>
                    <Text style={[styles.selected, { marginRight: 5 }]}>
                      {displayField ? eval(displayField) : element.name}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      width: 20,
                      height: 20,
                      justifyContent: "center",
                      backgroundColor: "#fff",
                      borderColor: "#000000",
                      borderRadius: 200 / 2,
                      marginRight: 5,
                    }}
                    onPress={() => removeSelected(index)}
                  >
                    <Icon
                      height="20"
                      width="20"
                      fill="red"
                      name="cross"
                      style={{ color: "#fff" }}
                    ></Icon>
                  </TouchableOpacity>
                </View>
              );
            })
          ) : (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                // width: 370,
              }}
            >
              <Text
                style={[
                  styles.placeholder,
                  placeholderStyle,
                  { color: "#B0B0B0" },
                ]}
              >
                {placeholder}
              </Text>
              {/* <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}
                style={{
                  marginTop: 20,
                  // justifyContent: "flex-start",
                  // marginRight: 5,
                  // marginTop: 16,
                }}
              >
                <Icon
                  style={{ alignSelf: "flex-end" }}
                  name="selectDownArrow"
                ></Icon>
              </TouchableOpacity> */}
            </View>
          )}
        </TouchableOpacity>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        presentationStyle="overFullScreen"
        visible={modalVisible}
        onRequestClose={() => {}}
        ariaHideApp={false}
      >
        <TouchableWithoutFeedback onPress={() => toggle()}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text
                style={[
                  {
                    width: "80%",
                    textAlign: "center",
                    marginTop: 15,
                    fontSize: 18,
                    fontWeight: "bold",
                  },
                ]}
              >
                Select &nbsp;{label}
              </Text>

              <ScrollView nestedScrollEnabled={true} style={{ width: "90%" }}>
                {renderDatas.map((item) => (
                  <Item
                    key={item[id].trim()}
                    item={item}
                    selected={selected}
                    selectItem={selectItem}
                    id={id}
                  />
                ))}
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </Fragment>
  );
}
const styles = StyleSheet.create({
  selected: {
    color: "#000000",
    // borderRadius: 5,
    // backgroundColor: "#65ACCB",
    justifyContent: "center",
    marginLeft: 2,
  },
  item: {
    height: 44,
    marginTop: 3,
    maxWidth: "80%",
    paddingTop: 15,
  },

  label: {
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  placeholder: {
    marginLeft: 10,
  },
});

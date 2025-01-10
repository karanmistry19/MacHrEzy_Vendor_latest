import React, { useContext, useEffect, useReducer, useState } from "react";
import {
  Button,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import Checkbox from "../../components/checkbox";
import { DimensionContext } from "../dimensionContext";
import Icon from "../icons";
import Modal from "../modal/modal";

const Item = ({ item, selectItem, displayField, selected, id }) => {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (selected && id) {
      setIsSelected(selected.find((x) => x[id] === item[id]));
    }
  }, [selected, id]);

  return (
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
        setIsSelected(!isSelected);
      }}
    >
      <Text
        numberOfLines={1}
        style={{ maxWidth: Platform.OS === "web" ? null : 200 }}
      >
        {item[displayField] || item.name}
      </Text>
      <View style={{ marginRight: 5 }}>
        <Checkbox disable={true} value={isSelected}></Checkbox>
      </View>
    </TouchableOpacity>
  );
};

const reducer = (state, action) => {
  switch (action.type) {
    case "REMOVE_DATA":
    case "INIT_DATA":
      return [];
    case "ADD_DATA":
      return action.data;
    case "ADD_NEW": {
      let index = state.findIndex(
        (x) => x[action.id]?.trim() === action.data[action.id]?.trim()
      );
      if (index === -1) {
        return [...state, action.data];
      } else {
        return [
          ...state.filter(
            (x) => x[action.id]?.trim() !== action.data[action.id]?.trim()
          ),
        ];
      }
    }
    case "REMOVE_BY_INDEX":
      return [...state.filter((x, i) => i != action.index)];
    default:
      return state;
  }
};

export default function MultipleSelectModal({
  onSelection,
  name,
  displayField,
  textInputStyle,
  searchApi,
  renderData,
  data,
  multiSelect,
  selectionValue = [],
  label,
  validate,
  value,
  inValidText,
  viewLabel,
  id,
  editable,
  showDataModal,
}) {
  const [renderList, setRenderList] = useState([]);
  const [showAutoCompleteModal, setShowAutoCompleteModal] = useState(false);
  const [result, setResult] = useState("");
  const [selected, setSelected] = useReducer(reducer, []);
  const { window } = useContext(DimensionContext);
  const [valid, setValid] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setResult(data ? data.data[data.displayField] : "");
  }, [data]);
  const size = useWindowDimensions();

  useEffect(() => {
    setRenderList(renderData);
  }, [renderData]);

  useEffect(() => {
    setSelected({
      type: "INIT_DATA",
    });
  }, []);

  useEffect(() => {
    if (validate) {
      checkValidation(value);
    }
  }, [validate, value]);

  const checkValidation = (value) => {
    if (value) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  const selectItem = (item) => {
    onSelection(item);
    setResult(displayField ? item[displayField] : item.name);
    setShowAutoCompleteModal(false);
    setSearch("");
  };

  const closeModal = () => {
    setShowAutoCompleteModal(false);
    setSearch("");
  };

  const searchApiFunc = (phrase) => {
    searchApi
      ? searchApi(phrase)
      : setRenderList(
          phrase && phrase != ""
            ? [
                ...renderData.filter((x) =>
                  x[displayField].toLowerCase().startsWith(phrase.toLowerCase())
                ),
              ]
            : [...renderData]
        );
  };

  useFocusEffect(
    React.useCallback(() => {
      setSelected({ type: "ADD_DATA", data: selectionValue });
    }, [selectionValue])
  );

  const selectedItem = (newElement) => {
    setSelected({ type: "ADD_NEW", data: newElement, id: id });
  };

  const save = () => {
    onSelection(selected);
    setSelected({ type: "INIT_DATA" });
  };
  const removeSelected = (index) => {
    setSelected({ type: "REMOVE_BY_INDEX", index: index });
    // onSelection([...selected.filter((x, i) => i != index)]);
  };

  return (
    <View style={{ flex: 1 }}>
      {multiSelect ? (
        viewLabel ? (
          <View>
            <TouchableOpacity onPress={() => setShowAutoCompleteModal(true)}>
              {viewLabel}
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            {label ? <Text style={{ marginVertical: 1 }}>{label}</Text> : <></>}
            <TouchableOpacity
              onPress={() => {
                setShowAutoCompleteModal(true);
              }}
              style={{
                flexDirection: "row",
                backgroundColor: "#fff",
                flex: 1,
                maxHeight: 38,
                minHeight: 38,
                borderWidth: 1,
                borderColor: "#E8E9EC",
                padding: selected.length > 0 ? 10 : 7,
                justifyContent: "center",
              }}
            >
              {selected.length > 0 ? (
                <ScrollView
                  nestedScrollEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  style={{
                    minHeight: 38,
                    bottom: 8,
                  }}
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                >
                  {selected?.map((element, index) => {
                    return (
                      <View
                        key={`selected-${index}`}
                        style={{
                          flexDirection: "row",
                          backgroundColor: "#E0E0E0",
                          borderRadius: 5,
                          marginBottom: 7,
                          marginLeft: 10,
                        }}
                      >
                        <Text style={{ marginTop: 7 }} key={element[id]}>
                          {element[displayField] || element.name}
                        </Text>
                        <TouchableOpacity
                          onPress={() => removeSelected(index)}
                          style={{ marginLeft: 7, marginTop: 4 }}
                        >
                          <Icon fill="#000" name="cross"></Icon>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </ScrollView>
              ) : name ? (
                <Text style={{ color: "#747476" }}> {name} </Text>
              ) : (
                <Text style={{ color: "#747476" }}> "Select" </Text>
              )}
            </TouchableOpacity>
          </View>
        )
      ) : (
        <View style={{ flex: 1 }}>
          {label ? <Text style={{ padding: 2 }}>{label}</Text> : <></>}
          <TextInput
            editable={editable}
            value={result || ""}
            style={[styles.textInputStyle, textInputStyle]}
            placeholder={name ? name : "Select"}
            onFocus={() => {
              setShowAutoCompleteModal(true);
            }}
            showSoftInputOnFocus={false}
          ></TextInput>
          {!valid && inValidText ? (
            <Text style={styles.error}>{inValidText}</Text>
          ) : (
            <></>
          )}
        </View>
      )}
      <Modal
        animationType="fade"
        transparent={true}
        presentationStyle="overFullScreen"
        visible={showDataModal ? showDataModal : showAutoCompleteModal}
        onRequestClose={() => {
          closeModal();
        }}
        ariaHideApp={false}
      >
        <TouchableWithoutFeedback onPress={() => closeModal()}>
          <View style={styles.centeredView}>
            <TouchableWithoutFeedback>
              <View
                style={{
                  maxWidth:
                    window.width >= 960
                      ? window.width / 3
                      : window.width >= 641 && window.width <= 960
                      ? window.width / 2
                      : window.width <= 641 && window.width >= 500
                      ? window.width / 1.5
                      : window.width <= 500 && window.width >= 360
                      ? window.width / 1.2
                      : window.width - 60,
                  minWidth:
                    window.width >= 960
                      ? window.width / 3
                      : window.width >= 641 && window.width <= 960
                      ? window.width / 2
                      : window.width <= 641 && window.width >= 500
                      ? window.width / 1.5
                      : window.width <= 500 && window.width >= 360
                      ? window.width / 1.2
                      : window.width - 60,
                  flexDirection: "column",
                  paddingTop: 20,
                  paddingBottom: window.width >= 360 ? 20 : 10,
                  paddingLeft: window.width >= 360 ? 40 : 10,
                  paddingRight: window.width >= 360 ? 40 : 10,
                  borderRadius: 6,
                  backgroundColor: "#fefefe",
                }}
                onPress={() => setSearch(true)}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#000",
                      marginTop: 10,
                    }}
                  >
                    {name}
                  </Text>
                </View>
                <TouchableOpacity
                  style={[
                    styles.searchBarStyle,
                    { paddingLeft: 5, marginTop: 20 },
                  ]}
                  // onPress={() => setSearch(true)}
                >
                  <View style={{ alignSelf: "center" }}>
                    <Icon
                      name="search"
                      style={{ height: 20, width: 20, marginTop: 5 }}
                    ></Icon>
                  </View>
                  <TextInput
                    style={{ flex: 1, paddingLeft: 10 }}
                    // autoFocus={true}
                    placeholder="Search"
                    value={`${search}`}
                    onChangeText={
                      (phrase) => {
                        setSearch(phrase);
                        searchApiFunc(phrase);
                      }
                      // searchApi ? searchApi(phrase) : ""
                    }
                  ></TextInput>
                </TouchableOpacity>
                <View
                  style={{
                    maxHeight: 0.5 * size.height,
                    width:
                      size.width > 550 ? size.width / 3.3 : size.width / 1.5,
                    right: 10,
                  }}
                >
                  {multiSelect ? (
                    <ScrollView
                      nestedScrollEnabled={true}
                      showsVerticalScrollIndicator={false}
                      keyboardShouldPersistTaps={"handled"}
                    >
                      <View style={{ margin: 5, flexDirection: "row" }}>
                        {/* <Text>
                          {selected.map((x, index) => x.name).join(", ")}
                        </Text> */}
                      </View>
                      <FlatList
                        style={{}}
                        showsVerticalScrollIndicator={false}
                        data={renderList}
                        keyExtractor={(item, index) => `i-${item[id]} ${index}`}
                        renderItem={({ item }) => (
                          <Item
                            id={id}
                            key={`it-${item[id]}`}
                            item={item}
                            selected={selected}
                            selectItem={(e) => selectedItem(e)}
                            displayField={displayField}
                          />
                        )}
                      />
                      {/* {renderList.map((item, index) => (
                        <View
                          key={`i-${item[id]}`}
                          style={{
                            padding: 0,
                            margin: 5,
                            borderBottomWidth: 1,
                            borderBottomColor: "lightgray",
                          }}
                        >
                          
                        </View>
                      ))} */}
                    </ScrollView>
                  ) : (
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      data={renderList}
                      keyExtractor={(item, index) => `i-${item[id]} ${index}`}
                      renderItem={({ item, index }) => {
                        <View key={Math.random()} style={{ minHeight: 40 }}>
                          <TouchableOpacity
                            onPress={() => {
                              selectItem(item);
                              checkValidation(item);
                            }}
                            style={[styles.listStyle, { flex: 1 }]}
                            key={`ii-${item[id]}`}
                          >
                            <View
                              style={{
                                flexWrap: "wrap",
                                padding: 10,
                                borderBottomColor: "lightgray",
                                borderBottomWidth: 1,
                                flex: 1,
                                maxHeight: 40,
                              }}
                            >
                              <Text>
                                {displayField ? item[displayField] : item.name}
                              </Text>

                              {item.title ? <Text>{item.title}</Text> : <></>}
                            </View>
                          </TouchableOpacity>
                        </View>;
                      }}
                    />
                  )}
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: 10,
                  }}
                >
                  <Button
                    onPress={() => {
                      save();
                      closeModal();
                    }}
                    color="rgb(155, 43, 44)"
                    title="Submit"
                  ></Button>
                  <Button
                    onPress={() => {
                      closeModal();
                    }}
                    color="rgb(155, 43, 44)"
                    title="Cancel"
                  ></Button>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    flex: 1,
    flexDirection: "row",
    maxWidth: 500,
    minWidth: "100%",
    maxHeight: 40,
    minHeight: 30,
    backgroundColor: "#FFFFFF",
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    margin: 2,
  },
  modalView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 3,
    borderColor: "#DFE0E3",
    padding: 10,
  },
  centeredView: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  listStyle: {
    backgroundColor: "#fff",
    marginBottom: 3,
    flexDirection: "row",
  },
  textInputStyle: {
    borderWidth: 1,
    borderColor: "#E8E9EC",
    padding: 10,
    alignSelf: "stretch",
    maxHeight: 38,
    minHeight: 38,
  },
  selected: {
    borderRadius: 5,
    marginRight: 5,
    padding: 5,
    maxHeight: 35,
    justifyContent: "center",
  },
  searchBarStyle: {
    flexDirection: "row",
    maxHeight: 70,
    minHeight: 50,
    backgroundColor: "#efebeb9c",
  },
  error: {
    // position: "absolute",
    // bottom: 0,
    color: "red",
    fontSize: 12,
    margin: 1,
  },
});

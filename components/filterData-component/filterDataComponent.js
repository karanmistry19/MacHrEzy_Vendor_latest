import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { connect } from "react-redux";
import Button from "../../components/buttons/button";
import Checkbox from "../../components/checkbox";
import { DimensionContext } from "../../components/dimensionContext";
import Icon from "../../components/icons";
import ModalContainer from "../../components/modalContainer/modal";

const filterDataComponent = ({
  employees,
  departments,
  sites,
  grades,
  setData,
  data,
  removeData,
  removeAll,
  search,
}) => {
  const [renderData, setRenderData] = useState({
    data: [],
    displayField: "name",
    selected: "employee(s)",
    type: "",
    uniqueKey: "",
    renderList: [],
  });
  const [showFilterDataModal, setShowFilterDataModal] = useState(false);

  const { window } = useContext(DimensionContext);
  const changeSelected = (value) => {
    setRenderData({
      ...dataColumnMap[value],
      data: [...dataColumnMap[value]["data"]],
    });
  };
  useEffect(() => {
    setRenderData({
      type: "employee",
      data: [...employees],
      renderList: [...employees],
      displayField: "name",
      selected: "employee(s)",
      uniqueKey: "empCode",
    });
  }, [employees]);

  const setSelected = (item) => {
    setData(item);
    setShowFilterDataModal(false);
  };

  const dataColumnMap = {
    "employee(s)": {
      type: "employee",
      data: employees,
      renderList: [...employees],
      displayField: "name",
      selected: "employee(s)",
      uniqueKey: "empCode",
    },
    "department(s)": {
      type: "dept",
      data: departments,
      renderList: [...departments],
      displayField: "descr",
      selected: "department(s)",
      uniqueKey: "deptCode",
    },
    "site(s)": {
      type: "site",
      data: sites,
      renderList: [...sites],
      displayField: "descr",
      selected: "site(s)",
      uniqueKey: "siteCode",
    },
    "grade(s)": {
      type: "grade",
      data: grades,
      renderList: [...grades],
      displayField: "descr",
      selected: "grade(s)",
      uniqueKey: "gradeCode",
    },
  };

  const autoComplete = (phrase) => {
    setRenderData({
      ...renderData,
      renderList:
        phrase && phrase != ""
          ? [
              ...renderData.data.filter((x) =>
                x[renderData.displayField]
                  .toLowerCase()
                  .startsWith(phrase.toLowerCase())
              ),
            ]
          : [...renderData.data],
    });
  };

  return (
    <View>
      <ScrollView
        nestedScrollEnabled={true}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ height: 34, width: window.width }}
      >
        <TouchableOpacity
          onPress={() => setShowFilterDataModal(true)}
          style={{
            borderWidth: 1,
            borderRadius: 5,
            width: window.width < 600 ? window.width - 60 : window.width - 200,
            justifyContent: "flex-start",
            borderColor: "grey",
            flexDirection: "row",
          }}
        >
          {data.length === 0 ? (
            <Text style={{ color: "grey", padding: 5 }}>Filter</Text>
          ) : (
            data.map((x, i) => (
              <View
                jey={`${x.data[x.uniqueKey]} - ${i}`}
                style={{
                  flexDirection: "row",
                  backgroundColor: "#808080",
                  alignSelf: "flex-start",
                  marginHorizontal: 5,
                  marginVertical: 2,
                }}
              >
                <Text style={{ padding: 5, color: "#fff" }}>
                  {x.data[x.displayField]}
                </Text>
                <TouchableOpacity onPress={() => removeData(x)}>
                  <Icon name="cross" fill="#000"></Icon>
                </TouchableOpacity>
              </View>
            ))
          )}
        </TouchableOpacity>
        {window.width < 600 ? (
          <TouchableOpacity
            onPress={removeAll}
            style={{
              position: "absolute",
              right: 4,
              height: 30,
              marginTop: 2,
              marginRight: 2,
            }}
          >
            {data.length > 0 ? (
              <Icon fill="grey" height={30} width={30} name="cross"></Icon>
            ) : (
              <></>
            )}
          </TouchableOpacity>
        ) : (
          <Button
            onPress={removeAll}
            style={{
              minWidth: 80,
              maxWidth: 80,
              position: "absolute",
              right: 0,
              height: 30,
              marginTop: 2,
              marginRight: 2,
            }}
            title={"Clear"}
          ></Button>
        )}
      </ScrollView>
      {window.width < 600 ? (
        <TouchableOpacity
          onPress={removeAll}
          style={{
            position: "absolute",
            right: 0,
            height: 30,
            marginTop: 2,
            marginRight: 2,
          }}
        >
          <Icon fill="grey" height={25} width={25} name="search"></Icon>
        </TouchableOpacity>
      ) : (
        <Button
          onPress={search}
          style={{
            minWidth: 80,
            maxWidth: 80,
            position: "absolute",
            right: 0,
          }}
          title={"Search"}
        ></Button>
      )}

      <ModalContainer
        showModal={showFilterDataModal}
        modalStyle={{
          minWidth: 400,
          maxWidth: 500,
          height: window.height * 0.4,
        }}
        modalContentStyle={{
          width: "100%",
          minHeight: 450,
          maxHeight: 450,
        }}
        title="Select Parameters"
        onClose={() => setShowFilterDataModal(false)}
        modalContent={
          <View
            style={{
              width: "100%",
              height: 295,
              padding: 10,
            }}
          >
            <View
              style={{
                marginVertical: 5,
                marginHorizontal: 20,
              }}
            >
              <View style={[styles.row, { marginBottom: 5 }]}>
                <View style={[styles.row, { marginRight: 15 }]}>
                  <Checkbox
                    style={{ minHeight: 20, width: 20, marginRight: 5 }}
                    value={renderData.selected === "employee(s)"}
                    setValue={() => changeSelected("employee(s)")}
                  ></Checkbox>
                  <Text style={{ marginRight: 10 }}>Employee</Text>
                </View>
                <View style={[styles.row, { marginRight: 12 }]}>
                  <Checkbox
                    value={renderData.selected === "department(s)"}
                    setValue={() => changeSelected("department(s)")}
                    style={{ minHeight: 20, width: 20, marginRight: 5 }}
                  ></Checkbox>
                  <Text style={{ marginRight: 10 }}>Department</Text>
                </View>
                <View style={[styles.row, { marginRight: 5 }]}>
                  <Checkbox
                    value={renderData.selected === "grade(s)"}
                    setValue={() => changeSelected("grade(s)")}
                    style={{ minHeight: 20, width: 20, marginRight: 5 }}
                  ></Checkbox>
                  <Text style={{ marginRight: 10 }}>Grade</Text>
                </View>
                <View style={[styles.row, { marginLeft: 10 }]}>
                  <Checkbox
                    value={renderData.selected === "site(s)"}
                    setValue={() => changeSelected("site(s)")}
                    style={{ minHeight: 20, width: 20, marginRight: 5 }}
                  ></Checkbox>
                  <Text>Site</Text>
                </View>
              </View>
              <TouchableOpacity
                style={[styles.searchBarStyle, { paddingLeft: 5 }]}
                // onPress={() => setSearch(true)}
              >
                <View style={{ alignSelf: "center" }}>
                  <Icon
                    name="search"
                    style={{ width: 20, marginTop: 5 }}
                  ></Icon>
                </View>
                <TextInput
                  style={{ flex: 1, paddingLeft: 10 }}
                  placeholder="Search"
                  onChangeText={(phrase) => {
                    autoComplete(phrase);
                  }}
                ></TextInput>
              </TouchableOpacity>
              <ScrollView
                nestedScrollEnabled={true}
                style={{ minHeight: 350, maxHeight: 350 }}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={"handled"}
              >
                {renderData.renderList.map((item, i) => (
                  <View
                    key={item[renderData.uniqueKey]}
                    style={{ minHeight: 40 }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        setSelected({
                          data: item,
                          type: renderData.type,
                          displayField: renderData.displayField,
                          uniqueKey: renderData.uniqueKey,
                        })
                      }
                      style={[styles.listStyle, { flex: 1 }]}
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
                        <Text>{item[renderData.displayField]}</Text>

                        {item.title ? <Text>{item.title}</Text> : <></>}
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        }
        onRequestCloseModal={() => setShowFilterDataModal(false)}
      ></ModalContainer>
    </View>
  );
};
const mapStateToProps = ({ employees, departments, sites, grades }) => ({
  employees,
  departments,
  sites,
  grades,
});

export default connect(mapStateToProps)(filterDataComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#fff",

    textAlign: "center",
    borderRadius: 0,
    minHeight: 50,
    maxHeight: 50,
    paddingTop: 5,
    borderBottomWidth: 1,
    shadowColor: "black",
    shadowOpacity: 0.2,
    // shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,

    borderColor: "grey",
    borderRadius: 3,
    borderRightWidth: 0.5,
  },
  selected: {
    width: 150,
    // borderRightColor: "#ffffff00",
    borderBottomWidth: 1,
    borderRightWidth: 0.5,
    elevation: 20,
    shadowOpacity: 0.6,
    shadowOffset: { width: 2, height: 3 },
  },
  buttonLabel: {
    fontWeight: "700",
    color: "black",
    paddingTop: 12,
    textAlign: "center",
    fontSize: 15,
  },
  selectedLabel: {
    fontWeight: "bold",
    color: "rgb(155, 43, 44)",
    fontSize: 16,
    marginBottom: 5,
    paddingTop: 7,
    marginRight: 5,
  },
  listStyle: {
    backgroundColor: "#fff",
    marginBottom: 3,
    flexDirection: "row",
  },
  searchBarStyle: {
    flexDirection: "row",
    maxHeight: 50,
    minHeight: 40,
    backgroundColor: "#efebeb9c",
  },
});

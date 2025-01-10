import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
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
import { fetchDepartments } from "../../redux/actions/department.action";
import { fetchGrades } from "../../redux/actions/grade.action";
import { fetchEmployee } from "../../redux/actions/notifications.action";
import { fetchSite } from "../../redux/actions/site.action";
import { fetchWorkwlowEmployee } from "../../redux/actions/user.action";

const filterDataComponent = ({
  departments,
  sites,
  grades,
  setData,
  data,
  removeData,
  removeAll,
  search,
  fetchDepartments,
  fetchSite,
  fetchGrades,
  fetchEmployee,
  fetchWorkwlowEmployee,
  workflowEmployees,
  type,
  style,
  filterName,
  iconDisable,
  placeholder,
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
      data: [...workflowEmployees],
      renderList: [...workflowEmployees],
      displayField: "empName",
      selected: "employee(s)",
      uniqueKey: "empCode",
    });
  }, [workflowEmployees]);

  const setSelected = (item) => {
    setData(item);
    setShowFilterDataModal(false);
  };

  const dataColumnMap = {
    "employee(s)": {
      type: "employee",
      data: workflowEmployees,
      renderList: [...workflowEmployees],
      displayField: "empName",
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
    // "grade(s)": {
    //   type: "grade",
    //   data: grades,
    //   renderList: [...grades],
    //   displayField: "descr",
    //   selected: "grade(s)",
    //   uniqueKey: "gradeCode",
    // },
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

  const showModal = () => {
    setShowFilterDataModal(true);
    if (!type || type != "Calendar") {
      fetchDepartments();
      fetchSite();
    }
    fetchWorkwlowEmployee();
  };
  const renderItem = ({ item, i }) => {
    return (
      <View key={item[i]} style={{ minHeight: 40 }}>
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
    );
  };
  return (
    <View style={style}>
      <View
        style={{
          borderWidth: 1,
          borderRadius: 5,
          width: window.width - 25,
          justifyContent: "flex-start",
          borderColor: "grey",
          flexDirection: "row",
          ...style,
        }}
      >
        <ScrollView
          horizontal={true}
          nestedScrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          style={{ height: 34, width: window.width, marginRight: 35 }}
        >
          <TouchableOpacity
            style={{
              justifyContent: "flex-start",
              flexDirection: "row",
              marginVertical: 2,
              minWidth:
                window.width < 600 ? window.width - 25 : window.width - 110,
            }}
            onPress={() => showModal()}
          >
            {!data || data?.length === 0 ? (
              <Text style={{ color: "grey", padding: 5 }}>
                {placeholder ||
                  `Filter ${type === "Calendar" ? " Employee" : ""}`}
              </Text>
            ) : (
              data?.map((x, i) => (
                <View
                  key={`${x.data[x.uniqueKey]} - ${i}`}
                  style={{
                    flexDirection: "row",
                    backgroundColor: "#808080",
                    alignSelf: "flex-start",
                    marginHorizontal: 5,
                    marginVertical: 2,
                    borderRadius: 2,
                  }}
                >
                  <Text style={{ padding: 5, color: "#fff" }}>
                    {x.data[x.displayField]}
                  </Text>
                  <TouchableOpacity
                    style={{
                      marginVertical: 1,
                      marginLeft: 5,
                      justifyContent: "center",
                    }}
                    onPress={() => removeData(x)}
                  >
                    <Icon
                      style={{
                        marginRight: 3,
                      }}
                      height={15}
                      width={15}
                      name="crossIcon"
                      fill="#fff"
                    ></Icon>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </TouchableOpacity>
        </ScrollView>

        {iconDisable ? (
          <></>
        ) : data?.length > 0 ? (
          <View>
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
                <Icon fill="grey" height={30} width={30} name="cross"></Icon>
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
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => setShowFilterDataModal(true)}
            style={{
              position: "absolute",
              right: 6,
              top: 7,
            }}
          >
            <Icon fill="grey" height={20} width={20} name="filterIcon"></Icon>
          </TouchableOpacity>
        )}
      </View>

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
        title={`Select ${type === "Calendar" ? "Employee" : "Parameters"}`}
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
              {type === "Calendar" ? (
                <></>
              ) : (
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
                  {/* <View style={[styles.row, { marginRight: 5 }]}>
                  <Checkbox
                    value={renderData.selected === "grade(s)"}
                    setValue={() => changeSelected("grade(s)")}
                    style={{ minHeight: 20, width: 20, marginRight: 5 }}
                  ></Checkbox>
                  <Text style={{ marginRight: 10 }}>Grade</Text>
                </View> */}
                  <View style={[styles.row, { marginLeft: 10 }]}>
                    <Checkbox
                      value={renderData.selected === "site(s)"}
                      setValue={() => changeSelected("site(s)")}
                      style={{ minHeight: 20, width: 20, marginRight: 5 }}
                    ></Checkbox>
                    <Text>Site</Text>
                  </View>
                </View>
              )}
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
              <FlatList
                keyExtractor={(item) => item[[renderData.uniqueKey]]}
                pagingEnabled={true}
                renderItem={renderItem}
                data={renderData.renderList}
                style={{ minHeight: 350, maxHeight: 350 }}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={"handled"}
              ></FlatList>
            </View>
          </View>
        }
        onRequestCloseModal={() => setShowFilterDataModal(false)}
      ></ModalContainer>
    </View>
  );
};
const mapStateToProps = ({
  departments,
  sites,
  grades,
  workflowEmployees,
}) => ({
  departments,
  sites,
  grades,
  workflowEmployees,
});

export default connect(mapStateToProps, {
  fetchDepartments,
  fetchSite,
  fetchGrades,
  fetchEmployee,
  fetchWorkwlowEmployee,
})(filterDataComponent);

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

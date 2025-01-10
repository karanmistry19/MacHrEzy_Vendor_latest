import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import { connect } from "react-redux";
import { DimensionContext } from "../components/dimensionContext";
import Icons from "../components/icons";
import ModalContainer from "../components/modalContainer/modal";
import {
  createSiteSqlMap,
  fetchSiteSqlMap,
} from "../redux/actions/site-sql-map.action";

const SqlData = ({ siteSQLMap, fetchSiteSqlMap, createSiteSqlMap }) => {
  useEffect(() => {
    fetchSiteSqlMap();
  }, []);
  let initObj = {
    siteName: "",
    user: "",
    password: "",
    server: "",
    database: "",
  };
  const [siteObj, setSiteObj] = useState(initObj);
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const { window } = useContext(DimensionContext);
  const dimension = useWindowDimensions();
  const onRequestCloseModal = () => {
    setSiteObj(initObj);
    setModalVisible(false);
  };

  const setDetailsToSiteObject = (data) => {
    setSiteObj({ ...siteObj, ...data });
  };
  const submit = () => {
    if (selected) {
      createSiteSqlMap({ ...siteObj, _id: selected._id });
    } else {
      createSiteSqlMap(siteObj);
    }
    setModalVisible(false);
    setSiteObj(initObj);
    setSelected(null);
  };

  const setAndViewModal = (data) => {
    setSelected(data);
    setSiteObj({
      siteName: data.siteName,
      user: data.user,
      password: data.password,
      server: data.server,
      database: data.database,
    });
    setModalVisible(true);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {window.width < 550 ? (
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 10,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                alignSelf: "center",
                marginTop: 10,
                paddingBottom: 10,
              }}
            >
              SQL Data List
            </Text>

            <View style={{ marginTop: 5 }}>
              <Button
                onPress={() => {
                  setModalVisible(true);
                }}
                title="Create SQL Info"
                color="rgb(155, 43, 44)"
              ></Button>
            </View>
          </View>
          <ScrollView
            nestedScrollEnabled={true}
            style={{ width: 400, marginTop: 10 }}
          >
            {siteSQLMap.map((e) => (
              <TouchableOpacity
                key={e._id}
                onPress={() => setAndViewModal(e)}
                style={{
                  height: 150,
                  width: "85%",
                  borderWidth: 2,
                  borderRadius: 5,
                  marginLeft: 10,
                  marginTop: 10,
                  borderColor: "#989898",
                  justifyContent: "space-evenly",
                }}
              >
                <View style={{ flexDirection: "row", marginLeft: 10 }}>
                  <Text style={{ alignSelf: "flex-start", fontWeight: "900" }}>
                    Site :
                  </Text>
                  <Text> {e.siteName}</Text>
                </View>
                <View style={{ flexDirection: "row", marginLeft: 10 }}>
                  <Text style={{ alignSelf: "flex-start", fontWeight: "900" }}>
                    User :
                  </Text>
                  <Text> {e.user}</Text>
                </View>
                <View style={{ flexDirection: "row", marginLeft: 10 }}>
                  <Text style={{ alignSelf: "flex-start", fontWeight: "900" }}>
                    Password :
                  </Text>
                  <Text> {e.password}</Text>
                </View>
                <View style={{ flexDirection: "row", marginLeft: 10 }}>
                  <Text style={{ alignSelf: "flex-start", fontWeight: "900" }}>
                    Database :
                  </Text>
                  <Text> {e.database}</Text>
                </View>
                <View style={{ flexDirection: "row", marginLeft: 10 }}>
                  <Text style={{ alignSelf: "flex-start", fontWeight: "900" }}>
                    Server :
                  </Text>
                  <Text> {e.server}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <ModalContainer
            showModal={modalVisible}
            modalViewStyle={{
              maxHeight: 400,
              width: dimension.width > 550 ? 400 : 340,
            }}
            title="Add SQL Info"
            onClose={onRequestCloseModal}
            modalContent={
              <View
                style={{
                  maxHeight: 400,
                  height: 400,
                  width: dimension.width > 550 ? 380 : 300,
                  borderRadius: 10,
                  padding: 5,
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }}
              >
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                      setSiteObj(initObj);
                    }}
                  >
                    <Icons fill="#000" name="cross"></Icons>
                  </TouchableOpacity>
                </View>
                <TextInput
                  style={{
                    height: 30,
                    borderBottomWidth: 1,
                  }}
                  underlineColorAndroid="transparent"
                  placeholder="Site name"
                  placeholderTextColor="grey"
                  onChangeText={(x) => setDetailsToSiteObject({ siteName: x })}
                  multiline={true}
                  value={siteObj.siteName}
                />
                <TextInput
                  style={{ height: 30, borderBottomWidth: 1 }}
                  underlineColorAndroid="transparent"
                  placeholder="User Name"
                  placeholderTextColor="grey"
                  onChangeText={(x) => setDetailsToSiteObject({ user: x })}
                  multiline={true}
                  value={siteObj.user}
                />
                <TextInput
                  style={{ height: 30, borderBottomWidth: 1 }}
                  underlineColorAndroid="transparent"
                  placeholder="Password"
                  placeholderTextColor="grey"
                  onChangeText={(x) => setDetailsToSiteObject({ password: x })}
                  multiline={true}
                  value={siteObj.password}
                />
                <TextInput
                  style={{ height: 30, borderBottomWidth: 1 }}
                  underlineColorAndroid="transparent"
                  placeholder="Database"
                  placeholderTextColor="grey"
                  onChangeText={(x) => setDetailsToSiteObject({ database: x })}
                  multiline={true}
                  value={siteObj.database}
                />
                <TextInput
                  style={{ height: 30, borderBottomWidth: 1 }}
                  underlineColorAndroid="transparent"
                  placeholder="Server"
                  placeholderTextColor="grey"
                  onChangeText={(x) => setDetailsToSiteObject({ server: x })}
                  multiline={true}
                  value={siteObj.server}
                />

                <Button
                  onPress={() => {
                    submit();
                  }}
                  title="Add"
                  color="rgb(155, 43, 44)"
                ></Button>
              </View>
            }
            onRequestCloseModal={onRequestCloseModal}
          ></ModalContainer>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 10,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                paddingBottom: 7,
                marginLeft: 40,
                marginTop: 5,
              }}
            >
              SQL Data List
            </Text>
            <View style={{ marginLeft: 40, marginTop: 5 }}>
              <Button
                onPress={() => {
                  setModalVisible(true);
                }}
                title="Create Sql Info"
                color="rgb(155, 43, 44)"
              ></Button>
            </View>
          </View>
          <ScrollView
            nestedScrollEnabled={true}
            style={{ width: 400, marginTop: 10 }}
          >
            {siteSQLMap.map((e) => (
              <TouchableOpacity
                key={e._id}
                onPress={() => setAndViewModal(e)}
                style={{
                  height: 150,
                  width: 370,
                  borderWidth: 2,
                  borderRadius: 5,
                  marginLeft: 10,
                  marginTop: 10,
                  borderColor: "#989898",
                  justifyContent: "space-evenly",
                }}
              >
                <View style={{ flexDirection: "row", marginLeft: 10 }}>
                  <Text style={{ alignSelf: "flex-start", fontWeight: "900" }}>
                    Site :
                  </Text>
                  <Text> {e.siteName}</Text>
                </View>
                <View style={{ flexDirection: "row", marginLeft: 10 }}>
                  <Text style={{ alignSelf: "flex-start", fontWeight: "900" }}>
                    User :
                  </Text>
                  <Text> {e.user}</Text>
                </View>
                <View style={{ flexDirection: "row", marginLeft: 10 }}>
                  <Text style={{ alignSelf: "flex-start", fontWeight: "900" }}>
                    Password :
                  </Text>
                  <Text> {e.password}</Text>
                </View>
                <View style={{ flexDirection: "row", marginLeft: 10 }}>
                  <Text style={{ alignSelf: "flex-start", fontWeight: "900" }}>
                    Database :
                  </Text>
                  <Text> {e.database}</Text>
                </View>
                <View style={{ flexDirection: "row", marginLeft: 10 }}>
                  <Text style={{ alignSelf: "flex-start", fontWeight: "900" }}>
                    Server :
                  </Text>
                  <Text> {e.server}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <ModalContainer
            showModal={modalVisible}
            modalViewStyle={{
              maxHeight: 400,
              width: dimension.width > 550 ? 400 : 340,
            }}
            title="Add SQL Info"
            onClose={onRequestCloseModal}
            modalContent={
              <View
                style={{
                  maxHeight: 400,
                  height: 400,
                  width: dimension.width > 550 ? 380 : 300,
                  borderRadius: 10,
                  padding: 5,
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }}
              >
                <TextInput
                  style={{
                    height: 30,
                    borderBottomWidth: 1,
                  }}
                  underlineColorAndroid="transparent"
                  placeholder="Site name"
                  placeholderTextColor="grey"
                  onChangeText={(x) => setDetailsToSiteObject({ siteName: x })}
                  multiline={true}
                  value={siteObj.siteName}
                />
                <TextInput
                  style={{ height: 30, borderBottomWidth: 1 }}
                  underlineColorAndroid="transparent"
                  placeholder="User Name"
                  placeholderTextColor="grey"
                  onChangeText={(x) => setDetailsToSiteObject({ user: x })}
                  multiline={true}
                  value={siteObj.user}
                />
                <TextInput
                  style={{ height: 30, borderBottomWidth: 1 }}
                  underlineColorAndroid="transparent"
                  placeholder="Password"
                  placeholderTextColor="grey"
                  onChangeText={(x) => setDetailsToSiteObject({ password: x })}
                  multiline={true}
                  value={siteObj.password}
                />
                <TextInput
                  style={{ height: 30, borderBottomWidth: 1 }}
                  underlineColorAndroid="transparent"
                  placeholder="Database"
                  placeholderTextColor="grey"
                  onChangeText={(x) => setDetailsToSiteObject({ database: x })}
                  multiline={true}
                  value={siteObj.database}
                />
                <TextInput
                  style={{ height: 30, borderBottomWidth: 1 }}
                  underlineColorAndroid="transparent"
                  placeholder="Server"
                  placeholderTextColor="grey"
                  onChangeText={(x) => setDetailsToSiteObject({ server: x })}
                  multiline={true}
                  value={siteObj.server}
                />

                <Button
                  onPress={() => {
                    submit();
                  }}
                  title="Add"
                  color="rgb(155, 43, 44)"
                ></Button>
              </View>
            }
            onRequestCloseModal={onRequestCloseModal}
          ></ModalContainer>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textAreaContainer: {
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    height: 400,
    width: "95%",
    borderRadius: 10,
    marginLeft: 20,
  },
  textArea: {
    height: 400,
    width: "95%",
    justifyContent: "flex-start",
    flex: 1,
    padding: 8,
    textAlignVertical: "top",
  },
});

const mapStateToProps = ({ siteSQLMap }) => ({
  siteSQLMap,
});
export default connect(mapStateToProps, {
  fetchSiteSqlMap,
  createSiteSqlMap,
})(SqlData);

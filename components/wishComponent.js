import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { connect } from "react-redux";
import { birthdayWish } from "../redux/actions/dashboard.action";
import { DimensionContext } from "./dimensionContext";
import Icon from "./icons";
import ModalContainer from "./modalContainer/modal";
import { ModularCard } from "./modularCard";
import { Table } from "./tables/table";
import { WishListTable } from "./tables/wishListTable";
import { Tab } from "./tabs/tab";

const WishComponent = ({
  onPressSend,
  bdayOfCrrntMonths,
  newJoiner,
  birthdayWish,
  user,
}) => {
  const [selectedTab, setSelectedTab] = useState("Birthdays");
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const { window } = useContext(DimensionContext);
  const [tableData, setTableData] = useState([]);
  const dimension = useWindowDimensions();
  useEffect(() => {
    if (bdayOfCrrntMonths && bdayOfCrrntMonths.length > 0)
      setTableData([...bdayOfCrrntMonths]);
  }, [bdayOfCrrntMonths]);
  const closeModal = () => {
    setModalVisible(false);
    setMessage("");
  };
  const onPressArrow = () => {
    if (message.trim() !== "") {
      birthdayWish({
        users: (selectedTab === "Birthdays"
          ? bdayOfCrrntMonths
          : newJoiner
        ).map((x) => x.empCode?.trim()),
        subject:
          selectedTab === "Birthdays" ? "Birthday Wish" : "Welcome to Macleods",
        text: message,
        emailList: (selectedTab === "Birthdays"
          ? bdayOfCrrntMonths
          : newJoiner
        ).map((x) => x.emailIdOff?.trim()),
      });
      setModalVisible(false);
      setMessage("");
    }
  };

  const tabChange = (v) => {
    setSelectedTab(v);
    setTableData(v === "Birthdays" ? [...bdayOfCrrntMonths] : [...newJoiner]);
  };

  const retrivalLogic = ({ row }) => {
    return [
      {
        component: () => (
          <WishListTable
            newJoiner={newJoiner}
            bdayOfCrrntMonths={bdayOfCrrntMonths}
            tabWish={selectedTab}
            onPressSubmit={birthdayWish}
            birthUser={row}
            currentEmployeeData={row}
            pressFunc={onPressArrow}
            user={user}
          ></WishListTable>
        ),
      },
    ];
  };
  const setNewJoinListRow = ({ row }) => {
    return [
      {
        component: () => (
          <WishListTable
            newJoiner={newJoiner}
            bdayOfCrrntMonths={bdayOfCrrntMonths}
            tabWish={tabWish}
            onPressSubmit={birthdayWish}
            birthUser={birthUser}
            currentEmployeeData={row}
            pressFunc={() => onPressSend(row)}
          ></WishListTable>
        ),
      },
    ];
  };

  return (
    <View
      style={{
        width:
          window.width < 700
            ? window.width - 30
            : window.width < 790
            ? (window.width - 70) * 0.5
            : window.width < 1130
            ? (window.width - 70) * 0.5
            : window.width * 0.27,
        marginBottom: 10,
        marginHorizontal: 10,
        // marginLeft:
        //   window.width > 870 && window.width < 1100
        //     ? 50
        //     : window.width > 700 && window.width < 870
        //     ? 35
        //     : window.width < 700
        //     ? 0
        //     : 18,
      }}
    >
      <View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#383336",
            marginTop: 10,
            marginLeft: 5,
          }}
        >
          Wishes
        </Text>
        <ModularCard
          style={{
            maxHeight: Platform.OS === "web" ? window.height / 2.7 : 450,
            minHeight: Platform.OS === "web" ? window.height / 2.7 : 320,
            marginVertical: 10,
          }}
          cardContent={
            <View
              style={{
                maxHeight: Platform.OS === "web" ? window.height / 3 : 200,
              }}
            >
              <Tab
                displayContent={["Birthdays", "New Joiner"]}
                selectedTab={selectedTab}
                onTabChange={(v) => tabChange(v)}
              ></Tab>

              {tableData?.length < 1 ? (
                <Image
                  source={require("../assets/sorry.png")}
                  style={{
                    height: 200,
                    width: "100%",
                  }}
                ></Image>
              ) : (
                <View style={{ flexDirection: "row-reverse", marginTop: 10 }}>
                  <TouchableOpacity
                    onPress={() => {
                      setMessage(
                        (selectedTab === "Birthdays"
                          ? "Wish you a very happy birthday"
                          : "Welcome to Macleods") + `\n\nFrom ${user.empName}`
                      );
                      setModalVisible(true);
                    }}
                    style={{ marginLeft: 10 }}
                  >
                    <Icon name="send" fill="rgb(155, 43, 44)"></Icon>
                  </TouchableOpacity>
                  <Text style={{ fontSize: 12 }}>Send wishes to All</Text>
                </View>
              )}

              <ScrollView
                scrollEnabled={true}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                style={{
                  marginTop: 10,
                  minHeight: Platform.OS === "web" ? 100 : 200,
                }}
              >
                <Table
                  tableData={tableData}
                  retrivalLogic={retrivalLogic}
                ></Table>
              </ScrollView>
            </View>
          }
        ></ModularCard>
      </View>
      <ModalContainer
        onRequestCloseModal={() => closeModal()}
        showModal={modalVisible}
        modalStyle={{
          minWidth: 300,
          maxWidth: 400,
          height: dimension.height * 0.4,
        }}
        modalContentStyle={{
          width: "100%",
          minHeight: 310,
          maxHeight: 310,
        }}
        title={"Send a Wish to all"}
        onClose={() => closeModal()}
        modalContent={
          <View
            style={{
              width: "100%",
              borderRadius: 10,
              padding: 10,
            }}
          >
            <View style={styles.textAreaContainer}>
              <TextInput
                style={styles.textArea}
                underlineColorAndroid="transparent"
                placeholder="Your message"
                placeholderTextColor="grey"
                numberOfLines={10}
                onChangeText={(x) => setMessage(x)}
                multiline={false}
                value={message}
                editable={false}
              />
              <TouchableOpacity
                onPress={() => onPressArrow()}
                style={{ position: "absolute", right: 5, bottom: 5 }}
              >
                <Icon name="send" fill="rgb(155, 43, 44)"></Icon>
              </TouchableOpacity>
            </View>
          </View>
        }
      ></ModalContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  textAreaContainer: {
    borderColor: "gray",
    borderWidth: 1,
    height: 250,
    borderRadius: 10,
    width: "100%",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  textArea: {
    justifyContent: "flex-start",
    flex: 1,
    padding: 8,
    textAlignVertical: "top",
  },
});
const mapStateToProps = ({ bdayOfCrrntMonths, newJoiner, user }) => ({
  bdayOfCrrntMonths,
  newJoiner,
  user,
});
export default connect(mapStateToProps, {
  birthdayWish,
})(WishComponent);

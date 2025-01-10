import React, { useContext, useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DimensionContext } from "./dimensionContext";
import Icon from "./icons";
import { formatDate, getDate } from "./utils";

export const NotificationList = ({
  data,
  macleods,
  refreshHandler,
  cardStyle,
  user,
  seenAllNotifications,
  clearNotifications,
  markAsRead,
}) => {
  const [refreshing, setRefreshing] = useState(false);

  const { window } = useContext(DimensionContext);

  const onRefresh = () => {
    if (refreshHandler) {
      setRefreshing(true);
      refreshHandler()
        .then((x) => {
          setRefreshing(false);
        })
        .catch((err) => {
          setRefreshing(false);
        });
    }
  };

  const seen = () => {
    seenAllNotifications();
  };
  const clear = () => {
    clearNotifications();
  };
  const markRead = (id) => {
    markAsRead(id);
  };

  return (
    <View style={styles.displayCards}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          height: 80,
        }}
      >
        <Image
          style={{ height: 80, width: 200 }}
          resizeMethod={"scale"}
          resizeMode={"contain"}
          source={require("../assets/logo.png")}
        ></Image>
      </View>
      {data && data.length > 0 ? (
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            marginVertical: 5,
            marginHorizontal: 3,
            height: 30,
          }}
        >
          <TouchableOpacity
            onPress={() => seen()}
            style={{
              backgroundColor: "#FAFAFA",
              padding: 5,
              marginRight: 5,
              borderRadius: 5,
            }}
          >
            <Text style={{ fontSize: 18 }}>Mark All as Seen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => clear()}
            style={{
              backgroundColor: "#FAFAFA",
              padding: 5,
              marginRight: 5,
              borderRadius: 5,
            }}
          >
            <Text style={{ fontSize: 18 }}>Clear</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
      {/* <View
        style={{
          flex: 1,
          backgroundColor: "red",
          marginBottom: 20,
          maxHeight: window.height - 200,
          minHeight: window.height - 200,
        }}
      > */}
      <ScrollView
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 80 }}
        style={{
          maxHeight: window.height - 200,
          minHeight: window.height - 200,
          marginBottom: 70,
        }}
      >
        {data?.map((item, index) => (
          <TouchableOpacity
            onPress={() => markRead(item._id)}
            key={index.toString()}
            style={{
              backgroundColor: item.seenBy.find(
                (x) => x === user.empCode.trim()
              )
                ? "#FAFAFA"
                : "#d2e7fa",
              borderWidth: 1,
              marginVertical: 2,
              marginTop: 10,
              marginLeft: 10,
              borderRadius: 5,
              padding: 5,
              borderColor: "#A8A8A8",
              shadowColor: "#696969",
              shadowOpacity: 0.8,
              elevation: 6,
              shadowRadius: 5,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  height: 30,
                  backgroundColor: "#EBE0D0",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 5,
                  width: 30,
                }}
              >
                <Icon name="exclamation" fill="#3D0610"></Icon>
              </View>
              <View style={styles.boxContent}>
                {/* {item.createdBy && (
                  <Text style={styles.title}>{item.createdBy}</Text>
                )} */}
                <Text style={styles.description}>{item.message}</Text>
                <Text style={{ alignSelf: "flex-end" }}>
                  {formatDate(getDate(item._id), "DD/MM/yyyy h:mm a")}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  displayCards: {
    // flex: 1,
    backgroundColor: "#FFFFFF",
  },
  boxContent: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: 10,
  },
  description: {
    fontSize: 14,
    color: "#646464",
  },
  title: {
    fontSize: 15,
    color: "rgb(155, 43, 44)",
  },
});

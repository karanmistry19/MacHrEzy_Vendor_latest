import React, { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { fetchNotifications } from "../redux/actions/notifications.action";
import { CardList } from "./cardList";
import { DimensionContext } from "./dimensionContext";

DimensionContext;
const NotificationComponent = ({ notifications, fetchNotifications }) => {
  const { window } = useContext(DimensionContext);
  return (
    <View
      style={{
        width: window.width < 550 ? "100%" : "40%",
        height: window.width < 550 ? window.height / 2 : 411,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: "#383336",
          marginLeft: 12,
        }}
      >
        Notifications
      </Text>
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        style={{
          minHeight: "100%",
          marginTop: 10,
          marginLeft: 10,
          backgroundColor: "#FFF",
          borderRadius: 15,
          borderColor: "#A8A8A8",
          shadowColor: "#696969",
          shadowOpacity: 0.8,
          elevation: 6,
          shadowRadius: 5,
        }}
      >
        <CardList
          cardStyle={{
            minHeight: "100%",
            maxHeight: "100%",
            marginHorizontal: 10,
            marginVertical: 5,
          }}
          data={notifications}
          refreshHandler={fetchNotifications}
        ></CardList>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  cellStyle: {
    width: 100,
  },
  tableContainer: {
    margin: 5,
  },
});

const mapStateToProps = ({ notifications }) => ({ notifications });
export default connect(
  mapStateToProps,
  fetchNotifications
)(NotificationComponent);

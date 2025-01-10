import React, { useContext } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { DimensionContext } from "../dimensionContext";
import { ModularCard } from "../modularCard";

const NotificationsData = [
  { id: "1", text: "Last Leave applied ON 2-01-2022" },
  { id: "2", text: "Holiday is decalred 2-01-2022" },
  { id: "3", text: "You added new file ‘Project March’" },
  {
    id: "4",
    text: "You added a new comment",
  },
  {
    id: "5",
    text: "You created a new project ‘Site",
  },
];
const NotificationAttendance = () => {
  const { window } = useContext(DimensionContext);
  return (
    <ModularCard
      style={{
        // height:
        //   window.height -
        //   (Platform.OS === "web" ? 150 : 140 + StatusBar.currentHeight),
        background: "#F5F5FB",
        backgroundColor: "#F5F5FB",
        marginTop: 10,
      }}
      cardContent={
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text
              style={{
                color: "#9F232B",
                fontFamily: "Roboto",
                fontSize: 18,

                fontWeight: "600",
              }}
            >
              Notifications
            </Text>
            <FlatList
              style={{ marginTop: 10 }}
              data={NotificationsData}
              renderItem={({ item }) => (
                <View
                  style={{
                    paddingTop: 20,
                    paddingBottom: 20,
                    borderTopWidth: 1,
                    borderTopColor: "#E0E8F2",
                  }}
                >
                  <Text style={{ fontSize: 16, color: "#6F6C99" }}>
                    {item.text}
                  </Text>
                </View>
              )}
            ></FlatList>
          </View>
        </ScrollView>
      }
    ></ModularCard>
  );
};

export default NotificationAttendance;

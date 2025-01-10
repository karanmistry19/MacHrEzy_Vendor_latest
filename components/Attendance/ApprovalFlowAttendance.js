import React, { useContext } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import Avatar from "../avatar";
import { DimensionContext } from "../dimensionContext";
import { ModularCard } from "../modularCard";

const ApprovalFlowAttendance = () => {
  const { window } = useContext(DimensionContext);
  return (
    <ModularCard
      style={{
        // height:
        //   window.height -
        //   (Platform.OS === "web" ? 150 : 140 + StatusBar.currentHeight),
        flex: 1,
        width: window.width,

        marginRight: 20,
        maxHeight: 400,
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
                fontWeight: "blod",
              }}
            >
              Approval Flow
            </Text>
            <FlatList
              style={{ marginTop: 20 }}
              keyExtractor={(item, i) => i}
              pagingEnabled={true}
              data={Array(4).fill(2)}
              renderItem={({ item }) => (
                <View style={{ flexDirection: "row", margin: 5 }}>
                  <Avatar
                    source={{
                      uri: "https://machrezy.macleods.in/api/user/dp?empCode=TESTUSR",
                    }}
                    style={{
                      marginRight: 5,
                      borderRadius: 55,
                      height: 40,
                      borderWidth: 0,
                      width: 40,
                    }}
                  />
                  <View style={{ width: 100, marginLeft: 10 }}>
                    <Text style={{ fontFamily: "Roboto" }}>Annette Watson</Text>
                    <Text
                      style={{
                        fontFamily: "Roboto",
                        color: "#A6ACBE",
                      }}
                    >
                      HR Manger
                    </Text>
                  </View>
                  <View style={{ marginLeft: "auto" }}>
                    <Text style={{ fontFamily: "Roboto" }}>Comp-off</Text>
                  </View>
                </View>
              )}
            ></FlatList>
          </View>
        </ScrollView>
      }
    />
  );
};

export default ApprovalFlowAttendance;

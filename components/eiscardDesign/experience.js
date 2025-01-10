import React, { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import CardComponent from "../cardComponent/cardComponent";
import { DimensionContext } from "../dimensionContext";
import CardData from "./cardData";

const Experience = ({ eisExperience }) => {
  const { window } = useContext(DimensionContext);
  return (
    <ScrollView
      nestedScrollEnabled={true}
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      {eisExperience?.map((ex, i) => (
        <CardComponent key={`${ex.lastDesignation} + ${i}`}>
          <View
            style={{
              borderBottomColor: "grey",
              borderBottomWidth: 1,
              width: "100%",
              fontWeight: "bold",
            }}
          >
            <Text style={{ fontSize: 15, color: "#9B2B2C", paddingTop: 1 }}>
              Designation
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: "#9B2B2C",
                paddingTop: 1,
                marginBottom: 10,
              }}
            >
              {ex.lastDesignation}
            </Text>
          </View>
          <View style={styles.cardData}>
            <View style={{ width: window.width < 600 ? "50%" : "30%" }}>
              <CardData
                label={"Organisation"}
                data={ex.organisation}
                style={styles.dataContainer}
              />
            </View>

            <View style={{ width: window.width < 600 ? "50%" : "30%" }}>
              <CardData
                label={"Last Designation"}
                data={ex.lastDesignation}
                style={styles.dataContainer}
              />
            </View>
            <View style={{ width: window.width < 600 ? "50%" : "30%" }}>
              <CardData
                label={"From Date"}
                data={ex.fromDate}
                style={styles.dataContainer}
              />
            </View>
            <View style={{ width: window.width < 600 ? "50%" : "30%" }}>
              <CardData
                label={"To Date"}
                data={ex.toDate}
                style={styles.dataContainer}
              />
            </View>
            <View style={{ width: window.width < 600 ? "50%" : "30%" }}>
              <CardData
                label={"Gross Amount"}
                data={ex.grossAmt}
                style={styles.dataContainer}
              />
            </View>

            <View style={{ width: window.width < 600 ? "50%" : "30%" }}>
              <CardData
                label={"Department"}
                data={ex.department}
                style={styles.dataContainer}
              />
            </View>

            <View style={{ width: window.width < 600 ? "50%" : "30%" }}>
              <CardData
                label={"Work Location"}
                data={ex.workLocation}
                style={styles.dataContainer}
              />
            </View>
          </View>
        </CardComponent>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: "#9B2B2C",
    paddingBottom: 10,
    fontWeight: "bold",
  },
  cardData: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  dataContainer: {
    flex: 1,
  },
});
export default Experience;

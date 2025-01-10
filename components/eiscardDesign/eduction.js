//import liraries
import React, { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import CardComponent from "../cardComponent/cardComponent";
import { DimensionContext } from "../dimensionContext";
import CardData from "./cardData";

const Education = ({ eisEducational }) => {
  const { window } = useContext(DimensionContext);
  return (
    <ScrollView
      nestedScrollEnabled={true}
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      {eisEducational.map((m, i) => (
        <CardComponent key={`${m.degreeName} + ${i}`}>
          <View
            style={{
              borderBottomColor: "grey",
              borderBottomWidth: 1,
              width: "100%",
              fontWeight: "bold",
            }}
          >
            <Text style={{ fontSize: 15, color: "#9B2B2C", paddingTop: 1 }}>
              Degree Name
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: "#9B2B2C",
                paddingTop: 1,
                marginBottom: 10,
              }}
            >
              {m.degreeName}
            </Text>
          </View>
          <View style={styles.cardData}>
            <View style={{ width: window.width < 600 ? "50%" : "30%" }}>
              <CardData
                label={"Qualification"}
                data={m.qualification}
                style={[styles.dataContainer]}
              />
            </View>
            <View style={{ width: window.width < 600 ? "50%" : "30%" }}>
              <CardData
                label={"Degree"}
                data={m.degreeName}
                style={[styles.dataContainer]}
              />
            </View>

            <View style={{ width: window.width < 600 ? "50%" : "30%" }}>
              <CardData
                label={"Institute"}
                data={m.institute}
                style={[styles.dataContainer]}
              />
            </View>

            <View style={{ width: window.width < 600 ? "50%" : "30%" }}>
              <CardData
                label={"Passing Year"}
                data={m.passYear}
                style={[styles.dataContainer]}
              />
            </View>
            <View style={{ width: window.width < 600 ? "50%" : "30%" }}>
              <CardData
                label={"Class"}
                data={m.clazz}
                style={[styles.dataContainer]}
              />
            </View>
            <View style={{ width: window.width < 600 ? "50%" : "30%" }}>
              <CardData
                label={"Percentage"}
                data={m.perc}
                style={[styles.dataContainer]}
              />
            </View>
            <View style={{ width: window.width < 600 ? "50%" : "30%" }}>
              <CardData
                label={"University"}
                data={m.university}
                style={[styles.dataContainer]}
              />
            </View>
            <View style={{ width: window.width < 600 ? "50%" : "30%" }}>
              <CardData
                label={"Qualification Status"}
                data={m.qualStatus}
                style={[styles.dataContainer]}
              />
            </View>
            <View style={{ width: window.width < 600 ? "50%" : "30%" }}>
              <CardData
                label={"Completion Date"}
                data={m.expCompDate}
                style={[styles.dataContainer]}
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
    height: "100%",
    width: "100%",
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
    flexWrap: "wrap",
  },
  dataContainer: {
    flex: 1,
  },
  Header: {},
});

export default Education;

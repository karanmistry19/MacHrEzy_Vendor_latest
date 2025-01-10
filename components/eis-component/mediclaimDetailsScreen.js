import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import CardComponent from "../cardComponent/cardComponent";
import CardData from "../eiscardDesign/cardData";
import ReportingItemComp from "./ReportingItemComp";

const MediclaimDetailScreen = ({ route }) => {
  var m = route.params?.data;
  return (
    <ScrollView nestedScrollEnabled={true} style={{ flex: 1 }}>
      <View style={{ margin: 15 }}>
        <ReportingItemComp
          closeer={true}
          nameStyle={{ color: "#9d292a", fontSize: 20 }}
          subDetails={m ? m?.relation?.trim() : ""}
          name={m ? m?.memberName?.trim() : ""}
        ></ReportingItemComp>
      </View>
      <CardComponent>
        <View style={styles.cardData}>
          <CardData
            label={"Gender"}
            data={m.gender === "M" ? "Male" : m.gender === "F" ? "Female" : "-"}
            style={styles.dataContainer}
          />
          <CardData
            label={"Date Of Birth"}
            data={m.dateBirth}
            style={styles.dataContainer}
          />
        </View>
        <View style={styles.cardData}>
          <CardData
            label={"Relation"}
            data={m.relation}
            style={styles.dataContainer}
          />
          <CardData
            label={"Mediclaim Status"}
            data={m.mediclaimStatus}
            style={styles.dataContainer}
          />
        </View>
      </CardComponent>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardData: {
    flex: 1,
    flexDirection: "row",
  },
  dataContainer: {
    flex: 1,
  },
});

export default MediclaimDetailScreen;

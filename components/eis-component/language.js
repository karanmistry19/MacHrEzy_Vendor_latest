import React from "react";
import { StyleSheet, View } from "react-native";
import CardComponent from "../cardComponent/cardComponent";
import CardData from "../eiscardDesign/cardData";

const languageInfo = [
  {
    language: "ENGLISH",
    read: "Y",
    write: "Y",
    speak: "Y",
  },
  {
    language: "Hindi",
    read: "Y",
    write: "Y",
    speak: "Y",
  },
  {
    language: "Marathi",
    read: "Y",
    write: "Y",
    speak: "Y",
  },
];

const LanguageData = () => {
  return (
    <View style={styles.container}>
      {languageInfo.map((l) => {
        return (
          <CardComponent>
            <View style={styles.cardData}>
              <CardData
                label={"Language"}
                data={l.language}
                style={styles.dataContainer}
              />
              <CardData
                label={"Read"}
                data={l.read}
                style={styles.dataContainer}
              />
            </View>
            <View style={styles.cardData}>
              <CardData
                label={"Write"}
                data={l.write}
                style={styles.dataContainer}
              />
              <CardData
                label={"Speak"}
                data={l.speak}
                style={styles.dataContainer}
              />
            </View>
          </CardComponent>
        );
      })}
    </View>
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
export default LanguageData;

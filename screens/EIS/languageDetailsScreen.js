import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import CardComponent from "../../components/cardComponent/cardComponent";
import Icons from "../../components/icons";
import { fetchEISLanguage } from "../../redux/actions/eis.action";

const LanguageScreen = ({ navigation, fetchEISLanguage, eisLanguage }) => {
  useEffect(() => {
    fetchEISLanguage();
  }, []);
  return eisLanguage.length > 0 ? (
    <ScrollView
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={false}
      style={styles.reportingItemContainer}
    >
      {eisLanguage.map((e, i) => {
        return (
          <CardComponent>
            <View style={{ borderBottomWidth: 0.5, borderColor: "grey" }}>
              <Text style={{ fontSize: 17, fontWeight: "bold", margin: 5 }}>
                {e.language}
              </Text>
            </View>
            <View style={styles.deatilsStyle}>
              <Text>Read</Text>
              <Icons
                fill={e.read === "Y" ? "#1CB617" : "#B61E17"}
                name={e.read === "Y" ? "sanctioned" : "rejected"}
              ></Icons>
            </View>
            <View style={styles.deatilsStyle}>
              <Text>Speak</Text>
              <Icons
                fill={e.speak === "Y" ? "#1CB617" : "#B61E17"}
                name={e.speak === "Y" ? "sanctioned" : "rejected"}
              ></Icons>
            </View>
            <View style={styles.deatilsStyle}>
              <Text>Write</Text>
              <Icons
                fill={e.write === "Y" ? "#1CB617" : "#B61E17"}
                name={e.write === "Y" ? "sanctioned" : "rejected"}
              ></Icons>
            </View>
          </CardComponent>
        );
      })}
    </ScrollView>
  ) : (
    <></>
  );
};
const styles = StyleSheet.create({
  reportingItemContainer: {
    flex: 1,
    // shadowColor: "#696969",
    // shadowOpacity: 0.8,
    // elevation: 6,
    // shadowRadius: 5,
    // shadowOffset: { width: 1, height: 1 },
    // borderRadius: 25,
  },
  deatilsStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 7,
  },
});
const mapStateToProps = ({ eisLanguage }) => ({ eisLanguage });
export default connect(mapStateToProps, { fetchEISLanguage })(LanguageScreen);

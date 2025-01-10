import React, { useEffect } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import Education from "../../components/eiscardDesign/eduction";
import { fetchEISEducation } from "../../redux/actions/eis.action";

const educationDetailScreen = ({
  fetchEISEducation,
  eisEducational,

  navigation,
}) => {
  useEffect(() => {
    fetchEISEducation();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Education eisEducational={eisEducational}></Education>
    </View>
  );
};

const mapStateToProps = ({ eisEducational }) => ({
  eisEducational,
});
export default connect(mapStateToProps, {
  fetchEISEducation,
})(educationDetailScreen);

// import React, { useEffect } from "react";
// import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import { connect } from "react-redux";
// import CardComponent from "../../components/cardComponent/cardComponent";
// import ReportingItemComp from "../../components/eis-component/ReportingItemComp";
// import CardData from "../../components/eiscardDesign/cardData";
// import { fetchEISFamily } from "../../redux/actions/eis.action";

// const FamilyScreen = ({ navigation, user, eisFamily, fetchEISFamily }) => {
//   useEffect(() => {
//     fetchEISFamily();
//   }, []);
//   return eisFamily.length > 0 ? (
//     <ScrollView style={styles.reportingItemContainer}>
//       {eisFamily.map((e, i) => {
//         return (
//           <TouchableOpacity
//             onPress={() => {
//               navigation.navigate("familyDetails", { data: e });
//             }}
//           >
//             <ReportingItemComp
//               navigation={navigation}
//               name={e.memberName}
//               subDetails={e.relation}
//             ></ReportingItemComp>
//           </TouchableOpacity>
//         );
//         LanguageData;
//       })}
//     </ScrollView>
//   ) : (
//     <>
//       <Text style={{ margin: 15, fontWeight: "bold", fontSize: 15 }}>
//         No data
//       </Text>
//     </>
//   );
// };
// const styles = StyleSheet.create({
//   reportingItemContainer: {
//     flex: 1,
//     // shadowColor: "#696969",
//     // shadowOpacity: 0.8,
//     // elevation: 6,
//     // shadowRadius: 5,
//     // shadowOffset: { width: 1, height: 1 },
//     margin: 10,
//     // borderRadius: 25,
//   },
// });
// const mapStateToProps = ({ eisFamily, user }) => ({ eisFamily, user });
// export default connect(mapStateToProps, { fetchEISFamily })(FamilyScreen);

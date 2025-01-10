import React, { useEffect } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import Experience from "../../components/eiscardDesign/experience";
import { fetchEISExperience } from "../../redux/actions/eis.action";

const ExperienceDetailScreen = ({
  fetchEISExperience,
  eisExperience,

  navigation,
}) => {
  useEffect(() => {
    fetchEISExperience();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Experience eisExperience={eisExperience}></Experience>
    </View>
  );
};
const mapStateToProps = ({ eisExperience }) => ({
  eisExperience,
});
export default connect(mapStateToProps, {
  fetchEISExperience,
})(ExperienceDetailScreen);

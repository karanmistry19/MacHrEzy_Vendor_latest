import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import EisTabComponent from "../../components/eis-component/eisTabComponet";
import ProfileImage from "../../components/eis-component/ProfileImage";
import config from "../../config/config";


const EisMainScreen = ({ user, navigation }) => {
  const image = {
    url: `${config.baseUrl}api/user/dp?empCode=${user?.empCode}`,
  };
  return (
    <ScrollView
      nestedScrollEnabled={true}
      contentContainerStyle={{ paddingBottom: 30 }}
      style={styles.container}
    >
      <ProfileImage
        name={user.empName.trim()}
        designation={user.designation.trim()}
        empImage={image.url}
      ></ProfileImage>
      <View>
        <EisTabComponent navigation={navigation}></EisTabComponent>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    backgroundColor: "#ffffff",
  },
});

const mapStateToProps = ({ user }) => ({ user });
export default connect(mapStateToProps)(EisMainScreen);

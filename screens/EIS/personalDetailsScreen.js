import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import TabInfo from "../../components/eis-component/tabInfo";
import EmergencyContactDetails from "../../components/eiscardDesign/emergencyContactDetails";
import MedicalDetails from "../../components/eiscardDesign/medicalDetails";
import PermanentContactDetails from "../../components/eiscardDesign/permanentContactDetails";
import PersonalInformation from "../../components/eiscardDesign/personalInformation";
import PresentContactDetails from "../../components/eiscardDesign/presentContactDetails";
import { fetchEISPersonal } from "../../redux/actions/eis.action";

const personalInfo = [
  {
    iconName: "information",
    header: `Personal Information`,
    value: "personal-information",
  },
  {
    iconName: "precontact",
    header: `Present Contact`,
    value: "present-contact",
  },
  {
    iconName: "permanentcontact",
    header: `Permanent Contact`,
    value: "permanent-contact",
  },
  {
    iconName: "emergencycontact",
    header: `Emergency Contact`,
    value: "emergency-contact",
  },
  {
    iconName: "medical",
    header: `Medical Details`,
    value: "medical-detais",
  },
];

const PersonalDetailScreen = ({
  navigation,
  fetchEISPersonal,
  eisPersonal,
}) => {
  const [selectedTab, setSelectedTab] = useState("");
  const onTap = (tabName) => {
    setSelectedTab(tabName);
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchEISPersonal();
      setSelectedTab("personal-information");
      onTap("personal-information");
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <TabInfo
        selectedTab={selectedTab}
        onTap={onTap}
        tabItems={personalInfo}
      ></TabInfo>
      <ScrollView nestedScrollEnabled={true} style={styles.container}>
        {selectedTab === "personal-information" && (
          <PersonalInformation eisPersonal={eisPersonal}></PersonalInformation>
        )}
        {selectedTab === "present-contact" && (
          <PresentContactDetails
            eisPersonal={eisPersonal}
          ></PresentContactDetails>
        )}
        {selectedTab === "permanent-contact" && (
          <PermanentContactDetails
            eisPersonal={eisPersonal}
          ></PermanentContactDetails>
        )}

        {selectedTab === "emergency-contact" && (
          <EmergencyContactDetails
            eisPersonal={eisPersonal}
          ></EmergencyContactDetails>
        )}
        {selectedTab === "medical-detais" && (
          <MedicalDetails eisPersonal={eisPersonal}></MedicalDetails>
        )}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
const mapStateToProps = ({ eisPersonal }) => ({
  eisPersonal,
});
export default connect(mapStateToProps, {
  fetchEISPersonal,
})(PersonalDetailScreen);

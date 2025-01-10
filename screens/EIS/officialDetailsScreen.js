import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import ReportingRelationship from "../../components/eis-component/ReportingRelationship";
import TabInfo from "../../components/eis-component/tabInfo";
import BankDetails from "../../components/eiscardDesign/bankDetails";
import JoiningDetails from "../../components/eiscardDesign/joiningDetails";
import OfficialInformation from "../../components/eiscardDesign/officialInformation";
import OtherDetails from "../../components/eiscardDesign/otherDetails";
import {
  fetchEISOfficial,
  fetchEISOfficialSecond,
  fetchEISPersonal,
} from "../../redux/actions/eis.action";

const officiallInfo = [
  {
    iconName: "office",
    header: `Official Information`,
    value: "official-information",
  },
  {
    iconName: "joiningDetails",
    header: `Joining Details`,
    value: "joining-details",
  },
  {
    iconName: "Reporting",
    header: `Reporting Relationship`,
    value: "reporting-relationship",
  },
  {
    iconName: "BankDetails",
    header: `Bank Details`,
    value: "bank-details",
  },
  {
    iconName: "Others",
    header: `Other Details`,
    value: "other-detais",
  },
];
const OfficialDetailScreen = ({
  navigation,
  onTap,
  fetchEISOfficial,
  fetchEISOfficialSecond,
  eisOfficialSecond,
  eisOfficial,
  fetchEISPersonal,
  eisPersonal,
}) => {
  const [selectedTab, setSelectedTab] = useState("");
  onTap = (tabName) => {
    setSelectedTab(tabName);
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchEISOfficial();
      fetchEISOfficialSecond();
      fetchEISPersonal();
      setSelectedTab("official-information");
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <TabInfo
        selectedTab={selectedTab}
        onTap={onTap}
        tabItems={officiallInfo}
      ></TabInfo>
      <ScrollView nestedScrollEnabled={true} style={styles.container}>
        {selectedTab === "official-information" && (
          <OfficialInformation eisPersonal={eisPersonal}></OfficialInformation>
        )}
        {selectedTab === "joining-details" && (
          <JoiningDetails eisPersonal={eisPersonal}></JoiningDetails>
        )}
        {selectedTab === "reporting-relationship" && (
          <ReportingRelationship
            eisOfficial={eisOfficial}
            eisOfficialSecond={eisOfficialSecond}
          ></ReportingRelationship>
        )}
        {selectedTab === "bank-details" && (
          <BankDetails eisPersonal={eisPersonal}></BankDetails>
        )}
        {selectedTab === "other-detais" && (
          <OtherDetails eisPersonal={eisPersonal}></OtherDetails>
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
const mapStateToProps = ({ eisOfficial, eisOfficialSecond, eisPersonal }) => ({
  eisOfficial,
  eisOfficialSecond,
  eisPersonal,
});
export default connect(mapStateToProps, {
  fetchEISOfficial,
  fetchEISOfficialSecond,
  fetchEISPersonal,
})(OfficialDetailScreen);

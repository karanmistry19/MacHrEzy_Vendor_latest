import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { Tab } from "../../components/tabs/tab";
import { fetchAccountingPeriods } from "../../redux/actions/accountingPeriods.action";
import ItScreen from "./itScreen";
import ReportScreen from "./report-screen";

const CompensationScreen = ({ navigation, user, fetchAccountingPeriods }) => {
  const [selectedTab, setSelectedTab] = useState("Reports");
  useEffect(() => {
    fetchAccountingPeriods();
  }, []);
  return (
    <View style={styles.container}>
      <Tab
        displayContent={["Reports", "IT Declaration"]}
        selectedTab={selectedTab}
        onTabChange={(v) => {
          setSelectedTab(v);
        }}
      ></Tab>
      {selectedTab === "Reports" ? (
        <ReportScreen
          navigation={navigation}
          style={{ marginTop: 20 }}
        ></ReportScreen>
      ) : (
        <ItScreen user={user}></ItScreen>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
});
const mapStateToProps = ({ user }) => ({
  user,
});
export default connect(mapStateToProps, { fetchAccountingPeriods })(
  CompensationScreen
);

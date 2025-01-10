import { useFocusEffect } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { connect } from "react-redux";
import { DimensionContext } from "../../components/dimensionContext";
import Eistab from "../../components/eis-component/eisTab";
import ProfileImage from "../../components/eis-component/ProfileImage";
import ReportingRelationship from "../../components/eis-component/ReportingRelationship";
import TabInfo from "../../components/eis-component/tabInfo";
import BankDetails from "../../components/eiscardDesign/bankDetails";
import EmergencyContactDetails from "../../components/eiscardDesign/emergencyContactDetails";
import JoiningDetails from "../../components/eiscardDesign/joiningDetails";
import MedicalDetails from "../../components/eiscardDesign/medicalDetails";
import OfficialInformation from "../../components/eiscardDesign/officialInformation";
import OtherDetails from "../../components/eiscardDesign/otherDetails";
import PermanentContactDetails from "../../components/eiscardDesign/permanentContactDetails";
import PersonalInformation from "../../components/eiscardDesign/personalInformation";
import PresentContactDetails from "../../components/eiscardDesign/presentContactDetails";
import {
  eisInfo,
  officiallInfo,
  personalInfo,
} from "../../components/eisHeaderData/eisHeaderData";
import config from "../../config/config";
import {
  fetchEISPersonal,
  removeEISData,
} from "../../redux/actions/eis.action";
import AssetsScreen from "./assetsScreen";
import EductionDetailsScreen from "./eductionScreen";
import ExperienceDetailScreen from "./experienceScreen";
import FamilyScreen from "./familyScreen";
import LanguageDetailsScreen from "./languageDetailsScreen";
import MediclaimScreen from "./mediclaimScreen";
import StatutoryScreen from "./statutoryScreen";
import TransferHistoryScreen from "./transferScreen";

const EisWebScreen = ({
  navigation,
  isTab,
  user,
  fetchEISPersonal,
  eisPersonal,
  eisOfficial,
  removeEISData,
  eisOfficialSecond,
}) => {
  const { window } = useContext(DimensionContext);
  useFocusEffect(
    React.useCallback(() => {
      fetchEISPersonal();
      setSelectedTab("personal-information");
      setEisTab("personalInformation");
      setSelectedOfficialTab("official-information");
      return () => {
        setSelectedTab("");
        setEisTab("");
        setSelectedOfficialTab("");
        removeEISData();
      };
    }, [])
  );

  const [selectedTab, setSelectedTab] = useState("");
  const [officialTab, setSelectedOfficialTab] = useState("");
  const [eisTab, setEisTab] = useState("");

  const image = {
    url: `${config.baseUrl}api/user/dp?empCode=${user?.empCode}`,
  };

  const onTap = (tabName) => {
    setSelectedTab(tabName);
  };
  const onTapOfficial = (tabName) => {
    setSelectedOfficialTab(tabName);
  };
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <View style={{ flex: 7 }}>
        <View style={{ flex: 1 }}>
          {eisTab === "personalInformation" ? (
            <TabInfo
              onTap={onTap}
              tabItems={personalInfo}
              selectedTab={selectedTab}
            ></TabInfo>
          ) : eisTab === "officialInformation" ? (
            <TabInfo
              onTap={onTapOfficial}
              tabItems={officiallInfo}
              selectedTab={officialTab}
            ></TabInfo>
          ) : (
            <></>
          )}
          {eisTab === "Family" ? (
            <Text style={styles.headerStyle}>Family Details</Text>
          ) : eisTab === "Mediclaim" ? (
            <Text style={styles.headerStyle}>Mediclaim Details</Text>
          ) : eisTab === "Statutory" ? (
            <Text style={styles.headerStyle}>Statutory Details</Text>
          ) : eisTab === "Language" ? (
            <Text style={styles.headerStyle}>Language Details</Text>
          ) : eisTab === "Educational" ? (
            <Text style={styles.headerStyle}>Educational Details</Text>
          ) : eisTab === "Experience" ? (
            <Text style={styles.headerStyle}>Experience Details</Text>
          ) : eisTab === "Transfer History" ? (
            <Text style={styles.headerStyle}>Transfer History</Text>
          ) : eisTab === "Assets" ? (
            <Text style={styles.headerStyle}>Assets</Text>
          ) : (
            <></>
          )}
          <ScrollView nestedScrollEnabled={true} style={{ flex: 1 }}>
            {eisTab === "personalInformation" ? (
              <View>
                {selectedTab === "personal-information" ? (
                  <PersonalInformation
                    eisPersonal={eisPersonal}
                  ></PersonalInformation>
                ) : selectedTab === "present-contact" ? (
                  <PresentContactDetails
                    eisPersonal={eisPersonal}
                  ></PresentContactDetails>
                ) : selectedTab === "permanent-contact" ? (
                  <PermanentContactDetails
                    eisPersonal={eisPersonal}
                  ></PermanentContactDetails>
                ) : selectedTab === "emergency contact" ? (
                  <EmergencyContactDetails
                    eisPersonal={eisPersonal}
                  ></EmergencyContactDetails>
                ) : selectedTab === "medical details" ? (
                  <MedicalDetails eisPersonal={eisPersonal}></MedicalDetails>
                ) : (
                  <></>
                )}
              </View>
            ) : eisTab === "officialInformation" ? (
              <View>
                {officialTab === "official-information" && (
                  <OfficialInformation
                    eisPersonal={eisPersonal}
                  ></OfficialInformation>
                )}
                {officialTab === "joining-details" && (
                  <JoiningDetails eisPersonal={eisPersonal}></JoiningDetails>
                )}
                {officialTab === "reporting-relationship" && (
                  <ReportingRelationship
                    eisOfficial={eisOfficial}
                    eisOfficialSecond={eisOfficialSecond}
                  ></ReportingRelationship>
                )}
                {officialTab === "bank-details" && (
                  <BankDetails eisPersonal={eisPersonal}></BankDetails>
                )}
                {officialTab === "other-detais" && (
                  <OtherDetails eisPersonal={eisPersonal}></OtherDetails>
                )}
              </View>
            ) : eisTab === "Family" ? (
              <FamilyScreen></FamilyScreen>
            ) : eisTab === "Mediclaim" ? (
              <MediclaimScreen></MediclaimScreen>
            ) : eisTab === "Statutory" ? (
              <StatutoryScreen></StatutoryScreen>
            ) : eisTab === "Language" ? (
              <LanguageDetailsScreen></LanguageDetailsScreen>
            ) : eisTab === "Educational" ? (
              <EductionDetailsScreen></EductionDetailsScreen>
            ) : eisTab === "Experience" ? (
              <ExperienceDetailScreen></ExperienceDetailScreen>
            ) : eisTab === "Transfer History" ? (
              <TransferHistoryScreen></TransferHistoryScreen>
            ) : eisTab === "Assets" ? (
              <AssetsScreen></AssetsScreen>
            ) : (
              <></>
            )}
          </ScrollView>
        </View>
      </View>
      <View style={styles.imageStyle}>
        <View
          style={{
            justifyContent: "center",
            marginTop: 25,
          }}
        >
          <ProfileImage
            name={user.empName.trim()}
            designation={user.designation.trim()}
            empImage={image.url}
          ></ProfileImage>
        </View>
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignSelf: "center",
              justifyContent: "center",
            }}
          >
            {eisInfo.map((e, i) => (
              <TouchableOpacity
                onPress={() => setEisTab(e.navigationTo)}
                style={
                  {
                    // marginLeft: window.width < 600 ? null : window.width / 50,
                  }
                }
              >
                <Eistab
                  key={e.navigationTo + "" + i}
                  backgroundColor={e.backgroundColor}
                  iconName={e.iconName}
                  header={e.header}
                  isTab={isTab}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#696969",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 1 },
    margin: 10,
    flexDirection: "row",
    // flexWrap: "wrap",
    justifyContent: "space-around",
  },
  circleView: {
    flexDirection: "row",
  },
  selectBorder: {
    borderWidth: 1,
    borderColor: "red",
  },
  unselectBorder: {
    borderWidth: 1,
    borderColor: "#fff",
  },
  imageStyle: {
    flex: 3,
    marginBottom: 15,
    flexDirection: "column",
    margin: 10,
    marginRight: 20,
    shadowColor: "#696969",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 1 },
    borderRadius: 5,
  },
  headerStyle: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    marginLeft: 10,
  },
});
const mapStateToProps = ({
  user,
  eisPersonal,
  eisOfficial,
  eisOfficialSecond,
}) => ({
  user,
  eisPersonal,
  eisOfficial,
  eisOfficialSecond,
});
export default connect(mapStateToProps, { fetchEISPersonal, removeEISData })(
  EisWebScreen
);

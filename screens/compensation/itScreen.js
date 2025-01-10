import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Compensation from "../../components/compensationComponent/compensation";
import ModalContainer from "../../components/modalContainer/modal";
import config from "../../config/config";

const ItScreen = ({ onPress, onRequestCloseModal, user }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const dimension = useWindowDimensions();

  const close = () => {
    setModalVisible(!modalVisible);
  };

  const downloadDocument = async (type) => {
    if (Platform.OS != "web") {
      await WebBrowser.openBrowserAsync(
        `${config.baseUrl}api/compensation/download/document?type=${type}`
      );
    } else {
      window
        .open(
          `${config.baseUrl}api/compensation/download/document?type=${type}`,
          "_blank"
        )
        .focus();
    }
  };

  return (
    <ScrollView nestedScrollEnabled={true} style={styles.container}>
      <View>
        <Text style={styles.text}>Tap on regime to view details</Text>
        <View style={styles.cardContainer}>
          <Compensation
            name={"New Tax Regime"}
            level={"New"}
            amountView={false}
            onPress={() => setModalVisible(true)}
          ></Compensation>
          <Compensation
            name={"Old Tax Regime"}
            level={"Old"}
            lineStyle={false}
            amountView={false}
            onPress={() =>
              navigation.navigate("itDeclaration", { screen: "it" })
            }
          ></Compensation>
        </View>

        <ModalContainer
          onRequestCloseModal={() => setModalVisible(false)}
          showModal={modalVisible}
          onClose={close}
          modalViewStyle={{
            width: dimension.width > 550 ? 400 : dimension.width - 20,
            height: 200,
          }}
          title="New Tax Regime"
          modalContentStyle={{
            flex: 1,
            minHeight: 200,
            maxHeight: 200,
            width: "100%",
            borderBottomRightRadius: 7,
            borderBottomLeftRadius: 7,
          }}
          modalContent={
            <View
              style={{
                // flex: 1,
                width: dimension.width > 550 ? 380 : dimension.width - 60,
                borderRadius: 10,
                padding: 5,
                alignItems: "center",
                justifyContent: "center",
                height: 150,
                margin: 10,
              }}
            >
              <View
                style={[
                  styles.textAreaContainer,
                  {
                    width: dimension.width > 550 ? 380 : dimension.width - 90,
                    flex: 1,
                  },
                ]}
              >
                <Text
                  style={styles.textArea}
                  underlineColorAndroid="transparent"
                >
                  For more details on New tax Regime kindly contact Mr.Abhilash
                  Joshi Accounts Department
                </Text>
              </View>
            </View>
          }
        ></ModalContainer>
      </View>
      <View style={{ marginTop: 15 }}>
        <Text style={styles.download}>Downloads</Text>
        <Text style={styles.text}>Tap on document to download</Text>
        <View style={styles.cardContainer}>
          <Compensation
            name={"Investment Guideline"}
            amountView={false}
            onPress={() => downloadDocument("INVST_GUIDELINES")}
          ></Compensation>
          <Compensation
            name={"Reimb Guideline"}
            amountView={false}
            onPress={() => downloadDocument("Reimb_Guidelines")}
          ></Compensation>
          <Compensation
            name={"Form 12BB"}
            amountView={false}
            onPress={() => downloadDocument("FORM_12BB")}
          ></Compensation>
          <Compensation
            name={"Old and New Tax Regime"}
            amountView={false}
            lineStyle={user.petrolAllow != "N"}
            onPress={() => downloadDocument("OldNewTaxRegime")}
          ></Compensation>
          {user.petrolAllow != "N" ? (
            <Compensation
              name={"Petrol Declaration"}
              lineStyle={false}
              amountView={false}
              onPress={() => downloadDocument("PetrolDeclaration")}
            ></Compensation>
          ) : (
            <></>
          )}
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    // margin: 5,
  },
  download: {
    fontSize: 14,
    color: "#9B2B2C",
    fontWeight: "bold",
    marginHorizontal: 4,
  },
  text: {
    fontSize: 10,
    margin: 5,
  },
  cardContainer: {
    backgroundColor: "white",
    shadowColor: "#696969",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 1 },
    borderRadius: 15,
    marginHorizontal: 2,
  },
  textAreaContainer: {
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    height: 50,
    borderRadius: 10,
    // justifyContent: "flex-start",
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start",
    flex: 1,
    padding: 8,
    textAlignVertical: "top",
    color: "#9B2B2C",
  },
});
export default ItScreen;

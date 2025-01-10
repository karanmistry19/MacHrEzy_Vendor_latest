import React, { useContext, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "../buttons/button";
import { DimensionContext } from "../dimensionContext";
import { ModularCard } from "../modularCard";
import TopCameraSwitch from "../TopSwitch/TopCameraSwitch";

const CameraOpenCard = () => {
  const { window } = useContext(DimensionContext);
  const [selectedTab, setSelectedTab] = useState("Pending");
  return (
    <ScrollView>
      <ModularCard
        style={{
          // height:
          //   window.height -
          //   (Platform.OS === "web" ? 150 : 140 + StatusBar.currentHeight),
          flex: 1,
          width: window.width,

          marginTop: 10,
        }}
        cardContent={
          <View>
            <View
              style={{
                borderBottomColor: "#EBEFF2",
                borderBottomWidth: 1,
                paddingBottom: 15,
                marginBottom: 15,
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TopCameraSwitch
                  width={300}
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                  title={"New Upload"}
                  title2={"Recent"}
                />
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#EBEFF2",
                  marginLeft: "auto",
                  width: 36,
                  height: 36,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 1000,
                }}
              >
                <Icon name="sliders" size={20} />
              </View>
            </View>
            <View style={{ backgroundColor: "#F7F9FB", padding: 20 }}>
              <View
                style={{
                  borderWidth: 2,
                  borderColor: "#888888",
                  // height: "100%",
                  borderStyle: "dashed",
                  // Optional: Set padding to create some space around the border
                  padding: 80,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon name="camera" size={50} color={"#9F232B"} />
                <Text
                  style={{
                    marginTop: 10,
                    color: "#888888",
                    fontSize: window.width > 600 ? 16 : 8,
                    fontFamily: "Roboto",
                  }}
                >
                  Click here to open your camera
                </Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                margin: 10,
              }}
            >
              <Button
                style={{ width: 300, fontFamily: "Roboto" }}
                title={"Capture and Share my location"}
              ></Button>
            </View>
          </View>
        }
      />
    </ScrollView>
  );
};

export default CameraOpenCard;

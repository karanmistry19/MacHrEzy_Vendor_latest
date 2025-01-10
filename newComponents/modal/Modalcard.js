import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
// import { ScrollView } from 'react-native-gesture-handler';
import TextContainer from "../PopupCard/TextContainer";
const Modalcard = (heading, content, setCompContent = null, handleCallback) => {
  const size = useWindowDimensions();
  function UpdatecheckBox(i) {
    if (content[i].length > 0) {
      content[i][content[i]?.length - 1].checked =
        !content[i][content[i]?.length - 1].checked;
      setCompContent(() => [...content]);
    }
  }
  const [contentWidth, setContentWidth] = useState(0);
  function find_contentWidth(layout) {
    const { x, y, width, height } = layout;
    setContentWidth(width);
  }
  const [testHeight, setTestHeight] = useState(0);
  function find_Test_dimesions(layout) {
    const { x, y, width, height } = layout;
    setTestHeight(height);
  }

  return (
    <View
      style={{
        backgroundColor: "#FFFFFF", //#FFFFFF
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      {/* <ScrollView style={{
        }}
         showsVerticalScrollIndicator={false}
         nestedScrollEnabled={true}
          contentContainerStyle={{
          alignItems:"flex-start",
          justifyContent:"center",
          backgroundColor:"",
          width:"100%",
          flexDirection:"column",
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        > */}
      <View
        style={{
          width: "90%",
          backgroundColor: "",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 10,
        }}
      >
        <View style={{ width: "100%" }}>
          <View style={[{ width: "100%", backgroundColor: "white" }]}>
            <TextContainer
              center
              fontWeight="bold"
              textcolor="#9F232B"
              color="#E6E6ED"
              text={heading}
            />
          </View>
        </View>
        <View
          style={[
            {
              width: "100%",
              paddingBottom: 10,
              height: 300,
            },
          ]}
        >
          <View style={{ flex: 1 }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
              contentContainerStyle={{
                //backgroundColor:"",
                // justifyContent: "flex-start",
                alignItems: "center",
                width: "100%",
              }}
              // style={{ height: 300 }}
            >
              {content?.map((x, i) => (
                <View key={i} style={{ width: "100%" }}>
                  <TextContainer
                    index={i}
                    UpdatecheckBox={UpdatecheckBox}
                    center
                    color="white"
                    text={x}
                  />
                </View>
              ))}
              {content?.length == 0 && (
                <View
                  style={{
                    backgroundColor: "",
                    width: "100%",
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 50,
                  }}
                >
                  <Text>No Data</Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </View>
      {typeof setCompContent === "function" && (
        <View style={{ width: "90%", backgroundColor: "" }}>
          <View
            style={{
              width: "100%",
              backgroundColor: "",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
            onLayout={(event) => {
              find_contentWidth(event.nativeEvent.layout);
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#9F232B",
                padding: 5,
                marginBottom: 10,
              }}
              onPress={handleCallback}
            >
              <Text
                style={{
                  fontWeight: "600",
                  color: "white",
                  fontSize: contentWidth * 0.03,
                }}
              >
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {/* </ScrollView> */}
    </View>
  );
};

export default Modalcard;

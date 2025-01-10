import React, { useState } from "react";
import { Platform, Text, useWindowDimensions, View } from "react-native";
// import { CheckBox } from "react-native-btr";
// import CheckBox from '@react-native-community/checkbox';
import Checkbox from "expo-checkbox";

const TextContainer = ({
  color = "red",
  text,
  width = "100%",
  center = false,
  applypad = true,
  textcolor,
  fontWeight,
  fontSize,
  UpdatecheckBox,
  index,
}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const dimension = useWindowDimensions();
  function isCenter() {
    if (center) {
      return {
        justifyContent: "center",
        alignItems: "center",
        // flex:1,
        height: Platform.OS == "android" ? 30 : "100%",
      };
    }
  }
  const [contentWidth, setContentWidth] = useState(0);
  function find_contentWidth(layout) {
    const { x, y, width, height } = layout;
    setContentWidth(width);
  }
  return (
    <View
      style={[
        {
          backgroundColor: "white",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          // ...applyPadContainer(),
          width: width,
        },
        // textWidthResponsive(),
      ]}
      onLayout={(event) => {
        find_contentWidth(event.nativeEvent.layout);
      }}
    >
      {text?.map((x, i) => (
        <View
          key={i}
          style={{
            ...isCenter(),
            backgroundColor: color,
            width: Number(width.slice(0, -1)) / text.length + "%",
          }}
        >
          {/*width: width */}
          {Boolean(typeof x !== "object" && typeof x !== "function") && (
            <View
              style={{
                width: "100%",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: textcolor,
                  fontWeight: fontWeight,
                  fontSize: contentWidth * 0.03, //0.032
                  paddingVertical: Platform.OS === "android" ? 0 : 8,
                  textAlign: "center",
                }}
              >
                {x}
              </Text>
            </View>
          )}
          {Boolean(x) && typeof x === "function" && <View>{x(text[1])}</View>}
          {typeof x === "object" && (
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Checkbox
                value={x["checked"]}
                color={"#9F232B"}
                onValueChange={() => UpdatecheckBox(index)}
              />
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

export default TextContainer;

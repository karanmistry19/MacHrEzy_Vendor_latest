import React, { useContext } from "react";
import { Text, View } from "react-native";
import { DimensionContext } from "./dimensionContext";
export default function Tabledata({
  data,
  keys,
  containerStyle,
  textContainerStyle,
  textStyle,
}) {
  const { window } = useContext(DimensionContext);

  return (
    <View
      style={
        containerStyle
          ? containerStyle
          : {
              flexDirection: "column",
              height: 50,
              width:
                keys.length > 6
                  ? window.width / keys.length - 5
                  : window.width > 1500
                  ? window.width / keys.length - 100
                  : window.width / keys.length - 70,
            }
      }
    >
      {data.map((name) => {
        return (
          <View
            style={
              textContainerStyle
                ? textContainerStyle
                : {
                    borderWidth: 1,
                    justifyContent: "center",
                    width:
                      keys.length > 6
                        ? window.width / keys.length - 5
                        : window.width > 1500
                        ? window.width / keys.length - 100
                        : window.width / keys.length - 70,
                    height: 70,
                    borderRightColor: keys.length > 6 ? "#ffffff00" : null,
                  }
            }
          >
            <Text
              style={
                textStyle
                  ? textStyle
                  : {
                      fontSize: window.width * 0.008,
                      alignSelf: "flex-start",
                      fontWeight: "300",
                      padding: 10,
                      marginLeft: 7,
                    }
              }
            >
              {name}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DimensionContext } from "./dimensionContext";

const TextWrapper = ({
  header,
  value,
  title,
  textStyle,
  leaveBalance,
  style,
  containerStyle,
}) => {
  const { window } = useContext(DimensionContext);
  return (
    <View
      style={
        containerStyle
          ? containerStyle
          : [
              styles.container,
              title
                ? { minWidth: window.width - (window.width > 700 ? 180 : 60) }
                : [
                    window.width > 760
                      ? {
                          minWidth: (window.width - 180) / 2,
                          maxWidth: (window.width - 180) / 2,
                          ...style,
                        }
                      : { width: window.width - 80 },
                  ],
            ]
      }
    >
      {header ? (
        <Text
          allowFontScaling={true}
          style={
            leaveBalance
              ? [
                  { fontWeight: "700", flexWrap: "wrap" },
                  title
                    ? {
                        minWidth:
                          window.width - (window.width > 700 ? 180 : 60),
                      }
                    : window.width > 760
                    ? {
                        minWidth: (window.width - 180) / 5,
                        maxWidth: (window.width - 180) / 5,
                      }
                    : {
                        minWidth: (window.width - 100) / 2,
                        maxWidth: (window.width - 100) / 2,
                      },

                  ,
                ]
              : [
                  { fontWeight: "700", alignSelf: "center", flexWrap: "wrap" },
                  title
                    ? {
                        minWidth:
                          window.width - (window.width > 700 ? 180 : 60),
                      }
                    : window.width > 700
                    ? {
                        minWidth: (window.width - 180) / 2,
                        maxWidth: (window.width - 180) / 2,
                      }
                    : { width: window.width - 80 },
                  ,
                ]
          }
        >
          {`${header} : `}
        </Text>
      ) : (
        <></>
      )}

      <Text
        numberOfLines={1}
        style={[
          { textAlign: "left", alignSelf: "center", flexWrap: "wrap" },
          title
            ? { maxWidth: window.width - (window.width > 700 ? 180 : 100) }
            : window.width > 700
            ? {
                maxWidth: (window.width - 180) / 2,
              }
            : {},
          ,
          textStyle,
        ]}
      >
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 5,
    marginHorizontal: 5,
    flexWrap: "wrap",
  },
});
export default TextWrapper;

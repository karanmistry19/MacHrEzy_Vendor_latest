import React from "react";
import { ScrollView, View } from "react-native";

export const Table = ({
  tableData,
  rowStyle,
  retrivalLogic,
  tableStyle,
  noScroll,
}) => {
  return (
    <View style={[tableStyle]}>
      {noScroll ? (
        <View
          style={{
            flexGrow: 1,
          }}
          nestedScrollEnabled={true}
        >
          {tableData?.map((row, i) => {
            return (
              <View
                key={`row-${row._id ? row._id : i}`}
                style={[
                  {
                    //   flex: 1,
                    flexWrap: "wrap",
                    flexDirection: "row",
                    margin: 5,
                  },
                  rowStyle,
                ]}
              >
                {retrivalLogic({ row, index: i }).map((value, index) => {
                  return (
                    <View
                      key={i + " table " + row.tranId}
                      style={[{ textAlign: "center", flex: 1, zIndex: 9 }]}
                    >
                      {value.component()}
                    </View>
                  );
                })}
              </View>
            );
          })}
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 5 }}
          style={{
            flexGrow: 1,
          }}
          nestedScrollEnabled={true}
        >
          {tableData?.map((row, i) => {
            return (
              <View
                key={`row-${row._id ? row._id : i}`}
                style={[
                  {
                    //   flex: 1,
                    flexWrap: "wrap",
                    flexDirection: "row",
                    margin: 5,
                  },
                  rowStyle,
                ]}
              >
                {retrivalLogic({ row, index: i }).map((value, index) => {
                  return (
                    <View
                      key={i + ""}
                      style={[{ textAlign: "center", flex: 1, zIndex: 9 }]}
                    >
                      {value.component()}
                    </View>
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

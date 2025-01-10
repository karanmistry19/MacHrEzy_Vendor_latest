import React, { useContext, useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { DimensionContext } from "./dimensionContext";

// import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import Icon from "./icons";
import { formatDate, getDate } from "./utils";
const ItemSeprator = () => (
  <View
    style={{
      height: 0.1,
      width: "100%",
      backgroundColor: "rgba(0,0,0,0.5)",
    }}
  />
);

export const CardList = ({ data, macleods, refreshHandler, cardStyle }) => {
  const [refreshing, setRefreshing] = useState(false);

  const { window } = useContext(DimensionContext);

  const onRefresh = () => {
    if (refreshHandler) {
      setRefreshing(true);
      refreshHandler()
        .then((x) => {
          setRefreshing(false);
        })
        .catch((err) => {
          setRefreshing(false);
        });
    }
  };

  return (
    <View style={styles.displayCards}>
      {macleods ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: 30,
          }}
        >
          <Image
            style={{ height: 80, width: 200 }}
            resizeMethod={"scale"}
            resizeMode={"contain"}
            source={require("../assets/logo.png")}
          ></Image>
        </View>
      ) : (
        <></>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={[
          {
            flex: 1,
            minHeight: window.height / 1.5,
            maxHeight: window.height / 1.5,
          },
          cardStyle,
        ]}
      >
        {data?.map((item, index) => (
          <View
            key={index.toString()}
            style={{
              borderWidth: 1,
              borderColor: "#A8A8A8",
              borderRadius: 5,
              marginVertical: 2,
              shadowColor: "#696969",
              shadowOpacity: 0.8,
              // elevation: 1,
              shadowRadius: 5,
              minHeight: 70,
            }}
          >
            <View style={{ flexDirection: "row", padding: 15 }}>
              <View
                style={{
                  height: 45,
                  backgroundColor: "#EBE0D0",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10,
                  borderRadius: 5,
                }}
              >
                <Icon name="exclamation" fill="#3D0610"></Icon>
              </View>
              <View style={styles.boxContent}>
                {/* {item.createdBy && (
                  <Text style={styles.title}>{item.createdBy}</Text>
                )} */}
                <Text style={styles.description}>{item.message}</Text>
                <Text style={{ alignSelf: "flex-end", marginTop: 5 }}>
                  {formatDate(getDate(item._id), "DD/MM/yyyy h:mm a")}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  displayCards: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  boxContent: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: 10,
  },
  description: {
    fontSize: 14,
    color: "#646464",
  },
  title: {
    fontSize: 15,
    color: "rgb(155, 43, 44)",
  },
});

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../buttons/button";
import { ModularCard } from "../modularCard";
import AnalogClock from "./AnalogClock";

const CheckInCard = ({ active, title, time, buttonText, onPress }) => {
  return (
    <ModularCard
      style={{
        flex: 1,
        width: window.width,
        marginTop: 10,
      }}
      cardContent={
        <View>
          <Text
            style={{
              color: "#717370",
              fontFamily: "Roboto",
              fontWeight: "500",
            }}
          >
            {title}
          </Text>
          <View
            style={{ flexDirection: "row", marginTop: 20, marginBottom: 20 }}
          >
            <View style={styles.digitalNumber}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 30,
                  fontWeight: "500",
                  fontFamily: "Roboto",
                  color: "#9F232B",
                }}
              >
                {time.getHours() > 12 ? time.getHours() - 12 : time.getHours()}
              </Text>
            </View>
            <View
              style={{
                height: 60,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 30,
                  fontWeight: "500",
                  fontFamily: "Roboto",
                  margin: 5,
                }}
              >
                :
              </Text>
            </View>
            <View style={styles.digitalNumber}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 30,
                  fontWeight: "500",
                  fontFamily: "Roboto",
                  color: "#9F232B",
                }}
              >
                {time.getMinutes() < 10
                  ? "0" + time.getMinutes()
                  : time.getMinutes()}
              </Text>
            </View>
            <View style={styles.time}>
              <Text
                style={time.getHours() > 12 ? styles.inactive : styles.active}
              >
                AM
              </Text>
              <Text
                style={time.getHours() > 12 ? styles.active : styles.inactive}
              >
                PM
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <AnalogClock customTime={time} />
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Button
                onPress={onPress}
                style={active ? styles.buttonActive : styles.buttonDeactive}
                textStyle={{
                  fontFamily: "Roboto",
                  fontSize: 14,
                  fontWeight: "500",
                }}
                title={buttonText}
              />
            </View>
          </View>
        </View>
      }
    />
  );
};

export default CheckInCard;

const styles = StyleSheet.create({
  buttonActive: { marginTop: 40, marginBottom: 20 },
  buttonDeactive: {
    backgroundColor: " rgba(159, 35, 43, 0.4)",
    marginTop: 40,
    marginBottom: 20,
  },
  container: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  digitalNumber: {
    height: 60,
    flex: 1,
    backgroundColor: "#F2E7FE",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  time: {
    marginLeft: 5,
    width: 70,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 8,
    overflow: "hidden",
  },
  active: {
    height: 30,
    backgroundColor: "#ECE0FD",
    padding: 5,
    textAlign: "center",
    fontWeight: "500",
    fontFamily: "Roboto",
    color: "#9F232B",
    justifyContent: "center",
    alignItems: "center",
  },
  inactive: {
    height: 30,
    padding: 5,
    textAlign: "center",
    fontWeight: "500",
    fontFamily: "Roboto",
    color: "grey",
    borderTopWidth: 1,
    borderTopColor: "lightgrey",
    justifyContent: "center",
    alignItems: "center",
  },
});

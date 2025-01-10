import React from "react";
import { View } from "react-native";
import EisTabComponent from "../eis/eisTabComponet";
import TabInfo from "../eis/tabInfo";

export default function EisTabDetails() {
  return (
    <View style={{ flex: 1 }}>
      <EisTabComponent />
      <TabInfo />
    </View>
  );
}

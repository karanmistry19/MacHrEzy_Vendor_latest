import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Eistab from "./eisTab";

export default function TabInfo({ onTap, tabItems, selectedTab }) {
  // useEffect(() => {
  //   setSelected(initItem);
  // }, []);
  // const [selected, setSelected] = useState("");
  const onPress = (selectedTab) => {
    // setSelected(selectedTab);
    onTap(selectedTab.value);
  };

  return (
    <View style={styles.itemContainer}>
      {tabItems?.map((p) => (
        <Pressable
          style={{ justifyContent: "center" }}
          onPress={() => onPress(p)}
        >
          <Eistab
            isTab={true}
            value={p}
            selectedTab={selectedTab}
            // personalInfo={true}
            // border={true}
            iconName={p.iconName}
            header={p.header}
          />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#696969",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 1 },
    margin: 10,
    flexDirection: "row",
    // flexWrap: "wrap",
    height: 110,
    justifyContent: "space-around",
  },
  circleView: {
    flexDirection: "row",
  },
  selectBorder: {
    borderWidth: 1,
    borderColor: "red",
  },
  unselectBorder: {
    borderWidth: 1,
    borderColor: "#fff",
  },
});

import * as React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "./icons";

const Checkbox = ({ value, setValue = () => {}, style, disable }) => {
  const [checked, setChecked] = React.useState(value ? value : false);

  React.useEffect(() => {
    setChecked(value ? value : false);
  }, [value]);

  return disable ? (
    <View
      style={[
        styles.checkbox,
        { backgroundColor: checked ? "rgb(155, 43, 44)" : "#FFFFFF" },
        style,
      ]}
    >
      {value ? <Icon name="tick" style={styles.icon}></Icon> : <></>}
    </View>
  ) : (
    <TouchableOpacity
      onPress={() => {
        setChecked(!checked);
        if (setValue) setValue(!checked);
      }}
    >
      <View
        style={[
          styles.checkbox,
          style,
          { backgroundColor: checked ? "rgb(155, 43, 44)" : "#FFFFFF" },
        ]}
      >
        {checked ? <Icon name="tick" style={styles.icon}></Icon> : <></>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    borderRadius: 15,
    borderColor: "#666",
    borderWidth: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    paddingTop: 2,
    width: 30,
    maxWidth: 30,
    minHeight: 30,
    maxHeight: 30,
  },
});

export default Checkbox;

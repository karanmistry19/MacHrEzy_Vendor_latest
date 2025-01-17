import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { connect } from "react-redux";

import { removeToast } from "../redux/actions/toast.action";
import Icon from "./icons";

const Toast = ({ toast, removeToast }) => (
  <View
    style={[
      styles.toast,
      toast.type === "INFO"
        ? styles.info
        : toast.type === "WARN"
        ? styles.warn
        : toast.type === "ERROR"
        ? styles.error
        : styles.unknown,
    ]}
  >
    <TouchableOpacity
      onPress={() => {
        removeToast(toast);
      }}
    >
      <View
        style={{
          flex: 1,
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Icon
          height="25"
          width="45"
          name="macleod"
          fill={
            toast.type === "INFO"
              ? "#37a342"
              : toast.type === "WARN"
              ? "#ffd200"
              : toast.type === "ERROR"
              ? "rgb(155, 43, 44)"
              : "#00000"
          }
        ></Icon>
        <Text style={[{ flex: 1, marginLeft: 5 }, styles.projectBriefText]}>
          {toast.type}
        </Text>
      </View>
      <Text style={styles.data}>
        {typeof toast.message === "object" ? "" : toast.message}
      </Text>
      {/* <Text>{toast.message}</Text> */}
    </TouchableOpacity>
  </View>
);

const Toasts = ({ toasts, removeToast }) =>
  toasts && toasts.length > 0 ? (
    <View style={styles.toastContainer}>
      <FlatList
        data={toasts}
        keyExtractor={(item, index) => "toast-wrapper" + index}
        renderItem={({ item, index }) =>
          item ? (
            <Toast
              key={"toast-" + index}
              toast={item}
              removeToast={removeToast}
            ></Toast>
          ) : (
            <></>
          )
        }
      ></FlatList>
    </View>
  ) : (
    <></>
  );

const mapStateToProps = ({ toasts }) => ({ toasts });
export default connect(mapStateToProps, { removeToast })(Toasts);

const styles = StyleSheet.create({
  toast: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    position: "relative",
    zIndex: 9999,
    padding: 20,
    margin: 10,
    alignItems: "center",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 5,
  },
  info: {
    backgroundColor: "#ffffff",
  },
  warn: {
    backgroundColor: "#ffffff",
  },
  error: {
    backgroundColor: "#ffffff",
    borderColor: "#000",
    borderWidth: 1,
    borderStyle: "solid",
    color: "#fff",
  },
  unknown: {
    backgroundColor: "#ffffff",
  },
  toastContainer: {
    position: "absolute",
    alignSelf: "center",
    // right: 0,
    top: 30,
    margin: 10,
    width: "100%",
    maxWidth: 300,
    flex: 1,
    flexDirection: "column-reverse",
    zIndex: 10000,
    elevation: 10000,
  },
});

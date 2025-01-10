import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Icon from "../../components/icons";
import ModalContainer from "../../components/modalContainer/modal";
import { formatDateNew } from "../../components/utils";
const DatePunchModal = ({ showModal, onCloseModal, attendanceDateSummary }) => {
  const [timing, setTiming] = useState({
    inTime: null,
    outTime: null,
    totalTime: null,
  });
  const renderItemMultiplePunch = ({ item, index }) => {
    return item ? (
      <TouchableWithoutFeedback>
        <View>
          {index > 0 ? (
            <View
              style={{
                borderBottomColor: "#707070",
                borderBottomWidth: 1,
                marginVertical: 10,
              }}
            ></View>
          ) : (
            <></>
          )}
          {/* <View style={styles.item}> */}
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                marginHorizontal: 10,
                height: 60,
                minWidth: 60,
                maxWidth: 60,
                borderColor: "#9B2B2C",
                backgroundColor: "#EAEAEA",
                borderRadius: 29,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 2,
              }}
            >
              <Text>{item.totalHours?.toString()?.split(".")[0]} hrs</Text>
              <Text>{item.totalHours?.toString()?.split(".")[1]} min</Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", marginBottom: 2 }}>
                <Icon name="location"></Icon>
                <Text style={{ marginLeft: 5 }}>{item?.location}</Text>
              </View>
              <View style={{ flexDirection: "row", marginBottom: 2 }}>
                <Icon name="down_arrow"></Icon>
                <Text style={{ marginLeft: 5 }}>{item?.inDateTime}</Text>
              </View>
              <View style={{ flexDirection: "row", marginBottom: 2 }}>
                <Icon name="up_arrow"></Icon>
                <Text style={{ marginLeft: 5 }}>{item?.outDateTime}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    ) : (
      <></>
    );
  };

  const renderItemForCanteen = ({ item, index }) => {
    // let date = formatDateNew(item[0], "YYYY-MM-DD", "DD MMM");

    return (
      <TouchableWithoutFeedback>
        <View>
          {index > 0 ? (
            <View
              style={{
                borderBottomColor: "#707070",
                borderBottomWidth: 1,
                marginVertical: 10,
              }}
            ></View>
          ) : (
            <></>
          )}
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                marginHorizontal: 10,
                height: 60,
                minWidth: 60,
                maxWidth: 60,
                borderColor: "#9B2B2C",
                backgroundColor: "#EAEAEA",
                borderRadius: 29,
                alignItems: "center",
                borderWidth: 2,
                justifyContent: "center",
              }}
            >
              <Icon width={30} height={30} name="spoon"></Icon>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ marginLeft: 5 }}>{item?.mealType}</Text>
              <Text style={{ marginLeft: 5 }}>{item?.punchTime}</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  useEffect(() => {
    if (
      attendanceDateSummary &&
      attendanceDateSummary.length > 0 &&
      attendanceDateSummary[0].length > 0
    ) {
      setTiming({
        inTime: formatDateNew(
          attendanceDateSummary[0][0].inDateTime,
          "DD/MM/YYYY HH:mm:ss",
          "HH:mm"
        ),
        outTime: formatDateNew(
          attendanceDateSummary[0][attendanceDateSummary[0].length - 1]
            .outDateTime,
          "DD/MM/YYYY HH:mm:ss",
          "HH:mm"
        ),
        totalTime: attendanceDateSummary[1][0].sum,
      });
    }
  }, [attendanceDateSummary]);

  return (
    <ModalContainer
      maxWidth={350}
      showModal={showModal}
      modalStyle={{
        minWidth: 350,
        maxWidth: 350,
        height: window.height * 0.4,
      }}
      modalContentStyle={{
        width: "100%",
        minHeight: 450,
        maxHeight: 450,
      }}
      title={`Summary`}
      onClose={onCloseModal}
      modalContent={
        attendanceDateSummary &&
        attendanceDateSummary.length > 0 &&
        attendanceDateSummary[0].length > 0 ? (
          <View
            style={
              ([styles.modalView],
              {
                backgroundColor: "#EAEAEA",
                paddingHorizontal: 10,
                top: 20,
              })
            }
          >
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.datePunchTitle}>
                  {attendanceDateSummary[0]
                    ? formatDateNew(
                        attendanceDateSummary[0][0].eventDate.trim(),
                        "DD/MM/YYYY",
                        "DD MMM YYYY"
                      )
                    : ""}
                </Text>
              </View>
              <Text style={[styles.datePunchTitle, { color: "#9A9A9A" }]}>
                {attendanceDateSummary[4]
                  ? attendanceDateSummary[4][0].shiftName
                  : ""}
              </Text>
              {timing && timing.inTime ? (
                <Text style={[styles.datePunchTitle, { color: "#9A9A9A" }]}>
                  {`I-${timing.inTime} : O-${timing.outTime || ""} ${
                    timing.outTime ? "(" + timing.totalTime + ")" : ""
                  }`}
                </Text>
              ) : (
                <></>
              )}
            </View>
            {attendanceDateSummary[0] && attendanceDateSummary[0].length > 0 ? (
              <View
                style={{
                  marginVertical: 10,
                  backgroundColor: "#FFF",
                  borderRadius: 5,
                  shadowColor: "#696969",
                  shadowOpacity: 0.8,
                  elevation: 6,
                  shadowRadius: 5,
                  shadowOffset: { width: 1, height: 1 },
                }}
                onStartShouldSetResponder={() => true}
              >
                <Text style={styles.datePunchTitle}>Multiple Punches</Text>
                <FlatList
                  style={{ marginTop: 10 }}
                  keyExtractor={(item, i) =>
                    item.empCode + " - attendance - " + i
                  }
                  contentContainerStyle={{
                    paddingBottom: 15,
                  }}
                  data={attendanceDateSummary[0]}
                  renderItem={renderItemMultiplePunch}
                />
              </View>
            ) : (
              <></>
            )}
            {attendanceDateSummary[5] && attendanceDateSummary[5].length > 0 ? (
              <View
                style={{
                  marginVertical: 7,
                  backgroundColor: "#FFF",
                  borderRadius: 5,
                }}
                onStartShouldSetResponder={() => true}
              >
                <Text style={styles.datePunchTitle}>Canteen Punches</Text>
                <FlatList
                  keyExtractor={(item, i) => item.empCode + " - canteen - " + i}
                  contentContainerStyle={{
                    paddingBottom: 15,
                  }}
                  data={attendanceDateSummary[5]}
                  renderItem={renderItemForCanteen}
                />
              </View>
            ) : (
              <></>
            )}
          </View>
        ) : (
          <Image
            source={require("../../assets/sorry.png")}
            style={{
              height: 200,
              width: 300,
              alignSelf: "center",
            }}
          ></Image>
        )
      }
      onRequestCloseModal={onCloseModal}
    ></ModalContainer>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
  },
  modalView: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.77,
    shadowOffset: { width: 3, height: 2 },
    shadowRadius: 10,
    elevation: 20,
    zIndex: 999,
  },
  item: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "center",
  },
  date: {
    alignItems: "center",
    marginRight: 10,
    marginTop: 2,
  },
  dateText: {
    fontSize: 14,
    lineHeight: 15,
    fontWeight: "bold",
  },
  title: {
    width: "100%",
    flex: 1,
  },
  datePunchTitle: {
    color: "#9B2B2C",
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 15,
    marginVertical: 5,
  },
});
export default DatePunchModal;

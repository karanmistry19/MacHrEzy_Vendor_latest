import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Icon from "../../components/icons";
import RangeComponent from "../../components/range-component/rangeComponent";
import { formatDateNew } from "../../components/utils";
const CalendarModal = ({
  showModal,
  onCloseModal,
  data,
  selectedDate,
  index,
  selectedEmployee,
  fetchSelectedDateSummary,
  attendanceDateSummary,
  removeDateSummaryData,
}) => {
  // console.log(
  //   data.map((x) => formatDateNew(x[0], "YYYY-MM-DD", "DD MMM YYYY"))
  // );
  const [datePunch, setDatePunch] = useState(false);
  const [timing, setTiming] = useState({
    inTime: null,
    outTime: null,
    totalTime: null,
  });
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

  useFocusEffect(
    React.useCallback(() => {
      setDatePunch(false);
      return () => {
        setDatePunch(false);
      };
    }, [])
  );
  const renderItem = ({ item }) => {
    let date = formatDateNew(item[0], "YYYY-MM-DD", "DD MMM");

    return (
      <TouchableWithoutFeedback onPress={() => {}}>
        <View style={styles.item}>
          <View style={styles.date}>
            <Text style={styles.dateText}>{date.split(" ")[0]}</Text>
            <Text style={styles.dateText}>{date.split(" ")[1]}</Text>
          </View>
          <View style={{ flex: 1 }}>
            {item[1].map((e, i) => {
              let inTime;
              let outTime;
              let totalMinute;
              if (e?.name.trim().startsWith("I")) {
                inTime = e.name;
              } else if (e?.name.trim().startsWith("O")) {
                outTime = e.name;
              } else {
                totalMinute = e.name;
              }
              return (
                <View
                  key={item[1].eventDate + " " + i + " " + inTime}
                  style={{
                    backgroundColor: e.backgroundColor,
                    borderRadius: 4,
                    marginVertical: 2,
                    padding: 5,
                  }}
                >
                  {e?.totalMinutes ? (
                    <TouchableOpacity
                      onPress={() => {
                        setDatePunch(true);
                        fetchSelectedDateSummary({
                          empCode: selectedEmployee.empCode,
                          eventDate: item[0],
                          toDate: item[0],
                        });
                      }}
                    >
                      <Text style={{ color: e.fontColor, fontWeight: "bold" }}>
                        Working Hour: {e.totalMinutes}
                      </Text>
                      <RangeComponent
                        startTimeSuffix=""
                        endTimeSuffix=""
                        highlightColor={e.fontColor}
                        backgroundColor="#A9A9A9"
                        startTimeTextColor={e.fontColor}
                        endTimeTextColor={e.fontColor}
                        pointerColor={e.fontColor}
                        startTime={e.inTime}
                        endTime={e.outTime}
                        start={parseInt(e.inTime) / 24}
                        end={parseInt(e.outTime) / 24}
                      ></RangeComponent>
                      {e?.outTime1 ? (
                        <RangeComponent
                          startTimeSuffix=""
                          endTimeSuffix=""
                          highlightColor={e.fontColor}
                          backgroundColor="#A9A9A9"
                          startTimeTextColor={e.fontColor}
                          endTimeTextColor={e.fontColor}
                          pointerColor={e.fontColor}
                          startTime={e.inTime1}
                          endTime={e.outTime1}
                          start={0}
                          end={parseInt(e.outTime1) / 24}
                        ></RangeComponent>
                      ) : (
                        <></>
                      )}
                    </TouchableOpacity>
                  ) : (
                    <Text
                      key={i}
                      style={[styles.title, { color: e.fontColor }]}
                    >
                      {e.name === "A" ? "Absent" : e.name}
                    </Text>
                  )}
                  {/* <Text key={i} style={[styles.title, { color: e.fontColor }]}>
                    {e.name}
                  </Text> */}
                </View>
              );
            })}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  let myList = useRef();
  // const [index, setIndex] = useState(0);

  const renderItemMultiplePunch = ({ item, index }) => {
    return item ? (
      <TouchableWithoutFeedback>
        <View>
          {index > 0 ? (
            <View
              style={{
                borderBottomColor: "#707070",
                borderBottomWidth: 1,
                marginBottom: 10,
              }}
            ></View>
          ) : (
            <></>
          )}
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
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
              <Text>{item?.totalHours?.toString()?.split(".")[0]} hrs</Text>
              <Text>{item?.totalHours?.toString()?.split(".")[1]} min</Text>
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
                marginBottom: 10,
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
    if (index < data.length) {
      setTimeout(() => {
        myList?.current?.scrollToIndex({
          animated: true,
          index: index < 0 ? 0 : index,
          viewPosition: 0,
        });
      }, 2000);
    }
  }, [index]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      presentationStyle="overFullScreen"
      animationIn="slideInUp"
      visible={showModal}
      onRequestClose={() => {}}
      ariaHideApp={false}
      propagateSwipe={true}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          onCloseModal();
          setDatePunch(false);
          removeDateSummaryData();
        }}
        style={{ zIndex: 1 }}
      >
        {datePunch ? (
          <View style={styles.centeredView}>
            <View
              style={
                ([styles.modalView],
                {
                  backgroundColor: "#EAEAEA",
                  paddingHorizontal: 10,
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
                  <TouchableOpacity
                    onPress={() => {
                      setDatePunch(false);
                      removeDateSummaryData();
                    }}
                    style={{ marginTop: 5 }}
                  >
                    <Icon fill="#000" name={"cross"}></Icon>
                  </TouchableOpacity>
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
              {attendanceDateSummary[0] &&
              attendanceDateSummary[0].length > 0 ? (
                <View
                  style={{
                    marginVertical: 10,
                    backgroundColor: "#FFF",
                    borderRadius: 5,
                  }}
                  onStartShouldSetResponder={() => true}
                >
                  <Text style={styles.datePunchTitle}>Multiple Punches</Text>
                  <FlatList
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
              {attendanceDateSummary[5] &&
              attendanceDateSummary[5].length > 0 ? (
                <View
                  style={{
                    marginVertical: 10,
                    backgroundColor: "#FFF",
                    borderRadius: 5,
                  }}
                  onStartShouldSetResponder={() => true}
                >
                  <Text style={styles.datePunchTitle}>Canteen Punches</Text>
                  <FlatList
                    keyExtractor={(item, i) =>
                      item.empCode + " - canteen - " + i
                    }
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
          </View>
        ) : (
          <View style={styles.centeredView}>
            <View
              style={styles.modalView}
              onStartShouldSetResponder={() => true}
            >
              <FlatList
                keyExtractor={(item, i) => item[1].eventDate + " " + i}
                contentContainerStyle={{
                  paddingBottom: 15,
                }}
                ref={myList}
                initialScrollIndex={index}
                data={data}
                renderItem={renderItem}
                onScrollToIndexFailed={(info) => {
                  const wait = new Promise((resolve) =>
                    setTimeout(resolve, 500)
                  );
                  wait.then(() => {
                    // setTimeout(() => {
                    myList.current?.scrollToIndex({
                      index: index,
                      animated: true,
                      viewPosition: 0,
                    });
                    // }, 2000);
                  });
                }}
              />
            </View>
          </View>
        )}
      </TouchableWithoutFeedback>
      {/* <TouchableOpacity
        onPress={onCloseModal}
        style={{ position: "absolute", marginTop: 390, right: 10 }}
      >
        <Icon fill="#000" name={"cross"}></Icon>
      </TouchableOpacity> */}
    </Modal>
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
    marginTop: 200,
    shadowColor: "black",
    shadowOpacity: 0.77,
    shadowOffset: { width: 3, height: 2 },
    shadowRadius: 10,
    elevation: 20,
    zIndex: 999,
    minHeight: "80%",
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
    marginHorizontal: 5,
    marginVertical: 5,
  },
});
export default CalendarModal;

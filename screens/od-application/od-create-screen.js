import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useReducer, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View
} from "react-native";
import Button from "../../components/buttons/button";
import Checkbox from "../../components/checkbox";
import CardData from "../../components/eiscardDesign/cardData";
import FilterComponent from "../../components/filter/filter";
import Icons from "../../components/icons";
import PopUp from "../../components/popUp/popUp";
import RangeComponent from "../../components/range-component/rangeComponent";
import { formatDate, formatDateNew } from "../../components/utils";
import FilterDataComponent from "../leave/filterDataComponent";

const initTimingData = {
  fromHour: null,
  toHour: null,
  fromMinute: null,
  toMinute: null,
  purpose: "",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_DATA":
      return [
        ...state.map((x, i) =>
          i === action.index ? { ...x, ...action.data } : { ...x }
        ),
      ];
    case "ADD_TIMING":
      return [...state, { ...initTimingData }];
    case "REMOVE_TIMING":
      return [...state.filter((x, i) => i !== action.index)];
    case "INIT":
      return [{ ...initTimingData }];
    case "INIT_DATA":
      return action.data;
    case "NEXT_DAY_SELECTION":
      return [...state.map((x) => ({ ...x, toHour: null, toMinute: null }))];
    case "REMOVE":
      return [];
    default:
      return state;
  }
};

const CreateOD = ({
  route,
  behalfOther,
  onPressCancel,
  selectedTransaction,
  user,
  fetchTabDetailsAttendanceTxn,
  addError,
  selectedAttendanceTransactionTabDetails,
  createOD,
  modalManage,
  selectedDate,
}) => {
  const dimension = useWindowDimensions();
  const hourData = Array.from({ length: 24 }, (_, i) => ({
    name: i < 10 ? "0" + i.toString() : i.toString(),
  }));
  const minuteArray = Array.from({ length: 60 }, (_, i) => ({
    name: i < 10 ? "0" + i.toString() : i.toString(),
  }));

  const [timing, setTiming] = useReducer(reducer, []);
  const addToTiming = () => {
    setTiming({ type: "ADD_TIMING" });
  };

  const removeFromTiming = (index) => {
    setTiming({ type: "REMOVE_TIMING", index: index });
  };
  console.log("modalManage", modalManage);
  const addToTimingData = (index, data) => {
    setTiming({ type: "ADD_DATA", index: index, data: data });
  };
  const initData = {
    employee: null,
    selectedDate: selectedDate ? selectedDate : null,
    nextDay: false,
  };
  const [odDetails, setODDetails] = useState(initData);

  useEffect(() => {
    if (modalManage && !modalManage.visible && modalManage.transaction) {
      onPressCancel();
    }
  }, [modalManage]);

  const validate = () =>
    new Promise((resolve, reject) => {
      if (!odDetails.selectedDate) {
        reject("Please select the event date first!");
      } else if (
        timing.filter(
          (x) => !x.fromHour || !x.fromMinute || !x.toHour || !x.toMinute
        ).length > 0
      ) {
        reject("Please provide valid in & out information");
      } else if (
        timing.filter((x) => !x.purpose || x.purpose === "").length > 0
      ) {
        reject("Purpose cannot be blank!");
      } else {
        resolve(true);
      }
    });
  const save = () => {
    validate()
      .then(() => {
        createOD({
          behalf: behalfOther,
          transactions: timing.map((x) => ({
            tranId: selectedTransaction?.tranId,
            eventDate: formatDate(odDetails.selectedDate, "YYYY-MM-DD"),
            empCode: odDetails.employee.data.empCode,
            fromDate: moment(odDetails.selectedDate)
              .hour(x.fromHour.name)
              .minute(x.fromMinute.name)
              .format("YYYY-MM-DD HH:mm"),
            toDate: moment(odDetails.selectedDate)
              .hour(x.toHour.name)
              .minute(x.toMinute.name)
              .add(odDetails.nextDay ? 1 : 0, "day")
              .format("YYYY-MM-DD HH:mm"),
            remarks: x.purpose,
          })),
        });
      })
      .catch((error) => {
        addError(error, 3000);
        return;
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      setTiming({ type: "INIT" });
      return () => {
        setTiming({ type: "REMOVE" });
      };
    }, [])
  );

  const selectNextDay = () => {
    setTiming({ type: "NEXT_DAY_SELECTION" });
    updateODDetails({ nextDay: !odDetails.nextDay });
  };

  useFocusEffect(
    React.useCallback(() => {
      if (!behalfOther && !selectedTransaction) {
        setODDetails({
          ...odDetails,
          employee: {
            data: {
              empCode: user.empCode,
              empName: user.empName,
              deptName: user.deptName,
            },
          },
        });
      }
      return () => {
        setODDetails(initData);
      };
    }, [user, behalfOther])
  );

  useFocusEffect(
    React.useCallback(() => {
      if (selectedTransaction) {
        setODDetails({
          tranId: selectedTransaction.tranId,
          selectedDate: formatDateNew(
            selectedTransaction.eventDate,
            "DD/MM/YYYY",
            "yyyy-MM-DDThh:mm:ss.sssZ"
          ),
          nextDay:
            moment(selectedTransaction.fromDate).diff(
              selectedTransaction.toDate,
              "day"
            ) === 1,
          employee: {
            data: {
              empCode: selectedTransaction.empCode,
              empName: selectedTransaction.empName,
              deptName: selectedTransaction.deptName,
            },
          },
        });
        setTiming({
          type: "INIT_DATA",
          data: [
            {
              purpose: selectedTransaction.remarks,
              fromHour: {
                name: selectedTransaction.fromDate.split("T")[1].split(":")[0],
              },
              toHour: {
                name: selectedTransaction.toDate.split("T")[1].split(":")[0],
              },
              fromMinute: {
                name: selectedTransaction.fromDate.split("T")[1].split(":")[1],
              },
              toMinute: {
                name: selectedTransaction.toDate.split("T")[1].split(":")[1],
              },
            },
          ],
        });
        fetchTabDetailsAttendanceTxn({
          empCode: selectedTransaction.empCode.trim(),
          eventDate: formatDateNew(
            selectedTransaction.eventDate,
            "DD/MM/YYYY",
            "YYYY-MM-DD"
          ),
        });
      }
    }, [selectedTransaction])
  );

  const fetchAttendanceDetails = (date) => {
    fetchTabDetailsAttendanceTxn({
      empCode: odDetails.employee.data.empCode.trim(),
      eventDate: formatDate(date, "YYYY-MM-DD"),
    });
  };
  const onSelectDate = (date) => {
    if (odDetails.employee?.data?.empCode) {
      updateODDetails({ selectedDate: date });
      fetchAttendanceDetails(date);
    } else {
      addError("Please select a employee then select the date!", 3000);
    }
  };

  const modalInitData = {
    hourSelection: false,
    minuteSelection: false,
    type: "from",
    index: 0,
  };
  const [modalData, setModalData] = useState(modalInitData);
  const onRequestCloseModal = () => {
    setModalData(modalInitData);
  };

  const updateODDetails = (data) => {
    setODDetails({ ...odDetails, ...data });
  };
  const removeSelected = () => {
    updateODDetails({ employee: null });
  };
  return (
    <ScrollView style={styles.container}>
      {behalfOther && !selectedTransaction ? (
        <FilterDataComponent
          data={odDetails.employee ? [odDetails.employee] : null}
          setData={(item) => {
            updateODDetails({ employee: { ...item } });
          }}
          removeData={removeSelected}
          removeAll={removeSelected}
          type={"Calendar"}
          style={{
            alignItems: "center",
            width: dimension.width > 550 ? 400 : dimension.width - 50,
          }}
          iconDisable={true}
          placeholder={"Please select a employee!"}
        ></FilterDataComponent>
      ) : (
        <></>
      )}
      <CardData
        label={"Emp Code"}
        data={odDetails.employee?.data?.empCode}
      ></CardData>
      <CardData
        label={"Employee Name"}
        data={odDetails.employee?.data?.empName}
      ></CardData>
      <CardData
        label={"Department"}
        data={odDetails.employee?.data?.deptName}
      ></CardData>
      <View style={{ height: 70, marginVertical: 2 }}>
        <Text
          style={{
            fontSize: 14,
            color: "#9A9A9A",
            marginVertical: 2,
          }}
        >
          Event Date
        </Text>
        <View style={styles.eventDate}>
          <FilterComponent
            type="date"
            maxDate={moment(new Date()).subtract(1, "day")}
            dateStyle={{ color: "#383336" }}
            onFilterChange={(e) => {
              if (moment(new Date()).diff(moment(e.value), "days") >= 1) {
                onSelectDate(e.value);
              } else {
                addError("Please select a valid date!", 3000);
              }
            }}
            filterConfig={{
              value: odDetails.selectedDate,
            }}
            disabled={selectedDate}
          ></FilterComponent>
        </View>
      </View>
      {selectedAttendanceTransactionTabDetails?.length == 0 ? (
        <></>
      ) : (
        <View
          style={{
            borderRadius: 1,
            borderColor: "grey",
            borderWidth: 1,
            marginVertical: 5,
            paddingHorizontal: 5,
          }}
        >
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              color: "#000",
              // margin: 5,
            }}
          >
            Attendance Details
          </Text>
          {selectedAttendanceTransactionTabDetails.map((x, i) => (
            <RangeComponent
              key={`${x.empCode} " " ${i}`}
              style={{ margin: 10 }}
              startTimeSuffix=""
              endTimeSuffix=""
              highlightColor="rgb(155, 43, 44)"
              backgroundColor="#A9A9A9"
              startTimeTextColor="black"
              endTimeTextColor="black"
              pointerColor="rgb(155, 43, 44)"
              startTime={moment(x.inDateTime, "DD/MM/YYYY HH:mm:ss").format(
                "HH:mm"
              )}
              endTime={
                x.outDateTime === "00:00"
                  ? 23.59
                  : moment(x.outDateTime, "DD/MM/YYYY HH:mm:ss ").format(
                      "HH:mm"
                    )
              }
              start={
                x.inDateTime === "00:00"
                  ? 1
                  : Math.floor(
                      parseInt(
                        moment(x.inDateTime, "DD/MM/YYYY HH:mm:ss").format(
                          "HH:mm"
                        )
                      )
                    ) / 24
              }
              end={
                x.outDateTime === "00:00"
                  ? 1
                  : Math.floor(
                      parseInt(
                        moment(x.outDateTime, "DD/MM/YYYY HH:mm:ss ").format(
                          "HH:mm"
                        )
                      )
                    ) / 24
              }
            ></RangeComponent>
          ))}
        </View>
      )}
      {timing.map((x, i) => (
        <View key={x._id + " " + i} style={styles.timing}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.txt}>Purpose</Text>
            {timing.length > 1 ? (
              <TouchableOpacity onPress={() => removeFromTiming(i)}>
                <Icons fill="#000" name="cross"></Icons>
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>

          <TextInput
            style={styles.textAreaContainer}
            value={x.purpose}
            numberOfLines={5}
            onChangeText={(d) => addToTimingData(i, { purpose: d })}
          ></TextInput>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              minHeight: 30,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{ flexDirection: "row", marginLeft: 5 }}
              onPress={() => {
                setModalData({
                  hourSelection: true,
                  minuteSelection: false,
                  type: "from",
                  index: i,
                });
              }}
            >
              <Image
                style={{ height: 16, width: 16, marginRight: 5 }}
                resizeMethod={"scale"}
                resizeMode={"contain"}
                source={require("../../assets/start.png")}
              ></Image>
              {/* <Icons fill="#000" name="startTime"></Icons> */}
              {x.fromHour && x.fromMinute ? (
                <View style={styles.timingText}>
                  <Text>
                    {x.fromHour?.name} {" : "}
                  </Text>
                  <Text>{x.fromMinute?.name}</Text>
                </View>
              ) : (
                <Text>Tap to select</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: "row", marginHorizontal: 5 }}
              onPress={() => {
                if (x.fromHour && x.fromMinute) {
                  setModalData({
                    hourSelection: true,
                    minuteSelection: false,
                    type: "to",
                    index: i,
                  });
                } else {
                  addError("Please provide start time first!", 3000);
                }
              }}
            >
              <Image
                style={{ height: 16, width: 16, marginRight: 5 }}
                resizeMethod={"scale"}
                resizeMode={"contain"}
                source={require("../../assets/end-time.png")}
              ></Image>
              {x.toHour && x.toMinute ? (
                <View style={styles.timingText}>
                  <Text>
                    {x.toHour?.name}
                    {" : "}
                  </Text>
                  <Text>{x.toMinute?.name}</Text>
                </View>
              ) : (
                <Text>Tap to select</Text>
              )}
            </TouchableOpacity>
            {selectedTransaction ||
            odDetails.nextDay ||
            (timing.length > 1 && timing.length - 1 != i) ? (
              <></>
            ) : (
              <TouchableOpacity
                style={{ marginRight: 5 }}
                onPress={() => addToTiming()}
              >
                <Icons fill="#9B2B2C" name="plus_with_circle"></Icons>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}

      {timing.length > 1 ? (
        <></>
      ) : (
        <TouchableOpacity style={styles.btn} onPress={() => selectNextDay()}>
          <Checkbox
            value={odDetails.nextDay}
            setValue={() => selectNextDay()}
            style={{ minHeight: 20, width: 20, margin: 5, alignSelf: "center" }}
          ></Checkbox>
          <Text style={styles.text}>Next Day</Text>
        </TouchableOpacity>
      )}
      {behalfOther ? (
        <CardData label={"Approval Authority"} data={user?.name}></CardData>
      ) : (
        <></>
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 20,
        }}
      >
        <Button
          style={styles.btn2}
          title={"Save"}
          textStyle={styles.textStyle}
          onPress={() => save()}
        ></Button>
        <Button
          onPress={onPressCancel}
          style={styles.btn1}
          title={"Cancel"}
          textStyle={styles.textStyle}
          //   onPress={onSave}
        ></Button>
      </View>
      <PopUp
        onRequestCloseModal={() => onRequestCloseModal()}
        displayStyle={{ display: "none" }}
        visible={modalData?.hourSelection}
        renderData={hourData.filter((x) =>
          modalData.type === "from" || odDetails.nextDay
            ? x
            : timing[modalData.index]?.fromMinute?.name < "59"
            ? Number(x.name) >= Number(timing[modalData.index]?.fromHour?.name)
            : Number(x.name) > Number(timing[modalData.index]?.fromHour?.name)
        )}
        iconStyle={{ color: "#BBBBBB", marginTop: 10 }}
        placeholderContainerStyle={{
          padding: 3,
          color: "gray",
        }}
        placeholderStyle={{
          fontSize: 16,
        }}
        readOnly={false}
        selectedItemStyle={{ fontSize: 16, margin: 5 }}
        style={styles.popupView}
        onSelection={(item) => {
          if (modalData.type === "from") {
            addToTimingData(modalData.index, {
              fromHour: item,
              toHour: null,
            });
          } else if (modalData.type === "to") {
            addToTimingData(modalData.index, {
              toHour: item,
            });
          }
          setModalData({
            ...modalData,
            hourSelection: false,
            minuteSelection: true,
          });
        }}
      />

      <PopUp
        onRequestCloseModal={() => onRequestCloseModal()}
        displayStyle={{ display: "none" }}
        visible={modalData?.minuteSelection}
        renderData={minuteArray.filter((x) =>
          modalData.type === "from" ||
          odDetails.nextDay ||
          Number(timing[modalData.index]?.fromHour?.name) <
            Number(timing[modalData.index]?.toHour?.name || 23)
            ? x
            : Number(x.name) > Number(timing[modalData.index]?.fromMinute?.name)
        )}
        iconStyle={{ color: "#BBBBBB", marginTop: 10 }}
        placeholderContainerStyle={{
          padding: 3,
          color: "gray",
        }}
        placeholderStyle={{
          fontSize: 16,
        }}
        readOnly={false}
        selectedItemStyle={{ fontSize: 16, margin: 5 }}
        style={styles.popupView}
        onSelection={(item) => {
          if (modalData.type === "from") {
            addToTimingData(modalData.index, {
              fromMinute: item,
              toMinute: null,
            });
          } else if (modalData.type === "to") {
            addToTimingData(modalData.index, {
              toMinute: item,
            });
          }
          setModalData({ ...modalData, minuteSelection: false });
        }}
      />
    </ScrollView>
  );
};
export default CreateOD;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: "#9B2B2C",
    paddingBottom: 10,
    fontWeight: "bold",
  },
  btn: {
    margin: 3,
    width: "100%",
    backgroundColor: "grey",
    marginTop: 10,
    flexDirection: "row",
    borderRadius: 5,
    alignItems: "center",
  },
  btn1: {
    width: 100,
    backgroundColor: "#9B2B2C",
    marginTop: 5,
  },
  btn2: {
    width: 100,
    backgroundColor: "#FF9300",
    marginTop: 5,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    margin: 10,
    alignSelf: "center",
  },
  timing: {
    // height: 100,
    padding: 5,
    borderWidth: 1,
    marginBottom: 5,
    borderColor: "grey",
    backgroundColor: "#D0D0D0",
    borderRadius: 10,
  },
  txt: {
    fontSize: 14,
    margin: 5,
  },
  textAreaContainer: {
    borderColor: "#9A9A9A",
    borderWidth: 1,
    margin: 5,
    height: 50,
  },
  popupView: {
    marginTop: 10,
    backgroundColor: "white",
    borderColor: "#ffffff",
    width: "100%",
  },
  eventDate: {
    borderRadius: 5,
    padding: 7,
    paddingVertical: 10,
    backgroundColor: "#FFF",
    width: "99%",
    marginLeft: 1,
    shadowColor: "#696969",
    shadowOpacity: 0.8,
    elevation: 2,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 0 },
    height: 35,
    marginBottom: 2,
  },
  timingText: { flexDirection: "row", marginLeft: 2 },
});

import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Checkbox, Modal } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/buttons/button";
import CardData from "../../components/eiscardDesign/cardData";
import FilterComponent from "../../components/filter/filter";
import ModalContainer from "../../components/modalContainer/modal";
import PageLoader from "../../components/PageLoader/loader";
import { formatDate } from "../../components/utils";
import {
  createCompoff,
  fetchCompOffTabDeatils,
} from "../../redux/actions/comp-off.action";
import { SafeAreaView } from "react-native-safe-area-context";
import ReactNativeModal from "react-native-modal";
import Icons from "../../components/icons";
import Toast from "../../components/toast";

const ApplyCompOff = ({
  showModal,
  onPressCancel,
  selectedTransaction,
  addError,
  selectedDate,
}) => {
  const dimension = useWindowDimensions();
  const user = useSelector((state) => state.user);
  const getValue = (key, defaultValue = "") => {
    return selectedTransaction?.[key]
      ? selectedTransaction?.[key]
      : defaultValue;
  };
  const [initialObj, setInitialObj] = useState({
    tranId: getValue("tranId", "SYS_GEN"),
    empCode: user?.empCode,
    empName: user?.empName,
    deptName: user?.deptName,
    selectedDate: selectedTransaction?.eventDate
      ? moment(selectedTransaction.eventDate, "DD/MM/YYYY")
      : selectedDate
        ? selectedDate
        : "",
    remarks: getValue("remarks"),
    isOverNight: "N",
  });
  const dispatch = useDispatch();
  const selectedCompOffTxnTabDetails = useSelector(
    (state) => state.selectedCompOffTxnTabDetails
  );
  const [loadingTableData, setLoadingTableData] = useState(false);

  const compoffTableHeader = [
    {
      label: "Event Date",
      key: "eventDate",
    },
    {
      label: "In Time",
      key: "inDateTime",
    },
    {
      label: "Out Time",
      key: "outDateTime",
    },
    {
      label: "Total Hours",
      key: "totalHours",
    },
  ];

  useEffect(() => {
    if (selectedTransaction?.eventDate) {
      setLoadingTableData(true);
      dispatch(
        fetchCompOffTabDeatils(
          {
            empCode: initialObj.empCode,
            eventDate: moment(
              selectedTransaction?.eventDate,
              "DD/MM/YYYY"
            ).format("YYYY-MM-DD"),
          },
          () => setLoadingTableData(false)
        )
      );
    }
  }, [selectedTransaction?.eventDate]);

  const renderTable = () => (
    <View>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 5,
          borderWidth: 1,
          borderRadius: 5,
          paddingHorizontal: 4,
          backgroundColor: "rgb(155, 43, 44)",
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
      >
        {compoffTableHeader.map((item) => (
          <View style={{ width: "25%" }}>
            <Text
              style={{
                fontSize: 14,
                color: "white",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              {item.label}
            </Text>
          </View>
        ))}
      </View>
      <View>
        {selectedCompOffTxnTabDetails?.length > 0 && !loadingTableData ? (
          selectedCompOffTxnTabDetails.map((item) => (
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 5,
                borderWidth: 1,
                paddingHorizontal: 2,
                backgroundColor: "rgb(208, 208, 208)",
              }}
            >
              {compoffTableHeader.map((header) => (
                <View style={{ width: "25%" }}>
                  <Text
                    style={{
                      color: "#000000",
                      fontSize: 13,
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    {item[header.key]}
                  </Text>
                </View>
              ))}
            </View>
          ))
        ) : (
          <View
            style={{
              borderWidth: 1,
              borderColor: "#000000",
              paddingVertical: 5,
            }}
          >
            <Text style={{ textAlign: "center" }}>
              {loadingTableData ? "Loading..." : "No Data Found"}
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  const getCaluclatedPunchesData = useMemo(() => {
    const totalMinutes = selectedCompOffTxnTabDetails.reduce(
      (totalHours, item) => {
        return totalHours + item.totalMinutes;
      },
      0
    );
    const totalHours = `${parseInt(totalMinutes / 60)}.${totalMinutes % 60}`;
    return [
      {
        eventDate: selectedCompOffTxnTabDetails?.[0]?.eventDate,
        inDateTime: selectedCompOffTxnTabDetails?.[0]?.inDateTime,
        outDateTime:
          selectedCompOffTxnTabDetails?.[
            selectedCompOffTxnTabDetails?.length - 1
          ]?.outDateTime,
        totalHours: totalHours,
        totalMinutes: totalMinutes,
        dayStatus: selectedCompOffTxnTabDetails?.[0]?.dayStatus,
      },
    ];
  }, [loadingTableData]);

  const calculatedPunches = () => {
    const data =
      selectedCompOffTxnTabDetails?.length && !loadingTableData
        ? getCaluclatedPunchesData
        : [];
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 5,
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 4,
            backgroundColor: "rgb(155, 43, 44)",
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
        >
          {compoffTableHeader.map((item) => (
            <View style={{ width: "25%" }}>
              <Text
                style={{
                  fontSize: 14,
                  color: "white",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                {item.label}
              </Text>
            </View>
          ))}
        </View>
        <View>
          {data?.length > 0 ? (
            data.map((item) => (
              <View
                style={{
                  flexDirection: "row",
                  paddingVertical: 5,
                  borderWidth: 1,
                  paddingHorizontal: 4,
                  backgroundColor: "rgb(208, 208, 208)",
                }}
              >
                {compoffTableHeader.map((header) => (
                  <View style={{ width: "25%" }}>
                    <Text
                      style={{
                        color: "#000000",
                        fontSize: 13,
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      {item[header.key]}
                    </Text>
                  </View>
                ))}
              </View>
            ))
          ) : (
            <View
              style={{
                borderWidth: 1,
                borderColor: "#000000",
                paddingVertical: 5,
              }}
            >
              <Text style={{ textAlign: "center" }}>
                {loadingTableData ? "Loading..." : "No Data Found"}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderCompOffTable = () => (
    <View
      style={{
        marginVertical: 10,
        borderWidth: 0.2,
        borderTopLeftRadius: 5,
      }}
    >
      <View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "rgb(155, 43, 44)",
          }}
        >
          <View
            style={{
              padding: 5,
              backgroundColor: "rgb(150, 43, 20,0.8)",
              width: Platform.OS === "web" ? 130 : 95,
              borderRadius: 5,
              borderWidth: 0.2,
            }}
          >
            <Text
              style={{
                fontSize: Platform.OS === "web" ? 14 : 12,
                fontWeight: "600",
                color: "white",
              }}
            >
              Actual Punches
            </Text>
          </View>
          <View style={{ paddingLeft: 5, justifyContent: "center" }}>
            <Text style={{ fontSize: 12, color: "white" }}>
              SHIFT: G(09.30) (09:30:00 - 18:00:00)
            </Text>
            {/* <Text style={{ fontSize: 12 }}>(09:30:00 - 18:00:00)</Text> */}
          </View>
        </View>
        <View style={{ paddingHorizontal: 5, paddingVertical: 5 }}>
          <View>
            <View style={{ paddingVertical: 2 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                Actual Punches
              </Text>
            </View>
            {renderTable()}
          </View>
          <View style={{ marginTop: 5 }}>
            <View style={{ paddingVertical: 2 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                Calculated Punches
              </Text>
            </View>
            {calculatedPunches()}
          </View>
        </View>
      </View>
    </View>
  );
  const renderComponent = () => (
    <View style={{ flex: 1 }}>
      {Boolean(loadingTableData) && <PageLoader showLoadingText={false} />}
      <CardData label={"Emp Code"} data={initialObj?.empCode}></CardData>
      <CardData label={"Employee Name"} data={initialObj?.empName}></CardData>
      <CardData label={"Department"} data={initialObj?.deptName}></CardData>
      <View style={{ marginVertical: 2 }}>
        <Text
          style={{
            fontSize: 14,
            color: "#9A9A9A",
            marginVertical: 2,
          }}
        >
          Working Date
        </Text>
        <View style={{ width: "100%", flexDirection: "row" }}>
          <View style={{ flexDirection: "row", width: "40%" }}>
            <View style={styles.eventDate}>
              <FilterComponent
                minDate={moment().startOf("year")}
                type="date"
                maxDate={moment(new Date()).subtract(1, "day")}
                dateStyle={{ color: "#383336" }}
                onFilterChange={(e) => {
                  setLoadingTableData(true);
                  setInitialObj({
                    ...initialObj,
                    selectedDate: e.value,
                  });
                  dispatch(
                    fetchCompOffTabDeatils(
                      {
                        empCode: initialObj.empCode,
                        eventDate: moment(e.value).format("YYYY-MM-DD"),
                      },
                      () => setLoadingTableData(false)
                    )
                  );
                }}
                filterConfig={{
                  value: initialObj.selectedDate,
                }}
                disabled={selectedDate}
              ></FilterComponent>
            </View>
          </View>
          {Boolean(
            initialObj.selectedDate &&
              selectedCompOffTxnTabDetails?.length > 0 &&
              selectedCompOffTxnTabDetails?.[0]?.dayStatus
          ) && (
            <View
              style={{
                width: "60%",
                flexDirection: "row",
                paddingHorizontal: 10,
                alignItems: "center",
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#9B2B2C",
                    fontWeight: "600",
                    textTransform: "uppercase",
                  }}
                >
                  {selectedCompOffTxnTabDetails?.[0]?.dayStatus}
                </Text>
              </View>
              <View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Checkbox
                    status={
                      initialObj.isOverNight === "Y" ? "checked" : "unchecked"
                    }
                    onPress={() =>
                      setInitialObj((prev) => ({
                        ...initialObj,
                        isOverNight: prev?.isOverNight === "Y" ? "N" : "Y",
                      }))
                    }
                  />
                  <Text>Is Over Night</Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {Boolean(initialObj.selectedDate) && renderCompOffTable()}
        <View>
          <Text style={styles.label}>Work Detail</Text>
          <View style={[styles.textAreaContainer]}>
            <TextInput
              style={{
                justifyContent: "flex-start",
                padding: 8,
                textAlignVertical: "top",
              }}
              underlineColorAndroid="transparent"
              placeholder="Remarks"
              placeholderTextColor="grey"
              numberOfLines={5}
              multiline={true}
              onChangeText={(e) => {
                setInitialObj({
                  ...initialObj,
                  remarks: e,
                });
              }}
              value={initialObj.remarks}
            />
          </View>
        </View>
        <CardData label={"Approval Authority"} data={"test user"}></CardData>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: 10,
          }}
        >
          <Button
            style={styles.btn2}
            title={"Save"}
            textStyle={styles.textStyle}
            onPress={onSubmit}
          ></Button>
          <Button
            style={styles.btn1}
            title={"Cancel"}
            textStyle={styles.textStyle}
            onPress={onPressCancel}
          ></Button>
        </View>
      </View>
    </View>
  );

  const validate = () =>
    new Promise((resolve, reject) => {
      if (!initialObj.selectedDate) {
        reject("Please Select The Date.");
      } else if (!selectedCompOffTxnTabDetails?.length) {
        reject("No Attendance Details Found For Selected Date.");
      } else if (
        !["Weekly Off", "Public Holiday"].includes(
          selectedCompOffTxnTabDetails?.[0]?.dayStatus
        )
      ) {
        reject("No Holiday/Weekly Off Found For Selected Date.");
      } else if (!initialObj?.remarks) {
        reject("Please Provide the Work Details.");
      } else {
        resolve(true);
      }
    });
  const onSubmit = () => {
    validate()
      .then(() => {
        const totalMinutes = selectedCompOffTxnTabDetails.reduce(
          (totalHours, item) => {
            return totalHours + item.totalMinutes;
          },
          0
        );
        const totalHours = `${parseInt(totalMinutes / 60)}.${
          totalMinutes % 60
        }`;
        const obj = {
          tranId: initialObj?.tranId,
          eventDate: formatDate(initialObj.selectedDate, "YYYY-MM-DD"),
          empCode: initialObj.empCode?.trim(),
          fromDate: moment(
            selectedCompOffTxnTabDetails?.[0]?.inDateTime,
            "DD/MM/YYYY HH:mm:ss"
          ).format("yyyy-MM-DD HH:mm"),
          toDate: moment(
            selectedCompOffTxnTabDetails?.[
              selectedCompOffTxnTabDetails?.length - 1
            ]?.outDateTime,
            "DD/MM/YYYY HH:mm:ss"
          ).format("YYYY-MM-DD HH:MM"),
          remarks: initialObj.remarks,
          hoursWorked: totalHours,
          mode: selectedTransaction?.tranId ? "EDIT" : "NEW",
          chgUser: user?.empCode?.trim(),
          chgTerm: "192.168.33.13",
          isAdminApply: ["A", "P", "H"].includes(user.userType) ? "Y" : "N",
          rejectReason: "",
          isAdminReject: 0,
          isOverNight: initialObj?.isOverNight,
        };
        dispatch(
          createCompoff(obj, () => {
            onPressCancel();
          })
        );
      })
      .catch((error) => {
        addError(error, 3000);
        return;
      });
  };

  return (
    <>
      {Boolean(Platform.OS === "web") ? (
        <ModalContainer
          modalContentStyle={{
            maxHeight: dimension.height * 0.8,
          }}
          showModal={showModal}
          modalStyle={{
            maxWidth: dimension.width > 550 ? 550 : dimension.width - 20,
            maxHeight: dimension.height * 0.8,
            zIndex: 1,
          }}
          title={`${selectedTransaction?.tranId ? "Update" : "Create"} Comp Off`}
          modalContent={
            <View style={styles.textArea}>{renderComponent()}</View>
          }
          onClose={onPressCancel}
          onRequestCloseModal={onPressCancel}
        ></ModalContainer>
      ) : (
        <ReactNativeModal isVisible={true}>
          <SafeAreaView style={{ flex: 1 }}>
            <Toast></Toast>
            <View
              style={{
                flex: 1,
                backgroundColor: "white",
                borderRadius: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingTop: 20,
                  paddingHorizontal: 10,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    resizeMode={"cover"}
                    style={{ height: 40, width: 40 }}
                    source={require("../../assets/mImage.png")}
                  />
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      paddingLeft: 10,
                    }}
                    adjustsFontSizeToFit={true}
                  >
                    {selectedTransaction?.tranId ? "Update" : "Create"} Comp Off
                  </Text>
                </View>
                <TouchableOpacity onPress={onPressCancel}>
                  <Icons fill="#000" name="cross"></Icons>
                </TouchableOpacity>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.textArea}>{renderComponent()}</View>
              </ScrollView>
            </View>
          </SafeAreaView>
        </ReactNativeModal>
      )}
    </>
  );
};
export default ApplyCompOff;
const styles = StyleSheet.create({
  containeer: {
    flex: 1,
  },
  textArea: {
    margin: 10,
    height: "95%",
  },
  eventDate: {
    borderRadius: 5,
    padding: 7,
    paddingVertical: 10,
    backgroundColor: "#FFF",
    width: "100%",
    marginLeft: 1,
    shadowColor: "#696969",
    shadowOpacity: 0.8,
    elevation: 2,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 0 },
    height: 35,
    marginBottom: 2,
  },
  textAreaContainer: {
    borderColor: "#9A9A9A",
    borderWidth: 1,
    marginTop: 5,
    height: 80,
    borderRadius: 10,
  },
  label: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "600",
    marginTop: 5,
  },
  textStyle: {
    fontSize: 16,
    justifyContent: "center",
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
});

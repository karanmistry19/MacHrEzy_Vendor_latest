import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import Button from "../../components/buttons/button";
import CardData from "../../components/eiscardDesign/cardData";
import FilterComponent from "../../components/filter/filter";
import { formatDate, formatDateNew } from "../../components/utils";
import FilterDataComponent from "../leave/filterDataComponent";
const CreateTour = ({
  user,
  behalfOther,
  createTourTxn,
  selectedTransaction,
  onComplete,
  addError,
  modalManage,
  selectedDate,
}) => {
  // const dimension = useContext(DimensionContext);
  const dimension = useWindowDimensions();

  useEffect(() => {
    if (modalManage && !modalManage.visible && modalManage.transaction) {
      onComplete();
    }
  }, [modalManage]);
  const initData = {
    employee: null,
    fromDate: selectedDate ? selectedDate : null,
    toDate: selectedDate ? selectedDate : null,
    purpose: "",
  };
  const [tourDetails, setTourDetails] = useState(initData);
  const updateTourDetails = (data) => {
    setTourDetails({ ...tourDetails, ...data });
  };

  useFocusEffect(
    React.useCallback(() => {
      if (selectedTransaction)
        setTourDetails({
          tranId: selectedTransaction.tranId,
          fromDate: formatDateNew(
            selectedTransaction.fromDate,
            "DD/MM/YYYY",
            "yyyy-MM-DDThh:mm:ss.sssZ"
          ),
          toDate: formatDateNew(
            selectedTransaction.toDate,
            "DD/MM/YYYY",
            "yyyy-MM-DDThh:mm:ss.sssZ"
          ),
          purpose: selectedTransaction.remarks,
          employee: {
            data: {
              empCode: selectedTransaction.empCode,
              empName: selectedTransaction.empName,
              deptName: selectedTransaction.deptName,
            },
          },
        });
    }, [selectedTransaction])
  );

  useFocusEffect(
    React.useCallback(() => {
      if (!behalfOther && !selectedTransaction) {
        setTourDetails({
          ...tourDetails,
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
        setTourDetails(initData);
      };
    }, [user])
  );

  const removeSelected = () => {
    updateTourDetails({ employee: null });
  };

  const validate = () =>
    new Promise((resolve, reject) => {
      if (!tourDetails.fromDate || !tourDetails.toDate) {
        reject("Please provide valid tour date information!");
      } else if (!tourDetails.purpose || tourDetails.purpose === "") {
        reject("Purpose cannot be blank!");
      } else {
        resolve();
      }
    });
  const save = () => {
    validate()
      .then(() => {
        createTourTxn(
          {
            tranId: tourDetails.tranId,
            empCode: tourDetails.employee.data.empCode.trim(),
            fromDate: formatDate(tourDetails.fromDate, "YYYY-MM-DD"),
            toDate: formatDate(tourDetails.toDate, "YYYY-MM-DD"),
            remarks: tourDetails.purpose,
            behalf: behalfOther,
          }
          // onComplete()
        );
      })
      .catch((error) => addError(error, 3000));
  };
  return (
    <View style={styles.textArea}>
      {behalfOther && !selectedTransaction ? (
        <FilterDataComponent
          data={tourDetails.employee ? [tourDetails.employee] : null}
          setData={(item) => {
            updateTourDetails({ employee: { ...item } });
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
        data={tourDetails.employee?.data?.empCode}
      ></CardData>
      <CardData
        label={"Employee Name"}
        data={tourDetails.employee?.data?.empName}
      ></CardData>
      <CardData
        label={"Department"}
        data={tourDetails.employee?.data?.deptName}
      ></CardData>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <View style={{ marginVertical: 2, width: 160 }}>
          <Text style={styles.txt}>From Date</Text>
          <View style={styles.popupView}>
            <FilterComponent
              maxDate={
                tourDetails.toDate ||
                moment(new Date()).year(new Date().getFullYear() + 1)
              }
              type="date"
              dateStyle={{ fontSize: 14, color: "#383336" }}
              onFilterChange={(e) => updateTourDetails({ fromDate: e.value })}
              filterConfig={{
                value: tourDetails.fromDate,
              }}
              disabled={selectedDate}
            ></FilterComponent>
          </View>
        </View>
        <View style={{ marginVertical: 2, width: 160 }}>
          <Text style={styles.txt}>To Date</Text>
          <View style={styles.popupView}>
            <FilterComponent
              type="date"
              minDate={
                tourDetails.fromDate ||
                moment(new Date()).year(new Date().getFullYear() - 1)
              }
              maxDate={moment(new Date()).year(new Date().getFullYear() + 1)}
              dateStyle={{ fontSize: 14, color: "#383336" }}
              onFilterChange={(e) => updateTourDetails({ toDate: e.value })}
              filterConfig={{
                value: tourDetails.toDate,
              }}
              disabled={selectedDate}
            ></FilterComponent>
          </View>
        </View>
      </View>
      <Text style={styles.label}>Purpose</Text>
      <View
        style={[
          styles.textAreaContainer,
          // {
          //   width:
          //     dimension.window.width > 550 ? 380 : dimension.window.width - 60,
          // },
        ]}
      >
        <TextInput
          style={{
            justifyContent: "flex-start",
            padding: 8,
            textAlignVertical: "top",
          }}
          underlineColorAndroid="transparent"
          placeholder="Remarks"
          placeholderTextColor="grey"
          numberOfLines={10}
          onChangeText={(text) => updateTourDetails({ purpose: text })}
          multiline={true}
          value={tourDetails.purpose}
        />
      </View>

      {behalfOther ? (
        <CardData label={"Approval Authority"} data={user?.name}></CardData>
      ) : (
        <></>
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Button
          style={styles.btn2}
          title={"Save"}
          textStyle={styles.textStyle}
          onPress={() => save()}
        ></Button>
        <Button
          style={styles.btn1}
          title={"Cancel"}
          textStyle={styles.textStyle}
          onPress={() => onComplete()}
        ></Button>
      </View>
    </View>
  );
};
export default CreateTour;
const styles = StyleSheet.create({
  textArea: {
    // margin: 10,
    height: "95%",
  },
  textAreaContainer: {
    borderColor: "#9A9A9A",
    borderWidth: 1,
    marginTop: 10,
    height: 140,
    borderRadius: 10,
  },
  label: {
    fontSize: 14,
    color: "#9A9A9A",
    marginVertical: 2,
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: "#9B2B2C",
    paddingBottom: 10,
    fontWeight: "bold",
  },
  txt: {
    fontSize: 14,
    color: "#9A9A9A",
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
  popupView: {
    borderRadius: 5,
    marginTop: 10,
    padding: 7,
    backgroundColor: "#FFF",
    width: 150,
    shadowColor: "#696969",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 1 },
  },
});

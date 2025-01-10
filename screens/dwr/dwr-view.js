import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { DimensionContext } from "../../components/dimensionContext";
import TransactionComponent from "../../components/transactionComponent";
import {
  createDWRApplication,
  dwrAllDetails,
  dwrApprovalPending,
} from "../../redux/actions/dwr.action";
import { addError } from "../../redux/actions/toast.action";
import DwrModal from "./dwr-modal";
const DWRView = ({ dwrAllDetails, dwrApprovalPending, addError }) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    dwrAllDetails();
    dwrApprovalPending();
  }, []);
  const { window } = useContext(DimensionContext);

  return (
    <View style={styles.container}>
      <View
        style={{
          // height:
          //   window.height -
          //   (Platform.OS === "web" ? 150 : 140 + StatusBar.currentHeight),
          flex: 1,
          width: window.width,
          marginTop: 5,
        }}
      >
        <TransactionComponent
          modularCardStyle={{ height: "80%" }}
          tableStyle={{ maxHeight: window.height - 220 }}
          transactionScreen={true}
          style={{
            marginBottom: 10,
          }}
          transactionScreenStyle={{ width: window.width - 40 }}
          onClickAddButton={() => setModalVisible(true)}
        ></TransactionComponent>
      </View>
      <DwrModal
        onRequestCloseModal={() => setModalVisible(false)}
        showModal={modalVisible}
        addError={addError}
        transactionScreen={true}
      ></DwrModal>
    </View>
  );
};
const mapStateToProps = ({
  user,
  dwrPendingDetail,
  notifications,
  dwrApprovalPendingList,
}) => ({
  user,
  dwrPendingDetail,
  notifications,
  dwrApprovalPendingList,
});
export default connect(mapStateToProps, {
  dwrAllDetails,
  dwrApprovalPending,
  createDWRApplication,
  addError,
})(DWRView);

const styles = StyleSheet.create({
  textAreaContainer: {
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    height: 230,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    flexDirection: "row",

    flexWrap: "wrap",
    margin: 10,
    marginVertical: 5,
  },
  textArea: {
    // height: 150,
    justifyContent: "flex-start",
    flex: 1,
    padding: 8,
    textAlignVertical: "top",
  },
  Text: {
    fontSize: 25,
    margin: 20,
    color: "white",
  },
  displayCardContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  textStyle: {
    fontSize: 30,
    color: "#FFBA00",
    fontWeight: "bold",
  },
  tableContainer: {
    margin: 5,
  },
  cellStyle: {
    width: 100,
  },
});

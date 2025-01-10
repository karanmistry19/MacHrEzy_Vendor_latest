import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import CardComponent from "../../components/cardComponent/cardComponent";
import { closeModal } from "../../redux/actions/modal-manage.action";
import { addError } from "../../redux/actions/toast.action";
import { createTourTxn } from "../../redux/actions/tour.action";
import CreateTour from "./create-tour";
const AddNewTour = ({
  route,
  user,
  createTourTxn,
  tourTxnUser,
  tourTxnPending,
  navigation,
  addError,
  modalManage,
  closeModal,
}) => {
  const data = route.params.data;
  const [selectedTransaction, setSelectedTransaction] = useState();
  useFocusEffect(
    React.useCallback(() => {
      if (data?.transaction) {
        setSelectedTransaction(
          (data.for === "employee" ? tourTxnPending : tourTxnUser).find(
            (x) => x.tranId === data.transaction
          )
        );
      }
      return () => {
        setSelectedTransaction();
      };
    }, [data])
  );
  return (
    <View style={{ flex: 1 }}>
      <CardComponent>
        <Text
          style={{ fontSize: 18, fontWeight: "bold", color: "#9B2B2C" }}
          adjustsFontSizeToFit={true}
        >{`${selectedTransaction ? "Update" : "Create"} Tour`}</Text>
        <CreateTour
          user={user}
          behalfOther={data.for === "employee"}
          createTourTxn={createTourTxn}
          selectedTransaction={selectedTransaction}
          onComplete={() => {
            navigation.navigate("tour");
            closeModal();
          }}
          addError={addError}
          modalManage={modalManage}
        />
      </CardComponent>
    </View>
  );
};
const styles = StyleSheet.create({});

const mapStateToProps = ({
  user,
  tourTxnUser,
  tourTxnPending,
  modalManage,
}) => ({
  user,
  tourTxnUser,
  tourTxnPending,
  modalManage,
});
export default connect(mapStateToProps, {
  createTourTxn,
  closeModal,
  addError,
})(AddNewTour);

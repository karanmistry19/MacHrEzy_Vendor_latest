import React, { useEffect } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import TransferHistory from "../../components/eiscardDesign/transferHistory";
import { fetchEISTransferHistory } from "../../redux/actions/eis.action";

const TransferHistoryScreen = ({
  fetchEISTransferHistory,
  eisTransferHistory,

  navigation,
}) => {
  useEffect(() => {
    fetchEISTransferHistory();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <TransferHistory
        eisTransferHistory={eisTransferHistory}
      ></TransferHistory>
    </View>
  );
};
const mapStateToProps = ({ eisTransferHistory }) => ({
  eisTransferHistory,
});
export default connect(mapStateToProps, {
  fetchEISTransferHistory,
})(TransferHistoryScreen);

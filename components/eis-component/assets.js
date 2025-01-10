import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { fetchEISAssets } from "../../redux/actions/eis.action";
import CardComponent from "../cardComponent/cardComponent";
import CardData from "../eiscardDesign/cardData";

const Assets = ({ fetchEISAssets, eisAssets }) => {
  useEffect(() => {
    fetchEISAssets();
  }, []);

  return (
    <View style={styles.container}>
      <CardComponent>
        <View style={styles.cardData}>
          <CardData
            label={"assets"}
            data={eisAssets.status}
            style={styles.dataContainer}
          />
        </View>
      </CardComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardData: {
    flex: 1,
    flexDirection: "row",
  },
  dataContainer: {
    flex: 1,
  },
});

const mapStateToProps = ({ eisAssets }) => ({
  eisAssets,
});
export default connect(mapStateToProps, {
  fetchEISAssets,
})(Assets);

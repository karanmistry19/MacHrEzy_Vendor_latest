import React, { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { formatDateNew } from "../../components/utils";
import CardComponent from "../cardComponent/cardComponent";
import { DimensionContext } from "../dimensionContext";
import CardData from "./cardData";
const TransferHistory = ({ eisTransferHistory }) => {
  const { window } = useContext(DimensionContext);
  return (
    <ScrollView
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      {eisTransferHistory?.map((ex, i) => (
        <CardComponent key={`${ex.pTransactionType} + ${i}`}>
          <View
            style={{
              borderBottomColor: "grey",
              borderBottomWidth: 1,
              width: "100%",
              fontWeight: "bold",
            }}
          >
            {/* <Text style={{ fontSize: 15, color: "#9B2B2C", paddingTop: 1 }}>
              Transaction Type
            </Text> */}
            <Text
              style={{
                fontSize: 20,
                color: "#9B2B2C",
                paddingTop: 1,
                marginBottom: 10,
              }}
            >
              {ex.pTransactionType}
            </Text>
          </View>
          <View style={styles.cardData}>
            {ex.eventDate ? (
              <View style={{ width: window.width < 600 ? "50%" : "30%" }}>
                <CardData
                  label={"Event Date"}
                  data={ex.eventDate}
                  style={styles.dataContainer}
                />
              </View>
            ) : (
              <></>
            )}

            {ex.receiptDate ? (
              <View style={{ width: window.width < 600 ? "50%" : "30%" }}>
                <CardData
                  label={"Receipt Date"}
                  data={ex.receiptDate}
                  style={styles.dataContainer}
                />
              </View>
            ) : (
              <></>
            )}

            {ex.pDivId ? (
              <View style={{ width: window.width < 600 ? "50%" : "30%" }}>
                <CardData
                  label={"Location "}
                  data={ex.pDivId}
                  style={styles.dataContainer}
                />
              </View>
            ) : (
              <></>
            )}

            {/* {ex.pSectionId ? (
                  <View style={{ width: window.width < 600 ? "50%" : "30%" }}>
                    <CardData
                      label={"Section Id"}
                      data={ex.pSectionId}
                      style={styles.dataContainer}
                    />
                  </View>
                ) : (
                  <></>
                )} */}

            {ex.pDateOfTransPromo ? (
              <View style={{ width: window.width < 600 ? "50%" : "30%" }}>
                <CardData
                  label={"Transaction Date"}
                  data={formatDateNew(
                    ex.pDateOfTransPromo,
                    "YYYY-MM-DDTHH:mm:ss.sssZ",
                    "DD/MM/YYYY"
                  )}
                  style={styles.dataContainer}
                />
              </View>
            ) : (
              <></>
            )}

            {ex.pDeptName ? (
              <View style={{ width: window.width < 600 ? "50%" : "30%" }}>
                <CardData
                  label={"Department Name"}
                  data={ex.pDeptName}
                  style={styles.dataContainer}
                />
              </View>
            ) : (
              <></>
            )}

            {ex.pDesig ? (
              <View style={{ width: window.width < 600 ? "50%" : "30%" }}>
                <CardData
                  label={"Designation"}
                  data={ex.pDesig}
                  style={styles.dataContainer}
                />
              </View>
            ) : (
              <></>
            )}

            {ex.pCtc || ex.pCtc == 0 ? (
              <View style={{ width: window.width < 600 ? "50%" : "30%" }}>
                <CardData
                  zero={true}
                  label={"CTC "}
                  data={ex.pCtc}
                  style={styles.dataContainer}
                />
              </View>
            ) : (
              <></>
            )}

            {ex.pReason ? (
              <View style={{ width: window.width < 600 ? "50%" : "30%" }}>
                <CardData
                  label={"Reason"}
                  data={ex.pReason}
                  style={styles.dataContainer}
                />
              </View>
            ) : (
              <></>
            )}

            {ex.docPath ? (
              <View style={{ width: window.width < 600 ? "50%" : "30%" }}>
                <CardData
                  label={"Doc Path"}
                  data={ex.docPath}
                  style={styles.pLevelName}
                />
              </View>
            ) : (
              <></>
            )}
            {ex.pCtc ? (
              <View style={{ width: window.width < 600 ? "50%" : "30%" }}>
                <CardData
                  label={"CTC "}
                  data={ex.pCtc}
                  style={styles.pLevelName}
                />
              </View>
            ) : (
              <></>
            )}
          </View>
        </CardComponent>
      ))}
    </ScrollView>
  );
};

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
  cardData: {
    flex: 1,
    flexDirection: "row",

    flexWrap: "wrap",
  },
  dataContainer: {
    flex: 1,
  },
});
export default TransferHistory;

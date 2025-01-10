import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import config from "../../config/config";
import DwrModal from "../../screens/dwr/dwr-modal";
import Button from "../buttons/button";
import Icon from "../icons";
import ModalContainer from "../modalContainer/modal";
import { formatDate } from "../utils";

export const TransactionRow = ({
  onClick,
  approval,
  tab,
  onPressApprove,
  onPressReject,
  currentTransaction,
  downloadFile,
  addError,
  transactionScreen,
}) => {
  const [message, setMessage] = useState("");
  const [transactionModal, viewTransactionModal] = useState(false);
  const [dwrModal, viewDwrModal] = useState(false);
  const [rejectModal, viewRejectModal] = useState(false);
  const dimension = useWindowDimensions();
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const onRequestCloseModal = () => {
    if (rejectModal) {
      viewRejectModal(false);
    } else {
      viewTransactionModal(false);
    }
    viewDwrModal(false);
    setSelectedTransaction(null);
  };
  const onRowClick = () => {
    if (
      tab === "My Pending" &&
      currentTransaction.reject === 0 &&
      currentTransaction.finalsanction === 0
    ) {
      setSelectedTransaction({ ...currentTransaction });
      viewDwrModal(true);
    } else {
      viewTransactionModal(true);
    }
  };

  const reject = () => {
    if (message && message.length > 0) {
      onPressReject({
        tranId: currentTransaction.tranId.trim(),
        reason: message,
        emp: currentTransaction.empCode.trim(),
        eventDate: formatDate(
          new Date(currentTransaction?.eventDate),
          "DD/MM/yyyy"
        ),
      });
      viewRejectModal(false);
      viewTransactionModal(false);
      setMessage("");
    } else {
      addError("Provide reject reason!", 3000);
    }
  };

  const approve = () => {
    onPressApprove({
      tranId: currentTransaction.tranId,
      levelApprv: currentTransaction.levelApprv,
      emp: currentTransaction.empCode.trim(),
      eventDate: formatDate(
        new Date(currentTransaction?.eventDate),
        "DD/MM/yyyy"
      ),
    });
  };
  const downloadDocument = async (id) => {
    if (id) {
      if (Platform.OS != "web") {
        await WebBrowser.openBrowserAsync(
          `${config.baseUrl}api/saved-file?fileId=${id}`
        );
      } else {
        window
          .open(`${config.baseUrl}api/saved-file?fileId=${id}`, "_blank")
          .focus();
      }
    }
  };
  return (
    <View>
      <TouchableOpacity style={styles.rowStyle} onPress={onRowClick}>
        <View style={{ flex: 1, alignItems: "flex-start" }}>
          {tab == "My Pending" ? (
            <></>
          ) : (
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 14 }}>
                {currentTransaction?.shortName}{" "}
              </Text>
            </View>
          )}
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                // marginLeft: 10,
                backgroundColor: "#FFBA00",
                padding: 2,
                borderRadius: 5,
                fontSize: 12,
              }}
            >
              {formatDate(
                new Date(currentTransaction?.eventDate),
                "DD/MM/yyyy"
              )}
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                marginLeft: 10,
              }}
              adjustsFontSizeToFit={true}
            >
              {currentTransaction.tranType || "DWR"}{" "}
              {currentTransaction.reject
                ? "(Rejected)"
                : currentTransaction.finalsanction
                ? "(Approved)"
                : ""}
            </Text>
          </View>
        </View>
        <View
          style={{
            alignItems: "flex-end",
            justifyContent: "center",
            maxWidth: 30,
          }}
        >
          <Icon name="rightChevronArrow"></Icon>
        </View>
      </TouchableOpacity>
      <DwrModal
        onRequestCloseModal={() => viewDwrModal(false)}
        showModal={dwrModal}
        addError={addError}
        dwr={selectedTransaction}
        transactionScreen={transactionScreen}
      ></DwrModal>

      {/* <ModalContainer
        showModal={rejectModal}
        modalStyle={{
          minWidth: 300,
          maxWidth: dimension.width - 20,
          height: dimension.height * 0.4,
        }}
        modalContentStyle={{
          width: "100%",
          minHeight: 310,
          maxHeight: 310,
        }}
        title="Reject Reason"
        onClose={() => viewRejectModal(false)}
        modalContent={
          
        }
        onRequestCloseModal={() => viewRejectModal(false)}
      ></ModalContainer> */}

      <ModalContainer
        onRequestCloseModal={onRequestCloseModal}
        showModal={transactionModal}
        modalStyle={{
          minWidth: 300,
          maxWidth: 400,
          height: dimension.height * 0.4,
        }}
        modalContentStyle={{
          width: "100%",
          minHeight: currentTransaction.reject ? 370 : 310,
          maxHeight: currentTransaction.reject ? 370 : 310,
        }}
        title={`${currentTransaction.tranType || "DWR"}${
          tab == "My Pending" || tab == "My DWR"
            ? currentTransaction.reject
              ? "(Rejected)"
              : currentTransaction.finalsanction
              ? "(Approved)"
              : ""
            : !currentTransaction.tranType &&
              currentTransaction?.approval != "Pending"
            ? ` (${currentTransaction?.approval})`
            : ""
        }`}
        subTitle={formatDate(
          new Date(currentTransaction?.eventDate),
          "DD/MM/yyyy"
        )}
        onClose={() => onRequestCloseModal()}
        modalContent={
          rejectModal ? (
            <View
              style={{
                width: "100%",
                height: 295,
                padding: 10,
              }}
            >
              <View style={styles.textAreaContainer}>
                <TextInput
                  style={styles.textArea}
                  underlineColorAndroid="transparent"
                  placeholder="Your message"
                  placeholderTextColor="grey"
                  numberOfLines={10}
                  onChangeText={(x) => setMessage(x)}
                  multiline={true}
                />
                <TouchableOpacity
                  onPress={() => {
                    reject();
                  }}
                  style={{ position: "absolute", right: 5, bottom: 5 }}
                >
                  <Icon name="send" fill="rgb(155, 43, 44)"></Icon>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View
              style={{
                width: "100%",
                padding: 10,
              }}
            >
              {currentTransaction.filePath ? (
                <TouchableOpacity
                  style={{ minHeight: 10 }}
                  onPress={() => downloadDocument(currentTransaction.filePath)}
                >
                  <Text style={{ textDecorationLine: "underline" }}>
                    Click here to view attached document!
                  </Text>
                </TouchableOpacity>
              ) : (
                <></>
              )}
              <View
                style={[
                  styles.textAreaContainer,
                  tab != "My Pending" &&
                  !currentTransaction.tranType &&
                  currentTransaction?.approval == "PENDING"
                    ? { height: 230 }
                    : currentTransaction.reject
                    ? { height: 170 }
                    : {},
                ]}
              >
                <TextInput
                  style={styles.textArea}
                  underlineColorAndroid="transparent"
                  placeholder="Your Daily Work Report"
                  placeholderTextColor="grey"
                  numberOfLines={10}
                  onChangeText={(x) => setMessage(x)}
                  multiline={true}
                  editable={false}
                  value={currentTransaction?.remarks || ""}
                />
              </View>
              {currentTransaction.reject ? (
                <View>
                  <Text
                    style={{
                      marginLeft: 5,
                      marginVertical: 5,
                      fontWeight: "bold",
                    }}
                  >
                    Rejected Reason
                  </Text>

                  <View style={[styles.textAreaContainer, { height: 130 }]}>
                    <TextInput
                      style={styles.textArea}
                      underlineColorAndroid="transparent"
                      placeholderTextColor="grey"
                      numberOfLines={10}
                      multiline={true}
                      editable={false}
                      value={currentTransaction?.rejectReason || ""}
                    />
                  </View>
                </View>
              ) : (
                <></>
              )}
              {tab != "My Pending" &&
              !currentTransaction.tranType &&
              currentTransaction?.approval == "PENDING" ? (
                <View
                  style={{
                    flexDirection: "row-reverse",
                    marginVertical: 3,
                    // right: Platform.OS === "web" ? null : 70,
                  }}
                >
                  <View>
                    <Button
                      onPress={() => {
                        viewTransactionModal(false);
                        approve();
                      }}
                      title="Approve"
                      color="rgb(155, 43, 44)"
                    ></Button>
                  </View>
                  <View style={{ marginRight: 10 }}>
                    <Button
                      onPress={() => {
                        // viewTransactionModal(false);
                        viewRejectModal(true);
                      }}
                      title="Reject"
                      color="rgb(155, 43, 44)"
                    ></Button>
                  </View>
                </View>
              ) : (
                <></>
              )}
            </View>
          )
        }
      ></ModalContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  rowStyle: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#D0D0D0",
    borderRadius: 5,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  textAreaContainer: {
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    height: 250,
    borderRadius: 10,
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 10,
  },
  textArea: {
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

import * as DocumentPicker from "expo-document-picker";
import * as WebBrowser from "expo-web-browser";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { connect } from "react-redux";
import Button from "../../components/buttons/button";
import FilterComponent from "../../components/filter/filter";
import ModalContainer from "../../components/modalContainer/modal";
import config from "../../config/config";
import {
  createDWRApplication,
  createDWRApplicationOnTransactionScreen,
  downloadFile,
} from "../../redux/actions/dwr.action";
import { addError } from "../../redux/actions/toast.action";

const DwrModal = ({
  showModal,
  onRequestCloseModal,
  createDWRApplication,
  addError,
  dwr,
  downloadFile,
  transactionScreen,
  createDWRApplicationOnTransactionScreen,
}) => {
  const dimension = useWindowDimensions();
  const [message, setMessage] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [receiptDate, setReceiptDate] = useState(new Date());
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [tranId, setTranId] = useState(null);
  const [fileRemoved, setFileRemoved] = useState(false);

  useEffect(() => {
    if (dwr) {
      setMessage(dwr.remarks);
      setEventDate(moment(dwr.eventDate, "yyyy-MM-DDThh:mm:ss.sssZ"));
      setReceiptDate(moment(dwr.receiptDate, "yyyy-MM-DDThh:mm:ss.sssZ"));
      setTranId(dwr.tranId);
      setFileName(dwr.filePath ? dwr.file?.originalname : "");
    }
  }, [dwr]);

  const downloadDocument = async () => {
    if (dwr && dwr.filePath) {
      if (Platform.OS != "web") {
        await WebBrowser.openBrowserAsync(
          `${config.baseUrl}api/saved-file?fileId=${dwr.filePath}`
        );
      } else {
        window
          .open(
            `${config.baseUrl}api/saved-file?fileId=${dwr.filePath}`,
            "_blank"
          )
          .focus();
      }
    }
  };

  const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

  const getExt = (fileName) => {
    const fileParts = fileName.split(".");
    return fileParts[fileParts.length - 1];
  };

  function DataURIToBlob(dataURI) {
    const splitDataURI = dataURI.split(",");
    return splitDataURI.length > 1
      ? b64toBlob(splitDataURI[1])
      : b64toBlob(dataURI);
  }

  const selectFile = async () => {
    if (fileName) {
      setFile(null);
      setFileName("");
      setFileRemoved(true);
    } else {
      try {
        const res = await DocumentPicker.getDocumentAsync({
          type: "*/*",
        }).then(async (result) => {
          return {
            name: result.name,
            base64: result.uri,
            type: result.type,
          };
        });
        if (res.type === "success") {
          setFileName(res.name);
          if (Platform.OS === "web") {
            setFile(DataURIToBlob(res.base64));
          } else {
            setFile({
              uri: res.base64,
              type: `application/${getExt(res.name)}`,
              name: res.name,
            });
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const submit = () => {
    if (message && message.length > 0) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("remarks", message);
      formData.append("receiptDate", receiptDate.toString());
      formData.append("eventDate", eventDate.toString());
      formData.append("fileName", fileName);
      formData.append("tranId", tranId);
      formData.append("transactionScreen", transactionScreen ? "Yes" : "No");
      if (fileRemoved) formData.append("fileRemoved", "yes");
      if (transactionScreen) {
        createDWRApplicationOnTransactionScreen(formData);
      } else {
        createDWRApplication(formData);
      }
      clear();
    } else {
      addError("Unable to add DWR without remarks!", 3000);
    }
  };

  const clear = () => {
    setMessage("");
    setFile(null);
    setReceiptDate(new Date());
    setEventDate(new Date());
    onRequestCloseModal();
  };

  return (
    <ModalContainer
      showModal={showModal}
      modalViewStyle={{
        width: dimension.width > 550 ? 400 : dimension.width - 20,
      }}
      title="DWR Save"
      onClose={clear}
      modalContent={
        <View
          style={{
            flex: 1,
            width: dimension.width > 550 ? 380 : dimension.width - 60,
            borderRadius: 10,
            padding: 5,
            alignItems: "center",
            justifyContent: "center",
            margin: 10,
          }}
        >
          <View
            style={{
              flex: 1,
              maxHeight: 50,
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              width: dimension.width > 550 ? 380 : 300,
            }}
          >
            <View style={{ height: 40 }}>
              <Text>Event Date</Text>
              <FilterComponent
                onFilterChange={(v) => setEventDate(v.value)}
                filterConfig={{
                  value: eventDate,
                }}
                type="date"
                update={dwr}
              />
            </View>
            <View style={{ height: 40 }}>
              <Text>Receipt Date</Text>
              <FilterComponent
                onFilterChange={(v) => setReceiptDate(v.value)}
                filterConfig={{
                  value: receiptDate,
                }}
                type="date"
                update={dwr}
              />
            </View>
          </View>

          <Button
            onPress={selectFile}
            title={`${fileName ? "Remove" : "Add"} Document`}
            color="rgb(155, 43, 44)"
          ></Button>
          {fileName ? (
            <TouchableOpacity onPress={() => downloadDocument()}>
              <Text>{fileName}</Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}

          <View
            style={[
              styles.textAreaContainer,
              {
                width: dimension.width > 550 ? 380 : dimension.width - 90,
                flex: 1,
              },
            ]}
          >
            <TextInput
              style={styles.textArea}
              underlineColorAndroid="transparent"
              placeholder="Remarks"
              placeholderTextColor="grey"
              numberOfLines={10}
              onChangeText={(a) => setMessage(a)}
              multiline={true}
              value={message}
            />
          </View>
          <View style={{ flexDirection: "row-reverse", marginVertical: 5 }}>
            <Button
              onPress={() => submit()}
              title="Submit"
              color="rgb(155, 43, 44)"
            ></Button>
          </View>
        </View>
      }
      onRequestCloseModal={onRequestCloseModal}
    ></ModalContainer>
  );
};

const mapStateToProps = ({}) => ({});
export default connect(mapStateToProps, {
  createDWRApplication,
  addError,
  downloadFile,
  createDWRApplicationOnTransactionScreen,
})(DwrModal);

const styles = StyleSheet.create({
  textAreaContainer: {
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    height: 230,
    borderRadius: 10,
  },
  container: {
    flexDirection: "row",

    flexWrap: "wrap",
    margin: 10,
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

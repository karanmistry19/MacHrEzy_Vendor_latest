import React, { useContext } from "react";
import { ScrollView, Text, View } from "react-native";
import { connect } from "react-redux";
import { DimensionContext } from "../dimensionContext";
import ModalContainer from "../modalContainer/modal";

const ApprovalDataPopup = ({ data, showModal, onRequestCloseModal }) => {
  const { window } = useContext(DimensionContext);
  return (
    <ModalContainer
      showModal={showModal}
      modalViewStyle={{
        width: 300,
      }}
      modalStyle={{
        minWidth: 200,
        maxWidth: 300,
        height: window.height * 0.5,
      }}
      modalContentStyle={{
        width: "100%",
        minHeight: 210,
        maxHeight: 300,
      }}
      title="Multiple Sanction Result"
      onClose={onRequestCloseModal}
      modalContent={
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20 }}
          style={{ maxHeight: 290, width: "100%" }}
          scrollEnabled={true}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
        >
          {data.map((e, index) => (
            <View
              key={e.value + "" + index}
              style={{
                backgroundColor: "#fff",
                borderRadius: 5,
                shadowColor: "#696969",
                shadowOpacity: 0.8,
                elevation: 6,
                shadowRadius: 5,
                shadowOffset: { width: 1, height: 1 },
                margin: 10,
                padding: 10,
                flexWrap: "wrap",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                <View style={{ flex: 1 }}>
                  <Text>TXN Id</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text>{e.tranId}</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  marginTop: 4,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text>Employee Code</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text>{e.empCode}</Text>
                </View>
              </View>
              {e.eventDate ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    marginTop: 4,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text>Event Date</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text>{e.eventDate}</Text>
                  </View>
                </View>
              ) : (
                <></>
              )}

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  marginTop: 4,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text>Status</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text>{e.status}</Text>
                </View>
              </View>
              {e.error ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    marginTop: 4,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text>Error</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text>{e.error}</Text>
                  </View>
                </View>
              ) : (
                <></>
              )}
            </View>
          ))}
        </ScrollView>
      }
      onRequestCloseModal={onRequestCloseModal}
    ></ModalContainer>
  );
};

export default connect(null, {})(ApprovalDataPopup);

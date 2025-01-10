import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const holidayListModal = () => {
  return (
    <ModalContainer
      showModal={showHolidayModal}
      modalViewStyle={{
        maxWidth: "100%",
        width: 400,
        maxHeight: 400,
      }}
      modalContent={
        <View
          style={{
            maxHeight: 390,
            height: 390,
            width: 400,
            maxWidth: "100%",
            borderRadius: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Image
              resizeMode={"cover"}
              style={{ height: 40, width: 40, margin: 3 }}
              source={require("../../assets/mImage.png")}
            />
            <Text
              style={{
                marginTop: 10,
                fontSize: 17,
                fontWeight: "700",
                marginRight: 5,
                color: "#9B2B2C",
              }}
            >
              Holiday List
            </Text>

            <TouchableOpacity
              style={{ marginTop: 10, marginRight: 5 }}
              onPress={() => setShowHolidayModal(false)}
            >
              <Icons fill="#000" name="cross"></Icons>
            </TouchableOpacity>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              maxHeight: 390,
              height: 390,
              width: 450,
              maxWidth: "100%",
              marginLeft: 10,
            }}
          >
            {holidays.map((e) => (
              <View
                style={{
                  height: 80,
                  marginTop: 10,
                  borderRadius: 5,
                  width: 340,
                  borderWidth: 2,
                  borderColor: "#A8A8A8",
                  shadowColor: "#696969",
                  shadowOpacity: 0.8,
                  elevation: 6,
                  shadowRadius: 5,
                  shadowOffset: { width: 3, height: 3 },
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      marginLeft: 5,
                      marginTop: 15,
                      fontSize: 14,
                      fontWeight: "800",
                    }}
                  >
                    Date :
                  </Text>
                  <Text style={{ marginLeft: 5, marginTop: 15, fontSize: 14 }}>
                    {e.dateOfHoliday.substr(0, 10)}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 5,
                    marginTop: 15,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "800",
                      fontSize: 14,
                    }}
                  >
                    Holiday Name :
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                    }}
                  >
                    {" "}
                    {e.holiName}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      }
      onRequestCloseModal={onRequestCloseModal}
    ></ModalContainer>
  );
};

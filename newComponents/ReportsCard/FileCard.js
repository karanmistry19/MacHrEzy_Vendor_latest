import { faFile } from "@fortawesome/free-regular-svg-icons";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
const FileCard = ({
  title,
  ShowComponent = null,
  DownloadLink,
  size,
  Date,
  color,
  setShowModal,
  setShowModalContent,
  setShowModalTitle,
  payslipMonth,
  payslipYear,
  reportPeriod,
  DownloadTitle = "Download",
}) => {
  const Windowsize = useWindowDimensions();

  const [selectedTab, setSelectedTab] = useState(false);
  function applyBorder() {
    if (selectedTab) {
      return {
        borderWidth: 1,
        borderColor: "#002AFF",
      };
    }
  }

  const [cardWidth, setCardWidth] = useState(0);

  function find_card_dimesions(layout) {
    const { x, y, width, height } = layout;
    setCardWidth(() => width);
  }

  return (
    <View style={[{ width: "100%" }]}>
      <View
        style={[
          {
            flexDirection: "row",
            backgroundColor: "#CCCCEA",
            width: "100%",
            padding: 10,
            borderRadius: 10,
            marginBottom: 5,
          },
          applyBorder(),
        ]}
        onLayout={(event) => {
          find_card_dimesions(event.nativeEvent.layout);
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            backgroundColor: "",
            // minWidth:100
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ paddingRight: 5 }}>
              <FontAwesomeIcon icon={faFile} size={18} color={color} />
            </View>
            <View
              style={{
                flexDirection: Windowsize?.width > 700 ? "row" : "column",
              }}
            >
              <View style={{ paddingRight: 5 }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: color,
                    fontSize: Windowsize?.width < 700 && 10,
                  }}
                >
                  {title}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: Windowsize?.width > 700 ? "row" : "column",
                }}
              >
                {size && (
                  <View style={{ paddingRight: 5 }}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: color,
                        fontSize: Windowsize?.width < 700 && 10,
                      }}
                    >
                      {size}
                    </Text>
                  </View>
                )}
                {Date && (
                  <View style={{ paddingRight: 5 }}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: color,
                        fontSize: Windowsize?.width < 700 && 10,
                      }}
                    >
                      {Date}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={{ justifyContent: "center", alignItems: "center" }}
          onPress={() => ShowComponent && setSelectedTab((pre) => !pre)}
        >
          {ShowComponent && (
            <FontAwesomeIcon
              icon={selectedTab ? faArrowUp : faArrowDown}
              style={{
                backgroundColor: "#9F232B",
                paddingHorizontal: 10,
                paddingVertical: 2,
                borderRadius: 50,
              }}
              size={10}
              color={"white"}
            />
          )}
          {DownloadLink && (
            <TouchableOpacity
              style={{
                backgroundColor: "red",
                paddingHorizontal: Windowsize?.width > 700 ? 8 : 4,
                paddingVertical: Windowsize?.width > 700 ? 4 : 2,
                borderRadius: 5,
              }}
              onPress={DownloadLink}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  fontSize: Windowsize?.width < 700 && 10,
                }}
              >
                {DownloadTitle}
              </Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </View>
      {selectedTab && ShowComponent && (
        <ShowComponent
          Windowsize={Windowsize}
          setShowModal={setShowModal}
          setShowModalContent={setShowModalContent}
          setShowModalTitle={setShowModalTitle}
          payslipMonth={payslipMonth}
          payslipYear={payslipYear}
          reportPeriod={reportPeriod}
        />
      )}
    </View>
  );
};

export default FileCard;

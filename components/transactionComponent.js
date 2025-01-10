import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { connect } from "react-redux";
import {
  downloadFile,
  dwrApplicationApprove,
  dwrApplicationReject,
} from "../redux/actions/dwr.action";
import { addError } from "../redux/actions/toast.action";
import Button from "./buttons/button";
import { DimensionContext } from "./dimensionContext";
import { ModularCard } from "./modularCard";
import { Table } from "./tables/table";
import { TransactionRow } from "./tables/transaction-row";
import { Tab } from "./tabs/tab";
import { formatDateNew } from "./utils";

const TransactionComponent = ({
  style,
  modularCardStyle,
  tableStyle,
  dwrPendingDetail,
  dwrApprovalPendingList,
  dwrApplicationApprove,
  dwrApplicationReject,
  myPendingTxn,
  teamPendingTxn,
  transactionScreen,
  transactionScreenStyle,
  user,
  downloadFile,
  addError,
  dwrAll,
  onClickAddButton,
}) => {
  const [tableData, setTableData] = useState([]);
  const [selectedTab, setSelectedTab] = useState(
    transactionScreen ? "My DWR" : "My Pending"
  );

  useEffect(() => {
    if (selectedTab === "My Pending" || selectedTab === "My DWR") {
      if ((transactionScreen ? dwrAll : dwrPendingDetail) || myPendingTxn)
        setTableData([
          ...((transactionScreen ? dwrAll : dwrPendingDetail) || []),
          ...(transactionScreen
            ? []
            : myPendingTxn.map((x) => ({
                ...x,
                eventDate: formatDateNew(
                  x.eventDate,
                  "DD/MM/YYYY",
                  "YYYY-MM-DDTHH:mm:ss"
                ),
              })) || []),
        ]);
    } else {
      if (dwrApprovalPendingList || teamPendingTxn)
        setTableData([
          ...(dwrApprovalPendingList.filter(
            (x) => x.mySanctionLevel - x.sanctionLevel === 0
          ) || []),
          ...(transactionScreen
            ? []
            : teamPendingTxn.map((x) => ({
                ...x,
                eventDate: formatDateNew(
                  x.eventDate,
                  "DD/MM/YYYY",
                  "YYYY-MM-DDTHH:mm:ss"
                ),
              })) || []),
        ]);
    }
  }, [
    dwrAll,
    dwrPendingDetail,
    myPendingTxn,
    dwrApprovalPendingList,
    teamPendingTxn,
  ]);

  const setRow = ({ row }) => {
    return [
      {
        component: () => (
          <TransactionRow
            onPressReject={dwrApplicationReject}
            onPressApprove={dwrApplicationApprove}
            tab={selectedTab}
            currentTransaction={row}
            downloadFile={downloadFile}
            addError={addError}
            transactionScreen={transactionScreen}
          ></TransactionRow>
        ),
      },
    ];
  };

  const onChangeTab = (v) => {
    setTableData(
      v === "My Pending" || v === "My DWR"
        ? [
            ...(transactionScreen ? dwrAll : dwrPendingDetail),
            ...(transactionScreen
              ? []
              : myPendingTxn.map((x) => ({
                  ...x,
                  eventDate: formatDateNew(
                    x.eventDate,
                    "DD/MM/YYYY",
                    "YYYY-MM-DDTHH:mm:ss"
                  ),
                }))),
          ]
        : [
            ...dwrApprovalPendingList.filter(
              (x) => x.mySanctionLevel - x.sanctionLevel === 0
            ),
            ...(transactionScreen
              ? []
              : teamPendingTxn.map((x) => ({
                  ...x,
                  eventDate: formatDateNew(
                    x.eventDate,
                    "DD/MM/YYYY",
                    "YYYY-MM-DDTHH:mm:ss.sssZ"
                  ),
                }))),
          ]
    );
    setSelectedTab(v);
  };

  const { window } = useContext(DimensionContext);
  return (
    <View
      style={[
        {
          width:
            window.width < 700
              ? window.width * (transactionScreen ? 0.92 : 1) -
                (transactionScreen ? 5 : 30)
              : window.width < 790
              ? (window.width - 70) * (transactionScreen ? 1 : 0.5)
              : window.width < 1130
              ? (window.width - 70) * (transactionScreen ? 0.7 : 0.5)
              : window.width * (transactionScreen ? 0.4 : 0.27),
          marginVertical: transactionScreen ? 0 : 10,
          marginHorizontal: 10,
        },
        transactionScreenStyle,
      ]}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#383336",
            marginLeft: 10,
            justifyContent: "center",
          }}
        >
          {transactionScreen ? "DWR" : ""} Transaction
        </Text>
        {transactionScreen ? (
          <View style={{ top: 5, right: 5 }}>
            <Button
              onPress={() => onClickAddButton()}
              title="Create DWR"
              color="rgb(155, 43, 44)"
            ></Button>
          </View>
        ) : (
          <></>
        )}
      </View>

      <View>
        <ModularCard
          style={
            transactionScreen
              ? {
                  height:
                    window.height -
                    (Platform.OS === "web"
                      ? 146
                      : 130 + StatusBar.currentHeight),
                  marginVertical: 10,
                }
              : {
                  maxHeight: Platform.OS === "web" ? window.height / 2.7 : 450,
                  minHeight: Platform.OS === "web" ? window.height / 2.7 : 320,
                  marginVertical: 10,
                }
          }
          cardContent={
            <View
              style={
                modularCardStyle
                  ? {}
                  : {
                      maxHeight:
                        Platform.OS === "web" ? window.height / 3 : 200,
                    }
              }
            >
              <Tab
                displayContent={
                  user.userType === "U"
                    ? [`My ${transactionScreen ? "DWR" : "Pending"}`]
                    : [
                        `My ${transactionScreen ? "DWR" : "Pending"}`,
                        "Approval Pending",
                      ]
                }
                selectedTab={selectedTab}
                onTabChange={(v) => onChangeTab(v)}
              ></Tab>
              {tableData?.length < 1 ? (
                <Image
                  source={require("../assets/sorry.png")}
                  style={{
                    height: 200,
                    width: transactionScreen
                      ? Math.min(window.width - 50, 500)
                      : "100%",
                    alignSelf: "center",
                  }}
                ></Image>
              ) : (
                <ScrollView
                  scrollEnabled={true}
                  nestedScrollEnabled={true}
                  showsVerticalScrollIndicator={false}
                  style={[
                    {
                      marginTop: 10,
                      minHeight: Platform.OS === "web" ? 100 : 220,
                      marginBottom: transactionScreen ? 25 : 10,
                    },
                    // style,
                  ]}
                >
                  <Table
                    tableStyle={tableStyle}
                    tableData={tableData}
                    retrivalLogic={setRow}
                  ></Table>
                </ScrollView>
              )}
            </View>
          }
        ></ModularCard>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    margin: 5,
  },
});
const mapStateToProps = ({
  dwrPendingDetail,
  dwrApprovalPendingList,
  myPendingTxn,
  teamPendingTxn,
  user,
  dwrAll,
}) => ({
  dwrPendingDetail,
  dwrApprovalPendingList,
  myPendingTxn,
  teamPendingTxn,
  user,
  dwrAll,
});
export default connect(mapStateToProps, {
  dwrApplicationApprove,
  dwrApplicationReject,
  downloadFile,
  addError,
})(TransactionComponent);

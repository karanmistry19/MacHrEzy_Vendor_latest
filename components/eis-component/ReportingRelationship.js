import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import ReportingItemComp from "./ReportingItemComp";
import ReportingTitle from "./ReportingTitle";

const ReportingRelationship = ({
  navigation,
  fetchEISOfficial,
  eisOfficial,
  eisOfficialSecond,
  fetchEISOfficialSecond,
  user,
}) => {
  return (
    <ScrollView nestedScrollEnabled={true} style={{ flex: 1, height: "100%" }}>
      {eisOfficial?.map((e, i) => {
        return (
          <View key={e.empCode + " " + i} style={styles.container}>
            <View>
              <ReportingTitle header={e.moduleName} />
              {e.sanEmpName1 ? (
                <ReportingItemComp
                  lineStyle={e.sanEmpName2}
                  closeer={true}
                  level={"L 1"}
                  name={e.sanEmpName1.split("-")[0]}
                  subDetails={e.sanEmpName1.split("-")[1]}
                />
              ) : (
                <></>
              )}
              {e.sanEmpName2 ? (
                <ReportingItemComp
                  lineStyle={e.sanEmpName3}
                  style={{
                    borderColor: "#a37d15",
                    color: "#a37d15",
                  }}
                  closeer={true}
                  level={"L 2"}
                  name={e.sanEmpName2.split("-")[0]}
                  subDetails={e.sanEmpName2.split("-")[1]}
                />
              ) : (
                <></>
              )}
              {e.sanEmpName3 ? (
                <ReportingItemComp
                  lineStyle={e.sanEmpName4}
                  style={{ borderColor: "#1a7322", color: "#1a7322" }}
                  closeer={true}
                  level={"L 3"}
                  name={e.sanEmpName3.split("-")[0]}
                  subDetails={e.sanEmpName3.split("-")[1]}
                />
              ) : (
                <></>
              )}
              {e.sanEmpName4 ? (
                <ReportingItemComp
                  lineStyle={e.sanEmpName5}
                  style={{ borderColor: "#473787", color: "#473787" }}
                  closeer={true}
                  level={"L 4"}
                  name={e.sanEmpName4.split("-")[0]}
                  subDetails={e.sanEmpName4.split("-")[1]}
                />
              ) : (
                <></>
              )}
              {e.sanEmpName5 ? (
                <ReportingItemComp
                  lineStyle={false}
                  style={{ borderColor: "#400e3b", color: "#400e3b" }}
                  closeer={true}
                  level={"L 5"}
                  name={e.sanEmpName5.split("-")[0]}
                  subDetails={e.sanEmpName5.split("-")[1]}
                />
              ) : (
                <></>
              )}
            </View>
          </View>
        );
      })}
      {eisOfficialSecond?.map((e, i) => {
        return (
          <View style={styles.container}>
            <View>
              <ReportingTitle header={e.moduleName} />
              {e.sanEmpName1 ? (
                <ReportingItemComp
                  lineStyle={e.sanEmpName2}
                  closeer={true}
                  level={"L 1"}
                  name={e.sanEmpName1.split("-")[0]}
                  subDetails={e.sanEmpName1.split("-")[1]}
                />
              ) : (
                <></>
              )}
              {e.sanEmpName2 ? (
                <ReportingItemComp
                  lineStyle={e.sanEmpName3}
                  style={{
                    borderColor: "#a37d15",
                    color: "#a37d15",
                  }}
                  closeer={true}
                  level={"L 2"}
                  name={e.sanEmpName2.split("-")[0]}
                  subDetails={e.sanEmpName2.split("-")[1]}
                />
              ) : (
                <></>
              )}
              {e.sanEmpName3 ? (
                <ReportingItemComp
                  lineStyle={e.sanEmpName4}
                  style={{ borderColor: "#1a7322", color: "#1a7322" }}
                  closeer={true}
                  level={"L 3"}
                  name={e.sanEmpName3.split("-")[0]}
                  subDetails={e.sanEmpName3.split("-")[1]}
                />
              ) : (
                <></>
              )}
              {e.sanEmpName4 ? (
                <ReportingItemComp
                  lineStyle={e.sanEmpName5}
                  style={{ borderColor: "#473787", color: "#473787" }}
                  closeer={true}
                  level={"L 4"}
                  name={e.sanEmpName4.split("-")[0]}
                  subDetails={e.sanEmpName4.split("-")[1]}
                />
              ) : (
                <></>
              )}
              {e.sanEmpName5 ? (
                <ReportingItemComp
                  lineStyle={false}
                  style={{ borderColor: "#400e3b", color: "#400e3b" }}
                  closeer={true}
                  level={"L 5"}
                  name={e.sanEmpName5.split("-")[0]}
                  subDetails={e.sanEmpName5.split("-")[1]}
                />
              ) : (
                <></>
              )}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 20,
    shadowColor: "#696969",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 1 },
    padding: 15,
    backgroundColor: "#ffffff",
  },
});

export default ReportingRelationship;

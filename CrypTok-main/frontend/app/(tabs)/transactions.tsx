import { StyleSheet } from "react-native";

import ListInfo from "../../components/ListInfo";
// import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import globalStyles from "../../constants/styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
import {
  transactionsDataAugust,
  transactionsDataJuly,
  transactionsDataSeptember,
} from "../../constants/mockData";

const data = {
  months: ["MAY 2024", "JUN 2024", "JUL 2024"],
};

export default function TransactionsScreen() {
  const [selectedMonth, setSelectedMonth] = useState<string>(data.months[0]);

  return (
    <View style={globalStyles.container}>
      {/* Months Selector */}
      <View style={styles.monthsTabs}>
        {data.months.map((month) => (
          <TouchableOpacity key={month} onPress={() => setSelectedMonth(month)}>
            <Text
              style={[
                styles.monthsTab,
                selectedMonth === month && styles.monthsTabHighlighted,
              ]}
            >
              {month}
            </Text>
            {selectedMonth === month && (
              <View style={styles.highlightedColorPill} />
            )}
          </TouchableOpacity>
        ))}
      </View>
      <View></View>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      {/* September */}
      {selectedMonth === "MAY 2024" && (
        <View style={styles.list}>
          {transactionsMonthsFilters.May.map((may_t_data) => (
            <View key={may_t_data.header}>
              <Text style={styles.dateHeader}>{may_t_data.header}</Text>
              {transactionsDataSeptember.map((t_data) => {
                if (t_data.date === may_t_data.dateKey) {
                  return (
                    <ListInfo
                      key={t_data.id}
                      icon={t_data.icon}
                      transferAccount={t_data.transferAccount}
                      transferAction={t_data.transferAction}
                      add={t_data.add}
                      amount={t_data.amount.toFixed(2)}
                      date={t_data.date}
                    />
                  );
                }
              })}
            </View>
          ))}
        </View>
      )}
      {/* August */}
      {selectedMonth === "JUL 2024" && (
        <View style={styles.list}>
          {transactionsMonthsFilters.Jul.map((jul_t_data) => (
            <View key={jul_t_data.header}>
              <Text style={styles.dateHeader}>{jul_t_data.header}</Text>
              {transactionsDataAugust.map((t_data) => {
                if (t_data.date === jul_t_data.dateKey) {
                  return (
                    <ListInfo
                      key={t_data.id}
                      icon={t_data.icon}
                      transferAccount={t_data.transferAccount}
                      transferAction={t_data.transferAction}
                      add={t_data.add}
                      amount={t_data.amount.toFixed(2)}
                      date={t_data.date}
                    />
                  );
                }
              })}
            </View>
          ))}
        </View>
      )}
      {/* July */}
      {selectedMonth === "JUN 2024" && (
        <View style={styles.list}>
          {transactionsMonthsFilters.Jun.map((jun_t_data) => (
            <View key={jun_t_data.header}>
              <Text style={styles.dateHeader}>{jun_t_data.header}</Text>
              {transactionsDataJuly.map((t_data) => {
                if (t_data.date === jun_t_data.dateKey) {
                  return (
                    <ListInfo
                      key={t_data.id}
                      icon={t_data.icon}
                      transferAccount={t_data.transferAccount}
                      transferAction={t_data.transferAction}
                      add={t_data.add}
                      amount={t_data.amount.toFixed(2)}
                      date={t_data.date}
                    />
                  );
                }
              })}
            </View>
          ))}
        </View>
      )}
      {/* Filter transaction data according to months */}
    </View>
  );
}

const transactionsMonthsFilters = {
  Jul: [
    { header: "03 July 2024", dateKey: "03 July" },
    { header: "02 July 2024", dateKey: "02 July" },
    { header: "01 July 2024", dateKey: "01 July" },
  ],
  Jun: [
    { header: "30 Jun 2024", dateKey: "31 Jun" },
    { header: "25 Jun 2024", dateKey: "25 Jun" },
    { header: "18 Jun 2024", dateKey: "18 Jun" },
  ],
  May: [
    { header: "29 May 2024", dateKey: "29 May" },
    { header: "28 May 2024", dateKey: "28 May" },
    { header: "27 May 2024", dateKey: "27 May" },
  ],
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    width: "100%",
    boxShadow: "0px 4px 4px #397684",
  },
  monthsTabs: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    backgroundColor: "none",
  },
  monthsTab: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#858585",
  },
  monthsTabHighlighted: {
    color: "black",
  },
  highlightedColorPill: {
    backgroundColor: "#FF0050",
    height: 12,
    width: "130%",
    transform: "translateY(-70%) translateX(-12%)",
    opacity: 0.2,
    borderRadius: 20,
  },
  list: {
    backgroundColor: "none",
    width: "90%",
    padding: 10,
  },
  dateHeader: {
    fontSize: 16,
    color: "#858585",
    marginTop: 13,
    marginBottom: 5,
  },
});

import { StyleSheet } from "react-native";

import ListInfo from "../../components/ListInfo";
import { Text, View } from "../../components/Themed";
import globalStyles from "../../constants/styles";
import TransferListInfo from "../../components/TransferListInfo";

export default function TopUpScreen() {
  return (
    <View style={globalStyles.container}>
      {/* Separator */}
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      {/* Ways to Topup */}
      <View style={styles.transferSection}>
        <Text style={styles.transferSectionHeader}>Ways to Topup</Text>
        <View
          style={styles.transferSectionSeparator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />

        {/* Transfer Options */}
        <TransferListInfo
          icon="phone-settings"
          iconColor="#7D1879"
          iconBgColor="#ECDCEB"
          label="Using PayNow"
          nextScreenName="home"
        />
        <TransferListInfo
          icon="bank"
          iconColor="#386F3D"
          iconBgColor="#E1E9E2"
          label="From your Bank account"
          nextScreenName="home"
        />
      </View>
    </View>
  );
}

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
  transferSection: {
    alignSelf: "flex-start",
    marginTop: 24,
    paddingHorizontal: 24,
    width: "100%",
  },
  transferSectionHeader: {
    color: "#858585",
    fontWeight: "600",
  },
  transferSectionSeparator: {
    height: 2,
    width: "100%",
    marginTop: 4,
  },
});

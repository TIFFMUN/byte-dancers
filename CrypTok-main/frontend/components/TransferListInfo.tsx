import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";
import Icon from "./Icon";
import { useNavigation } from "@react-navigation/native";

interface TransferListInfoProps {
  icon: string;
  iconColor: string;
  iconBgColor: string;
  label: string;
  nextScreenName: string;
}

export default function TransferListInfo({
  icon,
  iconColor,
  iconBgColor,
  label,
  nextScreenName,
}: TransferListInfoProps) {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(nextScreenName);
  };

  return (
    <View style={{ backgroundColor: "none" }}>
      <View style={styles.mainContainer}>
        {/* Icon + Label */}
        <View
          style={{
            backgroundColor: "none",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Icon */}
          <View
            style={[styles.iconContainer, { backgroundColor: iconBgColor }]}
          >
            <Icon icon={icon} size={27} color={iconColor} />
          </View>
          {/* Label */}
          <Text
            style={[
              styles.transferAccount,
              { marginLeft: 15, backgroundColor: "none" },
            ]}
          >
            {label}
          </Text>
        </View>

        {/* Navigation Arrow */}
        <View style={{ backgroundColor: "none", alignSelf: "center" }}>
          <TouchableOpacity onPress={handlePress}>
            <Icon icon={"arrow-right"} color="#858585" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    backgroundColor: "none",
    padding: 5,
    marginTop: 5,
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
  },
  transferAccount: {
    fontSize: 17,
    lineHeight: 24,
    color: "black",
    fontWeight: "600",
  },
  transferAction: {
    fontSize: 14,
    lineHeight: 24,
    color: "#858585",
    fontWeight: "600",
  },
  iconContainer: {
    padding: 10,
    borderRadius: 40,
  },
  separator: {
    marginTop: 5,
    height: 1,
    width: "100%",
    backgroundColor: "rgba(57, 118, 132, 0.1)",
  },
  addText: {
    fontSize: 15,
    lineHeight: 24,
    color: "#397684",
    fontWeight: "600",
    textAlign: "right",
  },
  minusText: {
    fontSize: 15,
    lineHeight: 24,
    color: "black",
    fontWeight: "600",
    textAlign: "right",
  },
  date: {
    fontSize: 14,
    lineHeight: 24,
    color: "#858585",
    fontWeight: "600",
    textAlign: "right",
  },
});

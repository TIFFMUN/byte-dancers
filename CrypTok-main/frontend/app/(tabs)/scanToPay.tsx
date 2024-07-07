import { StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import globalStyles from "../../constants/styles";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";

export default function ScanToPayScreen() {
  const navigation = useNavigation();

  const handleBarCodeScanned = ({ type, data }: any) => {
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  return (
    <View style={globalStyles.container}>
      {/* Separator */}
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      {/* Camera */}
      <View style={styles.cameraContainer}>
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={styles.camera}
        />
      </View>

      {/* Text */}
      <View style={styles.textContainer}>
        <Text
          style={{
            fontWeight: "bold",
            color: "black",
            textAlign: "center",
            fontSize: 18,
            marginBottom: 12,
          }}
        >
          Scan QR Code
        </Text>
        <Text
          style={{ color: "#858585", textAlign: "center", maxWidth: "75%" }}
        >
          Align camera with QR code to pay in SG, CN, MY, TH and other countries
          worldwide.
        </Text>
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
  cameraContainer: {
    width: "100%",
    height: "70%",
    overflow: "hidden",
    marginBottom: 40,
  },
  camera: {
    flex: 1,
  },
  textContainer: {
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
  },
});

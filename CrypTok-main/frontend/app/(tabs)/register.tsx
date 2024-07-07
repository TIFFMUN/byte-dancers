import { StyleSheet, Image, SafeAreaView, TextInput } from "react-native";

import { Text, View } from "../../components/Themed";
import globalStyles from "../../constants/styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = () => {
    console.log("Handle Log In");
    if (email.length <= 0 || password.length <= 0) {
      setErrorMessage("Please enter your Email and Password!");
      return;
    }
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long!");
      return;
    }
    setErrorMessage("");
    // TODO: Call register api
    const success = true;
    if (success) {
      navigation.navigate("login");
    }
  };

  const handleLogIn = () => {
    navigation.navigate("login");
  };

  return (
    <SafeAreaView
      style={[
        globalStyles.container,
        {
          backgroundColor: "black",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 75,
        },
      ]}
    >
      {/* Logo */}
      <View
        style={{
          backgroundColor: "black",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 6,
          marginVertical: 32,
        }}
      >
        <Image
          source={require("../../assets/logos/logo.png")}
          style={{ height: 42, width: 42 }}
        />
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            paddingTop: 8,
          }}
        >
          TikTokPay
        </Text>
      </View>

      {/* Header */}
      <Text style={styles.title}>Register</Text>

      {/* Login Credentials */}
      <View style={styles.inputGroups}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email:</Text>
          <TextInput
            style={styles.inputField}
            value={email}
            onChangeText={(value) => setEmail(value)}
          ></TextInput>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Password:</Text>
          <TextInput
            style={styles.inputField}
            value={password}
            secureTextEntry={true}
            onChangeText={(value) => setPassword(value)}
          ></TextInput>
        </View>

        {/* Error Message */}
        <Text style={styles.errorMessage}>{errorMessage}</Text>

        {/* Login */}
        <View style={{ backgroundColor: "black", alignSelf: "flex-end" }}>
          <TouchableOpacity onPress={handleLogIn}>
            <Text style={{ color: "#858585", fontSize: 14 }}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#FF0050",
          marginTop: 24,
          paddingHorizontal: 56,
          paddingVertical: 8,
          borderRadius: 50,
        }}
        onPress={handleRegister}
      >
        <Text style={{ color: "white" }}>Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 16,
  },
  inputGroups: {
    alignSelf: "flex-start",
    backgroundColor: "black",
    gap: 8,
  },
  inputGroup: {
    backgroundColor: "black",
    display: "flex",
    flexDirection: "row",
  },
  inputLabel: {
    color: "white",
    fontSize: 16,
    width: 72,
    textAlign: "right",
    marginRight: 12,
  },
  inputField: {
    backgroundColor: "#F5F5F5",
    borderRadius: 3,
  },
  errorMessage: {
    color: "red",
    textAlign: "right",
  },
});

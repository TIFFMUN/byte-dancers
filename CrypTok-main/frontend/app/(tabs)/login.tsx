import { StyleSheet, Image, SafeAreaView, TextInput } from "react-native";

import { Text, View } from "../../components/Themed";
import globalStyles from "../../constants/styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogIn = () => {
    console.log("Handle Log In");
    if (email.length <= 0 || password.length <= 0) {
      setErrorMessage("Invalid Email or Password!");
      return;
    }
    setErrorMessage("");
    // TODO: Call log in api
    const success = true;
    if (success) {
      navigation.navigate("home");
    }
  };

  const handleRegister = () => {
    navigation.navigate("register");
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
          style={{ height: 100, width: 100 }}
        />
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            paddingTop: 8,
          }}
        >
          CrypToK
        </Text>
      </View>

      {/* Header */}
      <Text style={styles.title}>Login</Text>

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

        {/* Register */}
        <View style={{ backgroundColor: "black", alignSelf: "flex-end" }}>
          <TouchableOpacity onPress={handleRegister}>
            <Text style={{ color: "#858585", fontSize: 14 }}>Register</Text>
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
        onPress={handleLogIn}
      >
        <Text style={{ color: "white" }}>Login</Text>
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

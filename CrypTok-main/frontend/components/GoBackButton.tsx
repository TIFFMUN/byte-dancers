import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

export default function GoBackButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("home")}
      style={{ marginLeft: 24, marginTop: 7 }}
    >
      <FontAwesome name="chevron-left" size={20} color="rgb(57, 118, 132)" />
    </TouchableOpacity>
  );
}

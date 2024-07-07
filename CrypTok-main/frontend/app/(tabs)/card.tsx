import { StyleSheet, Image } from "react-native";

import ListInfo from "../../components/ListInfo";
import { Text, View } from "../../components/Themed";
import globalStyles from "../../constants/styles";
import IconButton from "../../components/IconButton";

export default function CardScreen() {
  return (
    <View style={globalStyles.container}> 
      <View style={styles.pageContainer}>
        <Image style={styles.image} source={require("../../assets/images/card-h.png")} resizeMode="contain"/>
        <Text
              style={styles.transferAccount}>
              Virtual Card
        </Text>
        <View style={{backgroundColor:"none", marginTop:30}}>
            <View style={{backgroundColor:"none", flexDirection:"row"}}>
                <Text
                    style={styles.Header}>
                    Debit Balance:
                </Text>
                <Text
                    style={styles.amount}>
                    $0
                </Text>
            </View>
            <View style={{backgroundColor:"none", flexDirection:"row"}}>
            <Text
              style={styles.Header}>
              Credit Balance:
            </Text>
            <Text
                style={styles.amount}>
                $1,000
            </Text>
            </View>
            <View style={{backgroundColor:"none", marginTop:30, flexDirection:"row", justifyContent:"space-around"}}>
                <View style={{ backgroundColor: "none", alignItems: "center" }}>
                <IconButton
                    icon="eye"

                    color="red"
                    size={32}
                />
                <Text style={{ color: "black", fontWeight: "400" }}>
                    View
                </Text>
                </View>
                <View style={{ backgroundColor: "none", alignItems: "center" }}>
                <IconButton
                    icon="lock"

                    color="red"
                    size={32}
                />
                <Text style={{ color: "black", fontWeight: "400" }}>
                    Lock
                </Text>
                </View>
            </View>
        </View>
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
    width: "80%",
  },
  image:{
    width:300,
    height:250,
    alignSelf:"center"
  },
  pageContainer:{
    backgroundColor:"none",
    height:"100%",
    width:"100%"
  },
  transferAccount: {
    fontSize: 17,
    lineHeight: 24,
    color:"#858585",
    fontWeight:"600",
    alignSelf:"center"
  },
  Header: {
    color: "#000", // Color in React Native is specified using a string, e.g., 'black' or '#000'
    fontSize: 20, // Font size is in numeric values, not pixels
    lineHeight: undefined, // Line height is set automatically based on font size
    margin:5,
    marginLeft:20
  },
  amount:{
    color: "#397684", // Color in React Native is specified using a string, e.g., 'black' or '#000'
    fontSize: 20, // Font size is in numeric values, not pixels
    fontWeight:500,
    lineHeight: undefined, // Line height is set automatically based on font size
    margin:5
  }
});

import React from 'react';
import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import Icon from './Icon';


interface ListInfoProps {
  icon: string;
  transferAccount: string;
  transferAction: string;
  add: boolean;
  amount: string;
  date: string;
}

export default function ListInfo({ icon, transferAccount, transferAction, add , amount, date  }: ListInfoProps) {
  return (
    <View style={{backgroundColor:"none"}}>
      <View style={styles.getStartedContainer}>
        <View style={{backgroundColor:"none", flexDirection:"row"}}>
          <View style={styles.iconContainer}>
            <Icon icon={icon} size={27} color="#858585" />
          </View>
          <View style={{marginLeft:15, backgroundColor:"none"}}>
            <Text
              style={styles.transferAccount}>
              {transferAccount}
            </Text>
            <Text
              style={styles.transferAction}>
              {transferAction}
            </Text>
          </View>
        </View>
        <View style={{ backgroundColor:"none", alignSelf:"flex-end"}}>
            {add ? (
            <Text style={styles.addText}>+${amount}</Text>
          ) : (
            <Text style={styles.minusText}>-${amount}</Text>
          )}
          <Text
            style={styles.date}>
            {date}
          </Text>
        </View>
      </View>
      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    width:"100%",
    backgroundColor:"none",
    padding:5,
    marginTop:5,
    flexDirection:"row",
    display:"flex",
    justifyContent:"space-between"
  },
  transferAccount: {
    fontSize: 17,
    lineHeight: 24,
    color:"black",
    fontWeight:"600"
  },
  transferAction:{
    fontSize: 14,
    lineHeight: 24,
    color:"#858585",
    fontWeight:"600"
  },
  iconContainer:{
    backgroundColor:"#E8E6E6",
    padding:10,
    borderRadius:40
  },
  separator: {
    marginTop:5,
    height: 1,
    width: '100%',
    backgroundColor:"rgba(57, 118, 132, 0.1)"
  },
  addText:{
    fontSize: 15,
    lineHeight: 24,
    color:"#397684",
    fontWeight:"600",
    textAlign:"right"
  },
  minusText:{
    fontSize: 15,
    lineHeight: 24,
    color:"black",
    fontWeight:"600",
    textAlign:"right"
  },
  date:{
    fontSize: 14,
    lineHeight: 24,
    color:"#858585",
    fontWeight:"600",
    textAlign:"right"
  }

});

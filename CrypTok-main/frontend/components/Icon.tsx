import React from 'react';
import { StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface IconProps {
  icon: string;
  color?: string;
  size?: number;
}

const Icon: React.FC<IconProps> = ({ icon, color, size = 24 }) => {
    return <MaterialCommunityIcons name={icon} size={size} color={color} />;
};

const styles = StyleSheet.create({
  button: {
    margin: 8, // Adjust the margin as needed
    shadowColor: 'rgba(57, 118, 132, 0.8)',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 7,
  },
});

export default Icon;

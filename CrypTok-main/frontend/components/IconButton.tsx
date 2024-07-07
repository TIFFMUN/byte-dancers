import React from 'react';
import { IconButton as PaperIconButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';

interface IconButtonProps {
  icon: string;
  onPress: () => void;
  color?: string;
  size?: number;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, onPress, color, size = 24 }) => {
  return (
    <PaperIconButton
      icon={icon}
      size={size}
      onPress={onPress}
      style={styles.button}
    />
  );
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

export default IconButton;

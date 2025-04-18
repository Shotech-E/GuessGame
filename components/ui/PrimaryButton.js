import { View, Text, Pressable, StyleSheet } from 'react-native';
import Colors from '../../utils/colors';

function PrimaryButton({ children, onPress }) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.buttonInnerContainer,
          pressed && styles.pressed
        ]}
        onPress={onPress}
        android_ripple={{ color: "#a9e991" }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: 'hidden',
  },
  buttonInnerContainer: {
    backgroundColor: "#1d6f6d",
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonText: {
    color: '#b34053', // Fixed: Added Colors reference
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: "#7aa85d",
  },
});
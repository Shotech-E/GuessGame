import { Text, StyleSheet } from 'react-native';
import Colors from '../../utils/colors';

function InstructionText({ children, style }) {
  return (
    <Text style={[styles.instructionText, style]}>
      {children}
    </Text>
  );
}

export default InstructionText;

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: 'open-sans',
    color: "#b34053",
    fontSize: 24,
    textAlign: 'center',  // Added for better text alignment
    marginVertical: 8,    // Added default vertical spacing
  },
});
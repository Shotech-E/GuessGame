import { View, Text, StyleSheet, Platform } from 'react-native';
import Colors from '../../utils/colors';

function GuessLogItem({ roundNumber, guess }) {
  return (
    <View style={styles.listItem}>
      <Text style={styles.itemText}>#{roundNumber}</Text>
      <Text style={styles.itemText}>Opponent's Guess: {guess}</Text>
    </View>
  );
}

export default GuessLogItem;

const styles = StyleSheet.create({
  listItem: {
    borderColor: "#53f513", // Changed to a more visible color
    borderWidth: 1,
    borderRadius: 40,
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#f6f7c8", // Changed to a more neutral color
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: "#a19595",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
      },
      android: {
        shadowColor: "#a19595",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
      },
    }),
  },
  itemText: {
    fontFamily: 'open-sans',
    color: "#020c04",
  },
});
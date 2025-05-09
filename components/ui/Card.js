import { View, StyleSheet, Dimensions } from 'react-native';
import Colors from '../../utils/colors';

function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}

export default Card;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: deviceWidth < 380 ? 18 : 36,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: "#84c8ad",
    borderColor: "#000201",
    opacity: 0.85,
    borderRadius: 8,
    // Android shadow
    elevation: 4,
    // iOS shadow
    shadowColor: "#d78381",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.5,
  },
});
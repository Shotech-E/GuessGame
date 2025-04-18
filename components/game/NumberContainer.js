import { View, Text, StyleSheet, Dimensions } from 'react-native';

import Colors from '../../utils/colors';

function NumberContainer({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
}

export default NumberContainer;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: '#7aabad',
    padding: deviceWidth < 380 ? 12 : 24,
    margin: deviceWidth < 380 ? 12 : 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    // elevation: 4,
  },
  numberText: {
    color: '#b34053',
    fontSize: deviceWidth < 380 ? 28 : 36,
    // fontWeight: 'bold',
    // fontFamily: 'open-sans-bold'
  },
});
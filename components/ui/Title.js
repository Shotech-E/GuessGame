import { Text, StyleSheet, Platform } from 'react-native';

function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 24,
    color: '#fcfdfd',
    textAlign: 'center',
    ...Platform.select({
      ios: {
        borderWidth: 0
      },
      android: {
        borderWidth: 2,
        borderColor: '#3de999',
      }
    }),
    padding: 12,
    maxWidth: '80%',
    width: 300,
  },
});
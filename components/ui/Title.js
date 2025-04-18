import { Text, StyleSheet, Platform } from 'react-native';

function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 24,
    color: '#84c8ad',
    textAlign: 'center',
    ...Platform.select({
      ios: {
        borderWidth: 0
      },
      android: {
        borderWidth: 4,
        borderColor: '#b34053',
      }
    }),
    padding: 12,
    maxWidth: '80%',
    width: 300,
  },
});
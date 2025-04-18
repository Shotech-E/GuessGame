import {
  View,
  Image,
  Text,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

import Title from '../components/ui/Title';
import PrimaryButton from '../components/ui/PrimaryButton';


function GameOverScreen({ roundsNumber, userNumber, onStartNewGame }) {
  const { width, height } = useWindowDimensions();

  let imageSize = 300;

  if (width < 380) {
    imageSize = 150;
  }

  if (height < 400) {
    imageSize = 80;
  }

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.rootContainer}>
        <Title>YOU WIN!</Title>
        <View style={[styles.imageContainer, imageStyle]}>
          <Image
            style={styles.image}
            source={require('../assets/images/win.jpg')}
          />
        </View>
        <Text style={styles.summaryText}>
          You needed <Text style={styles.highlight}>{roundsNumber}</Text>{' '}
          rounds to guess the number{' '}
          <Text style={styles.highlight}>{userNumber}</Text>.
        </Text>
        <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
      </View>
    </ScrollView>
  );
}

export default GameOverScreen;

// const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  rootContainer: {
    flex: 1,
    marginTop: 100,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    marginTop: 20,
    // opacity: 0.75,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: "#d78381",
  },
  summaryText: {
    fontFamily: 'open-sans',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 24,
    lineHeight: 32,
    color: '#53f508',
  },
  highlight: {
    fontFamily: 'open-sans-bold',
    color: "#f7f0ea",
  },
});
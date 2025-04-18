import { useState, useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet, Alert, FlatList, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import NumberContainer from '../components/game/NumberContainer';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import GuessLogItem from '../components/game/GuessLogItem';

function generateRandomBetween(min, max, exclude) {
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;
  return randomNumber === exclude ? generateRandomBetween(min, max, exclude) : randomNumber;
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);
  const { width } = useWindowDimensions();
  const soundRefs = useRef({
    correct: null,
    wrong: null,
    button: null
  });

  // Load sounds
  useEffect(() => {
    const soundFiles = {
      correct: require('../assets/sounds/correct.wav'),
      wrong: require('../assets/sounds/wrong.wav'),
      button: require('../assets/sounds/button.mp3')
    };

    const loadSounds = async () => {
      try {
        await Promise.all(
          Object.entries(soundFiles).map(async ([key, file]) => {
            const { sound } = await Audio.Sound.createAsync(file);
            soundRefs.current[key] = sound;
            await sound.setVolumeAsync(key === 'button' ? 0.5 : 0.7);
          })
        );
      } catch (error) {
        console.warn("Sound loading error:", error);
      }
    };
    
    loadSounds();
    
    return () => {
      Object.values(soundRefs.current).forEach(sound => {
        sound?.unloadAsync().catch(e => console.warn(e));
      });
    };
  }, []);

  const playSound = useCallback(async (soundKey) => {
    try {
      const sound = soundRefs.current[soundKey];
      if (sound) {
        await sound.replayAsync();
      }
    } catch (error) {
      console.log("Sound playback error:", error);
    }
  }, []);

  useEffect(() => {
    if (currentGuess === userNumber) {
      playSound('correct');
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver, playSound]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  const nextGuessHandler = useCallback((direction) => {
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      playSound('wrong');
      // Alert.alert("Don't lie!", 'You know that this is wrong...', [
      //   { text: 'Sorry!', style: 'cancel' }
      // ]);
      return;
    }

    playSound('button');
    
    if (direction === 'lower') {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }

    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
    setGuessRounds(prev => [newRndNumber, ...prev]);
  }, [currentGuess, userNumber, playSound]);

  const renderContent = () => {
    if (width > 500) {
      return (
        <View style={styles.buttonsContainerWide}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler('lower')}>
              <Ionicons name='remove' size={24} color='white' />
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler('greater')}>
              <Ionicons name='add' size={24} color='white' />
            </PrimaryButton>
          </View>
        </View>
      );
    }

    return (
      <>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card>
          <InstructionText style={styles.instructionText}>
            Higher or lower?
          </InstructionText>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={() => nextGuessHandler('lower')}>
                <Ionicons name='remove' size={24} color='white' />
              </PrimaryButton>
            </View>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={() => nextGuessHandler('greater')}>
                <Ionicons name='add' size={24} color='white' />
              </PrimaryButton>
            </View>
          </View>
        </Card>
      </>
    );
  };

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {renderContent()}
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={({ item, index }) => (
            <GuessLogItem
              roundNumber={guessRounds.length - index}
              guess={item}
            />
          )}
          keyExtractor={(item) => item.toString()}
        />
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 100,
    padding: 24,
    alignItems: 'center'
  },
  instructionText: {
    marginBottom: 12
  },
  buttonsContainer: {
    flexDirection: 'row'
  },
  buttonContainer: {
    flex: 1
  },
  buttonsContainerWide: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  listContainer: {
    flex: 1,
    padding: 16
  }
});
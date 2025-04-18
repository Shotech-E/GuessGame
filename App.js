import { useState, useCallback, useEffect } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import Colors from './utils/colors';

// Screens
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

// Keep the splash screen visible while we load resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [userNumber, setUserNumber] = useState(null);
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);
  const [appIsReady, setAppIsReady] = useState(false);

  // Load custom fonts
  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/Expo-Bold.otf'),
    'open-sans-bold': require('./assets/fonts/Expo-Bold.otf'),
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load any other resources here
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady && fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded]);

  const pickedNumberHandler = useCallback((pickedNumber) => {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
    setGuessRounds(0);
  }, []);

  const gameOverHandler = useCallback((numberOfRounds) => {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }, []);

  const startNewGameHandler = useCallback(() => {
    setUserNumber(null);
    setGuessRounds(0);
  }, []);

  if (!appIsReady || !fontsLoaded) {
    return null;
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  if (userNumber && !gameIsOver) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />;
  } else if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onStartNewGame={startNewGameHandler}
      />
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={["#7aa85d", "#1d6f6d"]}
        style={styles.rootScreen}
      >
        <ImageBackground
          source={require('./assets/gIcon.jpg')}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.rootScreen}>
            {screen}
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}


const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.5,
  },
});
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const choices = {
  rock: 'hand-rock',
  scissors: 'hand-scissors',
  paper: 'hand-paper',
};

const RockPaperScissors = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  const getComputerChoice = () => {
    const keys = Object.keys(choices);
    const randomChoice = keys[Math.floor(Math.random() * keys.length)];
    setComputerChoice(randomChoice);
    return randomChoice;
  };

  const determineWinner = (user, computer) => {
    if (user === computer) {
      return 'Ничья!';
    }
    if (
      (user === 'rock' && computer === 'scissors') ||
      (user === 'scissors' && computer === 'paper') ||
      (user === 'paper' && computer === 'rock')
    ) {
      return 'Вы выиграли!';
    }
    return 'Вы проиграли!';
  };

  const onChoicePress = (choice) => {
    setGameStarted(true);
    const userSelected = choice;
    const computerSelected = getComputerChoice();
    setUserChoice(userSelected);
    const gameResult = determineWinner(userSelected, computerSelected);
    setResult(gameResult);
  };

  const playAgain = () => {
    setGameStarted(false);
    setUserChoice(null);
    setComputerChoice(null);
    setResult('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Камень, Ножницы, Бумага</Text>

      {gameStarted ? (
        <>
          <Text style={styles.resultText}>Результат: {result}</Text>
          <TouchableOpacity onPress={playAgain} style={styles.playAgainButton}>
            <Text style={styles.playAgainText}>Играть заново</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.choicesContainer}>
          {Object.entries(choices).map(([key, icon]) => (
            <TouchableOpacity key={key} style={styles.choiceButton} onPress={() => onChoicePress(key)}>
              <FontAwesome5 name={icon} size={70} color="#4F8EF7" />
            </TouchableOpacity>
          ))}
        </View>
      )}

      {gameStarted && (
        <>
          {userChoice && (
            <Text style={styles.choiceDescription}>
              Вы выбрали:
              <FontAwesome5 name={choices[userChoice]} size={50} color="#4F8EF7" />
            </Text>
          )}
          {computerChoice && (
            <Text style={styles.choiceDescription}>
              Компьютер выбрал:
              <FontAwesome5 name={choices[computerChoice]} size={50} color="#4F8EF7" />
            </Text>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCEFFF', // Soothing blue background color
  },
  header: {
    fontSize: 30,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  choicesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  choiceButton: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
  },
  resultText: {
    fontSize: 28,
    color: '#333',
    marginBottom: 20,
  },
  playAgainButton: {
    backgroundColor: '#FFA07A',
    padding: 10,
    borderRadius: 5,
  },
  playAgainText: {
    fontSize: 20,
    color: '#fff',
  },
  choiceDescription: {
    fontSize: 25,
    color: '#333',
    marginTop: 20,
  },
});

export default RockPaperScissors;

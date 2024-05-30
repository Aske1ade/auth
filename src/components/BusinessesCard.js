import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const BusinessesCard = ({ result }) => {
  return (
    <View style={styles.card}>
      <Image style={styles.image} source={{ uri: result.image_url }} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{result.name}</Text>
        <Text style={styles.details}>{result.rating} Звезды, {result.review_count} Отзывов</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white', // Устанавливаем белый цвет фона карточки
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 15, // Отступы по бокам, чтобы карточки не касались краёв экрана
    marginBottom: 10,
    alignItems: 'center', // Выравниваем содержимое по центру
    shadowColor: '#000', // Добавляем тень для карточки
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 4,
    marginBottom: 5,
  },
  infoContainer: {
    alignItems: 'center', // Выравниваем текст по центру
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  details: {
    fontSize: 14,
    color: 'grey',
  },
});

export default BusinessesCard;

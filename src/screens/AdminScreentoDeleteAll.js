import React from 'react';
import { View, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminScreen = () => {

  const clearSoldSeats = async () => {
    try {
      await AsyncStorage.removeItem('soldSeats');
      Alert.alert('Очистка выполнена', 'Все данные о проданных местах были успешно удалены.');
    } catch (error) {
      console.error('Ошибка при очистке данных:', error);
      Alert.alert('Ошибка', 'Не удалось очистить данные о проданных местах.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="Очистить проданные места"
        onPress={clearSoldSeats}
        color="#ff6347"
      />
    </View>
  );
};

export default AdminScreen;

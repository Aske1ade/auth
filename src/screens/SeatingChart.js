import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const seatingChart = [
  { id: '1', name: 'Балкон', price: 1000, seats: Array.from({ length: 10 }, (_, i) => i + 1) },
  { id: '2', name: 'Ложа №1,3', price: 1500, seats: Array.from({ length: 6 }, (_, i) => i + 1) },
  { id: '3', name: 'Ложа №2', price: 2000, seats: Array.from({ length: 6 }, (_, i) => i + 1) },
  { id: '4', name: 'Амфитеатр', price: 2500, seats: Array.from({ length: 15 }, (_, i) => i + 1) },
  { id: '5', name: 'Партер', price: 3000, seats: Array.from({ length: 20 }, (_, i) => i + 1) },
];

const SeatingChart = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [soldSeats, setSoldSeats] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchSoldSeats = async () => {
      console.log('Fetching sold seats from AsyncStorage...');
      const soldSeatsData = await AsyncStorage.getItem('soldSeats');
      if (soldSeatsData) {
        console.log('Loaded sold seats:', soldSeatsData);
        setSoldSeats(JSON.parse(soldSeatsData));
      } else {
        console.log('No sold seats data found');
      }
    };

    fetchSoldSeats();

    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Screen focused, refetching sold seats...');
      fetchSoldSeats();
    });

    return () => {
      console.log('Unsubscribing from focus listener');
      unsubscribe();
    };
  }, [navigation]);

  const toggleSeatSelection = (section, seatNumber) => {
    const seatId = `${section.id}-${seatNumber}`;
    if (soldSeats.includes(seatId)) {
      console.log('Attempted to select a sold seat:', seatId);
      alert('Это место уже продано.');
      return;
    }
    if (selectedSeats.some(seat => seat.id === seatId)) {
      setSelectedSeats(selectedSeats.filter(seat => seat.id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, { id: seatId, name: section.name, price: section.price, seatNumber }]);
    }
  };

  const handleProceedToPayment = () => {
    if (selectedSeats.length === 0) {
      alert('Вы не выбрали ни одного места!');
      return;
    }
    navigation.navigate('Payment', { selectedSeats });
  };

  const renderSeat = ({ item: section }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{section.name}</Text>
      <FlatList
        data={section.seats}
        renderItem={({ item: seatNumber }) => {
          const seatId = `${section.id}-${seatNumber}`;
          const isSold = soldSeats.includes(seatId);
          const isSelected = selectedSeats.some(seat => seat.id === seatId);
          return (
            <TouchableOpacity
              style={[styles.seat, isSelected && styles.selectedSeat, isSold && styles.soldSeat]}
              onPress={() => toggleSeatSelection(section, seatNumber)}
              disabled={isSold}
            >
              <Text style={styles.seatText}>Место {seatNumber}</Text>
              <Text style={styles.seatText}>{section.price} тг</Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={seatNumber => `${section.id}-${seatNumber}`}
        numColumns={5}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Выберите место</Text>
      <FlatList
        data={seatingChart}
        renderItem={renderSeat}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.proceedButton} onPress={handleProceedToPayment}>
        <Text style={styles.proceedButtonText}>Перейти к оплате</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
  seat: {
    width: '18%',
    backgroundColor: '#e0e0e0',
    margin: 2,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  selectedSeat: {
    backgroundColor: '#ff6347',
  },
  soldSeat: {
    backgroundColor: '#293133', // Черный цвет для обозначения проданных мест
  },
  seatText: {
    fontSize: 12,
  },
  proceedButton: {
    backgroundColor: '#e91e63',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  proceedButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SeatingChart;

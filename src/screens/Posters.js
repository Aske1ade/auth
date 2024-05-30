import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Button, StyleSheet, ActivityIndicator } from 'react-native';

export default function Posters() {
  const [posters, setPosters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosters = async () => {
      try {
        const response = await fetch('http://192.168.1.5:3000/api/posters');
        const data = await response.json();
        setPosters(data);
        setLoading(false);
      } catch (error) {
        console.error('Ошибка при получении афиш:', error);
        setLoading(false);
      }
    };

    fetchPosters();
  }, []);

  const renderPoster = ({ item }) => (
    <View style={styles.posterContainer}>
      <Image source={{ uri: item.image }} style={styles.posterImage} />
      <Text style={styles.posterTitle}>{item.title}</Text>
      <Button title="Купить билет" onPress={() => handleBuyTicket(item)} />
    </View>
  );

  const handleBuyTicket = (poster) => {
    alert(`Покупка билета на ${poster.title}`);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <FlatList
      data={posters}
      renderItem={renderPoster}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
  posterContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  posterImage: {
    width: 200,
    height: 300,
  },
  posterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

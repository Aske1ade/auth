import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, FlatList, View } from 'react-native';
import config from '../api/config';
import BusinessesCard from '../components/BusinessesCard';

const Busnesses = () => {
    
    const [businesses, setBusinesses] = useState([])

    const getBusnesses = async () => {
        try {
            const response = await config.get('/search',
                {
                    params: {
                        limit: 10,
                        location: 'san jose',
                        term: ''
                    }
                })
            // console.log(response.data.businesses)
            setBusinesses(response.data.businesses);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getBusnesses()
    }, [])
    return (
        <View style={styles.container}>
          <FlatList
            data={businesses}
            keyExtractor={(item) => item.id} // Используйте keyExtractor здесь
            renderItem={({ item }) => {
              return <BusinessesCard result={item} />
            }}
          />
        </View>
      );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f0f0', // Цвет фона для всего экрана
      justifyContent: 'center', // Центрирование карточек по вертикали (если необходимо)
    },
    // Остальные стили...
  });
  

export default Busnesses;
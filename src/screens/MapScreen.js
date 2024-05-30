import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import Modal from 'react-native-modal';

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [tempMarker, setTempMarker] = useState(null);
  const [markerTitle, setMarkerTitle] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    })();
  }, []);

  const handlePress = (e) => {
    setTempMarker({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    });
    setModalVisible(true);
  };

  const handleMarkerSubmit = () => {
    setMarkers([...markers, { ...tempMarker, title: markerTitle }]);
    setModalVisible(false);
    setMarkerTitle('');
  };

  return (
    <View style={styles.container}>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        avoidKeyboard={true} // Автоматически избегает перекрытия клавиатурой
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <TextInput
            placeholder="Enter marker title"
            style={styles.textInput}
            onChangeText={setMarkerTitle}
            value={markerTitle}
          />
          <TouchableOpacity style={styles.button} onPress={handleMarkerSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {errorMsg ? (
        <Text>{errorMsg}</Text>
      ) : location ? (
        <MapView 
          style={styles.map} 
          initialRegion={location}
          showsUserLocation
          onPress={handlePress}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              title={marker.title}
            />
          ))}
          <Polyline
            coordinates={markers}
            strokeColor="#FFF" // белый
            strokeWidth={3}
            lineDashPattern={[10, 20]}
          />
        </MapView>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  modal: {
    justifyContent: 'center',
    margin: 0, // Центрирование модального окна
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textInput: {
    width: 300,
    height: 50,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MapScreen;

import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Modal, TouchableOpacity, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import paypalApi from '../api/paypalApi';
import ButtonComp from '../components/ButtonComp';
import WebView from 'react-native-webview';
import queryString from 'query-string';
import getConversionRate from '../utils/currencyConverter';

const PaymentScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [paypalUrl, setPaypalUrl] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [conversionRate, setConversionRate] = useState(1);
  
    useEffect(() => {
      if (route.params?.selectedSeats) {
        setSelectedSeats(route.params.selectedSeats);
      }
    }, [route.params?.selectedSeats]);
  
    useEffect(() => {
      const fetchConversionRate = async () => {
        try {
          const rate = await getConversionRate('KZT', 'USD');
          setConversionRate(rate);
        } catch (error) {
          console.error('Error fetching conversion rate:', error);
        }
      };
  
      fetchConversionRate();
    }, []);

  const onPressPaypal = async () => {
    setLoading(true);
    try {
      const token = await paypalApi.generateToken();
      const orderDetail = createOrderDetail(selectedSeats, conversionRate);
      const res = await paypalApi.createOrder(token, orderDetail);
      setAccessToken(token);
      setLoading(false);
      if (!!res?.links) {
        const findUrl = res.links.find(data => data?.rel == "approve");
        setPaypalUrl(findUrl.href);
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  const createOrderDetail = (seats, conversionRate) => {
    console.log('Creating order details for seats:', seats);
    const items = seats.map(seat => ({
      name: seat.name,
      description: `Место номер ${seat.seatNumber}`,
      quantity: '1',
      unit_amount: {
        currency_code: 'USD',
        value: (seat.price * conversionRate).toFixed(2)
      }
    }));

    const totalAmount = items.reduce((sum, item) => sum + Number(item.unit_amount.value), 0);

    return {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: totalAmount.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: totalAmount.toFixed(2)
              }
            }
          }
        }
      ],
      application_context: {
        return_url: "https://example.com/return",
        cancel_url: "https://example.com/cancel"
      }
    };
  };

  const onUrlChange = (webviewState) => {
    if (webviewState.url.includes('https://example.com/cancel')) {
      clearPaypalState();
      return;
    }
    if (webviewState.url.includes('https://example.com/return')) {
      const urlValues = queryString.parseUrl(webviewState.url);
      const { token } = urlValues.query;
      if (token) {
        paymentSuccess(token);
      }
    }
  };

  const paymentSuccess = async (id) => {
    try {
      const res = await paypalApi.capturePayment(id, accessToken);
      alert("Платеж прошел успешно!");
      await markSeatsAsSold(selectedSeats);
      clearPaypalState();
      navigation.navigate('Businesses', { update: true }); // передаем параметр для обновления экрана
    } catch (error) {
      console.log("Ошибка при подтверждении платежа", error);
    }
  };

  const markSeatsAsSold = async (seats) => {
    console.log('UAHAHAHAHAH');
    const soldSeats = await AsyncStorage.getItem('soldSeats');
    const soldSeatsArray = soldSeats ? JSON.parse(soldSeats) : [];
    seats.forEach(seat => {
      if (!soldSeatsArray.includes(seat.id)) {
        soldSeatsArray.push(seat.id);
      }
    });
    await AsyncStorage.setItem('soldSeats', JSON.stringify(soldSeatsArray));
    console.log('Updated sold seats:', soldSeatsArray);
  };
  const clearPaypalState = () => {
    setPaypalUrl(null);
    setAccessToken(null);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ padding: 16 }}>
          <ButtonComp
            onPress={onPressPaypal}
            disabled={isLoading}
            btnStyle={{ backgroundColor: '#0f4fa3', marginVertical: 16 }}
            text="PayPal"
            isLoading={isLoading}
          />

          <Modal visible={!!paypalUrl}>
            <TouchableOpacity onPress={clearPaypalState} style={{ margin: 24 }}>
              <Text>Close</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <WebView source={{ uri: paypalUrl }} onNavigationStateChange={onUrlChange} />
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PaymentScreen;

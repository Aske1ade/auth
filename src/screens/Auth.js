import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import apiServer from '../api/apiServer'; // Убедитесь, что у вас настроен и импортирован apiServer

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = async () => {
        console.log('Попытка входа');
        if (!email || !password) {
            Alert.alert('Ошибка', 'Введите email и пароль');
            return;
        }

        // Подготавливаем данные для отправки
        const data = {
            email: email,
            password: password,
        };

        try {
            // Отправляем запрос к вашему серверу, используя apiServer
            const response = await apiServer.post('/auth/login', data);
            if (response.status === 200) {
                // Предполагаем, что сервер возвращает токен в response.data.token
                console.log('Logged in:', response.data);
                Alert.alert('Успех', 'Вы успешно вошли в систему!');
                // Здесь можете сохранить полученный токен в AsyncStorage и/или перенаправить пользователя
            } else {
                // Обработка других статусов, если сервер возвращает что-то кроме 200 OK
                console.log('Login failed with status:', response.status);
                Alert.alert('Ошибка авторизации', `Ошибка входа со статусом: ${response.status}`);
            }
        } catch (err) {
            // Ошибка запроса или сервер вернул статус ошибки
            console.error('Login failed:', err);
            Alert.alert('Ошибка авторизации', 'Неправильный email или пароль');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.header}>Авторизация</Text>
                <TextInput
                    placeholder="Email"
                    style={styles.input}
                    value={email}
                    autoCapitalize="none"
                    onChangeText={setEmail}
                />
                <TextInput
                    placeholder="Password"
                    style={styles.input}
                    value={password}
                    secureTextEntry={true}
                    onChangeText={setPassword}
                />
                <TouchableOpacity style={styles.button} onPress={signIn}>
                    <Text style={styles.buttonText}>Войти</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#E8EAED',
    },
    box: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: 30,
        paddingHorizontal: 20,
        elevation: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
    },
    header: {
        fontSize: 24,
        color: '#333',
        fontWeight: '600',
        marginBottom: 25,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#333',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    button: {
        marginTop: 10,
        backgroundColor: '#0066CC',
        borderRadius: 25,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '600',
    },
});

export default Auth;

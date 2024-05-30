import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SelectList } from 'react-native-dropdown-select-list';
import Checkbox from 'expo-checkbox';
import axios from 'axios';

const SendData = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState(new Date());
    const [selectedEducation, setSelectedEducation] = useState('');
    const [isChecked, setIsChecked] = useState(false);


    const data = [
        { key: 1, value: 'Среднее' },
        { key: 2, value: 'Высшее' },
        { key: 3, value: 'Магистратура' },
        { key: 4, value: 'Докторантура' }
    ];

    const handleSubmit = async () => {
        if (!name || !lastName || !email || !selectedEducation || !isChecked) {
            Alert.alert('Ошибка', 'Все поля должны быть заполнены и условия приняты.');
            return;
        }

        const userData = {
            name,
            lastName,
            email,
            dateOfBirth: date.toISOString(),
            education: selectedEducation,
            termsAccepted: isChecked,
    };

    try {
      const response = await fetch('/sendData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        Alert.alert('Успех', 'Данные успешно отправлены.');
      } else {
        throw new Error('Something went wrong!');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Ошибка', 'Произошла ошибка при отправке данных.');
    }
  };
    
    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Имя"
                value={name}
                onChangeText={setName}
                style={styles.input}
                placeholderTextColor={"#000"}
            />
            <TextInput
                placeholder="Фамилия"
                value={lastName}
                onChangeText={setLastName}
                style={styles.input}
                placeholderTextColor={"#000"}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                placeholderTextColor={"#000"}
            />
            <DateTimePicker
                    value={date}
                    mode={'date'}
                    display="default"
                    onChange={(event, selectedDate) => {
                        const currentDate = selectedDate || date;
                        setDate(currentDate);
                    }}
            />
            <SelectList
                data={data}
                setSelected={setSelectedEducation} // use setSelectedEducation instead of setSelected
                placeholder="Выберите образование"
                boxStyles={styles.selectList}
                />

            <View style={styles.checkboxContainer}>
            <Checkbox
                value={isChecked}
                onValueChange={setIsChecked}
                color={isChecked ? '#4630EB' : undefined}
                />
                <Text style={styles.checkboxLabel}>Согласен с условиями</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Отправить</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center', // Выравнивание элементов по центру
        justifyContent: 'center', // Выравнивание элементов по центру
        padding: 20,
        backgroundColor: '#F0F0F0', // Светлый фон, можно выбрать другой цвет
    },
    input: {
        width: '90%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#333',
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    datePickerContainer: {
        width: '100%', // Ширина контейнера на 100% относительно его родителя
        alignItems: 'center', // Центрирование содержимого по горизонтали
        marginBottom: 15,
    },
    datePicker: {
        width: '90%', // Ширина DateTimePicker составляет 90% от ширины контейнера
        backgroundColor: 'white', // Фоновый цвет элемента выбора даты
        borderRadius: 25, // Скругление углов
        padding: 15, // Внутренний отступ
        // Добавление теней для внешнего вида
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    selectList: {
        width: '90%',
        marginBottom: 15,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
    checkboxLabel: {
        marginLeft: 8,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#4A90E2', // Цвет фона кнопки
        padding: 15, // Внутренний отступ
        borderRadius: 10, // Закругление углов
        alignItems: 'center', // Горизонтальное выравнивание текста
        marginTop: 20, // Отступ сверху
        shadowColor: '#000', // Цвет тени
        shadowOffset: { width: 0, height: 2 }, // Смещение тени
        shadowOpacity: 0.25, // Прозрачность тени
        shadowRadius: 3.84, // Радиус размытия тени
        elevation: 5, // Высота элемента над поверхностью (только для Android)
      },
      buttonText: {
        color: '#fff', // Цвет текста
        fontSize: 18, // Размер шрифта
        fontWeight: 'bold', // Жирность шрифта
      },
});
export default SendData;
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, useColorScheme, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; 

const UserProfile = () => {
  const [token, setToken] = useState('');
  const [userImage, setUserImage] = useState('');
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const colorScheme = useColorScheme(); 
  const isDarkMode = colorScheme === 'dark';
  const navigation = useNavigation();  

  useEffect(() => {
    const fetchUserData = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      const storedImage = await AsyncStorage.getItem('userImage');
      const storedId = await AsyncStorage.getItem('id');
      const storedUsername = await AsyncStorage.getItem('username');
      
      if (storedToken) setToken(storedToken);
      if (storedImage) setUserImage(storedImage);
      if (storedId) setUserId(storedId);
      if (storedUsername) setUsername(storedUsername);
    };

    fetchUserData();
  }, []);

  const logout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: async () => {
          await AsyncStorage.clear()
          navigation.reset({
            index: 0,
            routes: [{ name: 'Profile' }],
          });
        }},
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <Image source={{ uri: userImage }} style={styles.image} />
      <Text style={[styles.text, isDarkMode ? styles.darkText : styles.lightText]}>
        Username: {username}
      </Text>

      {/* Logout button */}
      <View style={styles.buttonContainer}>
        <Button title="Logout" onPress={logout} color={isDarkMode ? '#BB86FC' : '#6200EE'} />
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
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 30,
  },
  lightContainer: {
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
});

export default UserProfile;

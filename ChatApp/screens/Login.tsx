import React, {useLayoutEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  TextInput,
  Pressable,
  Alert,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {HEIGHT, WIDTH} from '../utils/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}: any) => {
  const [username, setUsername] = useState('');

  const storeUsername = async () => {
    try {
      await AsyncStorage.setItem('username', username);
      navigation.navigate('Chat');
    } catch (e) {
      Alert.alert('Error! While saving username');
    }
  };

  //👇🏻 checks if the input field is empty
  const handleSignIn = () => {
    if (username.trim()) {
      //👇🏻 Logs the username to the console
      storeUsername();
    } else {
      Alert.alert('닉네임을 입력해주세요.');
    }
  };

  useLayoutEffect(() => {
    const getUsername = async () => {
      try {
        const value = await AsyncStorage.getItem('usename');
        if (value !== null) {
          navigation.navigate('Chat');
        }
      } catch (e) {
        console.error('Error while loading username');
      }
    };
    getUsername();
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <Text style={styles.title}>로그인</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.label}>닉네임</Text>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TextInput
            style={styles.inputbox}
            autoCorrect={false}
            placeholder="사용할 닉네임을 입력해주세요."
            placeholderTextColor={'rgba(255,255,255,0.4)'}
            onChangeText={value => setUsername(value)}
          />
          <Pressable onPress={handleSignIn} style={styles.button}>
            <View>
              <Text style={styles.btnText}>시작하기</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B202D',
  },
  contentContainer: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    padding: 20,
    alignSelf: 'center',
  },
  label: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 19,
  },
  inputbox: {
    paddingHorizontal: 20,
    backgroundColor: '#373E4E',
    borderRadius: 20,
    height: HEIGHT * 48,
    color: '#fff',
    width: '100%',
    marginBottom: 66,
    fontSize: 16,
  },
  button: {
    width: WIDTH * 184,
    height: HEIGHT * 48,
    backgroundColor: '#7A8194',
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

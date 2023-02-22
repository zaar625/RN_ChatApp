import React, {useLayoutEffect, useState, useEffect} from 'react';
import {View, TextInput, Text, FlatList, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MessageComponent from '../components/MessageComponent';
import {styles} from '../utils/styles';
import socket from '../utils/soket';
import Camera from '../assets/icons/camera.svg';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ImagePickerResponse} from 'react-native-image-picker';

const Messaging = ({route, navigation}: any) => {
  const [user, setUser] = useState('');
  const {name, id} = route.params;
  const [roomMember, setRoomMember] = useState(0);
  // console.log(name, id);
  console.log(`방 인원: ${roomMember}`);
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<string | undefined>('');
  console.log(file);

  const getUsername = async () => {
    try {
      const value = await AsyncStorage.getItem('username');
      if (value !== null) {
        setUser(value);
      }
    } catch (e) {
      console.error('Error while loading username!');
    }
  };

  const handleNewMessage = () => {
    const hour =
      new Date().getHours() < 10
        ? `0${new Date().getHours()}`
        : `${new Date().getHours()}`;

    const mins =
      new Date().getMinutes() < 10
        ? `0${new Date().getMinutes()}`
        : `${new Date().getMinutes()}`;

    if (user) {
      socket.emit('newMessage', {
        file,
        message,
        room_id: id,
        user,
        timestamp: {hour, mins},
      });
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({title: name});
    getUsername();
    socket.emit('findRoom', id);
    socket.on('foundRoom', roomChats => {
      setChatMessages(roomChats);
    });
  }, [id, name, navigation]);

  useEffect(() => {
    socket.on('foundRoom', roomChats => setChatMessages(roomChats));
    socket.emit('members', name);
    socket.on('roomMemberCount', count => {
      setRoomMember(count);
    });
  }, [name]);

  // camera
  const onCameraOpen = () => {
    console.log('camera');
    const onPickImage = (res: ImagePickerResponse) => {
      if (res.didCancel || !res) {
        return;
      }
    };
    launchImageLibrary(
      {
        mediaType: 'mixed',
        maxWidth: 768,
        maxHeight: 768,
      },
      onPickImage,
    ).then(res => {
      console.log(`사진앨범: ${res.assets && res.assets[0].uri}`);
      if (res.assets !== undefined) {
        setFile(res.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.messagingscreen}>
      <View
        style={[
          styles.messagingscreen,
          {paddingVertical: 15, paddingHorizontal: 10},
        ]}>
        {chatMessages[0] ? (
          <FlatList
            data={chatMessages}
            renderItem={({item}) => (
              <MessageComponent item={item} user={user} />
            )}
            keyExtractor={item => item.id}
          />
        ) : (
          ''
        )}
      </View>

      <View style={styles.messaginginputContainer}>
        <Pressable onPress={onCameraOpen}>
          <Camera width={20} height={20} />
        </Pressable>
        <TextInput
          style={styles.messaginginput}
          onChangeText={value => setMessage(value)}
        />
        <Pressable
          style={styles.messagingbuttonContainer}
          onPress={handleNewMessage}>
          <View>
            <Text style={{color: '#f2f0f1', fontSize: 20}}>보내기</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Messaging;

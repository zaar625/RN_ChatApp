import React, {useLayoutEffect, useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Text,
  FlatList,
  Pressable,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MessageComponent from '../components/MessageComponent';
import socket from '../utils/soket';
import Camera from '../assets/icons/camera.svg';
import {launchImageLibrary} from 'react-native-image-picker';
import {ImagePickerResponse} from 'react-native-image-picker';
import {StyleSheet} from 'react-native';
import {HEIGHT} from '../utils/styles';
import BackIcon from '../assets/icons/back.svg';
import MenuIcon from '../assets/icons/menu.svg';
import SendIcon from '../assets/icons/send.svg';

interface MessageType {
  image: string;
  movie: string;
  id: string;
  text: string;
  time: string;
  user: string;
}

const Messaging = ({route, navigation}: any) => {
  const [user, setUser] = useState('');
  const {name, id} = route.params;
  const [roomMember, setRoomMember] = useState(0);
  // console.log(name, id);
  console.log(`방 인원: ${roomMember}`);
  const [chatMessages, setChatMessages] = useState<MessageType[]>([]);
  const [message, setMessage] = useState('');
  const [image, setimage] = useState<string | undefined>('');
  const [movie, setmovie] = useState<string | undefined>('');
  console.log(chatMessages);

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
        image,
        movie,
        message,
        room_id: id,
        user,
        timestamp: {hour, mins},
      });
    }
    setMessage('');
    setimage('');
    setmovie('');
  };

  useLayoutEffect(() => {
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

  // camera 활성화
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
        const seperate = res.assets[0].uri?.split('.');

        if (seperate !== undefined) {
          seperate[1] === 'jpg'
            ? setimage(res.assets[0].uri)
            : setmovie(res.assets[0].uri);
        }
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{paddingHorizontal: 20, flex: 1}}>
        <HeaderComponent />
        {/* messages */}
        <View style={{paddingVertical: 20}}>
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
        {/* send  */}
        <View style={styles.send}>
          <Pressable onPress={onCameraOpen} style={styles.cameraCicle}>
            <Camera width={20} height={20} />
          </Pressable>
          <TextInput
            onChangeText={value => setMessage(value)}
            placeholderTextColor={'rgba(255,255,255,0.4)'}
            placeholder="매새지 보내기"
            style={styles.input}
            value={message}
          />
          <Pressable onPress={handleNewMessage}>
            <SendIcon width={30} height={30} />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const HeaderComponent = () => {
  return (
    <View style={styles.headerContainer}>
      <BackIcon width={15} height={15} />
      <Text style={styles.headerTitle}>Room Name</Text>
      <MenuIcon width={15} height={15} />
    </View>
  );
};

export default Messaging;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B202D',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
  },
  send: {
    flexDirection: 'row',
    backgroundColor: '#3D4354',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    alignSelf: 'center',
    height: HEIGHT * 48,
    borderRadius: 25,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cameraCicle: {
    width: 33,
    height: 33,
    borderRadius: 50,
    backgroundColor: '#9398A7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontWeight: '700',
  },
});

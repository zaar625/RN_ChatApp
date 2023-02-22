import React, {useState, useLayoutEffect, useEffect} from 'react';
import {View, Text, Pressable, SafeAreaView, FlatList} from 'react-native';
import WirteIcon from '../assets/icons/write.svg';
import ChatComponent from '../components/ChatComponents';
import {styles} from '../utils/styles';
import Modal from '../components/Modal';
import socket from '../utils/soket';

const Chat = () => {
  const [visible, setVisible] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [count, setCount] = useState('');
  console.log(`rooms : ${JSON.stringify(rooms)}/ counts :${count}`);

  useLayoutEffect(() => {
    function fetchGroups() {
      fetch('http://localhost:4000/api')
        .then(res => res.json())
        .then(data => setRooms(data))
        .catch(err => console.error(err));
    }
    fetchGroups();
  }, []);

  useEffect(() => {
    socket.on('roomsList', (roomsArr, counts) => {
      setRooms(roomsArr);
      setCount(counts);
    });
  }, [rooms, count]);

  const handleCreateGroup = () => setVisible(true);
  return (
    <SafeAreaView style={styles.chatscreen}>
      <View style={styles.chattopContainer}>
        <View style={styles.chatheader}>
          <Text style={styles.chatheading}>Chats</Text>

          {/* 👇🏻 Logs "ButtonPressed" to the console when the icon is clicked */}
          <Pressable onPress={handleCreateGroup}>
            <WirteIcon width={20} height={20} />
          </Pressable>
        </View>
      </View>

      {/* 서버에서 방 리스트를 가져옵니다. */}
      <View style={styles.chatlistContainer}>
        {rooms.length > 0 ? (
          <FlatList
            data={rooms}
            renderItem={({item}) => <ChatComponent item={item} count={count} />}
            keyExtractor={item => item.id}
          />
        ) : (
          <View style={styles.chatemptyContainer}>
            <Text style={styles.chatemptyText}>No rooms created!</Text>
            <Text>Click the icon above to create a Chat room</Text>
          </View>
        )}
      </View>
      {visible ? <Modal setVisible={setVisible} /> : ''}
    </SafeAreaView>
  );
};

export default Chat;

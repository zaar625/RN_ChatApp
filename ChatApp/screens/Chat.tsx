import React, {useState, useLayoutEffect, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  FlatList,
  StyleSheet,
} from 'react-native';
import PlusIcon from '../assets/icons/plus.svg';
import ChatComponent from '../components/ChatComponents';
import CloseIcon from '../assets/icons/close.svg';
import Modal from '../components/Modal';
import socket from '../utils/soket';
import {Modalize} from 'react-native-modalize';

interface RoomsType {
  id: string;
  roomName: string;
  messages: string[];
}

const Chat = () => {
  const [rooms, setRooms] = useState<RoomsType[]>([]);
  console.log(rooms);
  const [count, setCount] = useState('');
  const makeRoomRef = useRef<Modalize>(null);
  console.log(`rooms : ${JSON.stringify(rooms)}/ counts :${count}`);

  const onOpen = () => {
    makeRoomRef.current?.open();
  };

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

  function onBackPress() {
    makeRoomRef.current?.close();
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>채팅</Text>
        <Pressable onPress={onOpen}>
          <PlusIcon width={20} height={20} />
        </Pressable>
      </View>
      {/* 서버에서 방 리스트를 가져옵니다. */}
      <View>
        {rooms.length > 0 ? (
          <FlatList
            data={rooms}
            renderItem={({item}) => <ChatComponent item={item} count={count} />}
            keyExtractor={item => item.id}
          />
        ) : (
          <View style={styles.noListContainer}>
            <Text style={styles.subTitle}>방 만들기</Text>
            <CloseIcon width={15} height={15} style={styles.icon} />
            <Text style={styles.text}>채팅방이 없습니다.</Text>
            <Text style={styles.text}>
              아이콘을 클릭하여 채팅방을 만들어 보세요.
            </Text>
          </View>
        )}
      </View>
      <Modalize ref={makeRoomRef} modalHeight={300}>
        <Modal onBackPress={onBackPress} />
      </Modalize>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B202D',
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  roomListContatiner: {},
  noListContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  subTitle: {
    fontWeight: 'bold',
    fontSize: 26,
    marginBottom: 22,
    color: '#fff',
  },
  icon: {
    marginBottom: 15,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 11,
  },
});

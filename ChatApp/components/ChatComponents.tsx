import {View, Text, Pressable, StyleSheet} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import UserIcon from '../assets/icons/user.svg';
import {useNavigation} from '@react-navigation/native';
import {HEIGHT} from '../utils/styles';

const ChatComponent = ({item, count}: any) => {
  console.log(item);
  const navigation = useNavigation<any>();
  const [messages, setMessages] = useState<any>({});

  useLayoutEffect(() => {
    setMessages(item.messages[item.messages.length - 1]);
  }, [item.messages]);

  const handleNavigation = () => {
    navigation.navigate('Messaging', {
      id: item.id, //룸아이디
      name: item.roomName, //룸네임
    });
  };

  return (
    <View style={{paddingHorizontal: 20}}>
      <Pressable onPress={handleNavigation} style={styles.chatContainer}>
        {/* <Text>{count}</Text> */}
        <View style={styles.iconcircle}>
          <UserIcon width={25} height={25} />
        </View>
        <View style={styles.roomMessageContainer}>
          <View>
            <Text style={styles.roomTitle}>{item.roomName}</Text>
            <Text style={styles.text}>
              {messages?.text ? messages.text : 'Tap to start chatting'}
            </Text>
          </View>
          <View>
            <Text style={styles.text}>
              {messages?.time ? messages.time : 'now'}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default ChatComponent;

const styles = StyleSheet.create({
  chatContainer: {
    flexDirection: 'row',
    backgroundColor: '#292F3F',
    borderRadius: 13,
    paddingHorizontal: 9,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 22,
    height: HEIGHT * 85,
  },
  roomMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  roomTitle: {
    fontWeight: '800',
    fontSize: 15,
    color: '#fff',
    marginBottom: 10,
  },
  text: {
    fontSize: 13,
    color: '#fff',
  },
  iconcircle: {
    width: 52,
    height: 52,
    borderWidth: 1,
    marginRight: 19,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#9398A7',
  },
});

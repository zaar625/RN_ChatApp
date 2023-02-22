import {View, Text, Pressable} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import UserIcon from '../assets/icons/user.svg';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../utils/styles';

const ChatComponent = ({item, count}: any) => {
  console.log(item);
  const navigation = useNavigation();
  const [messages, setMessages] = useState<any>({});

  useLayoutEffect(() => {
    setMessages(item.messages[item.messages.length - 1]);
  }, []);

  const handleNavigation = () => {
    navigation.navigate('Messaging', {
      id: item.id, //룸아이디
      name: item.roomName, //룸네임
    });
  };

  return (
    <Pressable style={styles.cchat} onPress={handleNavigation}>
      <Text>{count}</Text>
      <UserIcon width={20} height={20} style={styles.cavatar} />

      <View style={styles.crightContainer}>
        <View>
          <Text style={styles.cusername}>{item.roomName}</Text>

          <Text style={styles.cmessage}>
            {messages?.text ? messages.text : 'Tap to start chatting'}
          </Text>
        </View>
        <View>
          <Text style={styles.ctime}>
            {messages?.time ? messages.time : 'now'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatComponent;

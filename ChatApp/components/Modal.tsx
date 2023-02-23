import {View, Text, TextInput, Pressable} from 'react-native';
import React, {useState} from 'react';
import socket from '../utils/soket';
import {StyleSheet} from 'react-native';
import {HEIGHT} from '../utils/styles';
import BackIcon from '../assets/icons/back.svg';

type Props = {
  onBackPress: () => void;
};

const Modal = ({onBackPress}: Props) => {
  const [groupName, setGroupName] = useState('');

  //👇🏻 Logs the group name to the console
  const handleCreateRoom = () => {
    socket.emit('createRoom', groupName);
    onBackPress();
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={onBackPress}>
        <BackIcon width={22} style={styles.icon} />
      </Pressable>
      <Text style={styles.label}>방 만들기</Text>
      <TextInput
        style={styles.inputbox}
        placeholder="방 이름을 입력해주세요."
        placeholderTextColor={'rgba(255,255,255,0.4)'}
        onChangeText={value => setGroupName(value)}
      />
      <View style={styles.btnContainer}>
        <Pressable
          onPress={handleCreateRoom}
          style={[styles.btn, {marginRight: 30}]}>
          <Text style={styles.text}>생성</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={onBackPress}>
          <Text style={styles.text}>취소</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Modal;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#1B202D',
    height: 300,
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
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 29,
  },
  btnContainer: {
    flexDirection: 'row',
    // backgroundColor: 'pink',
    alignSelf: 'center',
  },
  btn: {
    paddingHorizontal: 42,
    paddingVertical: 10,
    backgroundColor: '#7A8194',
    borderRadius: 10,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  icon: {
    marginBottom: 30,
  },
});

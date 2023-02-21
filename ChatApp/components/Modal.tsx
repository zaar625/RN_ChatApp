import {View, Text, TextInput, Pressable} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../utils/styles';
import socket from '../utils/soket';

const Modal = ({setVisible}: any) => {
  const [groupName, setGroupName] = useState('');

  //👇🏻 Function that closes the Modal component
  const closeModal = () => setVisible(false);

  //👇🏻 Logs the group name to the console
  const handleCreateRoom = () => {
    socket.emit('createRoom', groupName);
    closeModal();
  };
  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalsubheading}>방 만들기</Text>
      <TextInput
        style={styles.modalinput}
        placeholder="Group name"
        onChangeText={value => setGroupName(value)}
      />

      <View style={styles.modalbuttonContainer}>
        <Pressable style={styles.modalbutton} onPress={handleCreateRoom}>
          <Text style={styles.modaltext}>생성</Text>
        </Pressable>
        <Pressable
          style={[styles.modalbutton, {backgroundColor: '#E14D2A'}]}
          onPress={closeModal}>
          <Text style={styles.modaltext}>취소</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Modal;

import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import UserIcon from '../assets/icons/user.svg';
import Video from 'react-native-video';

export default function MessageComponent({item, user}: any) {
  const status = item.user !== user;
  console.log(item);

  return (
    <View>
      <View
        style={
          status
            ? styles.mmessageWrapper
            : [styles.mmessageWrapper, {alignItems: 'flex-end'}]
        }>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.iconContainer}>
            <UserIcon width={18} height={18} />
          </View>
          {!!item.image && (
            <Image
              style={{width: 50, height: 50, marginRight: 10}}
              source={{uri: `${item.image}`}}
            />
          )}
          <View
            style={
              status
                ? styles.mmessage
                : [styles.mmessage, {backgroundColor: '#7A8194'}]
            }>
            <Text style={{color: '#fff', fontSize: 14, fontWeight: '400'}}>
              {item.text}
            </Text>
          </View>
          <Text style={{marginLeft: 10, color: '#fff'}}>{item.time}</Text>
        </View>
        {item.movie && (
          <Video
            source={{uri: `${item.movie}`}}
            // fullscreen={true}
            style={{width: 200, height: 200}}
            paused={false} // 재생/중지 여부
            resizeMode={'cover'} // 프레임이 비디오 크기와 일치하지 않을 때 비디오 크기를 조정하는 방법을 결정합니다. cover : 비디오의 크기를 유지하면서 최대한 맞게
            onLoad={e => console.log(e)} // 미디어가 로드되고 재생할 준비가 되면 호출되는 콜백 함수입니다.
            repeat={true} //
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mmessage: {
    maxWidth: '50%',
    backgroundColor: '#373E4E',
    padding: 10,
    borderRadius: 10,
    marginBottom: 2,
  },
  mmessageWrapper: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 50,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#7A8194',
    marginRight: 10,
  },
});

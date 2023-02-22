import {View, Text, Image} from 'react-native';
import React from 'react';
import UserIcon from '../assets/icons/user.svg';
import {styles} from '../utils/styles';
import Video from 'react-native-video';

export default function MessageComponent({item, user}: any) {
  const status = item.user !== user;

  return (
    <View>
      <View
        style={
          status
            ? styles.mmessageWrapper
            : [styles.mmessageWrapper, {alignItems: 'flex-end'}]
        }>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <UserIcon width={20} height={20} style={styles.mvatar} />
          <Image
            style={{width: 50, height: 50}}
            source={{uri: `${item.file}`}}
          />
          <View
            style={
              status
                ? styles.mmessage
                : [styles.mmessage, {backgroundColor: 'rgb(194, 243, 194)'}]
            }>
            <Text>{item.text}</Text>
          </View>
        </View>
        <Text style={{marginLeft: 40}}>{item.time}</Text>
        <Video
          source={{uri: `${item.file}`}}
          // fullscreen={true}
          style={{width: 200, height: 200}}
          paused={false} // 재생/중지 여부
          resizeMode={'cover'} // 프레임이 비디오 크기와 일치하지 않을 때 비디오 크기를 조정하는 방법을 결정합니다. cover : 비디오의 크기를 유지하면서 최대한 맞게
          onLoad={e => console.log(e)} // 미디어가 로드되고 재생할 준비가 되면 호출되는 콜백 함수입니다.
          repeat={true} //
        />
      </View>
    </View>
  );
}

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import LogoMail from '../../assets/images/LogoMail.png';
import AlarmMail from '../../assets/images/AlarmMail.png';
import BookMail from '../../assets/images/BookMail.png';

const STATUSBAR_HEIGHT = 48;

const MailHeader = () => {
  const navigation = useNavigation();
  const goToAlarm = () => {
    navigation.navigate('Stack', {
      screen: 'Alarm',
    });
  };

  return (
    <View style={styles.header}>
      <Image
        style={{
          position: 'absolute',
          top: 56.25 - STATUSBAR_HEIGHT,
          left: 20,
          width: 101.94,
          height: 22.5,
        }}
        source={LogoMail}
      />
      <Image
        style={{
          position: 'absolute',
          top: 45 - STATUSBAR_HEIGHT,
          left: 133,
          width: 269,
          height: 283,
        }}
        source={BookMail}
      />
      <TouchableWithoutFeedback onPress={goToAlarm}>
        <Image
          style={{
            position: 'absolute',
            top: 56.24 - STATUSBAR_HEIGHT,
            left: 349,
            width: 19,
            height: 22.51,
          }}
          source={AlarmMail}
        />
      </TouchableWithoutFeedback>
      <View
        style={{position: 'absolute', top: 113 - STATUSBAR_HEIGHT, left: 20}}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontFamily: 'NotoSansKR-Bold',
              ...styles.headerText,
            }}>
            영이&nbsp;
          </Text>
          <Text style={{fontFamily: 'NotoSansKR-Light', ...styles.headerText}}>
            님,{' '}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontFamily: 'NotoSansKR-Bold', ...styles.headerText}}>
            0&nbsp;
          </Text>
          <Text style={{fontFamily: 'NotoSansKR-Light', ...styles.headerText}}>
            개의 메일이
          </Text>
        </View>
        <Text style={{fontFamily: 'NotoSansKR-Light', ...styles.headerText}}>
          도착했습니다.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 261 - STATUSBAR_HEIGHT,
    backgroundColor: '#4562F1',
  },
  headerText: {
    fontSize: 25,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
});

export default MailHeader;

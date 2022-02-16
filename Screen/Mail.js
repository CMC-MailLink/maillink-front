import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import LogoMail from '../assets/images/LogoMail.png';
import AlarmMail from '../assets/images/AlarmMail.png';
import {useNavigation} from '@react-navigation/native';

const Mail = () => {
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
          top: 56.25,
          left: 20,
          width: 101.94,
          height: 22.5,
        }}
        source={LogoMail}
      />
      <TouchableWithoutFeedback onPress={goToAlarm}>
        <Image
          style={{
            position: 'absolute',
            top: 56.24,
            left: 349,
            width: 19,
            height: 22.51,
          }}
          source={AlarmMail}
        />
      </TouchableWithoutFeedback>
      <View style={{position: 'absolute', top: 113, left: 20}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontFamily: 'NotoSansKR-Bold', ...styles.headerText}}>
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
    height: 261,
    backgroundColor: '#4562F1',
  },
  headerText: {
    fontSize: 25,
    color: '#FFFFFF',
  },
});

export default Mail;

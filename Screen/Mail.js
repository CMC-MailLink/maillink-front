import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LogoMail from '../assets/images/LogoMail.png';
import AlarmMail from '../assets/images/AlarmMail.png';
import BookMail from '../assets/images/BookMail.png';
import SearchMail from '../assets/images/SearchMail.png';
import SubscribeMail from '../assets/images/SubscribeMail.png';

const STATUSBAR_HEIGHT = 48;

const Mail = () => {
  const navigation = useNavigation();
  const goToAlarm = () => {
    navigation.navigate('Stack', {
      screen: 'Alarm',
    });
  };
  const pressSearch = () => {
    //search
  };
  return (
    <View>
      {/* header */}
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
            <Text style={{fontFamily: 'NotoSansKR-Bold', ...styles.headerText}}>
              영이&nbsp;
            </Text>
            <Text
              style={{fontFamily: 'NotoSansKR-Light', ...styles.headerText}}>
              님,{' '}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontFamily: 'NotoSansKR-Bold', ...styles.headerText}}>
              0&nbsp;
            </Text>
            <Text
              style={{fontFamily: 'NotoSansKR-Light', ...styles.headerText}}>
              개의 메일이
            </Text>
          </View>
          <Text style={{fontFamily: 'NotoSansKR-Light', ...styles.headerText}}>
            도착했습니다.
          </Text>
        </View>
      </View>
      {/* body */}
      <ScrollView style={styles.bodyContainer}>
        <View style={styles.bodyHeader}>
          <View
            style={{
              width: 129,
              flexDirection: 'row',
              justifyContent: 'space-between',
              left: 36,
            }}>
            <View style={{borderBottomWidth: 2, borderBottomColor: '#4562F1'}}>
              <Text style={{...styles.bodyHeaderText, color: '#000000'}}>
                메일함
              </Text>
            </View>
            <View>
              <Text style={styles.bodyHeaderText}>저장함</Text>
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              width: 92,
              flexDirection: 'row',
              justifyContent: 'space-between',
              right: 19,
            }}>
            <Text style={{...styles.bodyHeaderTextOrder, color: '#000000'}}>
              최신순
            </Text>
            <Text style={styles.bodyHeaderTextOrder}>•</Text>
            <Text style={styles.bodyHeaderTextOrder}>오래된순</Text>
          </View>
        </View>
        <View
          style={{
            height: 450,
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <Image
            style={{width: 261, height: 211, marginBottom: 70}}
            source={SubscribeMail}></Image>
        </View>
      </ScrollView>
      {/* Search */}
      <TouchableOpacity
        onPress={pressSearch}
        style={styles.searchButton}
        activeOpacity={1}>
        <View style={styles.searchView}>
          <Image
            style={{
              width: 22,
              height: 22,
            }}
            source={SearchMail}
          />
        </View>
      </TouchableOpacity>
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
  },
  searchButton: {
    position: 'absolute',
    top: 261 - STATUSBAR_HEIGHT - 22,
    left: 326,
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowRadius: 23,
  },
  searchView: {
    width: 44,
    height: 44,
    borderRadius: 90,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyContainer: {
    backgroundColor: '#FFFFFF',
  },
  bodyHeader: {
    height: 62.01,

    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  bodyHeaderText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#BEBEBE',
    paddingBottom: 8,
  },
  bodyHeaderTextOrder: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 12,
    color: '#BEBEBE',
    paddingBottom: 8,
  },
});

export default Mail;

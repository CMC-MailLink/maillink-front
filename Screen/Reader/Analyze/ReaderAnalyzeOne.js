import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import BackMail2 from '../../../assets/images/BackMail2.png';
import AnalyzeOne from '../../../assets/images/AnalyzeOne.png';

const ReaderAnalyzeOne = () => {
  const navigation = useNavigation();
  const onPressBack = () => {
    navigation.goBack();
  };
  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFF'}} />
      <SafeAreaView style={{flex: 1, backgroundColor: '#4562F1'}}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.headerView}>
          <TouchableWithoutFeedback onPress={onPressBack}>
            <View style={{left: 24}}>
              <Image
                style={{width: 9.5, height: 19}}
                source={BackMail2}></Image>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            paddingTop: 20,
            backgroundColor: '#fff',
          }}>
          <Image style={{width: 370, height: 610}} source={AnalyzeOne}></Image>
        </View>
        <View style={{width: '100%', position: 'absolute', bottom: 0}}>
          <TouchableWithoutFeedback>
            <View
              style={{
                ...styles.bottomView,
                borderBottomColor: '#FFFFFF',
                borderBottomWidth: 1,
              }}>
              <Text style={styles.bottomText}>
                통통 튀는 이야기가 가득한&nbsp;
                <Text style={{fontFamily: 'NotoSansKR-Bold'}}>
                  생활 에세이집
                </Text>
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={{...styles.bottomView, marginBottom: 23.78}}>
              <Text style={styles.bottomText}>
                한번 펼치면 쉽게 헤어나올 수 없는&nbsp;
                <Text style={{fontFamily: 'NotoSansKR-Bold'}}>장편소설</Text>
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    width: '100%',
    height: 91 - 48,
    backgroundColor: '#FFF',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bottomView: {
    width: '100%',
    backgroundColor: '#4562F1',
    paddingVertical: 35,
    alignItems: 'center',
  },
  bottomText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 16,
    color: '#FFF',
  },
});

export default ReaderAnalyzeOne;

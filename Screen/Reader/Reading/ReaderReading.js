import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  StatusBar,
  TextInput,
  Platform,
  Dimensions,
} from 'react-native';
import {LogBox} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';

import AuthorProfileImage from '../../../assets/images/AuthorProfileImage.png';
import BackMail2 from '../../../assets/images/BackMail2.png';
import SendMail2 from '../../../assets/images/SendMail2.png';
import StarMail2 from '../../../assets/images/StarMail2.png';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const ReaderReading = ({navigation: {setOptions}, route: {params}}) => {
  const [subscribe, setSubscribe] = useState(false);
  const url = Platform.select({
    ios: 'http://localhost:3000/readingeditor',
    android: 'http://10.0.2.2:3000/readingeditor',
  });
  const onPressSubscribe = () => {
    setSubscribe(!subscribe);
  };
  const navigation = useNavigation();
  const onPressBack = () => {
    navigation.goBack();
  };
  const onSelectionChange = (
    eventType,
    content,
    selectionStart,
    selectionEnd,
  ) => {
    navigation.navigate('ReaderStacks', {
      screen: 'InstaShare',
      params: content,
    });
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFF'}} />
      {/* <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}> */}
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerView}>
        <TouchableWithoutFeedback onPress={onPressBack}>
          <View style={{left: 24}}>
            <Image style={{width: 9.5, height: 19}} source={BackMail2}></Image>
          </View>
        </TouchableWithoutFeedback>
        {subscribe ? (
          <>
            <TouchableWithoutFeedback>
              <View style={{position: 'absolute', right: 61}}>
                <Image
                  style={{width: 21, height: 20.5}}
                  source={StarMail2}></Image>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View style={{position: 'absolute', right: 22}}>
                <Image
                  style={{width: 21.54, height: 23.82}}
                  source={SendMail2}></Image>
              </View>
            </TouchableWithoutFeedback>
          </>
        ) : null}
      </View>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>{params.item.title}</Text>
        <Text style={styles.dateText}>{params.item.date}</Text>
      </View>
      <View style={styles.authorView}>
        <Image
          style={{width: 30, height: 30, marginRight: 12}}
          source={AuthorProfileImage}></Image>
        <Text style={styles.authorText}>{params.item.author}</Text>
        <TouchableOpacity
          onPress={onPressSubscribe}
          style={subscribe ? styles.subscribeView : styles.subscribeNotView}>
          <View>
            <Text
              style={
                subscribe ? styles.subscribeText : styles.subscribeNotText
              }>
              {subscribe ? '구독중' : '구독하기'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <WebView
        // style={{
        //   height:
        //     Platform.OS == 'ios'
        //       ? Dimensions.get('window').height - 212
        //       : Dimensions.get('window').height - 212 + 48,
        // }}
        automaticallyAdjustContentInsets={false}
        source={{uri: url}}
        menuItems={[{label: '공유', key: 'share'}]}
        onCustomMenuSelection={webViewEvent => {
          const {label} = webViewEvent.nativeEvent; // The name of the menu item, i.e. 'Tweet'
          const {key} = webViewEvent.nativeEvent; // The key of the menu item, i.e. 'tweet'
          const {selectedText} = webViewEvent.nativeEvent; // Text highlighted
        }}
        scrollEnabled={true}
      />
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
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
  },
  titleView: {
    height: 75,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    justifyContent: 'center',
    paddingLeft: 20,
    includeFontPadding: false,
  },
  titleText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 18,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  dateText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    color: '#BEBEBE',
    includeFontPadding: false,
  },
  authorView: {
    height: 46,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingLeft: 20,
    flexDirection: 'row',
  },
  authorText: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 15,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  subscribeView: {
    position: 'absolute',
    right: 20,
    width: 75,
    height: 30,
    borderRadius: 15,
    borderColor: '#BEBEBE',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subscribeNotView: {
    position: 'absolute',
    right: 20,
    width: 75,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4562F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subscribeText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 12,
    color: '#828282',
    includeFontPadding: false,
  },
  subscribeNotText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 12,
    color: '#FFF',
    includeFontPadding: false,
  },
  bodyView: {
    width: '100%',
    padding: 20,
    marginBottom: 150,
  },
  bodyText: {
    color: '#3C3C3C',
    width: '100%',
  },
});
export default ReaderReading;

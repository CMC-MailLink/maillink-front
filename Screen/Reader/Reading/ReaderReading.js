import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StatusBar,
  Platform,
  AccessibilityInfo,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';
import {useQuery, useQueryClient} from 'react-query';
import {ReaderAPI} from '../../../API/ReaderAPI';

import DefaultProfile from '../../../assets/images/DefaultProfile.png';
import BackMail2 from '../../../assets/images/BackMail2.png';
import SendMail2 from '../../../assets/images/SendMail2.png';
import StarMail from '../../../assets/images/StarMail.png';
import NoStarMail from '../../../assets/images/NoStarMail.png';
import {useEffect} from 'react/cjs/react.development';

const ReaderReading = ({navigation: {setOptions}, route: {params}}) => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const url = 'https://www.mail-link.co.kr/readingEditor';
  let webRef = useRef();
  const {isLoading: mailDetailLoading, data: mailDetailData} = useQuery(
    ['ReaderMailDetail', params.mailId],
    ReaderAPI.mailReading,
  );
  const {isLoading: authrInfoLoading, data: authorInfoData} = useQuery(
    ['AuthorInfo', params.writerId],
    ReaderAPI.getWriterInfo,
  );

  useEffect(() => {
    queryClient.refetchQueries(['ReaderMail']);
  }, [queryClient]);

  const onPressBack = () => {
    navigation.goBack();
  };

  const onPressBookmark = async () => {
    if (!mailDetailData.isSaved) {
      var result = await ReaderAPI.mailSaving({
        mailId: mailDetailData.id,
      });
      if (result) {
        await queryClient.refetchQueries(['ReaderMail']);
        await queryClient.refetchQueries(['ReaderMailDetail']);
      }
    } else {
      var result = await ReaderAPI.mailCancelSaving({
        mailId: mailDetailData.id,
      });
      if (result) {
        await queryClient.refetchQueries(['ReaderMail']);
        await queryClient.refetchQueries(['ReaderMailDetail']);
      }
    }
  };

  const onPressSubscribe = async () => {
    if (authorInfoData.subscribeCheck) {
      await ReaderAPI.cancelSubscribing({writerId: authorInfoData.id});
      await queryClient.refetchQueries(['AuthorInfo']);
      await queryClient.refetchQueries(['AuthorList']);
      await queryClient.refetchQueries(['SubscribeAuthorList']);
    } else {
      await ReaderAPI.subscribing({writerId: authorInfoData.id});
      await queryClient.refetchQueries(['AuthorInfo']);
      await queryClient.refetchQueries(['AuthorList']);
      await queryClient.refetchQueries(['SubscribeAuthorList']);
    }
  };

  const onPressSend = async () => {
    console.log(authorInfoData.writerInfo.id);
    navigation.navigate('ReaderStacks', {
      screen: 'MessageWrite',
      params: {writerId: authorInfoData.writerInfo.id},
    });
  };

  const contentSending = `
    let div = document.createElement('div');
    div.classList.add('test');
    var textNode = document.createTextNode('${
      mailDetailData ? mailDetailData.content : ''
    }');
    div.append(textNode);
    div.style.display="none";
    document.body.appendChild(div);
    true;
  `;

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
        {authorInfoData && authorInfoData.subscribeCheck ? (
          <>
            <TouchableWithoutFeedback onPress={() => onPressBookmark()}>
              <View style={{position: 'absolute', right: 61}}>
                {mailDetailData && mailDetailData.isSaved ? (
                  <Image style={{width: 21, height: 20.5}} source={StarMail} />
                ) : (
                  <Image
                    style={{width: 21, height: 20.5}}
                    source={NoStarMail}
                  />
                )}
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={onPressSend}>
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
        <Text style={styles.titleText}>
          {mailDetailData ? mailDetailData.title : null}
        </Text>
        <Text style={styles.dateText}>
          {mailDetailData ? mailDetailData.publishedTime.slice(0, 10) : null}
        </Text>
      </View>
      <View style={styles.authorView}>
        <Image
          style={{width: 30, height: 30, marginRight: 12, borderRadius: 90}}
          source={
            !mailDetailData || mailDetailData.writerImgUrl === ''
              ? DefaultProfile
              : {uri: mailDetailData.writerImgUrl}
          }></Image>
        <Text style={styles.authorText}>
          {authorInfoData ? authorInfoData.writerInfo.nickName : null}
        </Text>
        {/* <View
          // onPress={onPressSubscribe}
          style={
            authorInfoData && authorInfoData.subscribeCheck
              ? styles.subscribeView
              : styles.subscribeNotView
          }>
          <View>
            <Text
              style={
                authorInfoData && authorInfoData.subscribeCheck
                  ? styles.subscribeText
                  : styles.subscribeNotText
              }>
              {authorInfoData && authorInfoData.subscribeCheck
                ? '구독중'
                : '구독하기'}
            </Text>
          </View>
        </View> */}
      </View>
      <WebView
        automaticallyAdjustContentInsets={false}
        source={{uri: url}}
        scrollEnabled={true}
        hideKeyboardAccessoryView={true}
        ref={webRef}
        onMessage={event => {}}
        injectedJavaScript={contentSending}
        menuItems={[{label: '인스타 공유', key: 'shareinstagram'}]}
        onCustomMenuSelection={webViewEvent => {
          const {label} = webViewEvent.nativeEvent; // The name of the menu item, i.e. 'Tweet'
          const {key} = webViewEvent.nativeEvent; // The key of the menu item, i.e. 'tweet'
          const {selectedText} = webViewEvent.nativeEvent; // Text highlighted
          console.log(selectedText);
          navigation.navigate('ReaderStacks', {
            screen: 'InstaShare',
            params: {
              text: selectedText,
              title: params.title,
              // author: params.author,
            },
          });
        }}
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

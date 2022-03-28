import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';
import {useQuery, useQueryClient} from 'react-query';
import {ReaderAPI} from '../../../API/ReaderAPI';
import FastImage from 'react-native-fast-image';

import DefaultProfile from '../../../assets/images/DefaultProfile.png';
import BackMail2 from '../../../assets/images/BackMail2.png';
import {useEffect} from 'react/cjs/react.development';

const ReaderAuthorReading = ({navigation: {setOptions}, route: {params}}) => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const url = 'https://www.mail-link.co.kr/readingEditor';
  let webRef = useRef();
  const [webviewLoading, setWebviewLoading] = useState(true);
  const {isLoading: mailDetailLoading, data: mailDetailData} = useQuery(
    ['ReaderMailDetail', params.mailId],
    ReaderAPI.mailReading,
  );
  const {isLoading: authorInfoLoading, data: authorInfoData} = useQuery(
    ['AuthorInfo', params.writerId],
    ReaderAPI.getWriterInfo,
  );
  const loading = mailDetailLoading || authorInfoLoading;

  useEffect(() => {
    queryClient.refetchQueries(['ReaderMail']);
  }, [queryClient]);

  const onPressBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (!loading && !webviewLoading) {
      console.log('로딩 끝', mailDetailData);
      webRef.current.injectJavaScript(contentSending);
    }
  }, [loading, contentSending, mailDetailData, webviewLoading]);

  const contentSending = `
    let div = document.createElement('div');
    div.classList.add('test');
    var textNode = document.createTextNode('${
      mailDetailData ? mailDetailData.content : 'aa'
    }');
    div.append(textNode);
    div.style.display="none";
    document.body.appendChild(div);
    document.getElementById('loadingButton').click();
    true;
  `;

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFF'}} />
      {/* <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}> */}
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerView}>
        <TouchableWithoutFeedback onPress={onPressBack}>
          <View style={{position: 'absolute', left: 24, width: 20, height: 20}}>
            <FastImage
              style={{width: 9.5, height: 19}}
              source={BackMail2}></FastImage>
          </View>
        </TouchableWithoutFeedback>
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
        <FastImage
          style={{width: 30, height: 30, marginRight: 12, borderRadius: 90}}
          source={
            !mailDetailData || mailDetailData.writerImgUrl === ''
              ? DefaultProfile
              : {uri: mailDetailData.writerImgUrl}
          }></FastImage>
        <Text style={styles.authorText}>
          {authorInfoData ? authorInfoData.writerInfo.nickName : null}
        </Text>
      </View>
      <WebView
        startInLoadingState={true}
        onLoad={() => setWebviewLoading(false)}
        automaticallyAdjustContentInsets={false}
        source={{uri: url}}
        scrollEnabled={true}
        hideKeyboardAccessoryView={true}
        ref={webRef}
        menuItems={[{label: '인스타 공유', key: 'shareinstagram'}]}
        onCustomMenuSelection={webViewEvent => {
          const {label} = webViewEvent.nativeEvent; // The name of the menu item, i.e. 'Tweet'
          const {key} = webViewEvent.nativeEvent; // The key of the menu item, i.e. 'tweet'
          const {selectedText} = webViewEvent.nativeEvent; // Text highlighted
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
export default ReaderAuthorReading;
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
} from 'react-native';
import {LogBox} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';
import {SelectableText} from '@alentoma/react-native-selectable-text';

import AuthorProfileImage from '../../../assets/images/AuthorProfileImage.png';
import BackMail2 from '../../../assets/images/BackMail2.png';
import SendMail2 from '../../../assets/images/SendMail2.png';
import StarMail2 from '../../../assets/images/StarMail2.png';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const AuthorReading = ({navigation: {setOptions}, route: {params}}) => {
  const [subscribe, setSubscribe] = useState(false);
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
    navigation.navigate('AuthorStacks', {
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
            <Image style={{width: 9.5, height: 19}} source={BackMail2} />
          </View>
        </TouchableWithoutFeedback>
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
      </View>
      <ScrollView>
        <View style={styles.bodyView}>
          <SelectableText
            menuItems={['공유']}
            /* 
    Called when the user taps in a item of the selection menu:
    - eventType: (string) is the label
    - content: (string) the selected text portion
    - selectionStart: (int) is the start position of the selected text
    - selectionEnd: (int) is the end position of the selected text
   */
            onSelection={({
              eventType,
              content,
              selectionStart,
              selectionEnd,
            }) => {
              onSelectionChange(
                eventType,
                content,
                selectionStart,
                selectionEnd,
              );
            }}
            value={params.item.body}
            style={styles.bodyText}
          />
        </View>
      </ScrollView>
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
  titleView: {
    height: 75,
    borderTopColor: '#EBEBEB',
    borderTopWidth: 1,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  titleText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 18,
    color: '#3C3C3C',
    marginBottom: 4,
  },
  dateText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    color: '#BEBEBE',
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
  },
  subscribeNotText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 12,
    color: '#FFF',
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
export default AuthorReading;

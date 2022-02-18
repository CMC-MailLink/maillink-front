import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {LogBox} from 'react-native';

import AuthorMail from '../assets/images/AuthorMail.png';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const Reading = ({navigation: {setOptions}, route: {params}}) => {
  const [subscribe, setSubscribe] = useState(false);
  const onPressSubscribe = () => {
    //subscribe
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>{params.item.title}</Text>
        <Text style={styles.dateText}>{params.item.date}</Text>
      </View>
      <View style={styles.authorView}>
        <Image
          style={{width: 30, height: 30, marginRight: 12}}
          source={AuthorMail}></Image>
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
      <ScrollView>
        <View style={styles.bodyView}>
          <Text style={styles.bodyText}>
            {params.item.body}
            {params.item.body}
            {params.item.body}
            {params.item.body}
            {params.item.body}
            {params.item.body}
            {params.item.body}
            {params.item.body}
            {params.item.body}
            {params.item.body}
            {params.item.body}
            {params.item.body}
            {params.item.body}
            {params.item.body}
            {params.item.body}
            {params.item.body}
            {params.item.body}
            {params.item.body}
            {params.item.body}
            {params.item.body}
            {params.item.body}
            {params.item.body}
            {params.item.body}
            {params.item.body}
            {params.item.body}
            {params.item.body}
            {params.item.body}
            {params.item.body}
            {params.item.body}
            {params.item.body}
            {params.item.body}
            {params.item.body}
            {params.item.body}
            {params.item.body}
            {params.item.body}
            {params.item.body}
            {params.item.body}
            {params.item.body}
            {params.item.body}
            {params.item.body}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
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
  },
});
export default Reading;

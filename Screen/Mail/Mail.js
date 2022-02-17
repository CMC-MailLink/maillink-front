import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  Alert,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import MailHeader from './MailHeader';
import MailBody from './MailBody';

import SearchMail from '../../assets/images/SearchMail.png';

const STATUSBAR_HEIGHT = 48;

const Mail = () => {
  const navigation = useNavigation();
  const [searchSelect, setSearchSelect] = useState(false);
  const onPressSearch = () => {
    setSearchSelect(!searchSelect);
  };
  const onPressSearchPage = () => {
    navigation.navigate('Stack', {
      screen: 'MailSearch',
    });
  };

  return (
    <View style={{flex: 1}}>
      <MailHeader></MailHeader>
      <MailBody></MailBody>
      {/* Search */}
      <View
        style={{
          position: 'absolute',
          top: 261 - STATUSBAR_HEIGHT - 22,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}>
        {searchSelect ? (
          <Pressable
            onPress={onPressSearchPage}
            style={styles.searchPageButton}
            activeOpacity={1}>
            <View style={styles.searchPageView}>
              <Text style={styles.searchText}>
                작가 또는 제목을 검색해보세요.
              </Text>
            </View>
          </Pressable>
        ) : null}
        <TouchableOpacity
          onPress={onPressSearch}
          style={{
            ...styles.searchButton,
            shadowColor: searchSelect ? null : '#000000',
            shadowOpacity: searchSelect ? null : 0.12,
            shadowRadius: searchSelect ? null : 23,
          }}
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
    </View>
  );
};

const styles = StyleSheet.create({
  searchButton: {
    position: 'absolute',
    top: 0,
    right: 20,
  },
  searchView: {
    width: 44,
    height: 44,
    borderRadius: 90,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchPageButton: {
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowRadius: 23,
  },
  searchPageView: {
    width: 348,
    height: 44,
    borderRadius: 43,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    paddingLeft: 19,
  },
  searchText: {
    fontFamily: 'NotoSansKR-Light',
    fontSize: 15,
    color: '#D2D2D2',
  },
});

export default Mail;

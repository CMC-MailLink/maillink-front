import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  Text,
  Animated,
  Easing,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import MailHeader from './MailHeader';
import MailBody from './MailBody';

import SearchMail from '../../assets/images/SearchMail.png';

const STATUSBAR_HEIGHT = 48;

const Mail = () => {
  const navigation = useNavigation();
  const [searchSelect, setSearchSelect] = useState(false);
  const [spread, setSpread] = useState(false);
  const [textDisplay, setTextDisplay] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const spreadAnim = useRef(new Animated.Value(0)).current;
  const onPressSearch = () => {
    setSearchSelect(!searchSelect);
    setSpread(!spread);
  };
  const onPressSearchPage = () => {
    navigation.navigate('Stack', {
      screen: 'MailSearch',
    });
  };
  const onRefresh = async () => {
    setRefreshing(true);
    //refresh
    setRefreshing(false);
  };

  useEffect(() => {
    spread
      ? Animated.timing(spreadAnim, {
          toValue: 1,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start(({finished}) => {
          setTextDisplay(true);
        })
      : Animated.timing(spreadAnim, {
          toValue: 0,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start(({finished}) => {
          setTextDisplay(false);
        });
  }, [spread, spreadAnim]);

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
            <Animated.View
              style={{
                ...styles.searchPageView,
                width: spreadAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [44, 348],
                }),
              }}>
              {textDisplay ? (
                <Text style={styles.searchText}>
                  작가 또는 제목을 검색해보세요.
                </Text>
              ) : null}
            </Animated.View>
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
    // width: 348,
    position: 'absolute',
    right: -174,
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

import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';
import {FloatingAction} from 'react-native-floating-action';

import MailHeader from './MailHeader';
import MailBody from './MailBody';

import SearchMail from '../../assets/images/SearchMail.png';
import LogoMail from '../../assets/images/LogoMail.png';
import AlarmMail from '../../assets/images/AlarmMail.png';

const STATUSBAR_HEIGHT = 48;

const Mail = () => {
  const navigation = useNavigation();
  // const [searchSelect, setSearchSelect] = useState(false);
  const [spread, setSpread] = useState(false);
  const [textDisplay, setTextDisplay] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  // const spreadAnim = useRef(new Animated.Value(0)).current;
  // const onPressSearch = () => {
  //   setSearchSelect(!searchSelect);
  //   setSpread(!spread);
  // };
  const onPressSearchPage = () => {
    navigation.navigate('Stacks', {
      screen: 'MailSearch',
    });
  };
  const onRefresh = async () => {
    setRefreshing(true);
    //refresh
    setRefreshing(false);
  };
  const goToAlarm = () => {
    navigation.navigate('Stacks', {
      screen: 'Alarm',
    });
  };

  // useEffect(() => {
  //   spread
  //     ? Animated.timing(spreadAnim, {
  //         toValue: 1,
  //         duration: 200,
  //         easing: Easing.linear,
  //         useNativeDriver: false,
  //       }).start(({finished}) => {
  //         setTextDisplay(true);
  //       })
  //     : Animated.timing(spreadAnim, {
  //         toValue: 0,
  //         duration: 500,
  //         easing: Easing.linear,
  //         useNativeDriver: false,
  //       }).start(({finished}) => {
  //         setTextDisplay(false);
  //       });
  // }, [spread, spreadAnim]);

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#4562F1'}} />
      {/* <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}> */}
      <StatusBar barStyle="light-content" />
      <View style={{height: 50, backgroundColor: '#4562F1'}}>
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
      </View>
      <MailHeader></MailHeader>
      <View style={{position: 'absolute', top: 48, left: 0}}>
        <TouchableOpacity onPress={goToAlarm}>
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
        </TouchableOpacity>
      </View>
      <MailBody></MailBody>
      {/* Search */}
      {/* <View
        style={{
          position: 'absolute',
          top: 261 - 22,
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
      </View> */}
      <FloatingAction
        actions={[
          {
            icon: (
              <Image
                style={{
                  width: 22,
                  height: 22,
                }}
                source={SearchMail}
              />
            ),
            name: 'bt_search',
            position: 1,
            buttonSize: 50,
          },
        ]}
        color="#FFF"
        distanceToEdge={{vertical: 110, horizontal: 17}}
        buttonSize={50}
        shadow={{
          shadowOpacity: 0.12,
          shadowColor: '#000000',
          shadowRadius: 23,
        }}
        overrideWithAction={true}
        animated={false}
        onPressItem={name => onPressSearchPage()}
      />
      {/* </SaferAreaView> */}
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

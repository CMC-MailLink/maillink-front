import React from 'react';
import {View, TouchableOpacity, StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';
import {FloatingAction} from 'react-native-floating-action';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// import AuthorMailHeader from './AuthorMailHeader';
import AuthorMailBody from './AuthorMailBody';

import SearchMail from '../../../assets/images/SearchMail.png';
import LogoMail from '../../../assets/images/LogoMail.png';
import GoMessage from '../../../assets/images/GoMessage.png';

const AuthorMail = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const onPressSearchPage = () => {
    navigation.navigate('AuthorStacks', {
      screen: 'AuthorMailSearch',
    });
  };

  const goToAlarm = () => {
    navigation.navigate('AuthorStacks', {
      screen: 'Alarm',
    });
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#4562F1'}} />
      {/* <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}> */}
      <StatusBar barStyle="light-content" />
      <View
        style={{
          height: 55,
          backgroundColor: '#4562F1',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <FastImage
          style={{
            position: 'absolute',
            left: 20,
            width: 105,
            height: 20,
          }}
          source={LogoMail}
        />
        <TouchableOpacity
          onPress={goToAlarm}
          style={{position: 'absolute', right: 21}}>
          <FastImage
            style={{
              width: 28.5,
              height: 28.3,
            }}
            source={GoMessage}
          />
          {/* <View
            style={{
              position: 'absolute',
              right: 21,
              backgroundColor: '#FF9B9B',
              width: 4,
              height: 4,
              borderRadius: 90,
            }}></View> */}
        </TouchableOpacity>
      </View>
      <AuthorMailBody />
      <FloatingAction
        actions={[
          {
            icon: (
              <FastImage
                style={{
                  width: 22,
                  height: 22.11,
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
        overlayColor="rgba(255,255,255, 0.9)"
        tintColor={null}
        distanceToEdge={{vertical: 95 + insets.bottom / 2, horizontal: 17}}
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

export default AuthorMail;

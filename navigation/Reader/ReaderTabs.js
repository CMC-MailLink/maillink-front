import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ReaderRecommend from '../../Screen/Reader/Recommend/ReaderRecommend';
import ReaderProfile from '../../Screen/Reader/Profile/ReaderProfile';
import ReaderMail from '../../Screen/Reader/Mail/ReaderMail';

import LogoTabs from '../../assets/images/LogoTabs.png';
import HeartTabs from '../../assets/images/HeartTabs.png';
import HeartTabsFocused from '../../assets/images/HeartTabsFocused.png';
import ReaderProfileTabs from '../../assets/images/ProfileTabs.png';
import ReaderProfileTabsFocused from '../../assets/images/ReaderProfileTabsFocused.png';

const ReaderTab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity onPress={onPress} activeOpacity={1}>
    <View
      style={{
        top: 12,
        left: -Dimensions.get('window').width / 2,
      }}>
      <View>{children}</View>
    </View>
  </TouchableOpacity>
);

const ReaderTabs = () => {
  const insets = useSafeAreaInsets();
  console.log(insets.bottom);
  return (
    <ReaderTab.Navigator
      initialRouteName="ReaderMail"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          ...styles.navigator,
          height: insets.bottom / 2 + 76,
        },
      }}
      backBehavior="none">
      <ReaderTab.Screen
        name="recommend"
        component={ReaderRecommend}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                ...styles.iconView,
                marginTop: insets.bottom / 2,
                marginLeft: Dimensions.get('window').width / 10,
              }}>
              <Image
                style={{width: 20.2, height: 18}}
                source={focused ? HeartTabsFocused : HeartTabs}
              />
              <Text
                style={{
                  ...styles.iconText,
                  color: focused ? '#4562F1' : '#BEBEBE',
                }}>
                작가찾기
              </Text>
            </View>
          ),
        }}
      />
      <ReaderTab.Screen
        name="ReaderMail"
        component={ReaderMail}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                width: 88,
                height: 88,
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 90,
                top: -15,
              }}>
              <View
                style={{
                  width: 68.58,
                  height: 68.58,
                  shadowColor: '#4562F1',
                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },
                  shadowOpacity: 0.314,
                  shadowRadius: 5,
                }}>
                <Image
                  style={{width: 68.58, height: 68.58}}
                  source={LogoTabs}
                />
              </View>
            </View>
          ),
          // tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />
      <ReaderTab.Screen
        name="ReaderProfile"
        component={ReaderProfile}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                ...styles.iconView,
                marginTop: insets.bottom / 2,
                marginRight: Dimensions.get('window').width / 10,
              }}>
              <Image
                style={{width: 18, height: 21.27}}
                source={focused ? ReaderProfileTabsFocused : ReaderProfileTabs}
              />
              <Text
                style={{
                  ...styles.iconText,
                  color: focused ? '#4562F1' : '#BEBEBE',
                }}>
                프로필
              </Text>
            </View>
          ),
        }}
      />
    </ReaderTab.Navigator>
  );
};

const styles = StyleSheet.create({
  navigator: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: -2,
        },
        shadowOpacity: 0.18,
        shadowRadius: 15,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  // customButton: {
  //   top: -21,
  //   justifyContent: 'flex-start',
  //   alignItems: 'center',
  //   ...Platform.select({
  //     ios: {
  //       shadowColor: '#4562F1',
  //       shadowOffset: {
  //         width: 0,
  //         height: 5,
  //       },
  //       shadowOpacity: 0.314,
  //       shadowRadius: 10,
  //     },
  //     android: {
  //       elevation: 10,
  //     },
  //   }),
  // },
  customView: {
    width: 64,
    height: 64,
    borderRadius: 90,
    backgroundColor: '#4562F1',
  },
  iconView: {
    alignItems: 'center',
    justifyContent: 'center',
    // position: 'absolute',
    // bottom: Platform.OS === 'ios' ? 3 - 15.36 : 15.36,
  },
  iconText: {
    color: '#BEBEBE',
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 10,
    marginTop: 5,
    includeFontPadding: false,
  },
});

export default ReaderTabs;

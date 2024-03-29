import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AuthorWrite from '../../Screen/Author/Write/AuthorWrite';
import AuthorMail from '../../Screen/Author/Mail/AuthorMail';
import AuthorProfile from '../../Screen/Author/Profile/AuthorProfile';
import FastImage from 'react-native-fast-image';

import LogoTabs from '../../assets/images/LogoTabs.png';
import ReaderProfileTabs from '../../assets/images/ProfileTabs.png';
import ReaderProfileTabsFocused from '../../assets/images/ReaderProfileTabsFocused.png';
import WriteTabs from '../../assets/images/WriteTabs.png';
import WriteTabsFocused from '../../assets/images/WriteTabsFocused.png';

const AuthorTab = createBottomTabNavigator();

// const CustomTabBarButton = ({children, onPress}) => (
//   <TouchableOpacity onPress={onPress} activeOpacity={1}>
//     <View style={{top: 12, left: -Dimensions.get('window').width / 2}}>
//       <View>{children}</View>
//     </View>
//   </TouchableOpacity>
// );

const AuthorTabs = () => {
  const insets = useSafeAreaInsets();
  return (
    <AuthorTab.Navigator
      initialRouteName="AuthorMail"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          ...styles.navigator,
          height: insets.bottom / 2 + 76,
        },
      }}
      backBehavior="none">
      <AuthorTab.Screen
        name="AuthorWrite"
        component={AuthorWrite}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                ...styles.iconView,
                marginTop: insets.bottom / 2,
                marginLeft: Dimensions.get('window').width / 10,
              }}>
              <FastImage
                style={{width: 21, height: 21}}
                source={focused ? WriteTabsFocused : WriteTabs}
              />
              <Text
                style={{
                  ...styles.iconText,
                  color: focused ? '#4562F1' : '#BEBEBE',
                }}>
                메일쓰기
              </Text>
            </View>
          ),
        }}
      />
      <AuthorTab.Screen
        name="AuthorMail"
        component={AuthorMail}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center'}}>
              <View
                style={{
                  width: 88,
                  height: 88,
                  backgroundColor: '#fff',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 90,
                  top: -15,
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
                }}></View>
              <View
                style={{
                  position: 'absolute',
                  bottom:
                    insets.bottom === 0
                      ? -insets.bottom / 2 + 6
                      : -insets.bottom / 2 - 1,
                  backgroundColor: '#fff',
                  width: 150,
                  height: insets.bottom / 2 + 76,
                }}></View>
              <View
                style={{
                  position: 'absolute',
                  bottom: 25,
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
                <FastImage
                  style={{width: 68.58, height: 68.58}}
                  source={LogoTabs}
                />
              </View>
            </View>
          ),
          // tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />
      <AuthorTab.Screen
        name="AuthorProfile"
        component={AuthorProfile}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                ...styles.iconView,
                marginTop: insets.bottom / 2,
                marginRight: Dimensions.get('window').width / 10,
              }}>
              <FastImage
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
        tabBarActiveTintColor="#4562F1"
      />
    </AuthorTab.Navigator>
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
  //   justifyContent: 'center',
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

export default AuthorTabs;

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import AuthorWrite from '../../Screen/Author/Write/AuthorWrite';
import AuthorMail from '../../Screen/Author/Mail/AuthorMail';
import AuthorProfile from '../../Screen/Author/Profile/AuthorProfile';

import LogoTabs from '../../assets/images/LogoTabs.png';
import ReaderProfileTabs from '../../assets/images/ProfileTabs.png';
import ReaderProfileTabsFocused from '../../assets/images/ReaderProfileTabsFocused.png';
import WriteTabs from '../../assets/images/WriteTabs.png';
import WriteTabsFocused from '../../assets/images/WriteTabsFocused.png';

const AuthorTab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity onPress={onPress} activeOpacity={1}>
    <View style={{top: -15.96, left: -Dimensions.get('window').width / 2}}>
      <View>{children}</View>
    </View>
  </TouchableOpacity>
);

const AuthorTabs = () => {
  return (
    <AuthorTab.Navigator
      initialRouteName="AuthorMail"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.navigator,
      }}>
      <AuthorTab.Screen
        name="AuthorWrite"
        component={AuthorWrite}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.iconView}>
              <Image
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
        style={{justifyContent: 'center', alignItems: 'center'}}
        name="AuthorProfile"
        component={AuthorProfile}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.iconView}>
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
        tabBarActiveTintColor="#4562F1"
      />
      <AuthorTab.Screen
        name="AuthorMail"
        component={AuthorMail}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <Image style={{width: 68.58, height: 68.58}} source={LogoTabs} />
            </View>
          ),
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />
    </AuthorTab.Navigator>
  );
};

const styles = StyleSheet.create({
  navigator: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    // height: 103 - 23.78,
    height: 76,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: -2,
        },
        shadowOpacity: 0.13,
        shadowRadius: 29,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  customButton: {
    top: -21,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#4562F1',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.314,
        shadowRadius: 10,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  customView: {
    width: 64,
    height: 64,
    borderRadius: 90,
    backgroundColor: '#4562F1',
  },
  iconView: {
    alignItems: 'center',
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 3 - 15.36 : 15.36,
  },
  iconText: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 10,
    marginTop: 5,
    includeFontPadding: false,
  },
});

export default AuthorTabs;

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';

import AuthorWrite from '../../Screen/Author/Write/AuthorWrite';
import AuthorMail from '../../Screen/Author/Mail/AuthorMail';
import AuthorProfile from '../../Screen/Author/Profile/AuthorProfile';

import LogoTabs from '../../assets/images/LogoTabs.png';
import ProfileTabs from '../../assets/images/ProfileTabs.png';
import WriteTabs from '../../assets/images/WriteTabs.png';

const AuthorTab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => (
  <View style={{}}>
    <TouchableOpacity
      onPress={onPress}
      style={styles.customButton}
      activeOpacity={1}>
      <View style={styles.customView}>{children}</View>
    </TouchableOpacity>
  </View>
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
              <Image style={{width: 21, height: 21}} source={WriteTabs} />
              <Text style={{top: 4, ...styles.iconText}}>메일쓰기</Text>
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
            <View>
              <Image style={{width: 33.6, height: 26.4}} source={LogoTabs} />
            </View>
          ),
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />
      <AuthorTab.Screen
        style={{justifyContent: 'center'}}
        name="AuthorProfile"
        component={AuthorProfile}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.iconView}>
              <Image style={{width: 18, height: 21.27}} source={ProfileTabs} />
              <Text style={{top: 5, ...styles.iconText}}>프로필</Text>
            </View>
          ),
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
    height: 84.5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 23,
  },
  customButton: {
    top: -21,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4562F1',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.314,
    shadowRadius: 10,
  },
  customView: {
    width: 64,
    height: 64,
    borderRadius: 90,
    backgroundColor: '#4562F1',
  },
  iconView: {alignItems: 'center', position: 'absolute', bottom: 3},
  iconText: {
    color: '#BEBEBE',
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 10,
  },
});

export default AuthorTabs;

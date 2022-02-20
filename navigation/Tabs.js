import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import Search from '../Screen/Search';
import Profile from '../Screen/Profile/Profile';
import Mail from '../Screen/Mail/Mail';
import LogoTabs from '../assets/images/LogoTabs.png';
import HeartTabs from '../assets/images/HeartTabs.png';
import ProfileTabs from '../assets/images/ProfileTabs.png';

const Tab = createBottomTabNavigator();

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

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.navigator,
      }}>
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.iconView}>
              <Image style={{width: 20, height: 18}} source={HeartTabs} />
              <Text style={{top: 4, ...styles.iconText}}>작가찾기</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Mail"
        component={Mail}
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
      <Tab.Screen
        style={{justifyContent: 'center'}}
        name="Profile"
        component={Profile}
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
    </Tab.Navigator>
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

export default Tabs;

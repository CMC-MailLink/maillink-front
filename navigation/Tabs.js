import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import Search from '../Screen/Search';
import Mail from '../Screen/Mail';
import Profile from '../Screen/Profile';
import LogoTabs from '../assets/images/LogoTabs.png';
import SearchTabs from '../assets/images/SearchTabs.png';
import ProfileTabs from '../assets/images/ProfileTabs.png';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.customButton}
    activeOpacity={1}>
    <View style={styles.customView}>{children}</View>
  </TouchableOpacity>
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
          tabBarIcon: ({focused}) => (
            <View style={styles.iconView}>
              <Image source={SearchTabs} />
              <Text style={{top: 4, ...styles.iconText}}>작가찾기</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Mail"
        component={Mail}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image source={LogoTabs} />
            </View>
          ),
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.iconView}>
              <Image source={ProfileTabs} />
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
    borderTopEndRadius: 15,
    height: 103,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: -6,
    },
    shadowOpacity: 0.07,
    shadowRadius: 30,
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
    width: 80,
    height: 80,
    borderRadius: 90,
    backgroundColor: '#4562F1',
  },
  iconView: {alignItems: 'center', top: 13},
  iconText: {
    color: '#BEBEBE',
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 12,
  },
});

export default Tabs;

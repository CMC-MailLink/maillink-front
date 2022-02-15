import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import Search from '../Screen/Search';
import Mail from '../Screen/Mail';
import Profile from '../Screen/Profile';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image></Image>
              <Text>작가찾기</Text>
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
              <Image></Image>
              <Text>Mail</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image></Image>
              <Text>프로필</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

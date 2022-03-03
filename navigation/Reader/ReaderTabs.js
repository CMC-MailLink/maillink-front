import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import ReaderRecommend from '../../Screen/Reader/Recommend/ReaderRecommend';
import ReaderProfile from '../../Screen/Reader/Profile/ReaderProfile';
import ReaderMail from '../../Screen/Reader/Mail/ReaderMail';

import LogoTabs from '../../assets/images/LogoTabs.png';
import HeartTabs from '../../assets/images/HeartTabs.png';
import ReaderProfileTabs from '../../assets/images/ProfileTabs.png';

const ReaderTab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => (
  <View style={{top: -15.96}}>
    <TouchableOpacity onPress={onPress} activeOpacity={1}>
      <View>{children}</View>
    </TouchableOpacity>
  </View>
);

const ReaderTabs = () => {
  return (
    <ReaderTab.Navigator
      initialRouteName="ReaderMail"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.navigator,
      }}>
      <ReaderTab.Screen
        name="recommend"
        component={ReaderRecommend}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.iconView}>
              <Image style={{width: 20, height: 18}} source={HeartTabs} />
              <Text style={styles.iconText}>작가찾기</Text>
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
            <View>
              <Image style={{width: 68.58, height: 68.58}} source={LogoTabs} />
            </View>
          ),
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />
      <ReaderTab.Screen
        style={{justifyContent: 'center', alignItems: 'center'}}
        name="ReaderProfile"
        component={ReaderProfile}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.iconView}>
              <Image
                style={{width: 18, height: 21.27}}
                source={ReaderProfileTabs}
              />
              <Text style={styles.iconText}>프로필</Text>
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
    color: '#BEBEBE',
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 10,
    marginTop: 5,
    includeFontPadding: false,
  },
});

export default ReaderTabs;

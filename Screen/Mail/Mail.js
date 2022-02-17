import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';

import MailHeader from './MailHeader';
import MailBody from './MailBody';

import SearchMail from '../../assets/images/SearchMail.png';

const STATUSBAR_HEIGHT = 48;

const Mail = () => {
  const pressSearch = () => {
    //search
  };

  return (
    <View style={{flex: 1}}>
      <MailHeader></MailHeader>
      <MailBody></MailBody>
      {/* Search */}
      <TouchableOpacity
        onPress={pressSearch}
        style={styles.searchButton}
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
    </View>
  );
};

const styles = StyleSheet.create({
  searchButton: {
    position: 'absolute',
    top: 261 - STATUSBAR_HEIGHT - 22,
    left: 326,
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowRadius: 23,
  },
  searchView: {
    width: 44,
    height: 44,
    borderRadius: 90,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Mail;

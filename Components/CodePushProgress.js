import React from 'react';
import {View, StyleSheet, Modal, Text} from 'react-native';
import FastImage from 'react-native-fast-image';

import CodePushUpdate from '../assets/images/CodePushUpdate.png';

const CodePushProgress = ({progress}) => (
  <Modal transparent visible={true}>
    <View style={styles.modalBack}>
      <View style={styles.modal}>
        <Text style={styles.updateText}>업데이트 중입니다.</Text>
        <Text style={styles.byteText}>
          <Text
            style={{
              color: '#828282',
            }}>
            {`${(Number(progress.receivedBytes) / 1048576).toFixed(2)}`}
            &nbsp;
          </Text>
          <Text
            style={{
              color: '#BEBEBE',
            }}>
            {`MB / ${(Number(progress.totalBytes) / 1048576).toFixed(2)}`}
            &nbsp;
          </Text>
          MB
        </Text>
        <FastImage style={styles.codePushUpdate} source={CodePushUpdate} />
        <Text style={styles.percentText}>
          {(
            (Number(progress?.receivedBytes) / Number(progress?.totalBytes)) *
            100
          ).toFixed(0)}
          <Text style={styles.percentIcon}>&nbsp;%</Text>
        </Text>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalBack: {
    flex: 1,
    backgroundColor: 'rgba(55,55,55,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    width: 330,
    height: 334,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 18,
    color: '#3c3c3c',
    includeFontPadding: false,
  },
  byteText: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 15,
    color: '#D2D2D2',
    includeFontPadding: false,
  },
  percentText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 26,
    color: '#4562F1',
    includeFontPadding: false,
  },
  percentIcon: {fontSize: 16, color: '#BEBEBE'},
  codePushUpdate: {width: 157, height: 148, marginTop: 23, marginBottom: 13},
});

export default CodePushProgress;

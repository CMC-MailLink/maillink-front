import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const ReaderAnalyzeResult = ({navigation: {setOptions}, route: {params}}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{params}</Text>
    </View>
  );
};

export default ReaderAnalyzeResult;

import React, {useState, useEffect, useRef} from 'react';
import {Text, StyleSheet} from 'react-native';

const Timer = ({sec}) => {
  const [second, setSecond] = useState(sec);
  const [delay, setDelay] = useState(1000);
  const [isRunning, setIsRunning] = useState(true);

  useInterval(
    () => {
      setSecond(second - 1);
    },
    second >= 1 ? delay : null,
  );

  //setIsRunning(false);

  return (
    <Text style={{...styles.text}}>
      {' '}
      {Math.floor(second / 60)} :{' '}
      {second < 10 ? '0' + (second % 60) : second % 60}{' '}
    </Text>
  );
};

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    color: '#4562F1',
  },
});

export default Timer;

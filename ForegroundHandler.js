import PushNotificationIOS from '@react-native-community/push-notification-ios';
import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';

const ForegroundHandler = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(remoteMessage => {
      console.log('received in foreground', remoteMessage);
      const {notification, messageId} = remoteMessage;
      if (Platform.OS === 'ios') {
        PushNotificationIOS.addNotificationRequest({
          id: messageId,
          body: notification.body,
          title: notification.title,
          sound: 'default',
        });
      } else {
        PushNotification.createChannel({
          channelId: messageId,
          channelName: messageId,
        });

        PushNotification.localNotification({
          channelId: messageId,
          message: notification.body,
          title: notification.title,
        });
      }
    });
    return unsubscribe;
  }, []);
  return null;
};

export default ForegroundHandler;

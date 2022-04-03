import PushNotificationIOS from '@react-native-community/push-notification-ios';
import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';

const ForegroundHandler = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(remoteMessage => {
      console.log('received in foreground', remoteMessage);
      const {notification, messageId} = remoteMessage;
      PushNotificationIOS.addNotificationRequest({
        id: messageId,
        body: notification.body,
        title: notification.title,
        sound: 'default',
      });
    });
    return unsubscribe;
  }, []);
  return null;
};

export default ForegroundHandler;

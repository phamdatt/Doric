import React from 'react';
import { View, ImageBackground, Dimensions } from 'react-native';
import { assetImages } from '../../config';
import { Text, Box } from 'native-base'
const NotificationsScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <ImageBackground source={assetImages.notification} style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width }} resizeMode="contain">
      
      </ImageBackground>

    </View>
  );
};
export default NotificationsScreen;

import React, { useMemo } from 'react';
import { View, ImageBackground, ScrollView, Text } from 'react-native';
import { Box, Heading } from 'native-base';
import { SCREEN_NAME } from '../../screensContants/contants';
import UserLoginSection from './UserLoginSection';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import UserSectionInfo from './UserSectionInfo';
import SettingApp from './SettingApp';
import { userSelectors } from '@/redux/store/userReducerScreen';
import { useAppSelector } from '@/redux';
const UserHomeScreen = () => {
  const isLogg = useAppSelector(userSelectors.isLogger);
  const isLogger = useMemo(() => {
    return isLogg;
  }, [isLogg]);

  const insets = useSafeAreaInsets();
  const BG_IMG =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxX59pFvKjRu8vzR048WMewkQN4lE9Fmu6_Q&usqp=CAU';
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: 'white' }}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={{ uri: BG_IMG }}
          style={{
            paddingTop: insets.top + 50,
            paddingBottom: 30,
            flex: 1,
          }}
          imageStyle={{
            resizeMode: 'cover',
            height: 200,
          }}
        >
          {
            isLogger === true ? null : <UserLoginSection />
          }
        </ImageBackground>
        <UserSectionInfo />
        <SettingApp />
      </ScrollView>
    </View>
  );
};

export default UserHomeScreen;

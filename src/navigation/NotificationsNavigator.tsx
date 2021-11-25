import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NotificationsScreen from '../screens/notifications/NotificationsScreen';
import NotifcationsCart from '../screens/notifications/NotifcationsCart';
import { Box } from 'native-base';
const Tab = createMaterialTopTabNavigator();

const NotificationsNavigator = () => {
  return (
    <Box flex={1} safeAreaTop backgroundColor="white">
      <Tab.Navigator>
        <Tab.Screen
          name="Thông báo"
          component={NotificationsScreen}
        />
        <Tab.Screen name="Danh sách đơn hàng" component={NotifcationsCart} />
      </Tab.Navigator>
    </Box>
  );
};

export default NotificationsNavigator;

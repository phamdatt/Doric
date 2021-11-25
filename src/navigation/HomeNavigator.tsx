import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "../screens/home/HomeScreen";
import CategoryMenu from "../screens/CategoryMenu";
import { FontAwesome } from "@expo/vector-icons";
import NotificationsNavigator from "./NotificationsNavigator";
import { SCREEN_NAME } from "../screensContants/contants";
import UserHomeScreen from "../screens/user/UserHomeScreen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const Tab = createMaterialBottomTabNavigator();

function HomeNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={SCREEN_NAME.HOME}
      activeColor="black"
      inactiveColor="#808080"
      barStyle={{
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Tab.Screen
        name={SCREEN_NAME.HOME}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faHome} size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Category"
        component={CategoryMenu}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="list" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={SCREEN_NAME.NOTIFICATIONS_NAVIGATOR}
        component={NotificationsNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="bell" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={SCREEN_NAME.User}
        component={UserHomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={22} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default HomeNavigator;

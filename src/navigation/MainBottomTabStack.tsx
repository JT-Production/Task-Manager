import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home/HomeScreen";
import TaskScreen from "../screens/tasks/TaskScreen";
import Profile from "../screens/profile/ProfileScreen";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../utils/colors";
import { AntDesign } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
export default function MainBottomTabStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: AppColors.primary,
        tabBarActiveBackgroundColor: "#EDE8FF",

        tabBarStyle: {
          height: vs(50),
          marginBottom: vs(20),
          borderRadius: s(30),
          marginHorizontal: s(10),
          paddingBottom: 0,
          backgroundColor: "white",
        },
        tabBarItemStyle: {
          borderRadius: s(30), // match inner feel
          marginVertical: 2, // stretch vertically
          marginHorizontal: s(2), // small gap between items
          overflow: "hidden",
        },
        tabBarLabelStyle: {
          marginTop: vs(2),
          fontSize: s(12),
        },
        tabBarIconStyle: {
          marginTop: vs(2),
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Task"
        component={TaskScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

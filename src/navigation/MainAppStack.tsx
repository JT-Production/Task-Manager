import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/home/HomeScreen";
import TaskScreen from "../screens/tasks/TaskScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import OnboardingScreen from "../screens/onboarding/OnboardingScreen";
import SignInScreen from "../screens/auth/SignInScreen";
import MainBottomTabStack from "./MainBottomTabStack";
import AddTaskScreen from "../screens/tasks/AddTaskScreen";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Stack = createStackNavigator();
export default function MainAppStack() {
  const { accessToken } = useSelector((state: RootState) => state.authSlice);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {accessToken ? (
        <Stack.Screen
          name="MainBottomTabStack"
          component={MainBottomTabStack}
        />
      ) : (
        <Stack.Screen name="SignIn" component={SignInScreen} />
      )}
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen
        name="AddTask"
        component={AddTaskScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreen from "../screens/onboarding/OnboardingScreen";
import MainBottomTabStack from "./MainBottomTabStack";
import AddTaskScreen from "../screens/tasks/AddTaskScreen";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import MainAuthStack from "./MainAuthStack";

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
        <Stack.Screen name="MainAuthStack" component={MainAuthStack} />
      )}
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen
        name="AddTask"
        component={AddTaskScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen name="MainBottomTabStack" component={MainBottomTabStack} />
    </Stack.Navigator>
  );
}

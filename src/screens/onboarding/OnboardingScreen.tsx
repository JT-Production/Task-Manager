import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppSafeAreaView from "../../components/view/AppSafeAreaView";
import { IMAGES } from "../../utils/image";
import { ForwardArr, OnboardingIcon } from "../../utils/icons";
import AppText from "../../components/texts/AppText";
import AppButton from "../../components/buttons/AppButton";
import { Constants } from "../../utils/constant";
import { AppFonts } from "../../utils/fonts";
import { s } from "react-native-size-matters";
import { AppColors } from "../../utils/colors";
import { vs } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";

const OnboardingScreen = () => {
  const navigation = useNavigation<any>();
  return (
    <AppSafeAreaView style={styles.container}>
      {/*
       */}
      <OnboardingIcon />
      <AppText varient="bold" style={styles.title}>
        Task Management & To-Do List
      </AppText>
      <AppText style={styles.description}>
        This productive tool is designed to help you better manage your task
        project-wise conveniently!
      </AppText>

      <AppButton
        title="Get Started"
        light
        style={styles.getStartedButton}
        onPress={() => navigation.navigate('MainBottomTabStack', { screen: 'Home' })}
        icon={<ForwardArr />}
      />
    </AppSafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: Constants.sharedPaddingHorizontal,
    fontFamily: AppFonts.Medium,
  },
  title: {
    fontSize: s(24),
    marginTop: 20,
    textAlign: "center",
    width: "80%",
    fontFamily: AppFonts.Bold,
  },
  description: {
    fontSize: s(16),
    textAlign: "center",
    marginTop: 10,
    color: AppColors.medGray,
  },
  getStartedButton: {
    backgroundColor: AppColors.primary,
    width: "100%",
    height: vs(50),
    borderRadius: s(30),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: vs(30),
    flexDirection: "row",
    
    
   
  },
});

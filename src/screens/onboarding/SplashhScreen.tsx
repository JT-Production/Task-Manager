import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCurrentUser } from "../../services/api";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { userLogin } from "../../../store/reducers/authSlice";
import { AppColors } from "../../utils/colors";

interface Props {
  onFinish: () => void;
}

export default function SplashhScreen({ onFinish }: Props) {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const checkAuth = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log(token, "TOKEN");

    if (token) {
      const user = await getCurrentUser(token);
      console.log(JSON.stringify(user.data, null, 2), "USER");

      if (user && user.status === 200) {
        dispatch(userLogin(user.data));

        // navigation.navigate("MainBottomTabStack", { screen: "Home" });
      }
    }
  };
  useEffect(() => {
    // const timer = setTimeout(async () => {
    //   await SplashScreen.hideAsync(); // hide Expo's native splash

    //   checkAuth();
    //   onFinish(); // show the real
    // }, 4000);

    // return () => clearTimeout(timer);
    onFinish();
    checkAuth();
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>SplashScreen Demo! 👋</Text> */}
      <ActivityIndicator size={"large"} color={AppColors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../../api/auth.api";
import { AppColors } from "../../utils/colors";
import { userLogin } from "../../../store/reducers/authSlice";

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
        navigation.navigate("MainBottomTabStack", { screen: "Home" });
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

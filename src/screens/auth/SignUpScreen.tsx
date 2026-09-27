import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { s, vs } from "react-native-size-matters";
import AppSafeAreaView from "../../components/view/AppSafeAreaView";
import AppText from "../../components/texts/AppText";
import AppTextInput from "../../components/inputs/AppTextInput";
import AppButton from "../../components/buttons/AppButton";
import { AppColors } from "../../utils/colors";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { userLogin } from "../../../store/reducers/authSlice";
import { getCurrentUser, loginUser } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerUser } from "../../api/auth.api";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const navigation = useNavigation<any>();

  const handleSignUp = async () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    const response = await registerUser(username, email, password);
    console.log(response.data.user, "User Data");

    if (response.status === 201) {
      setError("");
      dispatch(userLogin(response.data.user));
      //   await AsyncStorage.setItem("token", response.user.accessToken);
      navigation.navigate("MainBottomTabStack", { screen: "Home" });
    } else {
      setError(response.data.message);
    }
    setIsLoading(false);
  };

  const isFormValid = username.trim().length > 0 && password.trim().length > 0;

  return (
    <AppSafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Ionicons
                name="lock-closed"
                size={s(32)}
                color={AppColors.white}
              />
            </View>
            <AppText varient="bold" style={styles.title}>
              Welcome
            </AppText>
            <AppText style={styles.subtitle}>
              Sign up to manage and track your tasks.
            </AppText>
          </View>

          {/* Form Section */}
          <View style={styles.form}>
            {error ? (
              <View style={styles.errorContainer}>
                <Ionicons
                  name="alert-circle-outline"
                  size={s(18)}
                  color={AppColors.red}
                />
                <AppText style={styles.errorText}>{error}</AppText>
              </View>
            ) : null}

            <View style={styles.inputGroup}>
              <AppText varient="medium" style={styles.label}>
                Username
              </AppText>
              <AppTextInput
                placeholder="Enter your username"
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                  if (error) setError("");
                }}
                keyboardType="default"
              />
            </View>
            <View style={styles.inputGroup}>
              <AppText varient="medium" style={styles.label}>
                Email
              </AppText>
              <AppTextInput
                placeholder="Enter your email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (error) setError("");
                }}
                keyboardType="default"
              />
            </View>

            <View style={styles.inputGroup}>
              <AppText varient="medium" style={styles.label}>
                Password
              </AppText>
              <AppTextInput
                placeholder="Enter your password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (error) setError("");
                }}
                secureTextEntry
              />
            </View>

            <TouchableOpacity style={styles.forgotPassword}>
              <AppText style={styles.forgotPasswordText}>
                Forgot Password?
              </AppText>
            </TouchableOpacity>
          </View>

          {/* Actions Section */}
          <View style={styles.actions}>
            <AppButton
              title="Sign Up"
              light
              disabled={!isFormValid}
              style={[
                styles.signInButton,
                !isFormValid && styles.disabledButton,
              ]}
              isLoading={isLoading}
              onPress={handleSignUp}
            />

            <View style={styles.footer}>
              <AppText style={styles.footerText}>
                Already have an account?{" "}
              </AppText>
              <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                <AppText varient="bold" style={styles.signUpLink}>
                  Sign In
                </AppText>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppSafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: AppColors.white,
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: s(24),
    justifyContent: "center",
    paddingVertical: vs(20),
  },
  header: {
    alignItems: "center",
    marginBottom: vs(30),
  },
  logoContainer: {
    width: s(64),
    height: s(64),
    borderRadius: s(32),
    backgroundColor: AppColors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: AppColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    marginBottom: vs(16),
  },
  title: {
    fontSize: s(24),
    color: AppColors.black,
    marginBottom: vs(8),
    textAlign: "center",
  },
  subtitle: {
    fontSize: s(14),
    color: AppColors.medGray,
    textAlign: "center",
    paddingHorizontal: s(10),
  },
  form: {
    marginBottom: vs(20),
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFEBEE",
    padding: s(10),
    borderRadius: s(10),
    marginBottom: vs(15),
    gap: s(6),
  },
  errorText: {
    fontSize: s(12),
    color: AppColors.red,
    flex: 1,
  },
  inputGroup: {
    marginBottom: vs(16),
  },
  label: {
    fontSize: s(12),
    color: AppColors.medGray,
    marginBottom: vs(6),
    marginLeft: s(4),
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: vs(4),
  },
  forgotPasswordText: {
    fontSize: s(12),
    color: AppColors.primary,
  },
  actions: {
    marginTop: vs(10),
  },
  signInButton: {
    backgroundColor: AppColors.primary,
    width: "100%",
    height: vs(48),
    borderRadius: s(24),
    justifyContent: "center",
    alignItems: "center",
    shadowColor: AppColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "row",
  },
  disabledButton: {
    backgroundColor: AppColors.lightGray,
    shadowOpacity: 0,
    elevation: 0,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: vs(20),
  },
  footerText: {
    fontSize: s(13),
    color: AppColors.medGray,
  },
  signUpLink: {
    fontSize: s(13),
    color: AppColors.primary,
  },
});

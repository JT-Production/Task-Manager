import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { s } from "react-native-size-matters";
import { AppColors } from "../../utils/colors";

interface AppButtonProps {
  title: string;
  onPress: () => void;
  icon?: React.ReactNode;
  style?: any;
  light?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
}
const AppButton = ({
  title,
  onPress,
  icon,
  style,
  light,
  disabled,
  isLoading,
}: AppButtonProps) => {
  return (
    <TouchableOpacity
      style={[style, disabled && { backgroundColor: AppColors.medGray }]}
      onPress={onPress}
      disabled={disabled}
    >
      {isLoading ? (
        <ActivityIndicator color={light ? "white" : "black"} size={s(20)} />
      ) : (
        <>
          <Text
            style={{
              color: light ? "white" : "black",
              fontSize: s(14),
              marginHorizontal: icon ? s(10) : 0,
            }}
          >
            {title}
          </Text>
          {icon}{" "}
        </>
      )}
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({});

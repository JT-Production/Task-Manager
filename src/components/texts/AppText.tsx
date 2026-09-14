import { StyleSheet, Text, TextStyle, View } from 'react-native'
import React, { FC } from 'react'
import { s } from 'react-native-size-matters';
import { AppColors } from '../../utils/colors';
import { AppFonts } from '../../utils/fonts';

interface AppTextProps {
    children: React.ReactNode;
    style?: TextStyle | TextStyle[];
    varient?: "medium" | "bold";
    onPress?: () => void;
    light?: boolean;
}
const AppText: FC<AppTextProps> = ({children, style, varient="medium", onPress, light =false, ...rest}) => {
  return (

      <Text
      {...rest}
      style={[styles[varient],style, {color: light ? AppColors.white : styles[varient].color}]}
      onPress={onPress}
      >{children}</Text>
    
  )
}

export default AppText

const styles = StyleSheet.create({
    bold:{
        fontSize: s(18),
        color: AppColors.black,
        fontFamily:AppFonts.Bold
    },
    medium:{
        fontSize: s(16),
        color: AppColors.black,
        fontFamily:AppFonts.Medium
    }
})
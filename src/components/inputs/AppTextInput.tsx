import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { FC } from 'react'
import { s, vs } from 'react-native-size-matters'
import App from '../../../App'
import { AppColors } from '../../utils/colors'

interface AppTextInputProps {
  value?: string
  onChangeText?: (text: string) => void
  placeholder?: string
  style?: any
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad'
  secureTextEntry?: boolean
}
const AppTextInput: FC<AppTextInputProps> = ({value, onChangeText, placeholder, style, keyboardType, secureTextEntry}) => {
  return (
    <TextInput 
      value={value} 
      onChangeText={onChangeText} 
      placeholder={placeholder} 
      style={[styles.textInput, style]} 
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
    />
  )
}

export default AppTextInput

const styles = StyleSheet.create({
    textInput: {
        width: '100%',
        height: vs(40),
        borderColor: AppColors.lightGray,
        borderWidth: s(1),
        borderRadius: s(30),
        paddingHorizontal: s(10),
        marginVertical: s(5),
    }
})
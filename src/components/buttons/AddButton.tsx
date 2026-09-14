import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AppColors } from '../../utils/colors';
import { s, vs } from 'react-native-size-matters';
import { Feather } from '@expo/vector-icons';

const AddButton = ({onPress}: {onPress: () => void}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Feather name='plus' size={24} color={"white"}/>
    </TouchableOpacity>
  )
}

export default AddButton

const styles = StyleSheet.create({
    container: {
        backgroundColor:AppColors.primary,
        width:s(60),
        height:s(60),
        borderRadius:s(30),
        justifyContent:"center",
        alignItems:"center",
        position:"absolute",
        bottom:s(20),
        right:s(20),
    }
})
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../utils/colors";
import AppText from "../texts/AppText";

interface TaskCardProps{
    title: string,
    description: string,
    status: string,
    isCompleted: boolean,
    onPress: () => void;
}
const TaskCard = ({ title, description, status, isCompleted, onPress }: TaskCardProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <AppText style={{fontSize:s(14)}}>{title}</AppText>
      <AppText style={{ fontSize: s(12), marginVertical: s(3) }}>
        {description.length > 50
          ? description.substring(0, 50) + "..."
          : description}
      </AppText>
      <View style={{padding:4, width:s(86), height:vs(20), flexDirection:"row", gap:4, justifyContent:"center", alignItems:"center", borderRadius:20, backgroundColor: isCompleted ? "lightgreen" : AppColors.lightGray }}>
        <View style={{width:10, height:10, borderRadius:s(20), backgroundColor: isCompleted ? AppColors.green : AppColors.medGray }}/>
        <Text>{status}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    // borderColor: AppColors.lightGray,
    height: vs(80),
    borderRadius: s(18),
    paddingHorizontal:s(12),
    paddingVertical:s(8),
    shadowColor:"black",
    marginHorizontal:s(12),
    backgroundColor:"white"

  },
});

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../utils/colors";
import AppText from "../texts/AppText";
import AppButton from "../buttons/AppButton";
import { Constants } from "../../utils/constant";
import { Ionicons, Feather } from "@expo/vector-icons";
import { selectedTaskProps } from "../../types/types";
import { useNavigation } from "@react-navigation/native";

interface BottomSheetProps {
  sheetId: string;
  task: selectedTaskProps | null;
  onComplete?: () => void;
}

const ViewTaskBottomSheet = ({
  sheetId,
  task,
  onComplete,
}: BottomSheetProps) => {
  const navigation = useNavigation<any>()
  return (
    <ActionSheet id={sheetId} gestureEnabled={true}>
      <TouchableOpacity
        style={{
          height: vs(20),
          marginHorizontal: s(10),
          flexDirection: "row",
          gap: s(4),
          justifyContent: "flex-end",
        }}
        onPress={()=> {
          navigation.navigate("AddTask", {
            task: task
          });
          SheetManager.hide(sheetId);
        }}
      >
        <AppText style={{fontSize:s(14)}}>Edit Task</AppText>
        <Feather name="edit" size={20} color="black" />
      </TouchableOpacity>

      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.head}>Task Name</Text>
          <AppText style={styles.paragraph}>{task?.title}</AppText>
        </View>
        <View style={styles.box}>
          <Text style={styles.head}>Description</Text>
          <AppText style={styles.paragraph}>{task?.description}</AppText>
        </View>
        <View style={styles.box}>
          <Text style={styles.head}>Date</Text>
          <AppText style={styles.paragraph}>{task?.dueDate}</AppText>
        </View>
        <View style={styles.box}>
          <Text style={styles.head}>Status</Text>
          <AppText style={styles.paragraph}>{task?.status}</AppText>
        </View>
        <View>
          <AppButton
            onPress={() => {
              if (task && !task.completed) {
                onComplete?.();
              }
            }}
            title={task?.completed ? "Completed" : "Mark as Completed"}
            icon={
              <Ionicons
                name={
                  task?.completed ? "checkmark-done-circle" : "checkmark-done"
                }
                size={24}
                color="white"
              />
            }
            light={!task?.completed}
            style={[
              styles.completeBtn,
              task?.completed && {
                backgroundColor: AppColors.lightGray || "#D3D3D3",
              },
            ]}
            disabled={task?.completed}
          />
        </View>
      </View>
    </ActionSheet>
  );
};

export default ViewTaskBottomSheet;

const styles = StyleSheet.create({
  container: {
    height: vs(330),
    marginVertical: vs(20),
    paddingHorizontal: Constants.sharedPaddingHorizontal,
  },
  box: {
    marginBottom: vs(10),
    backgroundColor: "#EAEAEA",
    paddingHorizontal: s(14),
    paddingVertical: s(8),
    width: "100%",
    height: vs(60),
    borderRadius: s(16),
  },
  head: {
    fontSize: s(10),
    color: "grey",
  },
  paragraph: {
    fontSize: s(14),
  },
  completeBtn: {
    backgroundColor: AppColors.green,
    justifyContent: "center",
    alignItems: "center",
    height: vs(40),
    borderRadius: s(30),
    flexDirection: "row",
  },
});

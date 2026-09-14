import { MutableRefObject } from "react";
import { selectedTaskProps } from "../../types/types";
import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode, useEffect } from "react";
import ActionSheet, {
  SheetManager,
  useSheetPayload,
} from "react-native-actions-sheet";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../utils/colors";
import AppText from "../texts/AppText";
import AppButton from "../buttons/AppButton";
import { Constants } from "../../utils/constant";
import { Ionicons } from "@expo/vector-icons";

interface BottomSheetProps {
  taskRef: MutableRefObject<selectedTaskProps | null>;
}

const TaskBottomSheet = ({ taskRef }: BottomSheetProps) => {
  const task = taskRef.current; // reads at render time when sheet opens

  return (
    <ActionSheet id="TASK_SHEET" gestureEnabled={true}>
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
        <AppButton
          onPress={() => {}}
          title="Mark as Completed"
          icon={<Ionicons name="checkmark-done" size={24} color="white" />}
          light
          style={styles.completeBtn}
        />
      </View>
    </ActionSheet>
  );
};

export default TaskBottomSheet;

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

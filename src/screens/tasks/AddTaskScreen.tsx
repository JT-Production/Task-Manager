import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AppTextInput from "../../components/inputs/AppTextInput";
import { s, vs } from "react-native-size-matters";
import { Constants } from "../../utils/constant";
import AppButton from "../../components/buttons/AppButton";
import { AppColors } from "../../utils/colors";
import AppText from "../../components/texts/AppText";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../../../store/reducers/taskSlice";
import { useNavigation } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { createTask } from "../../api/task.api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppDateInput } from "../../components/inputs/AppDateInput";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const AddTaskScreen = ({ route }: { route: any }) => {
  const task = route?.params?.task;
  const [taskName, setTaskName] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");
  const [status, setStatus] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const isEditing = !!task;

  const notify = async () => {
    // ✅ Request permission first (iOS requirement)
    const { status } = await Notifications.requestPermissionsAsync();

    if (status !== "granted") {
      alert("Please enable notifications in your iPhone Settings");
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hello! 👋",
        body: "This is a test notification",
      },
      trigger: null, // fires immediately
    });
  };

  // const handleSaveTask = () => {
  //   if (isEditing) {
  //     dispatch(
  //       updateTask({
  //         id: task.id,
  //         title: taskName,
  //         description,
  //         dueDate,
  //         status,
  //         completed: status === "Completed",
  //       }),
  //     );
  //     console.log(status, "STATUS");

  //     navigation.goBack();
  //   } else {
  //     dispatch(
  //       addTask({
  //         id: Date.now(),
  //         title: taskName,
  //         description: description,
  //         dueDate: dueDate,
  //         status: status,
  //         completed: false,
  //       }),
  //     );
  //     notify();
  //     navigation.navigate("MainBottomTabStack", { screen: "Home" });
  //   }
  // };

  const addTask = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await createTask(
        taskName,
        description,
        dueDate,
        status,
        token,
      );
      console.log(JSON.stringify(res, null, 4), "res");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        <View style={styles.box}>
          <Text style={styles.head}>{task ? "Edit Task" : "Add Task"}</Text>
          <AppTextInput
            placeholder="Enter your task"
            value={taskName}
            onChangeText={setTaskName}
          />
        </View>
        <View style={styles.box}>
          <Text style={styles.head}>Description</Text>
          <AppTextInput
            placeholder="Enter your task description"
            value={description}
            onChangeText={setDescription}
          />
        </View>
        <View style={styles.box}>
          <Text style={styles.head}>Date</Text>
          <AppTextInput
            placeholder="Select your task due date"
            value={dueDate}
            onChangeText={setDueDate}
          />
        </View>
        <View style={styles.box}>
          <Text style={styles.head}>Status</Text>
          {/* <AppTextInput placeholder="Select your task status" /> */}
          <AppDateInput
            value={dueDate}
            onChangeText={setDueDate}
            style={styles.selectBox}
          />
          <TouchableOpacity
            style={styles.selectBox}
            onPress={() => setShowStatusDropdown(!showStatusDropdown)}
          >
            <Text style={styles.paragraph}>
              {" "}
              {status === false
                ? "Pending"
                : status === true
                  ? "Completed"
                  : "Select your task status"}
            </Text>
            <Feather name="chevron-down" size={24} color="black" />
          </TouchableOpacity>
          {showStatusDropdown && (
            <View style={styles.statusDropdown}>
              <Pressable
                onPress={() => {
                  setStatus(false);
                  setShowStatusDropdown(false);
                }}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? AppColors.lightGray : "white",
                    padding: vs(5),
                    borderRadius: s(5),
                  },
                ]}
              >
                <Text style={styles.paragraph}>Pending</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setStatus(false);
                  setShowStatusDropdown(false);
                }}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? AppColors.lightGray : "white",
                    padding: vs(5),
                    borderRadius: s(5),
                  },
                ]}
              >
                <Text style={styles.paragraph}>In Progress</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setStatus(true);
                  setShowStatusDropdown(false);
                }}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? AppColors.lightGray : "white",
                    padding: vs(5),
                    borderRadius: s(5),
                  },
                ]}
              >
                <Text style={styles.paragraph}>Completed</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>

      <AppButton
        title={task ? "Update Task" : "Add Task"}
        style={styles.addBtn}
        light
        disabled={
          taskName === "" ||
          description === "" ||
          dueDate === "" ||
          status === null
        }
        // onPress={handleSaveTask}
        onPress={addTask}
      />
    </View>
  );
};

export default AddTaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",

    alignItems: "center",
    paddingHorizontal: s(10),
  },
  box: {
    marginTop: s(10),
    marginBottom: vs(5),
    backgroundColor: AppColors.white,
    paddingHorizontal: s(14),
    paddingVertical: s(8),
    width: "100%",
    height: vs(80),
    borderRadius: s(14),
  },
  head: {
    fontSize: s(10),
    color: "grey",
  },
  paragraph: {
    fontSize: s(12),
    color: "#848080",
  },
  addBtn: {
    backgroundColor: AppColors.primary,
    width: "100%",
    height: vs(46),
    borderRadius: s(16),
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: Constants.sharedPaddingHorizontal,
    marginBottom: vs(40),
  },
  selectBox: {
    width: "100%",
    height: vs(42),
    borderRadius: s(26),
    paddingHorizontal: s(10),
    // marginBottom:vs(20),
    borderWidth: s(1),
    borderColor: "grey",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statusDropdown: {
    position: "absolute",
    top: vs(60),
    left: s(14),
    right: s(14),
    backgroundColor: AppColors.white,
    borderRadius: s(10),
    borderWidth: s(1),
    borderColor: AppColors.lightGray,
    zIndex: 10,
    gap: s(10),
    padding: s(10),
  },
});

import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AppSafeAreaView from "../../components/view/AppSafeAreaView";
import { Constants } from "../../utils/constant";
import { Avatar, Camera } from "../../utils/icons";
import AppText from "../../components/texts/AppText";
import Feather from "@expo/vector-icons/Feather";
import { AppColors } from "../../utils/colors";
import AppButton from "../../components/buttons/AppButton";
import { s, vs } from "react-native-size-matters";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Tasks } from "../../data/task";
import TaskCard from "../../components/cards/TaskCard";
import { SheetManager } from "react-native-actions-sheet";
import ViewTaskBottomSheet from "../../components/bottomsheet/ViewTaskBottomSheet";
import { selectedTaskProps } from "../../types/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import AddButton from "../../components/buttons/AddButton";
import { updateTask } from "../../../store/reducers/taskSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();
  const [tasks, setTasks] = useState(Tasks);
  const [selectedTask, setSelectedTask] = useState<selectedTaskProps | null>(
    null,
  );
  const { taskData } = useSelector((state: RootState) => state.taskSlice);
  const { user } = useSelector((state: RootState) => state.authSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFocused) {
      setTasks([...Tasks]);
    }
  }, [isFocused]);

  // useEffect(() => {
  //   if (selectedTask) SheetManager.show("HOME_TASK_SHEET");
  // }, [selectedTask]);

  const renderHeader = () => (
    <>
      <View style={styles.hero}>
        <View>
          <AppText varient="bold" light style={{ fontSize: s(14) }}>
            Let's get some work done!
          </AppText>
          <AppText light style={{ fontSize: s(12) }}>
            You have {tasks.filter((t) => !t.completed).length} tasks today.
          </AppText>
          <AppButton
            title="View Tasks"
            style={styles.tasksButton}
            onPress={() => navigation.navigate("Tasks")}
          />
        </View>
        <Camera />
      </View>

      <AppText style={styles.sectionHeader}>
        Completed Tasks
        <View style={styles.countBadge}>
          <Text style={{ color: AppColors.white }}>
            {taskData.filter((task) => task.completed).length}
          </Text>
        </View>
      </AppText>

      <ScrollView
        style={styles.completedScroll}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {taskData
          .filter((task) => task.completed)
          .map((task, index) => (
            <TouchableOpacity
              key={index}
              style={styles.completedCard}
              onPress={() => {
                setSelectedTask(task);
                SheetManager.show("HOME_TASK_SHEET");
              }}
            >
              <Text style={styles.completedDate}>{task.dueDate}</Text>
              <AppText varient="bold" style={{ fontSize: s(14) }}>
                {task.title}
              </AppText>
              <AppText style={{ fontSize: s(12), marginVertical: s(3) }}>
                {task.description.length > 50
                  ? task.description.substring(0, 50) + "..."
                  : task.description}
              </AppText>

              <View style={styles.statusBadge}>
                <AppText light style={{ fontSize: s(10) }}>
                  {task.status}
                </AppText>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>

      <AppText style={styles.sectionHeader}>
        All Tasks
        <View style={styles.countBadge}>
          <Text style={{ color: AppColors.white }}>{taskData.length}</Text>
        </View>
      </AppText>
    </>
  );

  return (
    <AppSafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {user?.image ? (
            <Image source={{ uri: user.image }} style={styles.avatar} />
          ) : (
            <Avatar />
          )}
          <AppText>Hello, {user.username}!💜</AppText>
        </View>
        <View style={styles.notificationIcon}>
          <Feather name="bell" size={24} color={AppColors.primary} />
        </View>
      </View>
      <FlatList
        data={taskData.slice().reverse()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskCard
            title={item.title}
            description={item.description}
            isCompleted={item.completed}
            status={item.status}
            onPress={() => {
              setSelectedTask(item);
              SheetManager.show("HOME_TASK_SHEET");
            }}
          />
        )}
        ListHeaderComponent={renderHeader}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <ViewTaskBottomSheet
        sheetId="HOME_TASK_SHEET"
        task={selectedTask}
        onComplete={() => {
          if (taskData && selectedTask) {
            dispatch(
              updateTask({
                ...selectedTask,
                completed: true,
                status: "Completed",
              }),
            );
            SheetManager.hide("HOME_TASK_SHEET");
          }
        }}
      />
      <AddButton onPress={() => navigation.navigate("AddTask")} />
    </AppSafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.sharedPaddingHorizontal,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: Constants.sharedPaddingHorizontal,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingBottom: 10,
  },
  notificationIcon: {
    backgroundColor: AppColors.lightGray,
    borderRadius: 12,
    padding: s(10),
  },
  hero: {
    backgroundColor: AppColors.primary,
    borderRadius: s(20),
    padding: s(20),
    marginTop: vs(30),
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: Constants.sharedPaddingHorizontal,
  },
  tasksButton: {
    marginTop: 20,
    fontSize: s(12),
    backgroundColor: AppColors.white,
    width: s(100),
    alignItems: "center",
    padding: s(6),
    borderRadius: s(26),
  },
  sectionHeader: {
    fontSize: s(14),
    marginTop: s(10),
    marginHorizontal: Constants.sharedPaddingHorizontal,
    flexDirection: "row",
    alignItems: "center",
  },
  countBadge: {
    width: s(25),
    height: 25,
    borderRadius: s(10),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: AppColors.primary,
    marginLeft: s(10),
  },
  completedScroll: {
    marginTop: vs(10),
    paddingHorizontal: s(15),
  },
  completedCard: {
    backgroundColor: AppColors.white,
    padding: s(14),
    borderRadius: s(20),
    marginRight: s(10),
    width: s(220),
    height: s(120),
  },
  completedDate: {
    fontSize: s(12),
    color: AppColors.lightGray,
    textAlign: "right",
  },
  statusBadge: {
    backgroundColor: AppColors.green,
    width: s(64),
    borderRadius: s(32),
    paddingHorizontal: s(6),
    marginTop: vs(4),
  },
  listContent: {
    paddingBottom: 30,
  },
  avatar: {
    width: s(40),
    height: s(40),
    borderRadius: s(20),
    backgroundColor: AppColors.lightGray,
  },
});

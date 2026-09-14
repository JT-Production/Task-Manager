import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AppSafeAreaView from "../../components/view/AppSafeAreaView";
import TaskCard from "../../components/cards/TaskCard";
import { Tasks } from "../../data/task";
import { selectedTaskProps } from "../../types/types";
import { SheetManager } from "react-native-actions-sheet";
import AppText from "../../components/texts/AppText";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../utils/colors";
import ViewTaskBottomSheet from "../../components/bottomsheet/ViewTaskBottomSheet";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import AddButton from "../../components/buttons/AddButton";

const TaskScreen = () => {
  const [activeTab, setActiveTab] = useState("All");
  const isFocused = useIsFocused();
  const [tasks, setTasks] = useState(Tasks);
  const [selectedTask, setSelectedTask] = useState<selectedTaskProps | null>(null);
  const {taskData} = useSelector((state: RootState)=> state.taskSlice)
  const navigation = useNavigation<any>();
  useEffect(() => {
    if (isFocused) {
      setTasks([...Tasks]);
    }
  }, [isFocused]);

  const Tabs = [
    { tabName: "All", size: taskData.length },
    { tabName: "Pending", size: taskData.filter((i) => i.status === "Pending").length },
    { tabName: "In Progress", size: taskData.filter((i) => i.status === "In Progress").length },
    { tabName: "Completed", size: taskData.filter((i) => i.status === "Completed").length },
  ];

 

  return (
    <AppSafeAreaView style={styles.container}>
      
       <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ justifyContent: "space-between", paddingVertical: s(10) }}
      style={styles.tabContainer}
    >
      {Tabs.map((tab) => {
        const activeCheck = activeTab === tab.tabName;
        return (
          <TouchableOpacity
            key={tab.tabName}
            style={[
              styles.tab,
              { backgroundColor: activeCheck ? AppColors.primary : "#EDE8FF" },
            ]}
            onPress={() => setActiveTab(tab.tabName)}
          >
            <AppText light={activeCheck && true} style={{ fontSize: s(14) }}>
              {tab.tabName}
            </AppText>
            <AppText light={activeCheck && true} style={{ fontSize: s(12) }}>{tab.size}</AppText>
          </TouchableOpacity>
        );
      })}
    </ScrollView>

      <FlatList
        data={activeTab !== "All" ? taskData.filter((i) => i.status === activeTab) : taskData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskCard
            title={item.title}
            description={item.description}
            isCompleted={item.completed}
            status={item.status}
            onPress={() => {
              setSelectedTask(item);
              SheetManager.show("TASK_SCREEN_SHEET");
            }}
          />
        )}
        // ListHeaderComponent={renderHeader}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      <ViewTaskBottomSheet
        sheetId="TASK_SCREEN_SHEET"
        task={selectedTask}
        onComplete={() => {
          if (selectedTask) {
            const taskIndex = Tasks.findIndex((t) => t.id === selectedTask.id);
            if (taskIndex !== -1) {
              Tasks[taskIndex].completed = true;
              Tasks[taskIndex].status = "Completed";
            }
            setTasks([...Tasks]);
            setSelectedTask({
              ...selectedTask,
              completed: true,
              status: "Completed",
            });
            SheetManager.hide("TASK_SCREEN_SHEET");
          }
        }}
      /> 
            <AddButton onPress={() => navigation.navigate("AddTask")} />

    </AppSafeAreaView>
  );
};

export default TaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  listContent: {
    paddingBottom: 30,
  },
  tabContainer: {
    flexDirection: "row",
    marginLeft: s(14),
    maxHeight:vs(50)
  },
  tab: {
    flexDirection: "row",
    gap: s(5),
    marginRight: s(8),
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: s(20),
    paddingVertical: s(8),
    borderRadius: s(10),
    // height:vs(30)
  },
});
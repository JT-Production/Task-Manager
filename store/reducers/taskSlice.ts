import { createSlice } from "@reduxjs/toolkit";
import { Tasks } from "../../src/data/task";
import { selectedTaskProps } from "../../src/types/types";

interface taskState {
    taskData: selectedTaskProps[]
} 
const initialState: taskState = {
    taskData: Tasks
}

const taskSlice = createSlice({
    name: "task",
    initialState: initialState,
    reducers: {
        // add task
        addTask(state, action) {
            state.taskData.push(action.payload);
            console.log(state.taskData, "TASKS Added");
        },
        // updateTask
        updateTask(state, action) {
            const {id, ...updateTask} = action.payload;
            const taskIndex = state.taskData.findIndex(t => t.id === id);

            if(taskIndex !== -1) {
                state.taskData[taskIndex] = {
                    ...state.taskData[taskIndex],
                    ...updateTask
                };
                console.log(JSON.stringify(state.taskData, null, 6), "TASKS Updated");
            }
         }
    }
});

export const { addTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;
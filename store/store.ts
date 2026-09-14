import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./reducers/taskSlice";
import authSlice from "./reducers/authSlice";

export const store = configureStore({
    reducer: {
        taskSlice: taskSlice,
        authSlice: authSlice    
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
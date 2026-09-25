import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../../src/services/api";
import { Alert } from "react-native";

interface User {
  id: number;
  username: string;
  email: string;
  // firstName: string
  // lastName: string
  // gender: string
  // image: string
}

interface authState {
  user: User[];
  accessToken: string | null;
}

const initialState: authState = {
  user: [],
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogin(state, action) {
      state.user.push(action.payload);
      state.accessToken = action.payload.accessToken;
      console.log(state.user, "authSlice state");
      console.log(state.accessToken, "auth Token");
      // Alert.alert("Login Success");
    },
  },
});

export const { userLogin } = authSlice.actions;
export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: localStorage.getItem("username") || null,
  token: localStorage.getItem("token") || null,
  profileImage: localStorage.getItem("profileImage") || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      console.log("hi", action.payload);
      state.currentUser = action.payload.data.username;
      state.token = action.payload.token;
      state.profileImage = action.payload.data.profileImage;
      localStorage.setItem("username", action.payload.data.username);
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("profileImage", action.payload.data.profileImage);
    },
    logout: (state) => {
      state.currentUser = null;
      state.token = null;
      state.profileImage = null;
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      localStorage.removeItem("profileImage");
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;

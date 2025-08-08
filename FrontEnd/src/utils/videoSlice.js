import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videos: [],
};

const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    addVideos: (state, action) => {
      console.log("iside redux vide", action.payload);
      state.videos = action.payload;
    },
  },
});

export const { addVideos } = videosSlice.actions;
export default videosSlice.reducer;

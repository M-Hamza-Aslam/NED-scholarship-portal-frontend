import { createSlice } from "@reduxjs/toolkit";

const loaderInitialState = {
  loading: false,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState: loaderInitialState,
  reducers: {
    updateLoaderState(state, action) {
      state.loading = action.payload.loading;
    },
  },
});

export const loaderActions = loaderSlice.actions;
export default loaderSlice.reducer;

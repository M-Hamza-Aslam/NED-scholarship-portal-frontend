import { createSlice } from "@reduxjs/toolkit";

const adminInitialState = {
  admin: {
    _id: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    token: "",
    userRole: "",
  },
};

const adminSlice = createSlice({
  name: "admin",
  initialState: adminInitialState,
  reducers: {
    updateAdminData(state, action) {
      state.admin = { ...state.admin, ...action.payload };
    },
    clearAdminData(state) {
      state.admin = adminInitialState;
    },
  },
});

export const adminActions = adminSlice.actions;
export default adminSlice.reducer;

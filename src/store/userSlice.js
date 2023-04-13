import { createSlice } from "@reduxjs/toolkit";

const userInitialState = {
  user: {
    _id: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    token: "",
    profileStatus: 0,
    userRole: "",
    personalInfo: {},
    familyDetails: {},
    educationalDetails: {
      hasFetched: false,
      educationalDetailsArr: [],
    },
    dependantDetails: {
      hasFetched: false,
      dependantDetailsArr: [],
    },
  },
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    updateUserData(state, action) {
      state.user = { ...state.user, ...action.payload };
    },
    clearUserData(state) {
      state.user = userInitialState;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;

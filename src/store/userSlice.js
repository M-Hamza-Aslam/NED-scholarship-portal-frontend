import { createSlice } from "@reduxjs/toolkit";

const userInitialState = {
  user: {
    _id: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    profileImg: "",
    token: "",
    profileStatus: 0,
    userRole: "",
    personalInfo: {},
    familyDetails: {},
    education: {
      hasFetched: false,
      educationalDetails: [],
      matric: {},
      intermediate: {},
      bachelor: {},
      documents: [],
    },
    dependantDetails: {
      hasFetched: false,
      dependantDetailsArr: [],
    },
    scholarship: {
      hasFetched: false,
      scholarshipList: [],
    },
  },
  isVerified: false,
};

const userSlice = createSlice({
  name: "userState",
  initialState: userInitialState,
  reducers: {
    updateUserData(state, action) {
      state.user = { ...state.user, ...action.payload };
    },
    clearUserData(state) {
      state.user = userInitialState.user;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;

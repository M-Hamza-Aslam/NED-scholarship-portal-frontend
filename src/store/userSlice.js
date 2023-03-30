import { createSlice } from "@reduxjs/toolkit";

const userInitialState = {
  _id: "",
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    getUserData(state, actions) {
      state = { ...state, ...actions.payload };
    },
    clearUserData(state) {
      state = userInitialState;
    },
    updatePersonalInfo(state, actions) {
      state = { ...state, ...actions.payload };
    },
    updatePhoneNumber(state, actions) {
      state.phoneNumber = actions.payload.phoneNumber;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;

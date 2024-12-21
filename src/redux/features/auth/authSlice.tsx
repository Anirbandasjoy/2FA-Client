import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfoState {
  name: string;
  email: string;
}

const initialState: UserInfoState = {
  name: "",
  email: "",
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (
      state,
      action: PayloadAction<{ name: string; email: string }>
    ) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    clearUserInfo: (state) => {
      state.name = "";
      state.email = "";
    },
  },
});

export const { setUserInfo, clearUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;

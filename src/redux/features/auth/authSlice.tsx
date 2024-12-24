import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfoState {
  userInfo: {
    name: string;
    email: string;
    role: number;
  };
}

const initialState: UserInfoState = {
  userInfo: JSON.parse(localStorage.getItem("userInfo") || "{}") || {
    name: "",
    email: "",
    role: "",
  },
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (
      state,
      action: PayloadAction<{ name: string; email: string; role: number }>
    ) => {
      state.userInfo = action.payload;

      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    clearUserInfo: (state) => {
      state.userInfo = { name: "", email: "", role: 0 };
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setUserInfo, clearUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;

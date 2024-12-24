import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfoState {
  userInfo: {
    name: string;
    email: string;
    role: number;
  };
}

const getUserInfoFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const storedUserInfo = localStorage.getItem("userInfo");
    return storedUserInfo
      ? JSON.parse(storedUserInfo)
      : { name: "", email: "", role: 0 };
  }
  return { name: "", email: "", role: 0 };
};

const initialState: UserInfoState = {
  userInfo: getUserInfoFromLocalStorage(),
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

      if (typeof window !== "undefined") {
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      }
    },
    clearUserInfo: (state) => {
      state.userInfo = { name: "", email: "", role: 0 };

      if (typeof window !== "undefined") {
        localStorage.removeItem("userInfo");
      }
    },
  },
});

export const { setUserInfo, clearUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;

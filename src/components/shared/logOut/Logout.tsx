"use client";
import { RootState } from "@/redux/app/store";
import { useHandleLogOutMutation } from "@/redux/features/auth/authApi";
import { clearUserInfo } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const Logout = () => {
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const [logOut] = useHandleLogOutMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogOut = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully");
      dispatch(clearUserInfo());
      router.push("/");
    } catch (error: any) {
      toast.error(error?.data?.payload?.message || "Failed to log out");
      console.error("Failed to log out", error);
    }
  };
  console.log("user info from logout", userInfo);
  return (
    <h1
      onClick={handleLogOut}
      className="bg-red-400 hover:bg-red-500 py-2 px-5 rounded-sm justify-center flex cursor-pointer"
    >
      Logout
    </h1>
  );
};

export default Logout;

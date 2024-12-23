"use client";

import React, { useState } from "react";
import { RootState } from "@/redux/app/store";
import { useHandleLogOutMutation } from "@/redux/features/auth/authApi";
import { clearUserInfo } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const Logout = () => {
  const [logOut] = useHandleLogOutMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <div className="relative">
      <h1
        onClick={() => {
          setIsModalOpen(true);
          document.body.style.overflow = "hidden";
        }}
        className="bg-red-400 hover:bg-red-500 py-2 px-5 rounded-sm justify-center flex cursor-pointer"
      >
        Logout
      </h1>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800  bg-opacity-50 flex items-center justify-center z-50">
          <div className="border border-gray-500 bg-gray-900 rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-lg text-gray-300 font-semibold mb-1 text-center">
              Confirm Logout
            </h2>
            <p className="text-sm text-gray-400 text-center mb-5">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-between gap-4">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  document.body.style.overflow = "auto";
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded w-full"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleLogOut();
                  setIsModalOpen(false);
                  document.body.style.overflow = "auto";
                }}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded w-full"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logout;

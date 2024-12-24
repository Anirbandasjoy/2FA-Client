"use client";
import Loading from "@/components/auth/loading/Loading";
import PublicRoute from "@/components/routes/PublicRoute";
import { useHandleLoginMutation } from "@/redux/features/auth/authApi";
import { setUserInfo } from "@/redux/features/auth/authSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const Registration: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [setLoginData, { data: loginData, isLoading }] =
    useHandleLoginMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await setLoginData({
        email: data.email,
        password: data.password,
      }).unwrap();
      toast.success("Login Successfully");
      router.push("/profile");
    } catch (error: any) {
      toast.error(error?.data?.payload?.message);
      console.log("Error:", error);
    }
  };

  if (loginData) {
    dispatch(
      setUserInfo({
        name: loginData?.payload?.name,
        email: loginData?.payload?.email,
        role: Number(loginData?.payload?.role),
      })
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <PublicRoute>
      <div className="flex justify-center bg-gray-900 items-center min-h-screen px-4 sm:px-8 lg:px-0">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
          <div className="text-zinc-300 space-y-[2px]">
            <h1 className="text-2xl font-bold">Please Login Your Account</h1>
            <p className="text-sm">
              Please fill out the form below to Login your account.
            </p>
          </div>

          <div className="space-y-4 mt-4">
            {/* Name Field */}

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-zinc-300 font-medium mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
                className="bg-transparent w-full px-4 py-2 border border-gray-700 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-zinc-300 font-medium mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                className="bg-transparent w-full px-4 py-2 border border-gray-700 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="flex items-center space-x-2">
              <Link
                href="/forgot-password"
                className="text-green-400 text-sm underline"
              >
                Forgot Password
              </Link>
            </div>

            {/* Forgot Password */}
            <div className="flex sm:justify-end gap-1">
              <span className="text-zinc-300 text-sm ">
                Not Create Account?
              </span>
              <Link
                href="/registation"
                className="text-green-400 text-sm hover:underline"
              >
                Sign Up
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-green-600 text-gray-200  py-2 px-6 text-sm rounded-md w-full sm:w-auto"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </PublicRoute>
  );
};

export default Registration;

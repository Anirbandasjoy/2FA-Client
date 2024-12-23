"use client";
import Loading from "@/components/auth/loading/Loading";
import PublicRoute from "@/components/routes/PublicRoute";
import { useHandleRegisterMutation } from "@/redux/features/auth/authApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

interface FormData {
  name: string;
  email: string;
  password: string;
  terms: boolean;
}

const Registration: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [setRegisterUserData, { isLoading }] = useHandleRegisterMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await setRegisterUserData(data).unwrap();
      toast.success("Account created successfully");
      router.push(`/verify-user?email=${data.email}&time=180`);
    } catch (error: any) {
      toast.error(error?.data?.payload?.message || "An error occurred");
      console.error("Error:", error);
    }
    console.log("Form Data:");
  };

  if (!isLoading) {
    return (
      <PublicRoute>
        <div className="flex justify-center bg-gray-900 items-center min-h-screen px-4 sm:px-8 lg:px-0">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
            <div className="text-zinc-300 space-y-[2px]">
              <h1 className="text-2xl font-bold">Create Your Account</h1>
              <p className="text-sm">
                Please fill out the form below to create your new account.
              </p>
            </div>

            <div className="space-y-4 mt-4">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-zinc-300 font-medium mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="bg-transparent w-full px-4 py-2 border border-gray-700 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

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

              {/* Terms and Conditions */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  {...register("terms", {
                    required: "You must accept the terms",
                  })}
                  className="form-checkbox text-green-400"
                />
                <label htmlFor="terms" className="text-zinc-300 text-sm">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-green-400 hover:underline"
                  >
                    Terms and Conditions
                  </Link>
                </label>
              </div>
              {errors.terms && (
                <p className="text-red-500 text-sm ">{errors.terms.message}</p>
              )}

              {/* Forgot Password */}
              <div className="flex sm:justify-end gap-1">
                <span className="text-zinc-300 text-sm ">
                  Already Create Account?
                </span>
                <Link
                  href="/login"
                  className="text-green-400 text-sm hover:underline"
                >
                  Sign In
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
  } else {
    return <Loading />;
  }
};

export default Registration;

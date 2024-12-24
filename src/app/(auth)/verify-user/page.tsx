"use client";
import Loading from "@/components/auth/loading/Loading";
import PublicRoute from "@/components/routes/PublicRoute";
import { useHandleVerifyUserMutation } from "@/redux/features/auth/authApi";
import { setUserInfo } from "@/redux/features/auth/authSlice";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const VerifyUser = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [setVerificationCode, { isLoading, data: userData }] =
    useHandleVerifyUserMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const time = searchParams.get("time");

  const [timeLeft, setTimeLeft] = useState(Number(time));

  const dispatch = useDispatch();

  // Timer logic
  useEffect(() => {
    if (timeLeft === 0) {
      setIsButtonDisabled(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Handle OTP input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }

    if (updatedOtp.every((digit) => digit !== "")) {
      handleVerifyOtp(updatedOtp.join(""));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOtp = async (otpCode: string) => {
    if (otpCode.length === 4) {
      try {
        await setVerificationCode({
          email: email!,
          verificationCode: otpCode,
        }).unwrap();

        toast.success("Verified Your Account ");
        setOtp(["", "", "", ""]);

        console.log({ userData });
        router.push("/profile");
      } catch (error: any) {
        toast.error(error?.data?.payload?.message);
        setOtp(["", "", "", ""]);
        console.log(error);
      }
    }
  };

  if (userData) {
    dispatch(
      setUserInfo({
        name: userData?.payload?.name,
        email: userData?.payload?.email,
        role: Number(userData?.payload?.role),
      })
    );
  }
  // Format the time left as MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <PublicRoute>
      <div className="flex items-center justify-center min-h-screen">
        <div className="rounded-lg shadow-md w-96 text-center">
          <div className="flex justify-center items-center mb-4">
            <div className="w-16 h-16 flex items-center justify-center bg-green-500 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-8 h-8 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 8.25L9.75 15l-3-3"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-2">{formatTime(timeLeft)}</p>
          <h2 className="text-xl font-semibold text-gray-200 mb-4">
            Verify your email to proceed
          </h2>
          <p className="text-gray-300 mb-6">
            We just sent an email to the address{" "}
            <span className="text-green-400 font-medium cursor-pointer hover:underline">
              {email}
            </span>
            . Please check your email and get the verification code.
          </p>
          <div>
            {isLoading && (
              <div className="flex justify-center items-center mb-5 bg-gray-900">
                <div
                  className="w-6 h-6 border-4 border-t-green-400 border-r-transparent border-b-transparent border-l-green-400 rounded-full animate-spin"
                  role="status"
                ></div>
              </div>
            )}

            <div className="flex justify-center items-center space-x-4 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-center text-xl border-2 bg-gray-300 border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              className={`w-full py-2 text-sm rounded-lg ${
                isButtonDisabled
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              } ${isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isButtonDisabled}
              onClick={() => {
                // Handle resend logic here
              }}
            >
              Resend Verification Email
            </button>
            <button className="w-full py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600">
              Go to My Inbox
            </button>
          </div>
        </div>
      </div>
    </PublicRoute>
  );
};

export default VerifyUser;

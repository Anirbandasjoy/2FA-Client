"use client";

import { RootState } from "@/redux/app/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { userInfo } = useSelector((state: RootState) => state.userInfo);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userInfo.email) {
      router.push("/profile");
    } else {
      setLoading(false);
    }
  }, [userInfo, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="flex justify-center flex-col  items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500 mb-4"></div>
          <h1 className="text-lg">Redirecting...</h1>
        </div>
      </div>
    );
  }

  return <>{!userInfo.email ? children : null}</>;
};

export default PublicRoute;

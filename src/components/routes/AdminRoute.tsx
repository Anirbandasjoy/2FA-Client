"use client";

import { useHandleGetCurrentUserQuery } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import Loading from "../auth/loading/Loading";

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useHandleGetCurrentUserQuery();
  const userInfo = data?.payload;
  const router = useRouter();

  useEffect(() => {
    if (!userInfo?.email) {
      router.push("/login");
      return;
    }
    if (userInfo?.role !== 2000080) {
      router.push("/");
      return;
    }
  }, [userInfo, router]);

  if (isLoading) {
    return <Loading />;
  }

  return <>{userInfo?.role === 2000080 ? children : null}</>;
};

export default AdminRoute;

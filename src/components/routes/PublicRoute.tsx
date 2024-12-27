"use client";

import { useHandleGetCurrentUserQuery } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Loading from "../auth/loading/Loading";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useHandleGetCurrentUserQuery();
  const userInfo = data?.payload;
  const router = useRouter();

  useEffect(() => {
    if (userInfo?.email) {
      router.push("/profile");
    } else {
    }
  }, [userInfo, router]);

  if (isLoading) {
    return <Loading />;
  }

  return <>{!userInfo?.email ? children : null}</>;
};

export default PublicRoute;

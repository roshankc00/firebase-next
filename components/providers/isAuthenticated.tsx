"use client";
import { isUserAuthenticated } from "@/common/api";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  children: React.ReactNode;
}
const LoginUserOnly = ({ children }: Props) => {
  return <div>{isUserAuthenticated() ? children : redirect("/login")}</div>;
};

export default LoginUserOnly;

import React from "react";
import LoginForm from "./_component/Loginform";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | AuthenticationApp",
  description: "Login with your credentials",
};

const LoginPage = () => {
  return (
    <div className="flex justify-center mt-[10%]">
      <div className="w-[500px]">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;

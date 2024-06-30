import React from "react";
import SignupForm from "./_component/SignupForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup | AuthenticationApp",
  description: "Login with your credentials",
};

const LoginPage = () => {
  return (
    <div className="flex justify-center mt-[10%]">
      <div className="w-[500px]">
        <SignupForm />
      </div>
    </div>
  );
};

export default LoginPage;

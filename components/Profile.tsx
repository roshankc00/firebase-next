"use client";
import { LogoutUser, isUserAuthenticated } from "@/common/api";
import { Button } from "@/components/ui/button";
import { useGetCurrentUser } from "@/hooks/auth/get-currentuser";
import React from "react";

const Profile = () => {
  const { data, isFetching, isLoading } = useGetCurrentUser();
  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className=" font-semibold text-xl">
        {!isFetching && !isLoading && <div>Hello {data?.user?.email}</div>}
      </h1>
      <Button onClick={() => LogoutUser()}> LogOut</Button>
    </div>
  );
};

export default Profile;

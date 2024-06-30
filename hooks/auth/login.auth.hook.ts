"use client";
import { handleloginApi } from "@/common/api/auth/auth.api";
import { authSchema } from "@/helpers/validation/auth.validation";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { Ruthie } from "next/font/google";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { z } from "zod";

export const useHandleLogin = () => {
  const { mutateAsync: handlePendingApi } = useMutation({
    mutationFn: handleloginApi,
  });
  const router = useRouter();

  const handleLogin = async (body: z.infer<typeof authSchema>) => {
    handlePendingApi(body)
      .then((data) => {
        Cookies.set("Authentication", data.token);
        toast.success("User loggedIn successfully");
        router.push("/profile");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Unable to login a user");
      });
  };

  return handleLogin;
};

"use client";
import { handleSignupApi } from "@/common/api/auth/auth.api";
import { authSchema } from "@/helpers/validation/auth.validation";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { z } from "zod";

export const UseHandleSignUpUser = () => {
  const { mutateAsync: handlePendingApi } = useMutation({
    mutationFn: handleSignupApi,
  });
  const router = useRouter();
  const handleSignUp = async (body: z.infer<typeof authSchema>) => {
    handlePendingApi(body).then((data) => {
      toast.success(data?.message);
      router.push("/login");
    });
  };

  return handleSignUp;
};

import { handleSignupApi } from "@/common/api/auth/auth.api";
import { authSchema } from "@/helpers/validation/auth.validation";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { z } from "zod";

export const UseHandleSignUpUser = () => {
  const { mutateAsync: handlePendingApi } = useMutation({
    mutationFn: handleSignupApi,
  });

  const handleSignUp = async (body: z.infer<typeof authSchema>) => {
    handlePendingApi(body)
      .then((data) => {
        toast.success("User Created successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Unable to create a user");
      });
  };

  return handleSignUp;
};

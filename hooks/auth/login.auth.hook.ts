import { handleloginApi } from "@/common/api/auth/auth.api";
import { authSchema } from "@/helpers/validation/auth.validation";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { z } from "zod";

export const useHandleLogin = () => {
  const { mutateAsync: handlePendingApi } = useMutation({
    mutationFn: handleloginApi,
  });

  const handleLogin = async (body: z.infer<typeof authSchema>) => {
    handlePendingApi(body)
      .then((data) => {
        toast.success("User loggedIn successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Unable to login a user");
      });
  };

  return handleLogin;
};

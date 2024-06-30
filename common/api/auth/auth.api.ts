import { authSchema } from "@/helpers/validation/auth.validation";
import axios from "axios";
import { z } from "zod";

export const handleSignupApi = async (body: z.infer<typeof authSchema>) => {
  const { data } = await axios.post("/api/auth/signup", body);
  return data;
};

export const handleloginApi = async (body: z.infer<typeof authSchema>) => {
  const { data } = await axios.post("/api/auth/login", body);
  return data;
};

import { authSchema, googleSchema } from "@/helpers/validation/auth.validation";
import { z } from "zod";
import api from "..";

export const handleSignupApi = async (body: z.infer<typeof authSchema>) => {
  const { data } = await api.post("/api/auth/signup", body);
  return data;
};

export const handleloginApi = async (body: z.infer<typeof authSchema>) => {
  const { data } = await api.post("/api/auth/login", body);
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await api.get("/api/auth/me");
  return data;
};

export const googleLoginApi = async (body: z.infer<typeof googleSchema>) => {
  const { data } = await api.post("/api/auth/google", body);
  return data;
};

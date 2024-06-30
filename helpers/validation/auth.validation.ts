import { z } from "zod";
export const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be of 8 charecter ",
  }),
});

export const googleSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be of 2 charecter ",
  }),
  email: z.string().email(),
  localId: z.string().min(5, {
    message: "localId must be of 8 charecter ",
  }),
});

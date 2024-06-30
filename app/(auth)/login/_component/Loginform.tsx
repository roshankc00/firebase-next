"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authSchema } from "@/helpers/validation/auth.validation";
import { useHandleLogin } from "@/hooks/auth/login.auth.hook";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../../../helpers/firebase";
import { googleLoginApi } from "@/common/api/auth/auth.api";
import { isUserAuthenticated } from "@/common/api";

function LoginForm() {
  const router = useRouter();
  const handleLogin = useHandleLogin();
  if (isUserAuthenticated()) {
    router.push("/profile");
  }

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignUpWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider);
  };

  const onSubmit = (values: z.infer<typeof authSchema>) => {
    handleLogin(values);
  };
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (
        user?.email &&
        user?.displayName &&
        user.providerId &&
        !Cookies.get("Authentication")
      ) {
        const data = await googleLoginApi({
          email: user?.email,
          name: user?.displayName,
          localId: user?.uid,
        });
        Cookies.set("Authentication", data.token);
        router.push("/profile");
      }
    });
  });
  return (
    <div>
      <Card className="py-4 opacity-100">
        <CardHeader>
          <CardTitle className="text-center">Login User</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter the email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSignUpWithGoogle}> Sign with Google</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LoginForm;

"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
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

import { useRouter } from "next/navigation";
import { authSchema } from "@/helpers/validation/auth.validation";
import { UseHandleSignUpUser } from "@/hooks/auth/signup.auth.hook";
import { isUserAuthenticated } from "@/common/api";

function SignupForm() {
  const router = useRouter();
  if (isUserAuthenticated()) {
    router.push("/");
  }
  const handleSignUp = UseHandleSignUpUser();
  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof authSchema>) => {
    handleSignUp(values);
  };
  return (
    <div>
      <Card className="py-4 opacity-100">
        <CardHeader>
          <CardTitle className="text-center">Signup User</CardTitle>
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
                Signup
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/login" className="text-center text-sky-600">
            Already have an Account? Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SignupForm;

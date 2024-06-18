"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons"
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { Form } from "../ui/form";
import FormInput from "./FormInput";
import { FaGithub, FaGoogle } from "react-icons/fa";

interface UserAuthFormProps {
  variant: string;
  defaultValues: object;
  zodSchema: any;
}

export function UserAuthForm({
  variant,
  defaultValues,
  zodSchema,
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const toast = useToast();
  const router = useRouter();

  // USE FORM
  const form = useForm<z.infer<typeof zodSchema>>({
    resolver: zodResolver(zodSchema),
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<z.infer<typeof zodSchema>> = async (data) => {
    setIsLoading(true);

    //LOG IN
    if (variant === "Login") {
      //LOGIN
      console.log("login");
    }
    if (variant === "Register") {
      // REGISTER
      console.log("register");
    }
  };

  return (
    <div className={cn("grid gap-6")}>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              {variant === "Register" && (
                <FormInput
                  control={form.control}
                  placeholder="username"
                  name="username"
                  type="text"
                  required={true}
                  register={register}
                  errors={errors}
                  disabled={isLoading}
                />
              )}
              <FormInput
                control={form.control}
                placeholder="example@email.com"
                name="email"
                type="text"
                required={true}
                register={register}
                errors={errors}
                disabled={isLoading}
              />
              <FormInput
                control={form.control}
                placeholder="*****"
                name="password"
                type="password"
                required={true}
                register={register}
                errors={errors}
                disabled={isLoading}
              />
            </div>
            <Button disabled={isLoading}>
              {isLoading && (
                //   <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                <h1>Loading</h1>
              )}
              {variant === "Login"
                ? "Sign In with Credentials"
                : "Create New Account"}
            </Button>
          </div>
        </form>
      </Form>

      {/* OR CONTINUE WITH  */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      {/* SOCIAL BUTTONS  */}
      <div>
        <Button variant="outline" type="button" disabled={isLoading}>
          <FaGithub />
        </Button>
        <Button variant="outline" type="button" disabled={isLoading}>
          <FaGithub />
        </Button>
      </div>
    </div>
  );
}

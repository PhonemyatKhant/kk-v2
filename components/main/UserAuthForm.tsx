"use client";

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
import SocialIconButton from "./SocialIconButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { loginSchema, registerSchema } from "@/schemas/authSchemas";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

interface UserAuthFormProps {
  variant: string;
}

export function UserAuthForm({ variant }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  // USE FORM
  let loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  let registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // RESET FORM
  useEffect(() => {
    loginForm.reset();
    registerForm.reset();
  }, [variant]);

  // ON SUBMIT FUNCTION
  const onSubmit: SubmitHandler<
    z.infer<typeof loginSchema | typeof registerSchema>
  > = async (data) => {
    setIsLoading(true);

    //LOGIN TO WEBSITE
    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast({
            variant: "destructive",
            description: `${callback.error}`,
          });
        }
        if (callback?.ok && !callback.error) {
          toast({
            description: `Login successful!`,
          });
          router.push("/users");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className={cn("grid gap-6")}>
      {/* LOGIN REGISTER FORM  */}
      {variant === "Login" ? (
        <LoginForm form={loginForm} onSubmit={onSubmit} isLoading={isLoading} />
      ) : (
        <RegisterForm
          form={registerForm}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      )}

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
      <div className="flex gap-2 justify-between">
        <SocialIconButton
          icon={FaGithub}
          // onClickFunction={() => socialLoginHandler("github")}
        />
        <SocialIconButton
          icon={FaGoogle}
          // onClickFunction={() => socialLoginHandler("google")}
        />
      </div>
    </div>
  );
}

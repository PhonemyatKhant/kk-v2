"use client";

import { cn } from "@/lib/utils";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Form } from "../ui/form";
import FormInput from "./FormInput";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import SocialIconButton from "./SocialIconButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { loginSchema, registerSchema } from "@/schemas/authSchemas";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import AlertDialog from "./AlertDialog";

interface UserAuthFormProps {
  variant: string;
}

export function UserAuthForm({ variant }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // ALERT STATES
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [alertType, setAlertType] = useState<"success" | "destructive">();
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/");
    }
  }, [session?.status, router]);

  // USE FORM
  let loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  let registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
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
    z.infer<typeof registerSchema | typeof loginSchema>
  > = async (data) => {
    //API LOADING
    setIsLoading(true);

    console.log(data);

    if (variant === "Register") {
      // REGISTER USER

      await axios
        .post("/api/register", data)
        .then(() => {
          signIn("credentials", {
            ...data,
            redirect: false,
          });
        })
        .catch((error) => {
          setErrorMessage(error.response.data);
          setShowAlert(true);
          setAlertType("destructive");
        })
        .finally(() => setIsLoading(false));
    }

    if (variant === "Login") {
      console.log("login ran");

      //LOGIN TO WEBSITE
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            setErrorMessage(callback.error);
            setShowAlert(true);
            setAlertType("destructive");
          }
          if (callback?.ok && !callback.error) {
            router.push("/");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  // SOCIAL LOGIN FUNCTION GITHUB GOOGLE

  const socialLoginHandler = (provider: string) => {
    //LOGIN TO WEBSITE
    signIn(provider, {
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          setErrorMessage(callback.error);
          setShowAlert(true);
          setAlertType("destructive");
        }
        if (callback?.ok && !callback.error) {
          router.push("/");
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

      {/* ALERT DIALOG  */}
      {showAlert && <AlertDialog message={errorMessage} type={alertType} />}

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
          onClickFunction={() => socialLoginHandler("github")}
        />
        <SocialIconButton
          icon={FcGoogle}
          onClickFunction={() => socialLoginHandler("google")}
        />
      </div>
    </div>
  );
}

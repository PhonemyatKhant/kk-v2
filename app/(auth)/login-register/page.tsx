"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { UserAuthForm } from "@/components/main/UserAuthForm";
import { useState } from "react";

type Variant = "Login" | "Register";

export default function AuthenticationPage() {
  const [variant, setVariant] = useState<Variant>("Login");
  return (
    <>
      <div className="container relative  min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        {/* LOGIN BTN POSITION ABSOLUTE  */}
        <Button
          onClick={() => setVariant(variant === "Login" ? "Register" : "Login")}
          variant={"ghost"}
          className="absolute right-4 top-4 md:right-8 md:top-8"
        >
          {variant === "Login" ? "Register" : "Login"}
        </Button>

        {/* LEFT IMAGE LOGO CONTAINER  */}
        <div className="relative hidden h-full flex-col  p-10 text-white lg:flex dark:border-r">
          {/* BACKGROUND IMG  */}
          <div className="absolute inset-0 bg-primary/80  " />

          {/* TOP LEFT KK LOGO */}
          <div className="relative z-20 flex items-center text-lg font-medium  text-primary-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            KK Fabrics
          </div>

          {/* BOTTOM QUOTE  */}
          <div className="relative z-20 mt-auto text-primary-foreground">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Unveiling Elegance in Every Thread – Explore the Finest
                Selection of High-Quality Fabrics for All Your Creative
                Endeavors at KK Fabrics&rdquo;
              </p>
              <footer className="text-sm">KK Fabrics</footer>
            </blockquote>
          </div>
        </div>

        {/* RIGHT SIDE CONTAINER  */}
        <div className="lg:p-8">
          {/* AUTH CONTAINER  */}
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            {/* AUTH TITLE  */}
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                {variant === "Login"
                  ? "Sign in to your account"
                  : "Create an account"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {variant === "Login"
                  ? "Enter your credentials below to sign in"
                  : "Enter your email below to create your account"}
              </p>
            </div>
            {/* AUTH FORM  */}
            <UserAuthForm variant={variant} />

            {/* AUTH DESCRIPTION  */}
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

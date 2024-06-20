import React from "react";
import { Form } from "../ui/form";
import FormInput from "./FormInput";
import { Button } from "../ui/button";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { loginSchema } from "@/schemas/authSchemas";
import { z } from "zod";
import AlertDialog from "./AlertDialog";

interface LoginFormProps {
  onSubmit: SubmitHandler<z.infer<typeof loginSchema>>;
  form: UseFormReturn<typeof loginSchema> | any;
  isLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, form, isLoading }) => {
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              {/* {variant === "Register" && (
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
              )} */}
              <FormInput
                control={form.control}
                placeholder="example@email.com"
                name="email"
                type="text"
                required={true}
                register={form.register}
                errors={form.formState.errors}
                disabled={isLoading}
              />
              <FormInput
                control={form.control}
                placeholder="*****"
                name="password"
                type="password"
                required={true}
                register={form.register}
                errors={form.formState.errors}
                disabled={isLoading}
              />
            </div>
            <Button disabled={isLoading}>
              {isLoading && (
                //   <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                <h1>Loading</h1>
              )}
              Sign In With Credentials
            </Button>
          </div>
        </form>
      </Form>
      
    </>
  );
};

export default LoginForm;

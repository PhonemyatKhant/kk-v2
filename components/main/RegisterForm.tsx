import React from "react";
import { Form } from "../ui/form";
import FormInput from "./FormInput";
import { Button } from "../ui/button";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { registerSchema } from "@/schemas/authSchemas";
import { z } from "zod";

interface RegisterFormProps {
  onSubmit: SubmitHandler<z.infer<typeof registerSchema>>;
  form: UseFormReturn<typeof registerSchema> | any;
  isLoading: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  form,
  isLoading,
}) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <FormInput
              control={form.control}
              placeholder="username"
              name="username"
              type="text"
              required={true}
              register={form.register}
              errors={form.formState.errors}
              disabled={isLoading}
            />

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
            Create A New Account
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;

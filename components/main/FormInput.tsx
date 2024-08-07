import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldErrors } from "react-hook-form";
import { cn } from "@/lib/utils";

interface formProps {
  value?: any;
  control: any;
  placeholder?: string;
  name: any;
  label?: string;
  type: string;
  required?: boolean;
  disabled?: boolean;
  errors: FieldErrors;
  register: any;
}

const FormInput: React.FC<formProps> = ({
  value,
  control,
  placeholder,
  name,
  label,
  type,
  register,
  errors,
  required,
  disabled,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="dark:text-white">{label} </FormLabel>
          <FormControl>
            <Input
            
              autoComplete={name}
              type={type}
              placeholder={placeholder}
              {...field}
              {...register(name, {
                required,
                ...(type === "number" && { valueAsNumber: true }),
              })}
              disabled={disabled}
              className={cn(errors[name] && "focus:ring-rose-500")}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default FormInput;

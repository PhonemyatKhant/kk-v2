import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { FieldErrors } from "react-hook-form";

import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";

interface formProps {
  control: any;
  placeholder?: string;
  name: any;
  label?: string;
  disabled?: boolean;
  errors: FieldErrors;
}

const FormTextArea: React.FC<formProps> = ({
  control,
  placeholder,
  name,
  label,
  errors,
  disabled,
}) => {
  return (
    <FormField
      disabled={disabled}
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label} </FormLabel>
          <FormControl>
            <Textarea
              className={cn(
                "resize-none",
                errors[name] && "focus:ring-rose-500"
              )}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>

          {/* <FormMessage /> */}
        </FormItem>
      )}
    />
  );
};

export default FormTextArea;

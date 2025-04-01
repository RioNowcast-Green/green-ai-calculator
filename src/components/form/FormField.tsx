import { forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { MaskProps } from "@react-input/mask";
import { Input } from "./Input";
import { Label } from "./Label";

interface FormFieldProps extends UseFormRegisterReturn {
  label: string;
  type?: string;
  placeholder: string;
  errorMessage: string | undefined;
  className?: string;
  mask?: MaskProps;
  customInput?: React.ReactNode;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    { label, placeholder, type, errorMessage, mask, customInput, ...props },
    ref
  ) => {
    return (
      <div className="flex items-center justify-between gap-2 my-4">
        <Label htmlFor={props.name}>{label}</Label>
        <div>
          {customInput || (
            <Input
              type={type}
              placeholder={placeholder}
              mask={mask}
              {...props}
              ref={ref}
            />
          )}
          {errorMessage && <p className="text-xs text-red">{errorMessage}</p>}
        </div>
      </div>
    );
  }
);

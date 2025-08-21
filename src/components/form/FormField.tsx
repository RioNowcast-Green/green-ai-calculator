import { forwardRef, useState } from "react";
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
  helperMessage?: string;
  customInput?: React.ReactNode;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      label,
      placeholder,
      type,
      errorMessage,
      mask,
      customInput,
      helperMessage,
      ...props
    },
    ref
  ) => {
    const [openedHelper, setOpenedHelper] = useState<boolean>(false);

    return (
      <div className="flex items-center justify-between gap-2 my-4">
        <div className="flex flex-row items-center gap-1">
          <Label htmlFor={props.name}>{label}</Label>
          {helperMessage && (
            <div
              className="flex justify-center items-center rounded-full bg-neutral p-2 w-1 h-1 cursor-pointer"
              onMouseEnter={() => setOpenedHelper(true)}
              onMouseLeave={() => setOpenedHelper(false)}
            >
              {openedHelper && (
                <div className="absolute mb-16 max-w-[200px] bg-neutral p-2 rounded">
                  <p className="text-xs text-white">{helperMessage}</p>
                </div>
              )}
              <p className="text-white text-xs">?</p>
            </div>
          )}
        </div>
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

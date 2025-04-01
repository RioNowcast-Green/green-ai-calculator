import { MaskProps, useMask } from "@react-input/mask";
import { forwardRef } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  mask?: MaskProps;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ mask, ...props }, ref) => {
    const maskRef = useMask(mask);

    return (
      <input
        className="p-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        {...props}
        ref={(el) => {
          if (mask) maskRef.current = el;
          return typeof ref == "function" ? ref(el) : ref;
        }}
      />
    );
  }
);

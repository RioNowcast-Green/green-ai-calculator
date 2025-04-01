import React from "react";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label: React.FC<LabelProps> = ({ children, ...props }) => (
  <label className="text-base text-secondary" {...props}>
    <p className="font-medium">{children}</p>
  </label>
);

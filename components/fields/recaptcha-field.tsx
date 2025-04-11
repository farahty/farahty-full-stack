"use client";

import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { FormField } from "../ui/form";

import React from "react";

export type ReCaptchaButton = {
  onChange: (token: string) => void;
  value: string;
  action?: string;
  placeholder?: string;
  disabled?: boolean;
};

const ReCaptchaField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  disabled,
  ...props
}: Omit<ControllerProps<TFieldValues, TName>, "render"> & {
  label?: string;
  description?: string;
  placeholder?: string;
  action?: string;
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <input
          type="hidden"
          {...field}
          disabled={disabled}
          value={field.value}
        />
      )}
      {...props}
    />
  );
};

export default ReCaptchaField;

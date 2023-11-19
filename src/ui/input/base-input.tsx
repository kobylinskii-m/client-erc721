import { useClassName } from "@hooks/use-class-name";
import * as React from "react";

type TBaseInputPropsSize = "lg" | "sm" | "xs" | "md" | "base";

type TBaseInputPropsValidate = {
  isValid?: boolean;
  message?: string;
};

export type BaseInputPropsTypes = {
  type?: "default";
  isBordered?: boolean;
  isNoBackground?: boolean;
  isNoPadding?: boolean;
  size?: TBaseInputPropsSize;
  className?: string;
  wrapperClassName?: string;
  validation?: TBaseInputPropsValidate;
} & Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "size"
>;

const baseInputForSize: Record<TBaseInputPropsSize, string | undefined> = {
  lg: "input-lg",
  sm: "input-sm",
  xs: "input-xs",
  md: "input-md",
  base: undefined,
};

export const BaseInput: React.FC<BaseInputPropsTypes> = ({
  isBordered = false,
  isNoBackground = false,
  isNoPadding = false,
  size,
  className,
  wrapperClassName,
  validation,
  ...rest
}) => {
  const cn = useClassName();
  return (
    <div className={cn("w-full", wrapperClassName)}>
      <input
        type="text"
        {...(rest as any)}
        className={cn([
          "input w-full max-w-xs focus:outline-none",
          size ? baseInputForSize[size] : undefined,
          isBordered ? "input-bordered" : undefined,
          isNoBackground ? "input-ghost" : undefined,
          isNoPadding ? "px-0" : undefined,
          className,
        ])}
      />
      {typeof validation !== "undefined" && !validation?.isValid && (
        <span className="flex items-center font-medium tracking-wide text-error text-xs">
          {validation?.message || "Error"}
        </span>
      )}
    </div>
  );
};

import { useClassName } from "@hooks/use-class-name";
import { styleForBtnColor, TPropsColor } from "@ui/color/color";
import * as React from "react";

type TButtonPropsCode = "default" | "outline" | "responsive";
type TButtonPropsSize = "lg" | "sm" | "xs" | "base";
type TButtonPropsFormat = "wide" | "square" | "circle" | "base";

const buttonClassForType: Record<TButtonPropsCode, string> = {
  default: "btn",
  outline: "btn btn-outline",
  responsive: "btn btn-xs sm:btn-sm md:btn-md lg:btn-lg",
};

const buttonClassForSize: Record<TButtonPropsSize, string | undefined> = {
  lg: "btn-lg",
  sm: "btn-sm",
  xs: "btn-xs",
  base: undefined,
};

const buttonClassForFormat: Record<TButtonPropsFormat, string | undefined> = {
  base: undefined,
  wide: "btn-wide",
  circle: "btn-circle",
  square: "btn-square",
};

export type ButtonPropsTypes = {
  type?: TButtonPropsCode;
  size?: TButtonPropsSize;
  format?: TButtonPropsFormat;
  color?: TPropsColor;
  isIcon?: boolean;
  isLoading?: boolean;
  isDisable?: boolean;
  isNoAnimation?: boolean;
  isBorder?: boolean;
  isEventIsDisabled?: boolean;
  children?: React.ReactNode;
  className?: string;
} & Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  "type"
>;

export const Button: React.FC<ButtonPropsTypes> = ({
  type = "default",
  size = "base",
  format = "base",
  color = "base",
  isIcon = false,
  isDisable = false,
  isLoading = false,
  isNoAnimation = false,
  isBorder = true,
  isEventIsDisabled = false,
  className,
  children,
  ...rest
}) => {
  const cn = useClassName();
  return (
    <button
      {...rest}
      className={cn([
        buttonClassForType[type],
        buttonClassForSize[size],
        buttonClassForFormat[format],
        styleForBtnColor[color],
        isIcon ? "gap-2" : undefined,
        isDisable ? "btn-disabled" : undefined,
        isLoading ? "loading" : undefined,
        isNoAnimation ? "no-animation" : undefined,
        isEventIsDisabled ? "pointer-events-auto" : undefined,
        !isBorder ? "border-none" : undefined,
        className,
      ])}
    >
      {children}
    </button>
  );
};

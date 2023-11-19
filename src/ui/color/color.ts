export type TPropsColor = "info" | "success" | "warning" | "error" | "base";

export const styleForTextColor: Record<TPropsColor, string> = {
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  error: "text-error",
  base: "text-black",
};

export const styleForTextColorHover: Record<TPropsColor, string> = {
  info: "hover:text-opacity-75",
  success: "hover:text-opacity-75",
  warning: "hover:text-opacity-75",
  error: "hover:text-opacity-75",
  base: "hover:text-opacity-75",
};

export const styleForBtnColor: Record<TPropsColor, string> = {
  info: "btn-info",
  success: "btn-success",
  warning: "btn-warning",
  error: "btn-error",
  base: "",
};

export const styleForBgColor: Record<TPropsColor, string> = {
  info: "bg-info",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
  base: "bg-info",
};

export const styleForBorderColor: Record<TPropsColor, string> = {
  info: "border-info",
  success: "border-success",
  warning: "border-warning",
  error: "border-error",
  base: "border-info",
};

export const styleForBgColorSecondary: Record<TPropsColor, string> = {
  info: "bg-[#c3ddfd]",
  success: "bg-[#bcf0da]",
  warning: "bg-[#fce96a]",
  error: "bg-[#fbd5d5]",
  base: "bg-info bg-opacity-10",
};

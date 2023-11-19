import { useClassName } from "@hooks/use-class-name";
import { Text } from "@ui/text/text";
import * as React from "react";

type CheckboxPropsSize = "lg" | "sm" | "xs" | "md";

const buttonClassForSize: Record<CheckboxPropsSize, string | undefined> = {
  lg: "checkbox-lg",
  sm: "checkbox-sm",
  xs: "checkbox-xs",
  md: "checkbox-md",
};

export type CheckboxPropsTypes = {
  size?: CheckboxPropsSize;
  labelText?: string;
  isDisabled?: boolean;
  className?: string;
} & Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "size"
>;

export const Checkbox: React.FC<CheckboxPropsTypes> = ({
  size = "md",
  isDisabled = false,
  labelText,
  className,
  ...rest
}) => {
  const cn = useClassName();
  const labelId = React.useId();

  function renderInput(
    e?: React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
  ) {
    return (
      <input
        {...rest}
        {...e}
        type="checkbox"
        disabled={isDisabled}
        className={cn(["checkbox", buttonClassForSize[size], className])}
      />
    );
  }

  return labelText ? (
    <div className="flex space-x-2 ">
      <label htmlFor={labelId} className="cursor-pointer">
        <Text>{labelText}</Text>
      </label>
      {renderInput({ id: labelId })}
    </div>
  ) : (
    renderInput()
  );
};

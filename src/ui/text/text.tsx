import { useClassName } from "@hooks/use-class-name";
import * as React from "react";

export type TextPropsTypes = {
  children: string | number | (string | number)[];
  className?: string;
  toggle?: string;
  font?: keyof typeof FontDictionary;
} & (
  | ({
      type?: "default";
    } & React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLSpanElement>,
      HTMLSpanElement
    >)
  | ({
      type: "paragraph";
    } & React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLSpanElement>,
      HTMLSpanElement
    >)
);

const FontDictionary: Record<"primary" | "secondary", string> = {
  primary: "font-primary",
  secondary: "font-secondary",
} as const;

export const Text: React.FC<TextPropsTypes> = ({
  type,
  children,
  className,
  toggle,
  font,
  ...rest
}) => {
  const cn = useClassName();
  switch (type) {
    case "paragraph":
      return (
        <p
          {...(rest as any)}
          data-te-toggle={typeof toggle !== "undefined" ? "tooltip" : undefined}
          title={toggle}
          className={cn(className, font && FontDictionary[font])}
        >
          {children}
        </p>
      );

    case "default":
    default:
      return (
        <span
          {...rest}
          data-te-toggle={typeof toggle !== "undefined" ? "tooltip" : undefined}
          title={toggle}
          className={cn(className, font && FontDictionary[font])}
        >
          {children}
        </span>
      );
  }
};

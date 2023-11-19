/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/heading-has-content */
import { useClassName } from "@hooks/use-class-name";
import * as React from "react";

export type TitlePropsTypes = {
  children: React.ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

type TWrapperProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

export const Title: React.FC<TitlePropsTypes> = ({
  level,
  className,
  children,
  ...rest
}) => {
  const cn = useClassName();
  let Wrapper;
  switch (level) {
    case 2:
      Wrapper = (props: TWrapperProps) => (
        <h2 className={cn(["text-3xl font-semibold ", className])} {...props} />
      );
      break;
    case 3:
      Wrapper = (props: TWrapperProps) => (
        <h3 className={cn(["text-2xl font-medium ", className])} {...props} />
      );
      break;
    case 4:
      Wrapper = (props: TWrapperProps) => (
        <h4 className={cn(["text-xl font-medium ", className])} {...props} />
      );
      break;
    case 5:
      Wrapper = (props: TWrapperProps) => (
        <h5
          className={cn(["text-[20px] font-medium ", className])}
          {...props}
        />
      );
      break;
    case 6:
      Wrapper = (props: TWrapperProps) => (
        <h6 className={cn(["text-s font-medium ", className])} {...props} />
      );
      break;
    case 1:
    default:
      Wrapper = (props: TWrapperProps) => (
        <h1 className={cn(["text-4xl font-bold ", className])} {...props} />
      );
  }
  return <Wrapper {...rest}>{children}</Wrapper>;
};

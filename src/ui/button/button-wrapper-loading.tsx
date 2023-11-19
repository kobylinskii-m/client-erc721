import * as React from "react";
import { NullFunction } from "../../functools/null-function";
import { Button, ButtonPropsTypes } from "./button";

export type ButtonWrapperLoadingPropsTypes = {
  children: React.ReactNode;
  isHiddenChildren?: boolean;
} & ButtonPropsTypes;

export const ButtonWrapperLoading: React.FC<ButtonWrapperLoadingPropsTypes> = ({
  children,
  onClick = NullFunction,
  isHiddenChildren = false,
  ...rest
}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const clickWrapper = React.useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (isLoading) return;
      setIsLoading(true);
      await onClick(e);
      setIsLoading(false);
    },
    [onClick, isLoading]
  );

  return (
    <Button {...rest} onClick={clickWrapper} isLoading={isLoading}>
      {isLoading && isHiddenChildren ? <></> : children}
    </Button>
  );
};

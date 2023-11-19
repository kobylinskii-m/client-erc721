import * as React from "react";

export type InputPropsTypes = {} & Partial<React.ReactPortal>;

export const Input: React.FC<InputPropsTypes> = () => {
  return <input></input>;
};

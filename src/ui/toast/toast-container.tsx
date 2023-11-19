import * as React from "react";
import { ToastContainer as ReactToastify } from "react-toastify";
export type ToastContainerPropsTypes = {};

export const ToastContainer: React.FC<ToastContainerPropsTypes> = () => {
  return (
    <ReactToastify
      newestOnTop={false}
      autoClose={6000}
      position="bottom-right"
    />
  );
};

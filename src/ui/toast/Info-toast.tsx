import * as React from "react";

export type InfoToastPropsTypes = {
  message: string;
  description?: string;
};

export const InfoToast: React.FC<InfoToastPropsTypes> = ({
  message,
  description,
}) => {
  return (
    <div className="text-black">
      <div className="font-bold text-warning text-lg mb-1">{message}</div>
      <div className="opacity-70">{description}</div>
    </div>
  );
};

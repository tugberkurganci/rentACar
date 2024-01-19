import React, { ReactNode } from "react";

interface AlertProps {
  children: ReactNode;
  styleType?: string;
}

const Alert: React.FC<AlertProps> = ({ children, styleType }) => {
  return (
    <>
      <div className={`alert alert-${styleType || "success"}`}>{children}</div>
    </>
  );
};

export default Alert;

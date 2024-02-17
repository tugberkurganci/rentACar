import React from "react";

type Props = {
  style1?: object;
};

const LoadingSpinner = ({ style1 }: Props) => {
  return (
    <div
      className={`spinner-border text-warning `}
      style={style1}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;

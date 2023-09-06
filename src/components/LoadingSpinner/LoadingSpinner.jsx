import React from "react";
import { RingLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <RingLoader size={120} color={"var(--primary-color)"} />
    </div>
  );
};

export default LoadingSpinner;

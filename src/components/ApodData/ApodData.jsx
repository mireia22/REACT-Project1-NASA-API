import React from "react";

const ApodData = ({ apodData }) => {
  return (
    <div>
      <div className="card-image">
        <img src={apodData.url} alt={apodData.title} />
      </div>
      <h3>{apodData.title}</h3>
      <p>{apodData.explanation}</p>
    </div>
  );
};

export default ApodData;

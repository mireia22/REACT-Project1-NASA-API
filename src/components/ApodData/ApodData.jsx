import React from "react";

const ApodData = ({ apodData }) => {
  return (
    <div>
      <div className="card-image">
        <img src={apodData.url} alt={`Image: ${apodData.title}`} />
      </div>
      <h3 className="data-title">{apodData.title}</h3>
      <p className="data-explanation">{apodData.explanation}</p>
    </div>
  );
};

export default ApodData;

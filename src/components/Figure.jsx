import React from "react";
import { useEffect, useState } from "react";
const NASA_URL = "https://api.nasa.gov/";
const NASA_API_KEY = "0GOgxVgiZmdhJVnsncUk3B8eFeNymufd2bXwnLxh";

const Figure = ({ data }) => {
  if (data.code === 400) {
    return <h3>{data.msg}</h3>;
  }
  return (
    <div className="figure">
      <h2>{data.title}</h2>
      <div className="image">
        <img src={data.url} alt={data.title} />
      </div>
      <div>
        <p>Date: {data.date}</p>
        <p>Explanation: {data.explanation}</p>
      </div>
    </div>
  );
};

export default Figure;

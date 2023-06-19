import React, { useEffect, useState } from "react";
import { formatDistance, subDays } from "date-fns";

import "./Figure.css";

const Figure = () => {
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = subDays(new Date(today), 1).toISOString().slice(0, 10);

  const [date, setDate] = useState(today);
  const [apodData, setApodData] = useState(null);
  const [marsData, setMarsData] = useState(null);
  const [selectedOption, setSelectedOption] = useState("apod");
  console.log(date);
  const NASA_URL = "https://api.nasa.gov/";
  const API_KEY = import.meta.env.VITE_NASA_KEY;

  useEffect(() => {
    const fetchData = async () => {
      if (selectedOption === "apod") {
        const apodURL = `${NASA_URL}planetary/apod?date=${date}&api_key=${API_KEY}`;
        const data = await fetch(apodURL).then((res) => res.json());
        setApodData(data);
        setMarsData(null);
      } else if (selectedOption === "mars") {
        const marsURL = `${NASA_URL}mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${API_KEY}`;
        const data = await fetch(marsURL).then((res) => res.json());
        setMarsData(data);
        setApodData(null);
        console.log(data);
      }
    };

    fetchData();
  }, [date, selectedOption]);

  if (apodData === null && marsData === null) {
    return <p>Loading...</p>;
  }

  if (apodData && apodData.code === 400) {
    return (
      <>
        <h2>{apodData.msg}</h2>
        <button onClick={() => setDate(today)}>Return</button>
      </>
    );
  }

  if (marsData && date >= today) {
    return (
      <>
        <h2>
          Today's images have not been processed, so we're going to show you
          yesterday's images
        </h2>
        <button onClick={() => setDate(yesterday)}>Return</button>
      </>
    );
  }

  if (marsData && marsData.code === 400) {
    return (
      <>
        <h2>{marsData.msg}</h2>
        <button onClick={() => setDate(today)}>Return</button>
      </>
    );
  }

  return (
    <div className="card-details">
      <h1>ASTRONOMIC IMAGE OF THE DAY</h1>
      {selectedOption === "apod" && apodData ? (
        <h3>This image corresponds to {date} </h3>
      ) : selectedOption === "mars" && marsData ? (
        <h3>These images correspond to {date} </h3>
      ) : (
        ""
      )}
      <div className="input-select">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value.toLocaleString())}
        />
        <select
          id="data-select"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="apod">APOD</option>
          <option value="mars">MARS</option>
        </select>
      </div>
      {selectedOption === "apod" && apodData && (
        <>
          <div className="card-image">
            <img src={apodData.url} alt={apodData.title} />
          </div>
          <h3>{apodData.title}</h3>
          <p>{apodData.explanation}</p>
        </>
      )}
      {selectedOption === "mars" &&
        marsData &&
        marsData.photos.map((photo) => (
          <div key={photo.id} className="card-image">
            <img src={photo.img_src} alt={`Mars Rover - ${photo.id}`} />
          </div>
        ))}
    </div>
  );
};

export default Figure;

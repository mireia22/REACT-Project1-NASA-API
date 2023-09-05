import React, { useEffect, useState } from "react";
import { subDays } from "date-fns";
import "./Figure.css";
import ApodData from "./ApodData/ApodData";
import MarsData from "./MarsData/MarsData";

const Figure = () => {
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = subDays(new Date(today), 1).toISOString().slice(0, 10);

  const [date, setDate] = useState(today);
  const [apodData, setApodData] = useState(null);
  const [marsData, setMarsData] = useState(null);
  const [selectedOption, setSelectedOption] = useState("apod");

  useEffect(() => {
    const NASA_URL = "https://api.nasa.gov/";
    const API_KEY = import.meta.env.VITE_NASA_KEY;

    const selectedDate = new Date(date);
    const todayDate = new Date(today);
    if (selectedDate > todayDate) {
      return;
    }

    const fetchData = async () => {
      try {
        let data;
        if (selectedOption === "apod") {
          const apodURL = `${NASA_URL}planetary/apod?date=${date}&api_key=${API_KEY}`;
          data = await fetch(apodURL).then((res) => res.json());
          setApodData(data);
          setMarsData(null);
        } else if (selectedOption === "mars") {
          const marsURL = `${NASA_URL}mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${API_KEY}`;
          data = await fetch(marsURL).then((res) => res.json());
          setMarsData(data);
          setApodData(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [date, selectedOption]);

  //APOD AND MARS DATA MANAGING
  if (apodData === null && marsData === null) {
    return <p>Loading...</p>;
  }

  // DATA MANAGING
  // DATA MANAGING
  if (apodData && date > today) {
    return (
      <>
        <h2>Tomorrow image will be published tomorrow 😅</h2>
        <button className="errorBtn" onClick={() => setDate(today)}>
          Return
        </button>
      </>
    );
  }

  if (marsData) {
    if (date >= today) {
      return (
        <>
          <h2>
            Mars photos are updated until yesterday.
            <br />
            Today's photos will be published tomorrow.
            <br />
            I'll redirect you to yesterday's photos 😉
          </h2>{" "}
          <button className="errorBtn" onClick={() => setDate(yesterday)}>
            Return
          </button>
        </>
      );
    } else if (date > today) {
      return (
        <>
          <h2>Tomorrow image will be published tomorrow 😅</h2>
          <button className="errorBtn" onClick={() => setDate(yesterday)}>
            Return
          </button>
        </>
      );
    }
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
        <ApodData apodData={apodData} />
      )}
      {selectedOption === "mars" && marsData && (
        <MarsData marsData={marsData} />
      )}
    </div>
  );
};

export default Figure;

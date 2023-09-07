import React, { useEffect, useState } from "react";
import { subDays } from "date-fns";
import "./Figure.css";
import ApodData from "./ApodData/ApodData";
import MarsData from "./MarsData/MarsData";
import DateSelector from "./DateSelector/DateSelector";
import renderDataMessage from "./DataMessage/DataMessage";
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner";
import {
  APOD_DATE_MESSAGE,
  MARS_DATE_MESSAGE_TODAY,
  MARS_DATE_MESSAGE_YESTERDAY,
} from "./Constants/Constants";

const NASA_URL = "https://api.nasa.gov/";
const API_KEY = import.meta.env.VITE_NASA_KEY;

const Figure = () => {
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = subDays(new Date(today), 1).toISOString().slice(0, 10);

  const [date, setDate] = useState(today);
  const [apodData, setApodData] = useState(null);
  const [marsData, setMarsData] = useState(null);
  const [selectedOption, setSelectedOption] = useState("apod");
  const [isLoading, setIsLoading] = useState(false);

  const selectedDate = new Date(date);
  const currentDate = new Date();

  const fetchData = async (endpoint, setData) => {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (selectedDate > currentDate) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    if (selectedOption === "apod") {
      const apodURL = `${NASA_URL}planetary/apod?date=${date}&api_key=${API_KEY}`;
      fetchData(apodURL, setApodData)
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false));
      setMarsData(null);
    } else if (selectedOption === "mars") {
      const marsURL = `${NASA_URL}mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${API_KEY}`;
      fetchData(marsURL, setMarsData)
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false));
      setApodData(null);
    }
  }, [selectedOption, date]);

  if (apodData && date > today) {
    return renderDataMessage(APOD_DATE_MESSAGE, () => setDate(today));
  }

  if (marsData && date > today) {
    return renderDataMessage(MARS_DATE_MESSAGE_TODAY, () => setDate(yesterday));
  }

  if (marsData && date === today) {
    return renderDataMessage(MARS_DATE_MESSAGE_YESTERDAY, () =>
      setDate(yesterday)
    );
  }
  return (
    <main className="card-details">
      <section>
        {apodData || marsData ? (
          <h3 className="date-text">
            {selectedOption === "apod"
              ? "This image corresponds "
              : "These images correspond "}
            to <br />
            {date}
          </h3>
        ) : null}
      </section>
      <section>
        <DateSelector
          date={date}
          setDate={setDate}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </section>
      <section>
        {!isLoading ? (
          <>
            {selectedOption === "apod" && apodData && (
              <ApodData apodData={apodData} />
            )}
            {selectedOption === "mars" && marsData && (
              <MarsData marsData={marsData} />
            )}
          </>
        ) : (
          <LoadingSpinner />
        )}
      </section>
    </main>
  );
};

export default Figure;

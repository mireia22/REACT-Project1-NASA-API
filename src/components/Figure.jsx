import React, { useEffect, useState } from "react";
import { subDays } from "date-fns";
import "./Figure.css";
import ApodData from "./ApodData/ApodData";
import MarsData from "./MarsData/MarsData";
import DateSelector from "./DateSelector/DateSelector";
import renderDataMessage from "./DataMessage/DataMessage";
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner";

const NASA_URL = "https://api.nasa.gov/";
const API_KEY = import.meta.env.VITE_NASA_KEY;

const Figure = () => {
  const today = new Date().toISOString().slice(0, 10); // Move the declaration here
  const yesterday = subDays(new Date(today), 1).toISOString().slice(0, 10);

  const [date, setDate] = useState(today);
  const [apodData, setApodData] = useState(null);
  const [marsData, setMarsData] = useState(null);
  const [selectedOption, setSelectedOption] = useState("apod");

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
      console.log("data:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (selectedDate > currentDate) {
      return;
    }
    if (selectedOption === "apod") {
      const apodURL = `${NASA_URL}planetary/apod?date=${date}&api_key=${API_KEY}`;
      fetchData(apodURL, setApodData);
      setMarsData(null);
    } else if (selectedOption === "mars") {
      const marsURL = `${NASA_URL}mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${API_KEY}`;
      fetchData(marsURL, setMarsData);
      setApodData(null);
    }
  }, [selectedOption, date]);

  if (apodData === null && marsData === null) {
    return <LoadingSpinner />;
  }

  if (apodData && date > today) {
    return renderDataMessage(
      <>
        We only upload images up to TODAY'S date.
        <br />
        To see the image for tomorrow or the coming days,
        <br />
        COME BACK AGAIN.
        <br />
        you will surely love them. 😉
      </>,
      () => setDate(today)
    );
  }

  if (marsData && date > today) {
    return renderDataMessage(
      <>
        We only upload images up to YESTERDAY'S date.
        <br />
        So I'm redirecting you to yesterday's data.
        <br />
        To see today's image,
        <br />
        COME BACK AGAIN tomorrow,
        <br />
        you will surely love them. 😉
      </>,
      () => setDate(yesterday)
    );
  }

  if (marsData && date === today) {
    return renderDataMessage(
      <>
        Today's Mars data will be published tomorrow.
        <br />
        So I'm redirecting you to yesterday's data.
        <br />
        To see today's image,
        <br />
        COME BACK AGAIN tomorrow,
        <br />
        you will surely love them. 😉
      </>,
      () => setDate(yesterday)
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
        {selectedOption === "apod" && apodData && (
          <ApodData apodData={apodData} />
        )}
        {selectedOption === "mars" && marsData && (
          <MarsData marsData={marsData} />
        )}
      </section>
    </main>
  );
};

export default Figure;

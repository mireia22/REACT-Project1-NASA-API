import "./App.css";
const NASA_URL = "https://api.nasa.gov/";
const NASA_API_KEY = "0GOgxVgiZmdhJVnsncUk3B8eFeNymufd2bXwnLxh";
import React, { useEffect, useState } from "react";
import Figure from "./components/Figure";

function App() {
  //Recuperem la data actual en format ISO= 2023-01-01
  const today = new Date(Date.now()).toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const [apodData, setApodData] = useState(null);

  useEffect(() => {
    const fetchApodData = async () => {
      let data = await fetch(
        `${NASA_URL}planetary/apod?date=${date}&api_key=${NASA_API_KEY}`
      ).then((res) => res.json());

      setApodData(data);

      console.log(data);
    };
    fetchApodData();
  }, [date]);

  return (
    <>
      <div className="card">
        <h1>Astronomic image of the day</h1>
        <h3>This image corresponds on the date {date}</h3>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value.toLocaleString())}
        />
        {<Figure data={apodData} />}
      </div>
    </>
  );
}

export default App;

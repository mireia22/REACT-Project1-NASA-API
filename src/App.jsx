import "./App.css";
import React, { useEffect, useState } from "react";
import Figure from "./components/Figure";
import NASA_API_KEY from "../config";
const NASA_URL = "https://api.nasa.gov/";

function App() {
  const today = new Date(Date.now()).toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const [apodData, setApodData] = useState(null);

  useEffect(() => {
    const fetchApodData = async () => {
      let data = await fetch(
        `${NASA_URL}planetary/apod?date=${date}&api_key=${NASA_API_KEY}`
      ).then((res) => res.json());

      setApodData(data);
    };

    fetchApodData();
  }, [date]);

  return (
    <>
      <div className="card">
        <h1>Imagen astronómica del día</h1>
        <p>Esta imagen corresponde con la fecha {date}</p>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Figure data={apodData} />
      </div>
    </>
  );
}

export default App;

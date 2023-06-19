// import React, { useEffect, useState } from "react";
// import "./Figure.css";

// const Figure = () => {
//   const today = new Date().toISOString().slice(0, 10);

//   const [date, setDate] = useState(today);
//   const [apodData, setApodData] = useState(null);
//   const NASA_URL = "https://api.nasa.gov/";
//   const API_KEY = "0GOgxVgiZmdhJVnsncUk3B8eFeNymufd2bXwnLxh";

//   useEffect(() => {
//     const fetchData = async () => {
//       let data = await fetch(
//         `${NASA_URL}planetary/apod?date=${date}&api_key=${API_KEY}`
//       ).then((res) => res.json());
//       setApodData(data);
//       console.log(data);
//     };

//     fetchData();
//   }, [date]);

//   return apodData === null ? (
//     <p>Loading...</p>
//   ) : apodData.code === 400 ? (
//     <>
//       <h2>{apodData.msg}</h2>
//       <button onClick={() => setDate(today)}>Return</button>
//     </>
//   ) : (
//     <div className="card-details">
//       <h1>ASTRONOMIC IMAGE OF THE DAY</h1>
//       <h3>This image corresponds to {date} </h3>
//       <input
//         type="date"
//         value={date}
//         onChange={(e) => setDate(e.target.value.toLocaleString())}
//       />
//       <div className="card-image">
//         <img src={apodData.url} alt={apodData.title} />
//       </div>
//       <h3>{apodData.title}</h3>
//       <p>{apodData.explanation}</p>
//     </div>
//   );
// };

// export default Figure;

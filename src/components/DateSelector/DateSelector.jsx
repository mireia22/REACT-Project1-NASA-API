import React from "react";

const DateSelector = ({ date, setDate, selectedOption, setSelectedOption }) => {
  return (
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
  );
};

export default DateSelector;

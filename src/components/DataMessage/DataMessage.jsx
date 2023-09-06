const DataMessage = (message, onClickHandler) => (
  <div className="data-message">
    <h3>{message}</h3>
    <button className="returnBtn" onClick={onClickHandler}>
      Return
    </button>
  </div>
);

export default DataMessage;

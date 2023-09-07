import ImageWithFallback from "../FallBackImage/FallBackImage";
const ApodData = ({ apodData }) => {
  return (
    <div className="apod-wrp">
      <ImageWithFallback src={apodData.url} alt={`Image: ${apodData.title}`} />

      <div className="apod-text">
        <h2 className="data-title">{apodData.title}</h2>
        <p className="data-explanation">{apodData.explanation}</p>
      </div>
    </div>
  );
};

export default ApodData;

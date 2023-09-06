import ImageWithFallback from "../FallBackImage/FallBackImage";
const ApodData = ({ apodData }) => {
  return (
    <div>
      <ImageWithFallback src={apodData.url} alt={`Image: ${apodData.title}`} />
      <h3 className="data-title">{apodData.title}</h3>
      <p className="data-explanation">{apodData.explanation}</p>
    </div>
  );
};

export default ApodData;

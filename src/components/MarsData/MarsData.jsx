import ImageWithFallback from "../FallBackImage/FallBackImage";

const MarsData = ({ marsData }) => {
  return (
    <div className="imageWrp">
      {marsData.photos.map((photo) => (
        <div key={photo.id}>
          <h4>Camera: {photo.camera.name}</h4>
          <ImageWithFallback
            src={photo.img_src}
            alt={`Mars Rover - ${photo.id}`}
          />
        </div>
      ))}
    </div>
  );
};

export default MarsData;

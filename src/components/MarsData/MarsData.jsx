import React, { useState } from "react";
import ImageWithFallback from "../FallBackImage/FallBackImage";

const MarsData = ({ marsData }) => {
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [selectedCameraName, setSelectedCameraName] = useState(null);

  const uniqueCameras = [
    ...new Set(marsData.photos.map((photo) => photo.camera.name)),
  ];

  const handleCameraButtonClick = (cameraName) => {
    const selectedCameraId = marsData.photos.find(
      (photo) => photo.camera.name === cameraName
    ).camera.id;
    setSelectedCamera(selectedCameraId);
    setSelectedCameraName(cameraName); // Update the selected camera name
  };

  return (
    <div>
      <div className="mars-filter">
        <label>Filter by Camera:</label>

        <div className="marsBtns-wrp">
          <button className="marsBtns" onClick={() => setSelectedCamera(null)}>
            All
          </button>
          {uniqueCameras.map((cameraName) => (
            <button
              className="marsBtns"
              key={cameraName}
              onClick={() => handleCameraButtonClick(cameraName)}
            >
              {cameraName}
            </button>
          ))}
        </div>
        {selectedCamera ? (
          <p>{selectedCameraName} images</p>
        ) : (
          <p>All images</p>
        )}
      </div>
      <div className="imageWrp">
        {marsData.photos
          .filter(
            (photo) => !selectedCamera || photo.camera.id === selectedCamera
          )
          .map((photo) => (
            <div key={photo.id}>
              <ImageWithFallback
                src={photo.img_src}
                alt={`Mars Rover - ${photo.id}`}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default MarsData;

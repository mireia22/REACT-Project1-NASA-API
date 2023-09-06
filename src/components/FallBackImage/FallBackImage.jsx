import React, { useState } from "react";
import { FALLBACK_IMAGE, FALLBACK_MESSAGE } from "../Constants/Constants";

const ImageWithFallback = ({ src, alt }) => {
  const [imageNotFound, setImageNotFound] = useState(false);

  const style = {
    filter: imageNotFound ? "grayscale(100%)" : "none",
  };

  return (
    <div>
      <div className="card-image">
        <img
          src={imageNotFound ? FALLBACK_IMAGE : src}
          alt={alt}
          onError={() => setImageNotFound(true)}
          style={style}
        />
      </div>
      {imageNotFound && <p>{FALLBACK_MESSAGE}</p>}
    </div>
  );
};

export default ImageWithFallback;

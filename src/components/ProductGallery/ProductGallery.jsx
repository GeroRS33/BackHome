import { useState } from "react";

import "./ProductGallery.css";

function ProductGallery({ images = [], productName }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="product-gallery">
      <div className="product-main-image">
        <img src={selectedImage} alt={productName} />
      </div>

      <div className="product-thumbnails">
        {images.map((image, index) => (
          <button
            className={selectedImage === image ? "active" : ""}
            type="button"
            key={image}
            onClick={() => setSelectedImage(image)}
          >
            <img src={image} alt={`${productName} vista ${index + 1}`} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductGallery;
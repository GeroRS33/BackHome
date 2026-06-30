import { useEffect, useMemo, useState } from "react";
import "./ProductGallery.css";

function ProductGallery({ images = [], productName }) {
  const validImages = useMemo(() => {
    return images.filter(Boolean);
  }, [images]);

  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (validImages.length > 0) {
      setSelectedImage(validImages[0]);
    }
  }, [validImages]);

  if (validImages.length === 0) {
    return (
      <div className="product-gallery">
        <div className="product-main-image">
          <p>Imagen no disponible</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-gallery">
      <div className="product-main-image">
        <img src={selectedImage} alt={productName} />
      </div>

      <div className="product-thumbnails">
        {validImages.map((image, index) => (
          <button
            className={selectedImage === image ? "active" : ""}
            type="button"
            key={`${image}-${index}`}
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
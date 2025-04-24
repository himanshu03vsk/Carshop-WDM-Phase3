import { useEffect, useState } from "react";

const ProductImageGallery = ({ partId }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:3000/api/parts/${partId}/images`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (Array.isArray(data)) setImages(data);
      } catch (err) {
        console.error("Error loading images:", err.message);
      }
    };

    fetchImages();
  }, [partId]);

  return (
    <div className="prod-sm-image-container">
      {images.map((img, idx) => (
        <img
          key={idx}
          src={'/src/assets/react.svg'}
          // src={`/images/${img.path}`}
          alt={img.image_name}
          className="imgs"
        />
      ))}
    </div>
  );
};

export default ProductImageGallery;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductImageGallery from "../components/ProductImageGallery";
import ProductDescription from "../components/ProductDescription";
import ProductActions from "../components/ProductActions";
import RelatedProducts from "../components/RelatedProducts";
import Reviews from "../components/Reviews";

const ProductDetail = () => {
  const { id } = useParams();
  const [part, setPart] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:3000/api/parts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch product");

        const data = await res.json();
        setPart(data);
      } catch (error) {
        console.error("Error loading product:", error.message);
      }
    };

    fetchProduct();
  }, [id]);

  if (!part) return <p>Loading product...</p>;

  return (
    <div className="container mx-auto px-4 py-6 flex flex-col gap-6">
      <div className="prod-detail-container flex flex-col lg:flex-row gap-6">
        {/* Product Image Gallery */}
        <div className="prod-sm-image-container flex-1">
          <ProductImageGallery partId={part.part_id} />
        </div>

        {/* Main Product Image */}
        <div className="prod-bg-image-container flex-2 max-w-[400px]">
          <img
            src={`/images/${part.main_image}`}
            alt={part.part_name}
            id="big-img"
            className="rounded-md max-w-full shadow-lg"
          />
        </div>

        {/* Product Description and Actions */}
        <div className="prod-desc-act-container flex-3 flex flex-col justify-between">
          <ProductDescription part={part} />
          <ProductActions product={part.part_id} />
        </div>
      </div>
      <div className="rev-rec flex">
      {/* Reviews Section */}
      <div className="reviews-container mt-12 flex-1">
        <Reviews partId={part.part_id} />
      </div>

      {/* Related Products Section */}
      <div className="related-products-container mt-12 flex-1">
        <RelatedProducts category={part.part_category} currentId={part.part_id} />
      </div>
      </div>
    </div>
  );
};

export default ProductDetail;

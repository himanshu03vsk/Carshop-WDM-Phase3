import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductImageGallery from "../components/ProductImageGallery";
import ProductDescription from "../components/ProductDescription";
import ProductActions from "../components/ProductActions";
import RelatedProducts from "../components/RelatedProducts";
import Reviews from "../components/Reviews";
import "./productdetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  console.log(id) // Get product ID from route
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


    <div className="master-container">
      <div className="prod-detail-container">
        <ProductImageGallery partId={part.part_id} />
        <div className="prod-bg-image-container">
          <img src={`/images/${part.main_image}`} alt={part.part_name} id="big-img" />
        </div>
        <div className="prod-desc-act-container">
          <ProductDescription part={part} />
          <ProductActions product={part.part_id} />
        </div>
        </div>

        <div className="reviews-container">
          <Reviews partId={part.part_id} />
        </div>
        <div className="related-products-container">
          <RelatedProducts category={part.part_category} currentId={part.part_id} />
    </div>
    </div>
    



  );
};

export default ProductDetail;



// <div className="prod-detail-container">
//       <ProductImageGallery partId={part.part_id} />
//       <div className="prod-bg-image-container">
//         <img src={`/images/${part.main_image}`} alt={part.part_name} id="big-img" />
//       </div>
//       <div className="prod-desc-act-container">
//         <ProductDescription part={part} />
//         <ProductActions partId={part.part_id} />
//       </div>
//       <Reviews partId={part.part_id} />
//       <RelatedProducts category={part.part_category} currentId={part.part_id} />
//     </div>
import { useEffect, useState } from "react";

const RelatedProducts = ({ category, currentId }) => {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `http://localhost:3000/api/parts/related?category=${category}&exclude=${currentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (Array.isArray(data)) setRelated(data);
        else console.warn("Related products not in array format:", data);
      } catch (error) {
        console.error("Error loading related products:", error.message);
      }
    };

    fetchRelated();
  }, [category, currentId]);

  return (
    <div style={{ marginTop: "40px" }}>
      <h3>Related Products</h3>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {Array.isArray(related) &&
          related.map((p) => (
            <div key={p.part_id} style={{ margin: "10px" }}>
              <img src={`/images/${p.main_image}`} alt={p.part_name} width="100" />
              <p>{p.part_name}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RelatedProducts;

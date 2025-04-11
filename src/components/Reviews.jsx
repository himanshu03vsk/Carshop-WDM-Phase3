import { useEffect, useState } from "react";
import "./Reviews.css"; // Optional CSS if you want to style it separately

const Reviews = ({ partId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:3000/api/parts/reviews/${partId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        console.log(data);

        if (Array.isArray(data)) setReviews(data);
      } catch (err) {
        console.error("Error loading reviews:", err.message);
      }
    };

    if (partId) {
      fetchReviews();
    }
  }, [partId]);

  return (
    <div className="reviews-container">
      <h3>Reviews</h3>
      {reviews.length > 0 ? (
        reviews.map((rev, i) => (
          <div key={i} className="review-item">
            <div className="review-header">
              <strong>{rev.buyer_email}</strong>
              <span className="review-rating">⭐ {rev.rating}/5</span>
            </div>
            <p className="review-text">{rev.review_text}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default Reviews;

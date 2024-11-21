import reviewsData from "./reviewsData.json";
import { Link } from "react-router-dom";
import "./Reviews.css";

const Reviews = () => {
  return (
    <div className="reviews-page">
      <h1>Game Reviews</h1>
      <p>
        Welcome to my game reviews page! I plan to write about 1-4 reviews each
        month, with some additional variance depending on my gaming adventures
        and discoveries.
      </p>
      <ul className="review-list">
        {reviewsData.map((review, index) => (
          <li key={index} className="review-item">
            <Link to={`/reviews/${index}`}>
              <h2>{review.title}</h2>
              <p>Score: {review.score}/10</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;

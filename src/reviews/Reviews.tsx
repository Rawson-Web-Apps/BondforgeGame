import reviewsData from "./reviewsData.json";
import { Link } from "react-router-dom";
import "./Reviews.css";

const Reviews = () => {
  return (
    <div className="reviews-page">
      <div className="reviews-page-content">
        <h1>Game Reviews</h1>
        <p>
          Welcome to my game reviews page! I plan to write about 1-4 reviews
          each month, with some additional variance depending on my gaming
          adventures and discoveries.
        </p>
        <ul className="review-list">
          {reviewsData.map((review, index) => (
            <li key={index} className="review-item">
              <Link to={`/reviews/${index}`}>
                <div className="review-item-content">
                  <div className="review-item-info">
                    <h2>{review.title}</h2>
                    <div className="review-item-details">
                      <span>Platform: {review.platform}</span>
                      <span>•</span>
                      <span>Release Date: {review.release_date}</span>
                    </div>
                  </div>
                  <div className="review-item-score">
                    <span>{review.score}</span>
                    <small>/10</small>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Reviews;

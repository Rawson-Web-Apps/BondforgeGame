import reviewsData from "./reviewsData.json";
import { Link } from "react-router-dom";
import "./Reviews.css";
import { Helmet } from "react-helmet-async";

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

const Reviews = () => {
  return (
    <>
      <Helmet>
        <title>Game Reviews | TARawson</title>
        <meta
          name="description"
          content="Collection of detailed video game reviews, featuring scores, analysis, and insights across various gaming platforms."
        />
        <meta property="og:title" content="Game Reviews | TARawson" />
        <meta
          property="og:description"
          content="Collection of detailed video game reviews, featuring scores, analysis, and insights across various gaming platforms."
        />
        <link rel="canonical" href="/reviews" />
      </Helmet>
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
                <Link to={`/reviews/${slugify(review.title)}`}>
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
    </>
  );
};

export default Reviews;

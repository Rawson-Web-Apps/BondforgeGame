import { useEffect, useState } from "react";
import reviewsData from "./reviewsData.json";
import { Link } from "react-router-dom";
import "./Reviews.css";
import { Helmet } from "react-helmet-async";
import { fetchUserRatings } from "./api";

export interface Rating {
  rating: number; // Rating value (1–10)
}

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

const Reviews = () => {
  const [userRatings, setUserRatings] = useState<{
    [key: string]: { average: number | null; count: number };
  }>({});

  useEffect(() => {
    const fetchRatings = async () => {
      const ratings = await Promise.all(
        reviewsData.map(async (review) => {
          const { average, count } = await fetchUserRatings(review.title);
          return { [review.title]: { average, count } };
        })
      );
      setUserRatings(Object.assign({}, ...ratings));
    };

    fetchRatings();
  }, []);

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
                    <img
                      src={review.Image}
                      alt={`${review.title} cover`}
                      className="review-item-image"
                    />
                    <div className="review-item-info">
                      <h2>{review.title}</h2>
                      <div className="review-item-details">
                        <span>Platform: {review.platform}</span>
                        <span>•</span>
                        <span>Release Date: {review.release_date}</span>
                      </div>
                      <div className="review-item-scores">
                        <div className="tarawson-review-score">
                          <h4>TARawson Review</h4>
                          <span>{review.score}</span>
                          <small>/10</small>
                        </div>
                        {userRatings[review.title]?.average !== null && (
                          <div className="user-review-score">
                            <h4>User Review</h4>
                            <span>{userRatings[review.title]?.average}</span>
                            <small>/10</small>
                            <div>
                              <small>
                                ({userRatings[review.title]?.count} ratings)
                              </small>
                            </div>
                          </div>
                        )}
                      </div>
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

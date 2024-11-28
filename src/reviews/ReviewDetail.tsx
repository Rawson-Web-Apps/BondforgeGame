import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import reviewsData from "./reviewsData.json";
import "./Reviews.css";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { fetchRatingsForGames, submitUserRating } from "./api";

declare global {
  interface Window {
    grecaptcha: {
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
  }
}

const SITE_KEY = "6LfO2osqAAAAAP4vSRnJBmaeZVUP9YzEyE7F0_hr";

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

const ReviewDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [averageUserRating, setAverageUserRating] = useState<number | null>(
    null
  );
  const [userRatingCount, setUserRatingCount] = useState<number>(0);
  const [userRating, setUserRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const review = reviewsData.find((r) => slugify(r.title) === slug);

  // Fetch user ratings on component mount
  useEffect(() => {
    if (!review) return;

    const fetchRatings = async () => {
      loadRecaptchaScript(SITE_KEY);

      const ratingsData = await fetchRatingsForGames([review.title]);
      const ratingInfo = ratingsData.find(
        (r: { gameId: string }) => r.gameId === slugify(review.title)
      );

      if (ratingInfo && ratingInfo.count > 0) {
        setAverageUserRating(ratingInfo.average);
        setUserRatingCount(ratingInfo.count);
      } else {
        setAverageUserRating(null); // No average rating
        setUserRatingCount(0); // No ratings
      }
    };

    fetchRatings();
  }, [review]);

  // Handle rating submission
  const handleRatingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userRating < 1 || userRating > 10) {
      alert("Please enter a rating between 1 and 10.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Execute reCAPTCHA and get token
      const token = await window.grecaptcha.execute(SITE_KEY, {
        action: "submit",
      });

      const response = await submitUserRating(review!.title, userRating, token);
      console.log(response);
      if (response.success) {
        setHasSubmitted(true);
        setUserRating(0);
        const ratingsData = await fetchRatingsForGames([review!.title]);
        const ratingInfo = ratingsData.find(
          (r: { gameId: string }) => r.gameId === slugify(review!.title)
        );
        setAverageUserRating(ratingInfo.average);
        setUserRatingCount(ratingInfo.count);
      } else {
        if (response.error.response.data.reason) {
          if (response.error.response.data.reason === "Captcha failed") {
            alert("Captcha failed. Refresh the page and try again.");
          } else {
            alert("Failed to submit rating. Please try again.");
          }
        }
      }
    } catch (err) {
      console.error("Error submitting rating:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to render stars
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 10; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= (hoverRating || userRating) ? "filled" : ""}`}
          onClick={() => setUserRating(i)}
          onMouseEnter={() => setHoverRating(i)}
          onMouseLeave={() => setHoverRating(null)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  // Function to render stars for average rating
  const renderAverageStars = (average: number) => {
    const stars = [];
    for (let i = 1; i <= 10; i++) {
      stars.push(
        <span key={i} className={`star ${i <= average ? "filled" : ""}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  const loadRecaptchaScript = (siteKey: string) => {
    if (
      !document.querySelector(
        `script[src="https://www.google.com/recaptcha/api.js?render=${siteKey}"]`
      )
    ) {
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${review!.title} Review (${review!.score.toFixed(
          1
        )}/10) | TARawson`}</title>
        <meta
          name="description"
          content={`Review of ${review!.title} (${
            review!.platform
          }). Released ${review!.release_date}. Rated ${review!.score.toFixed(
            1
          )}/10.`}
        />
        <meta
          property="og:title"
          content={`${review!.title} Review | TARawson`}
        />
        <meta
          property="og:description"
          content={`Review of ${review!.title} (${
            review!.platform
          }). Released ${review!.release_date}. Rated ${review!.score.toFixed(
            1
          )}/10.`}
        />
        <link rel="canonical" href={`/reviews/${slugify(review!.title)}`} />
      </Helmet>
      <div className="review-detail">
        <div className="review-detail-content">
          <button className="back-button" onClick={() => navigate("/reviews")}>
            Back to Reviews
          </button>
          <h1>{review!.title}</h1>
          <img
            src={review!.image}
            alt={`${review!.title} cover`}
            className="review-detail-image"
          />
          <div className="review-detail-meta">
            <span>{review!.platform}</span>
            <span>•</span>
            <span>{review!.release_date}</span>
          </div>
          <div className="review-detail-score">
            <span>{review!.score.toFixed(1)}</span>
            <small>/10</small>
          </div>

          <div className="user-rating-section">
            <h2>User Ratings</h2>
            <div className="average-rating-section">
              <h3>Average User Rating</h3>
              {userRatingCount > 0 ? (
                <>
                  <div className="star-rating">
                    {renderAverageStars(averageUserRating || 0)}
                  </div>
                  <div className="average-rating">
                    {averageUserRating ? averageUserRating.toFixed(1) : "N/A"} /
                    10
                  </div>
                  <div className="rating-count">
                    <small>({userRatingCount} ratings)</small>
                  </div>
                </>
              ) : (
                <div>No user ratings yet. Be the first to rate!</div>
              )}
            </div>

            {hasSubmitted ? (
              <div className="thank-you-message">
                <h3>Thank you for submitting your rating!</h3>
              </div>
            ) : (
              <div className="submit-rating-section">
                <h3>Your Rating</h3>
                <div className="star-rating">{renderStars()}</div>
                <div className="current-rating">{userRating} / 10</div>
                <button onClick={handleRatingSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            )}
          </div>
          <br></br>
          <h1>TARawson's Review</h1>
          <ReactMarkdown>{review!.content}</ReactMarkdown>
          {review!.website && (
            <p>
              <a
                href={review!.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Website
              </a>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ReviewDetail;

import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import reviewsData from "./reviewsData.json";
import "./Reviews.css";
import { Helmet } from "react-helmet-async";

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

const ReviewDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const review = reviewsData.find(
    (r) => slugify(r.title) === slug
  );

  if (!review) {
    return <p>Review not found.</p>;
  }

  return (
    <>
      <Helmet>
        <title>{`${review.title} Review (${review.score}/10) | Your Site Name`}</title>
        <meta name="description" content={`Review of ${review.title} (${review.platform}). Released ${review.release_date}. Rated ${review.score}/10.`} />
        <meta property="og:title" content={`${review.title} Review | Your Site Name`} />
        <meta property="og:description" content={`Review of ${review.title} (${review.platform}). Released ${review.release_date}. Rated ${review.score}/10.`} />
        <link rel="canonical" href={`/reviews/${slugify(review.title)}`} />
      </Helmet>
      <div className="review-detail">
        <div className="review-detail-content">
          <button className="back-button" onClick={() => navigate("/reviews")}>
            Back to Reviews
          </button>
          <h1>{review.title}</h1>
          <div className="review-detail-meta">
            <span>{review.platform}</span>
            <span>•</span>
            <span>{review.release_date}</span>
          </div>
          <div className="review-detail-score">
            <span>{review.score}</span>
            <small>/10</small>
          </div>
          <ReactMarkdown>{review.content}</ReactMarkdown>
        </div>
      </div>
    </>
  );
};

export default ReviewDetail;

import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import reviewsData from "./reviewsData.json";
import "./Reviews.css";

const ReviewDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const review = reviewsData[parseInt(id!)];

  if (!review) {
    return <p>Review not found.</p>;
  }

  return (
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
  );
};

export default ReviewDetail;

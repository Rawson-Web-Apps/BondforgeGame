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
      <button className="back-button" onClick={() => navigate("/reviews")}>
        Back to Reviews
      </button>
      <h1>{review.title}</h1>
      <p style={{ textAlign: "center" }}>Score: {review.score}/10</p>
      <ReactMarkdown>{review.content}</ReactMarkdown>
    </div>
  );
};

export default ReviewDetail;

import { useEffect, useState } from "react";
import reviewsData from "./reviewsData.json";
import { Link } from "react-router-dom";
import "./Reviews.css";
import { Helmet } from "react-helmet-async";
import { fetchRatingsForGames } from "./api";

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
  const [sortCriteria, setSortCriteria] = useState<string>("title");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const reviewsPerPage = 5;

  useEffect(() => {
    const fetchRatings = async () => {
      const gameTitles = reviewsData.map((review) => review.title);
      const ratingsData = await fetchRatingsForGames(gameTitles);

      const ratings = ratingsData.reduce(
        (
          acc: { [key: string]: { average: number | null; count: number } },
          {
            gameId,
            average,
            count,
          }: { gameId: string; average: number | null; count: number }
        ) => {
          acc[gameId] = { average, count };
          return acc;
        },
        {}
      );

      setUserRatings(ratings);
    };

    fetchRatings();
  }, []);

  const filteredReviews = reviewsData.filter((review) =>
    review.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortCriteria) {
      case "platform":
        return a.platform.localeCompare(b.platform);
      case "release_date":
        return (
          new Date(a.release_date).getTime() -
          new Date(b.release_date).getTime()
        );
      case "tarawson_score":
        return b.score - a.score;
      case "user_score":
        const aUserScore = userRatings[slugify(a.title)]?.average || 0;
        const bUserScore = userRatings[slugify(b.title)]?.average || 0;
        return bUserScore - aUserScore;
      case "title":
      default:
        return a.title.localeCompare(b.title);
    }
  });

  // Pagination logic
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = sortedReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

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
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="sort-options">
            <label htmlFor="sort">Sort by: </label>
            <select
              id="sort"
              value={sortCriteria}
              onChange={(e) => setSortCriteria(e.target.value)}
            >
              <option value="title">Title</option>
              <option value="platform">Platform</option>
              <option value="release_date">Release Date</option>
              <option value="tarawson_score">TARawson Review Score</option>
              <option value="user_score">User Score</option>
            </select>
          </div>
          <ul className="review-list">
            {currentReviews.map((review, index) => (
              <li key={index} className="review-item">
                <Link to={`/reviews/${slugify(review.title)}`}>
                  <div className="review-item-content">
                    <img
                      src={review.image}
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
                          <span>{review.score.toFixed(1)}</span>
                          <small>/10</small>
                        </div>
                        {userRatings[slugify(review.title)] ? (
                          <div className="user-review-score">
                            <h4>User Review</h4>
                            <span>
                              {userRatings[
                                slugify(review.title)
                              ].average!.toFixed(1)}
                            </span>
                            <small>/10</small>
                            <div>
                              <small>
                                ({userRatings[slugify(review.title)].count}{" "}
                                ratings)
                              </small>
                            </div>
                          </div>
                        ) : (
                          <div className="user-review-score">
                            <h4>User Review</h4>
                            <span>N/A</span>
                            <small>/10</small>
                            <div>
                              <small>(No ratings yet)</small>
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
          <div className="review-pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`review-page-button ${
                  currentPage === i + 1 ? "active" : ""
                }`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Reviews;

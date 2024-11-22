import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import YearMonthSidebar from "./YearMonthSidebar";
import { loadAllMonthlyGames } from "../utils/dataLoader";
import { GamesByMonth } from "../types/types";
import "./TopGamesList.css";

const ITEMS_PER_PAGE = 5;

const TopGamesList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allMonthlyGames, setAllMonthlyGames] = useState<GamesByMonth[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGames = async () => {
      try {
        setLoading(true);
        const games = await loadAllMonthlyGames();
        setAllMonthlyGames(games);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load games");
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const totalPages = Math.ceil(allMonthlyGames.length / ITEMS_PER_PAGE);
  const paginatedGames = allMonthlyGames.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="top-games-container">
      <YearMonthSidebar />
      <div className="top-games-content">
        <h1>Top Games of the Month</h1>
        {paginatedGames.map((monthlyGames) => (
          <div
            key={`${monthlyGames.year}-${monthlyGames.month}`}
            className="monthly-section"
          >
            <h2 className="month-header">
              <Link
                to={`/top-games/${
                  monthlyGames.year
                }/${monthlyGames.month.toLowerCase()}`}
              >
                {monthlyGames.month.charAt(0).toUpperCase() +
                  monthlyGames.month.slice(1)}{" "}
                {monthlyGames.year}
              </Link>
            </h2>
            <div className="games-grid">
              {monthlyGames.games.map((game) => (
                <div key={game.title} className="game-card">
                  <a
                    href={game.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="game-image-link"
                  >
                    <div className="game-image">
                      <img src={game.imageUrl} alt={game.title} />
                    </div>
                  </a>
                  <div className="game-content">
                    <h3>
                      #{game.rank} {game.title}
                    </h3>
                    <p className="platform">{game.platform}</p>
                    <p className="description">{game.description}</p>
                    <a
                      href={game.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="game-website"
                    >
                      Website →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Pagination */}
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopGamesList;

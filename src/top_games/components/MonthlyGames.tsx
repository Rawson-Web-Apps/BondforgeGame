import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import YearMonthSidebar from "./YearMonthSidebar";
import { Game, GamesByMonth } from "../types/types";
import "./MonthlyGames.css";
import { gameFiles } from "../utils/dataLoader";

function parseMarkdownContent(content: string): Game[] {
  const games: Game[] = [];
  const sections = content.split(/(?=# )/); // Split on headers

  sections.forEach((section) => {
    if (!section.trim()) return;

    const lines = section.split("\n");
    const title = lines[0].replace("# ", "").trim();
    let rank = 0;
    let platform = "";
    let imageUrl = "";
    let websiteUrl = "";
    let description = "";

    lines.slice(1).forEach((line) => {
      if (line.startsWith("Rank: ")) {
        rank = parseInt(line.replace("Rank: ", ""));
      } else if (line.startsWith("Platform: ")) {
        platform = line.replace("Platform: ", "").trim();
      } else if (line.startsWith("Image: ")) {
        imageUrl = line.replace("Image: ", "").trim();
      } else if (line.startsWith("Website: ")) {
        websiteUrl = line.replace("Website: ", "").trim();
      } else if (line.startsWith("Description: ")) {
        description = line.replace("Description: ", "").trim();
      }
    });

    if (title && rank && platform && imageUrl && websiteUrl && description) {
      games.push({ title, rank, platform, imageUrl, websiteUrl, description });
    }
  });

  return games;
}

const MonthlyGames: React.FC = () => {
  const { year, month } = useParams<{ year: string; month: string }>();
  const navigate = useNavigate();
  const [monthlyGames, setMonthlyGames] = useState<GamesByMonth | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMonthlyGames = async () => {
      try {
        setLoading(true);
        const filePath = `/src/top_games/data/${year}/${month}.md`;

        const loadContent = gameFiles[filePath];
        if (!loadContent) {
          throw new Error("Month not found");
        }

        const content = await loadContent();
        const games = parseMarkdownContent(content);

        setMonthlyGames({
          year: parseInt(year!),
          month: month!,
          games: games.sort((a: Game, b: Game) => a.rank - b.rank),
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load games");
      } finally {
        setLoading(false);
      }
    };

    if (year && month) {
      loadMonthlyGames();
    }
  }, [year, month]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => navigate("/top-games")}>
          Back to Top Games
        </button>
      </div>
    );
  }

  if (!monthlyGames) {
    return <div>Month not found</div>;
  }

  return (
    <div className="top-games-container">
      <YearMonthSidebar />
      <div className="monthly-games-content">
        <button className="back-button" onClick={() => navigate("/top-games")}>
          Back to All Games
        </button>
        <h1>
          Top Games of {month!.charAt(0).toUpperCase() + month!.slice(1)} {year}
        </h1>
        <div className="games-grid">
          {monthlyGames.games.map((game: Game) => (
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
                <div className="description">
                  <ReactMarkdown>{game.description}</ReactMarkdown>
                </div>
                <a
                  href={game.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="game-website"
                >
                  Official Website →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonthlyGames;

import { Game } from "../types/types";

// This will get all .md files in the top_games directory and its subdirectories
export const gameFiles = import.meta.glob("/src/top_games/data/**/*.md", {
  as: "raw",
});

export async function getAvailableMonths(): Promise<{
  [year: string]: string[];
}> {
  const yearMonthData: { [year: string]: string[] } = {};

  // Extract years and months from the file paths
  for (const path of Object.keys(gameFiles)) {
    const match = path.match(/\/(\d{4})\/(\w+)\.md$/);
    if (match) {
      const [, year, month] = match;
      if (!yearMonthData[year]) {
        yearMonthData[year] = [];
      }
      yearMonthData[year].push(month);
    }
  }

  // Sort years descending and months within each year
  for (const year in yearMonthData) {
    yearMonthData[year].sort((a, b) => {
      const months = [
        "december",
        "november",
        "october",
        "september",
        "august",
        "july",
        "june",
        "may",
        "april",
        "march",
        "february",
        "january",
      ];
      return months.indexOf(a) - months.indexOf(b);
    });
  }

  return yearMonthData;
}

export async function loadAllMonthlyGames() {
  const allGames = [];

  for (const [path, loadContent] of Object.entries(gameFiles)) {
    try {
      const match = path.match(/\/(\d{4})\/(\w+)\.md$/);
      if (match) {
        const [, year, month] = match;
        const content = await loadContent();
        const games = parseMarkdownContent(content);

        allGames.push({
          year: parseInt(year),
          month,
          games,
        });
      }
    } catch (error) {
      console.error(`Error loading file ${path}:`, error);
    }
  }

  // Sort by year and month (most recent first)
  return allGames.sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    const months = [
      "december",
      "november",
      "october",
      "september",
      "august",
      "july",
      "june",
      "may",
      "april",
      "march",
      "february",
      "january",
    ];
    return months.indexOf(a.month) - months.indexOf(b.month);
  });
}

function parseMarkdownContent(content: string): Game[] {
  const games: Game[] = [];
  const sections = content.split(/(?=# )/);

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

  return games.sort((a, b) => a.rank - b.rank);
}

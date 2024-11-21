import fs from "fs";
import path from "path";
import matter from "gray-matter";

const reviewsDir = "reviews/md";

function loadReviews() {
  const files = fs.readdirSync(reviewsDir);
  const reviews = files.map((file) => {
    const filePath = path.join(reviewsDir, file);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    return { ...data, content };
  });

  // Sort by score descending, then alphabetically by title
  reviews.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return a.title.localeCompare(b.title);
  });

  return reviews;
}

const reviews = loadReviews();
fs.writeFileSync("reviews/reviewsData.json", JSON.stringify(reviews, null, 2));

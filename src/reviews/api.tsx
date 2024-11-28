import axios from "axios";

export const API_URL =
  "https://mbms7576cvtp67gdehzjxf6y3e0ixqmi.lambda-url.us-west-2.on.aws/";

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

export const fetchRatingsForGames = async (gameIds: string[]) => {
  try {
    if (gameIds.length === 0) {
      return { average: null, count: 0 };
    }
    gameIds = gameIds.map((id) => slugify(id));
    const response = await axios.post(
      API_URL,
      {
        action: "fetch",
        gameIds,
      },
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user ratings:", error);
    return { average: null, count: 0 };
  }
};

export const submitUserRating = async (
  gameIds: string,
  rating: number,
  token: string
) => {
  try {
    if (gameIds.length === 0) {
      return { success: false };
    }
    gameIds = slugify(gameIds);
    const response = await axios.post(
      API_URL,
      {
        action: "submit",
        gameIds,
        rating,
        token,
      },
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting user rating:", error);
    return { success: false, error: error };
  }
};

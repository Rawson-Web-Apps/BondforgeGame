import axios from "axios";

export const API_URL =
  "https://mbms7576cvtp67gdehzjxf6y3e0ixqmi.lambda-url.us-west-2.on.aws/";

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

export const fetchUserRatings = async (gameId: string) => {
  try {
    gameId = slugify(gameId);
    const response = await axios.post(API_URL, {
      action: "fetch",
      gameId,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user ratings:", error);
    return { average: null, count: 0 };
  }
};

export const submitUserRating = async (
  gameId: string,
  rating: number,
  token: string
) => {
  try {
    gameId = slugify(gameId);
    const response = await axios.post(API_URL, {
      action: "submit",
      gameId,
      rating,
      token,
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting user rating:", error);
    return { success: false };
  }
};

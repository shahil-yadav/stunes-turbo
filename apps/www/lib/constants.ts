const hostname = "localhost:3000";
const protocol = "http";
export const URL = `${protocol}://${hostname}`;
export const selectedImageIndex = -1;
export const selectedAudioIndex = -1;
export const language = "english,hindi";
export const SECONDS_REQUIRED_TO_INSERT_IN_THE_HISTORY = 30;
export const LIMIT_RECOMMENDATION_SONGS = 5;

export const BASE_URL = process.env.BASE_URL;
if (!BASE_URL)
  throw new Error("BASE_URL is required, please set the env variables");
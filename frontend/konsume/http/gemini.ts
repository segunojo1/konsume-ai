import axios from "axios";
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_KEY;

export default axios.create({
  baseURL: "https://generativelanguage.googleapis.com/v1beta/models",
  params: {
    key: API_KEY,
  },
  headers: {
    Authorization: "Bearer ",
    "Content-Type": "application/json",
  },
});

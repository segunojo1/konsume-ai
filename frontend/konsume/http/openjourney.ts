import axios from "axios";
const API_KEY = process.env.NEXT_PUBLIC_RAPID_KEY;

export default axios.create({
  baseURL: "https://openjourney1.p.rapidapi.com/models/stabilityai/stable-diffusion-xl-base-1.0",
  headers: {
    'x-rapidapi-key': API_KEY,
    'x-rapidapi-host': 'openjourney1.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
});
  
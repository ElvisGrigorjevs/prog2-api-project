import axios from "axios";
import { Weather } from "./types";

const API_KEY = "328b715e3a1fa1d2b0f2e4deea2c0af5";

export const fetchWeather = async (city: string): Promise<Weather> => {
  const res = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    }
  );

  return res.data;
};
import axios from "axios";
import { Weather } from "./types";

const API_KEY = "";

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

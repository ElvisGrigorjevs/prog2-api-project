import { useEffect, useState } from "react";
import { fetchWeather } from "./api";
import { Weather } from "./types";

interface WeatherComponentProps {
  isAuthenticated: boolean;
}

export const WeatherComponent = ({ isAuthenticated }: WeatherComponentProps) => {
  const [city, setCity] = useState("");
  const [data, setData] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      setCity("");
      setData(null);
      setError("");
      setLoading(false);
    }
  }, [isAuthenticated]);

  const search = async () => {
    const trimmedCity = city.trim();
    if (!trimmedCity) {
      setError("Please enter a city name.");
      setData(null);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setData(null);
      const result = await fetchWeather(trimmedCity);
      setData(result);
    } catch (err) {
      setError("City not found or API error");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto p-4 bg-white shadow rounded">
        <p className="text-center text-gray-700">
          Please log in to search weather data.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex gap-2">
        <input
          className="border p-2 w-full rounded"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button
          onClick={search}
          className="bg-blue-500 text-white px-4 rounded"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {data && (
        <div className="bg-white shadow mt-4 p-4 rounded text-center">
          <h2 className="text-xl font-semibold">{data.name}</h2>
          <img
            alt={data.weather[0].description}
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          />
          <p className="text-2xl">{Math.round(data.main.temp)}°C</p>
          <p className="capitalize">{data.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};
import { useState } from "react";
import { WeatherComponent } from "../features/weather/Weather";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto p-4">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold">OpenWeatherMap SPA</h1>
          <p className="text-gray-600 mt-2">
            React + TypeScript + Tailwind + OpenWeatherMap API
          </p>
        </header>

        <div className="flex justify-end mb-4">
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={login}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Login
            </button>
          )}
        </div>

        <WeatherComponent isAuthenticated={isAuthenticated} />
      </div>
    </div>
  );
}

export default App;
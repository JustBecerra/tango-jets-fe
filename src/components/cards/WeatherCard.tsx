import React, { useState, useEffect } from 'react';
import { getWeatherData, getWeatherForTime, getWeatherForecast } from '../../utils/weatherService';

interface WeatherCardProps {
  latitude: number;
  longitude: number;
  arrivalTime?: string;
  location: string;
  showForecast?: boolean;
  className?: string;
}

interface WeatherData {
  icon: string;
  description: string;
  temperature: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  pressure: number;
  visibility: number;
  hi?: string;
  lo?: string;
}

interface ForecastData {
  date: string;
  hi: string;
  lo: string;
  icon: string;
  description: string;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  latitude,
  longitude,
  arrivalTime,
  location,
  showForecast = false,
  className = ''
}) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        let weatherData: WeatherData | null = null;

        if (arrivalTime) {
          // Get weather for specific arrival time
          weatherData = await getWeatherForTime(latitude, longitude, arrivalTime);
        } else {
          // Get current weather
          weatherData = await getWeatherData(latitude, longitude);
        }

        setWeather(weatherData);

        if (showForecast) {
          const forecastData = await getWeatherForecast(latitude, longitude);
          setForecast(forecastData);
        }
      } catch (err) {
        setError('Error al cargar el clima');
        console.error('Error fetching weather:', err);
      } finally {
        setLoading(false);
      }
    };

    if (latitude && longitude) {
      fetchWeather();
    }
  }, [latitude, longitude, arrivalTime, showForecast]);

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 ${className}`}>
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-sm text-gray-500">Cargando clima...</span>
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 ${className}`}>
        <div className="text-center">
          <span className="text-sm text-gray-500">🌤️ Clima no disponible</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 ${className}`}>
      {/* Current Weather */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">{location}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl mr-2">{weather.icon}</span>
            <div>
              <div className="text-lg font-semibold text-gray-900">
                {weather.temperature}°C
              </div>
              <div className="text-xs text-gray-500 capitalize">
                {weather.description}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">
              Máx: {weather.hi}
            </div>
            <div className="text-sm text-gray-600">
              Mín: {weather.lo}
            </div>
          </div>
        </div>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-4">
        <div className="flex items-center">
          <span className="mr-1">💨</span>
          <span>{weather.wind_speed} km/h</span>
        </div>
        <div className="flex items-center">
          <span className="mr-1">💧</span>
          <span>{weather.humidity}%</span>
        </div>
        <div className="flex items-center">
          <span className="mr-1">👁️</span>
          <span>{weather.visibility} km</span>
        </div>
        <div className="flex items-center">
          <span className="mr-1">🌡️</span>
          <span>Sensación {weather.feels_like}°C</span>
        </div>
      </div>

      {/* 5-Day Forecast */}
      {showForecast && forecast.length > 0 && (
        <div>
          <h4 className="text-xs font-medium text-gray-700 mb-2">Pronóstico 5 días</h4>
          <div className="flex justify-between">
            {forecast.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-gray-500 mb-1">{day.date}</div>
                <div className="text-lg mb-1">{day.icon}</div>
                <div className="text-xs text-gray-600">{day.hi}</div>
                <div className="text-xs text-gray-500">{day.lo}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard; 
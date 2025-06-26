import React, { useState, useEffect } from 'react';
import { getWeatherForTime } from '../../utils/weatherService';

interface WeatherBadgeProps {
  latitude: number;
  longitude: number;
  arrivalTime?: string;
  location: string;
  className?: string;
}

interface WeatherData {
  icon: string;
  iconUrl?: string;
  description: string;
  temperature: number;
  hi?: string;
  lo?: string;
}

export const WeatherBadge: React.FC<WeatherBadgeProps> = ({
  latitude,
  longitude,
  arrivalTime,
  location,
  className = ''
}) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        
        let weatherData: WeatherData | null = null;

        if (arrivalTime) {
          // Get weather for specific arrival time
          const data = await getWeatherForTime(latitude, longitude, arrivalTime);
          if (data) {
            weatherData = {
              icon: data.icon,
              iconUrl: data.iconUrl,
              description: data.description,
              temperature: data.temperature,
              hi: data.hi,
              lo: data.lo
            };
          }
        } else {
          // Get current weather
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.PUBLIC_OPENWEATHER_API_KEY}&units=metric&lang=es`
          );
          
          if (response.ok) {
            const data = await response.json();
            weatherData = {
              icon: getWeatherIcon(data.weather[0].id),
              iconUrl: data.weather[0].icon,
              description: data.weather[0].description,
              temperature: Math.round(data.main.temp)
            };
          }
        }

        setWeather(weatherData);
      } catch (err) {
        console.error('Error fetching weather:', err);
      } finally {
        setLoading(false);
      }
    };

    if (latitude && longitude) {
      fetchWeather();
    }
  }, [latitude, longitude, arrivalTime]);

  const getWeatherIcon = (weatherId: number): string => {
    if (weatherId >= 200 && weatherId < 300) return '⛈️';
    if (weatherId >= 300 && weatherId < 400) return '🌧️';
    if (weatherId >= 500 && weatherId < 600) return '🌧️';
    if (weatherId >= 600 && weatherId < 700) return '❄️';
    if (weatherId >= 700 && weatherId < 800) return '🌫️';
    if (weatherId === 800) return '☀️';
    if (weatherId === 801) return '🌤️';
    if (weatherId === 802) return '⛅';
    if (weatherId >= 803 && weatherId < 900) return '☁️';
    return '🌤️';
  };

  if (loading) {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <div className="animate-spin rounded-full h-3 w-3 border-b border-blue-600"></div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className={`inline-flex items-center text-gray-400 ${className}`}>
        <span className="text-sm">🌤️</span>
      </div>
    );
  }

  return (
    <div 
      className={`inline-flex items-center cursor-help ${className}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {weather.iconUrl ? (
        <img 
          src={weather.iconUrl} 
          alt={weather.description}
          className="w-6 h-6 mr-1"
        />
      ) : (
        <span className="text-sm mr-1">{weather.icon}</span>
      )}
      <span className="text-xs text-gray-600">
        {weather.description} ({weather.temperature}°C)
      </span>
      
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute z-50 px-2 py-1 text-xs text-white bg-gray-900 rounded shadow-lg whitespace-nowrap">
          <div className="font-medium">{location}</div>
          <div className="capitalize">{weather.description}</div>
          {weather.hi && weather.lo && (
            <div>
              <span>{weather.hi}°C</span>
              <span className="mx-1">/</span>
              <span>{weather.lo}°C</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherBadge; 
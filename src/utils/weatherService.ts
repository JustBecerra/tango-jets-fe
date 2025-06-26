interface WeatherData {
  icon: string;
  iconUrl?: string; // Add URL for official OpenWeatherMap icons
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

export const getWeatherData = async (
  latitude: number,
  longitude: number,
  arrivalTime?: string
): Promise<WeatherData | null> => {
  try {
    const apiKey = import.meta.env.PUBLIC_OPENWEATHER_API_KEY;
    
    if (!apiKey) {
      console.warn('OpenWeatherMap API key not found. Please add PUBLIC_OPENWEATHER_API_KEY to your environment variables.');
      return null;
    }

    // Get current weather
    const currentWeatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=es`
    );

    if (!currentWeatherResponse.ok) {
      throw new Error(`Weather API error: ${currentWeatherResponse.status}`);
    }

    const currentWeather = await currentWeatherResponse.json();

    // Get 5-day forecast for high/low temperatures
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=es`
    );

    if (!forecastResponse.ok) {
      throw new Error(`Forecast API error: ${forecastResponse.status}`);
    }

    const forecast = await forecastResponse.json();

    // Get weather icon emoji
    const weatherIcon = getWeatherIcon(currentWeather.weather[0].id);

    // Get today's high and low from forecast
    const today = new Date().toDateString();
    const todayForecasts = forecast.list.filter((item: any) => {
      const itemDate = new Date(item.dt * 1000).toDateString();
      return itemDate === today;
    });

    let hi = 'N/A';
    let lo = 'N/A';

    if (todayForecasts.length > 0) {
      const temperatures = todayForecasts.map((item: any) => item.main.temp);
      hi = `${Math.round(Math.max(...temperatures))}°C`;
      lo = `${Math.round(Math.min(...temperatures))}°C`;
    }

    return {
      icon: weatherIcon,
      description: currentWeather.weather[0].description,
      temperature: Math.round(currentWeather.main.temp),
      feels_like: Math.round(currentWeather.main.feels_like),
      humidity: currentWeather.main.humidity,
      wind_speed: Math.round(currentWeather.wind.speed * 3.6), // Convert m/s to km/h
      pressure: currentWeather.main.pressure,
      visibility: currentWeather.visibility / 1000, // Convert m to km
      hi,
      lo
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};

export const getWeatherForecast = async (
  latitude: number,
  longitude: number
): Promise<ForecastData[]> => {
  try {
    const apiKey = import.meta.env.PUBLIC_OPENWEATHER_API_KEY;
    
    if (!apiKey) {
      console.warn('OpenWeatherMap API key not found. Please add PUBLIC_OPENWEATHER_API_KEY to your environment variables.');
      return [];
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=es`
    );

    if (!response.ok) {
      throw new Error(`Forecast API error: ${response.status}`);
    }

    const data = await response.json();

    // Group forecasts by day
    const dailyForecasts: { [key: string]: any[] } = {};
    
    data.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!dailyForecasts[date]) {
        dailyForecasts[date] = [];
      }
      dailyForecasts[date].push(item);
    });

    // Get 5-day forecast
    const forecastData: ForecastData[] = [];
    const dates = Object.keys(dailyForecasts).slice(0, 5);

    dates.forEach(date => {
      const dayForecasts = dailyForecasts[date];
      const temperatures = dayForecasts.map((item: any) => item.main.temp);
      const hi = `${Math.round(Math.max(...temperatures))}°C`;
      const lo = `${Math.round(Math.min(...temperatures))}°C`;
      
      // Use the forecast for 12:00 (noon) for the icon and description
      const noonForecast = dayForecasts.find((item: any) => {
        const hour = new Date(item.dt * 1000).getHours();
        return hour >= 10 && hour <= 14;
      }) || dayForecasts[0];

      forecastData.push({
        date: new Date(date).toLocaleDateString('es-ES', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        }),
        hi,
        lo,
        icon: getWeatherIcon(noonForecast.weather[0].id),
        description: noonForecast.weather[0].description
      });
    });

    return forecastData;
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    return [];
  }
};

// Function to get OpenWeatherMap official icon URL
const getWeatherIconUrl = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

// Function to convert OpenWeatherMap weather codes to emoji icons (fallback)
const getWeatherIcon = (weatherId: number): string => {
  if (weatherId >= 200 && weatherId < 300) return '⛈️'; // Thunderstorm
  if (weatherId >= 300 && weatherId < 400) return '🌧️'; // Drizzle
  if (weatherId >= 500 && weatherId < 600) return '🌧️'; // Rain
  if (weatherId >= 600 && weatherId < 700) return '❄️'; // Snow
  if (weatherId >= 700 && weatherId < 800) return '🌫️'; // Atmosphere (fog, mist, etc.)
  if (weatherId === 800) return '☀️'; // Clear sky
  if (weatherId === 801) return '🌤️'; // Few clouds
  if (weatherId === 802) return '⛅'; // Scattered clouds
  if (weatherId >= 803 && weatherId < 900) return '☁️'; // Broken/overcast clouds
  return '🌤️'; // Default
};

// Function to get weather data for a specific time (for arrival times)
export const getWeatherForTime = async (
  latitude: number,
  longitude: number,
  targetTime: string
): Promise<WeatherData | null> => {
  try {
    const apiKey = import.meta.env.PUBLIC_OPENWEATHER_API_KEY;
    
    if (!apiKey) {
      console.warn('OpenWeatherMap API key not found. Please add PUBLIC_OPENWEATHER_API_KEY to your environment variables.');
      return null;
    }

    const targetDate = new Date(targetTime);
    const now = new Date();
    const fiveDaysFromNow = new Date(now.getTime() + (5 * 24 * 60 * 60 * 1000));

    // If target date is beyond 5 days, we can't get accurate forecast
    if (targetDate > fiveDaysFromNow) {
      console.warn('Weather forecast not available for dates beyond 5 days. Using current weather as fallback.');
      // Return current weather as fallback
      return getCurrentWeather(latitude, longitude);
    }

    // Use free 5-day forecast API
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=es`
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Find the forecast closest to the target time
    let closestForecast = data.list[0];
    let minTimeDiff = Math.abs(targetDate.getTime() - new Date(data.list[0].dt * 1000).getTime());

    data.list.forEach((forecast: any) => {
      const forecastTime = new Date(forecast.dt * 1000);
      const timeDiff = Math.abs(targetDate.getTime() - forecastTime.getTime());
      
      if (timeDiff < minTimeDiff) {
        minTimeDiff = timeDiff;
        closestForecast = forecast;
      }
    });

    // Get daily temperature range for the target date
    const dayForecasts = data.list.filter((item: any) => {
      const itemDate = new Date(item.dt * 1000).toDateString();
      return itemDate === targetDate.toDateString();
    });

    let hi = 'N/A';
    let lo = 'N/A';

    if (dayForecasts.length > 0) {
      const temperatures = dayForecasts.map((item: any) => item.main.temp);
      hi = `${Math.round(Math.max(...temperatures))}`;
      lo = `${Math.round(Math.min(...temperatures))}`;
    }

    const weatherDescription = closestForecast.weather[0].description
      .split(' ')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return {
      icon: getWeatherIcon(closestForecast.weather[0].id),
      iconUrl: getWeatherIconUrl(closestForecast.weather[0].icon),
      description: weatherDescription,
      temperature: Math.round(closestForecast.main.temp),
      feels_like: Math.round(closestForecast.main.feels_like),
      humidity: closestForecast.main.humidity,
      wind_speed: Math.round(closestForecast.wind.speed * 3.6), // Convert m/s to km/h
      pressure: closestForecast.main.pressure,
      visibility: closestForecast.visibility ? closestForecast.visibility / 1000 : 10,
      hi,
      lo
    };

  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};

// Helper function to estimate weather based on location and season
const getEstimatedWeather = (latitude: number, longitude: number, date: Date): WeatherData => {
  const month = date.getMonth(); // 0-11
  const isNorthernHemisphere = latitude > 0;
  
  // Determine season
  let season: 'winter' | 'spring' | 'summer' | 'fall';
  if (isNorthernHemisphere) {
    if (month >= 11 || month <= 1) season = 'winter';
    else if (month >= 2 && month <= 4) season = 'spring';
    else if (month >= 5 && month <= 7) season = 'summer';
    else season = 'fall';
  } else {
    if (month >= 11 || month <= 1) season = 'summer';
    else if (month >= 2 && month <= 4) season = 'fall';
    else if (month >= 5 && month <= 7) season = 'winter';
    else season = 'spring';
  }

  // Estimate temperatures based on latitude and season
  let baseTemp = 20; // Base temperature at equator
  let tempRange = 10; // Temperature range

  // Adjust for latitude
  baseTemp -= Math.abs(latitude) * 0.4;
  
  // Adjust for season
  switch (season) {
    case 'winter':
      baseTemp -= 10;
      tempRange = 8;
      break;
    case 'summer':
      baseTemp += 10;
      tempRange = 12;
      break;
    case 'spring':
    case 'fall':
      tempRange = 10;
      break;
  }

  const hi = Math.round(baseTemp + (tempRange / 2));
  const lo = Math.round(baseTemp - (tempRange / 2));
  
  return {
    icon: season === 'summer' ? '☀️' : season === 'winter' ? '❄️' : '🌤️',
    description: 'Pronóstico Estimado',
    temperature: Math.round(baseTemp),
    feels_like: Math.round(baseTemp),
    humidity: 70,
    wind_speed: 10,
    pressure: 1013,
    visibility: 10,
    hi: `${hi}`,
    lo: `${lo}`
  };
};

export const getCurrentWeather = async (
  latitude: number,
  longitude: number
): Promise<WeatherData | null> => {
  try {
    const apiKey = import.meta.env.PUBLIC_OPENWEATHER_API_KEY;
    
    if (!apiKey) {
      console.warn('OpenWeatherMap API key not found');
      return null;
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=es`
    );

    if (!response.ok) {
      throw new Error(`Current weather API error: ${response.statusText}`);
    }

    const data = await response.json();

    const weatherDescription = data.weather[0].description
      .split(' ')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return {
      icon: getWeatherIcon(data.weather[0].id),
      iconUrl: getWeatherIconUrl(data.weather[0].icon),
      description: weatherDescription,
      temperature: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      wind_speed: Math.round(data.wind.speed * 3.6),
      pressure: data.main.pressure,
      visibility: data.visibility ? data.visibility / 1000 : 10,
      hi: `${Math.round(data.main.temp_max)}`,
      lo: `${Math.round(data.main.temp_min)}`
    };

  } catch (error) {
    console.error('Error fetching current weather:', error);
    return null;
  }
}; 
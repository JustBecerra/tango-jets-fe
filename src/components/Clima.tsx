// import { useState, useEffect } from "react";

// const Weather = () => {
//   const LATITUDE = -34.8222; // Latitud de LA
//   const LONGITUDE = -58.5358; // Longitud de LA
//   const API_KEY = import.meta.env.PUBLIC_APIKEY_SECRET;

//   interface WeatherData {
//     name: string;
//     main: {
//       temp: number;
//       humidity: number;
//     };
//     weather: {
//       description: string;
//       icon: string;
//     }[];
//     wind: {
//       speed: number;
//     };
//   }

//   const [weather, setWeather] = useState<WeatherData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchWeather = async () => {
//       try {
//         const response = await fetch(
//           `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&units=metric&appid=${API_KEY}`
//         );
//         if (!response.ok) {
//           throw new Error("Error al obtener los datos del clima");
//         }
//         const data = await response.json();
//         setWeather(data);
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWeather();
//   }, []);

//   if (loading) return <p className="text-center text-gray-500">Cargando...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="weather mx-auto max-w-md rounded-2xl  p-6 shadow-lg bg-gray-900">
//       <h2 className="text-2xl font-semibold text-white">
//         Clima en <span className="font-bold">{weather?.name}</span>
//       </h2>
//       <div className="mt-4 flex items-center justify-between">
//         <p className="text-5xl font-bold text-white">{weather?.main?.temp}°C</p>
//         <div className="flex flex-col items-end">
//           <img
//             src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
//             alt={weather?.weather[0].description}
//             className="w-20 h-20"
//           />
//           <p className="text-lg text-gray-300 capitalize">
//             {weather?.weather[0].description}
//           </p>
//           <p className="text-sm text-gray-400">
//             Humedad: {weather?.main.humidity}%
//           </p>
//           <p className="text-sm text-gray-400">
//             Viento: {weather?.wind?.speed ? weather.wind.speed * 3.6 : "N/A"}{" "}
//             km/h
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Weather;

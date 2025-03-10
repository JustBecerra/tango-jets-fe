import { useState } from "react";
import axios from "axios";

// Función para obtener aeropuertos
const fetchAirports = async (query, setResults) => {
  if (!query || query.length < 2) return;

  try {
    const response = await axios.get(
      `https://autocomplete.travelpayouts.com/places2?term=${query}&locale=es&types[]=airport`
    );

    if (response.data && response.data.length > 0) {
      const airports = response.data.slice(0, 5).map((place) => ({
        id: place.code,
        name: place.name,
        country: place.country_name,
        lat: place.coordinates?.lat,
        lon: place.coordinates?.lon,
        display: `${place.name} (${place.code}) - ${place.country_name}`,
      }));

      setResults(airports);
    }
  } catch (error) {
    console.error("Error al obtener aeropuertos:", error);
  }
};

// Función para calcular distancia con la fórmula de Haversine
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return null;

  const R = 6371; // Radio de la Tierra en km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lat2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c); // Distancia en km
};

// Función para calcular el tiempo de vuelo
const calculateFlightTime = (distance, speed = 900) => {
  if (!distance) return null;
  return (distance / speed).toFixed(2); // Tiempo en horas
};

const Autocomplete = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromAirport, setFromAirport] = useState(null);
  const [toAirport, setToAirport] = useState(null);
  const [fromResults, setFromResults] = useState([]);
  const [toResults, setToResults] = useState([]);
  const [distance, setDistance] = useState(null);
  const [flightTime, setFlightTime] = useState(null);

  return (
    <div className="flex flex-col justify-end h-fit">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Input "From" */}
        <div className="flex-1 mb-4">
          <label className="block text-sm font-medium text-gray-700">
            From
          </label>
          <input
            type="text"
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
              fetchAirports(e.target.value, setFromResults);
            }}
            className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Airport"
          />
          {fromResults.length > 0 && (
            <ul className="absolute z-10 bg-white border rounded-lg shadow-lg mt-1 max-h-40 overflow-auto w-3/4">
              {fromResults.map((place) => (
                <li
                  key={place.id}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    setFrom(place.display);
                    setFromAirport(place);
                    setFromResults([]);
                    if (toAirport) {
                      const dist = calculateDistance(
                        place.lat,
                        place.lon,
                        toAirport.lat,
                        toAirport.lon
                      );
                      setDistance(dist);
                      setFlightTime(calculateFlightTime(dist));
                    }
                  }}
                >
                  {place.display}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Input "To" */}
        <div className="flex-1 mb-4">
          <label className="block text-sm font-medium text-gray-700">To</label>
          <input
            type="text"
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
              fetchAirports(e.target.value, setToResults);
            }}
            className="block w-full px-5 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Airport"
          />
          {toResults.length > 0 && (
            <ul className="absolute z-10 bg-white border rounded-lg shadow-lg mt-1 max-h-40 overflow-auto w-full">
              {toResults.map((place) => (
                <li
                  key={place.id}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    setTo(place.display);
                    setToAirport(place);
                    setToResults([]);
                    if (fromAirport) {
                      const dist = calculateDistance(
                        fromAirport.lat,
                        fromAirport.lon,
                        place.lat,
                        place.lon
                      );
                      setDistance(dist);
                      setFlightTime(calculateFlightTime(dist));
                    }
                  }}
                >
                  {place.display}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Distancia y Tiempo de Vuelo */}
      {distance !== null && (
        <div className="mt-4 p-2 bg-blue-100 text-blue-800 rounded-lg">
          Distancia entre aeropuertos: <strong>{distance} km</strong>
        </div>
      )}
      {flightTime !== null && (
        <div className="mt-2 p-2 bg-green-100 text-green-800 rounded-lg">
          Tiempo estimado de vuelo: <strong>{flightTime} horas</strong>
        </div>
      )}
    </div>
  );
};

export default Autocomplete;

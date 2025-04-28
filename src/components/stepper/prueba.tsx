import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import type { formType } from "../scheduler/SchedulerFrame";
import type { formEditType } from "../edit-trip/MainEditFlight";

interface CsvSelectProps {
  labelFrom?: string;
  labelTo?: string;
  onSelectFrom?: (value: string) => void;
  onSelectTo?: (value: string) => void;
  onDistanceCalculated?: (distance: number) => void;
  formData: formType | formEditType;
  setFormData:
    | React.Dispatch<React.SetStateAction<formType>>
    | React.Dispatch<React.SetStateAction<formEditType>>;
}
const MAX_RESULTS = 5;

// Función para obtener aeropuertos
const fetchAirports = async (
  query: string,
  setResults: React.Dispatch<React.SetStateAction<any[]>>
) => {
  if (!query || query.length < 2) return;

  try {
    const response = await axios.get(
      `https://autocomplete.travelpayouts.com/places2?term=${query}&locale=en&types[]=city&types[]=airport`
    );

    if (response.data && response.data.length > 0) {
      const airports = response.data
        .slice(0, MAX_RESULTS)
        .map((place: any) => ({
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
    console.error("Error getting airports:", error);
  }
};

// Función para calcular distancia con la fórmula de Haversine
const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  setFormData:
    | React.Dispatch<React.SetStateAction<formType>>
    | React.Dispatch<React.SetStateAction<formEditType>>
): number => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 0;

  const R = 6371; // Radio de la Tierra en km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  setFormData((prevFormData: any) => ({
    ...prevFormData,
    first_latitude: lat1.toString(),
    first_longitude: lon1.toString(),
    second_latitude: lat2.toString(),
    second_longitude: lon2.toString(),
  }));

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
const calculateFlightTime = (distance: number, speed = 900): string => {
  if (!distance) return "00:00";

  const timeInHours = distance / speed; // Get time in decimal hours
  const hours = Math.floor(timeInHours); // extraigo tiempo en horas
  const minutes = Math.round((timeInHours - hours) * 60); // extraigo tiempo en minutos

  // formateo para que este separado por :
  const formattedTime = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}`;

  return formattedTime;
};

const CsvSelect: React.FC<CsvSelectProps> = ({
  labelFrom = "From",
  labelTo = "To",
  onSelectFrom,
  onSelectTo,
  onDistanceCalculated,
  formData,
  setFormData,
}) => {
  const [fromAirport, setFromAirport] = useState<any>(null);
  const [toAirport, setToAirport] = useState<any>(null);
  const [fromResults, setFromResults] = useState<any[]>([]);
  const [toResults, setToResults] = useState<any[]>([]);
  const [distance, setDistance] = useState<number | null>(null);

  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (fromRef.current && !fromRef.current.contains(event.target as Node)) {
      setFromResults([]);
    }
    if (toRef.current && !toRef.current.contains(event.target as Node)) {
      setToResults([]);
    }
  };

  const handleFlightTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9:]/g, ""); // Allow only numbers and ":"

    // If user deletes everything, allow empty input
    if (value === "") {
      setFormData((prevFormData: any) => {
        return { ...prevFormData, flight_time: "" };
      });
    }

    // Extract hours and minutes
    const parts = value.split(":");
    let hours = parts[0] ? parseInt(parts[0], 10) : 0;
    let minutes = parts[1] ? parseInt(parts[1], 10) : 0;

    // Ensure minutes are between 0-59
    if (minutes > 59) minutes = 59;

    // Format time properly
    const formattedTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}`;

    setFormData((prevFormData: any) => {
      return { ...prevFormData, flight_time: formattedTime };
    });
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col justify-end h-fit">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Input "From" */}
        <div className="relative flex-1 mb-3" ref={fromRef}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labelFrom}
          </label>
          <input
            type="text"
            value={formData.from}
            onChange={(e) => {
              setFormData((prev: any) => ({
                ...prev,
                from: e.target.value,
              }));
              fetchAirports(e.target.value, setFromResults);
            }}
            className="block w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search airport or city"
          />
          {fromResults.length > 0 && (
            <ul
              className="absolute z-20 bg-white border rounded-lg shadow-md mt-1 max-h-40 overflow-auto w-full"
              style={{ minWidth: "200px" }}
            >
              {fromResults.map((place) => (
                <li
                  key={place.id}
                  className="px-3 py-2 cursor-pointer hover:bg-blue-50 border-b border-gray-100 last:border-b-0"
                  onClick={() => {
                    setFromAirport(place);
                    setFormData((prev: any) => ({
                      ...prev,
                      from: place.display,
                    }));
                    setFromResults([]);
                    if (onSelectFrom) onSelectFrom(place.id);
                    if (toAirport) {
                      const dist = calculateDistance(
                        toAirport.lat,
                        toAirport.lon,
                        place.lat,
                        place.lon,
                        setFormData
                      );
                      setDistance(dist);
                      setFormData((prevFormData: any) => ({
                        ...prevFormData,
                        flight_time: calculateFlightTime(dist),
                      }));

                      if (onDistanceCalculated) onDistanceCalculated(dist);
                    }
                  }}
                >
                  <div className="flex items-center">
                    <div className="w-4 h-4 mr-2 text-blue-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-sm">
                        {place.name} ({place.id})
                      </div>
                      <div className="text-xs text-gray-500">
                        {place.country}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Input "To" */}
        <div className="relative flex-1 mb-3" ref={toRef}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labelTo}
          </label>
          <input
            type="text"
            value={formData.to}
            onChange={(e) => {
              setFormData((prev: any) => ({
                ...prev,
                to: e.target.value,
              }));
              fetchAirports(e.target.value, setToResults);
            }}
            className="block w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search airport or city"
          />
          {toResults.length > 0 && (
            <ul
              className="absolute z-20 bg-white border rounded-lg shadow-md mt-1 max-h-40 overflow-auto w-full"
              style={{ minWidth: "200px" }}
            >
              {toResults.map((place) => (
                <li
                  key={place.id}
                  className="px-3 py-2 cursor-pointer hover:bg-blue-50 border-b border-gray-100 last:border-b-0"
                  onClick={() => {
                    setToAirport(place);
                    setFormData((prev: any) => ({
                      ...prev,
                      to: place.display,
                    }));
                    setToResults([]);
                    if (onSelectTo) onSelectTo(place.id);
                    if (fromAirport) {
                      const dist = calculateDistance(
                        fromAirport.lat,
                        fromAirport.lon,
                        place.lat,
                        place.lon,
                        setFormData
                      );
                      setDistance(dist);
                      setFormData((prevFormData: any) => ({
                        ...prevFormData,
                        flight_time: calculateFlightTime(dist),
                      }));

                      if (onDistanceCalculated) onDistanceCalculated(dist);
                    }
                  }}
                >
                  <div className="flex items-center">
                    <div className="w-4 h-4 mr-2 text-blue-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-sm">
                        {place.name} ({place.id})
                      </div>
                      <div className="text-xs text-gray-500">
                        {place.country}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        {distance !== null && (
          <div className="flex-1 p-2 bg-blue-50 text-blue-800 rounded-lg border border-blue-100">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-1.5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                ></path>
              </svg>
              <span className="text-sm">
                Distance: <strong>{distance} km</strong>
              </span>
            </div>
          </div>
        )}

        {formData.flight_time && (
          <div className="flex-1 p-2 bg-green-50 text-green-800 rounded-lg border border-green-100">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-1.5 text-green-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="flex items-center text-sm">
                <span>Flight time: </span>
                <input
                  type="text"
                  onChange={handleFlightTimeChange}
                  value={formData.flight_time}
                  className="bg-transparent ml-1 w-16 focus:outline-none focus:border-b focus:border-green-500 font-medium"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CsvSelect;

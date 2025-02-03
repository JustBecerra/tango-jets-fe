import React, { useState, useEffect } from "react";
import Papa from "papaparse";

interface CsvSelectProps {
  labelFrom?: string;
  labelTo?: string;
  onSelectFrom?: (value: string) => void;
  onSelectTo?: (value: string) => void;
  onDistanceCalculated?: (distance: number) => void;
  onFlightTimeCalculated?: (flightTime: number) => void;
}

const CsvSelect: React.FC<CsvSelectProps> = ({
  labelFrom = "From",
  labelTo = "To",
  onSelectFrom,
  onSelectTo,
  onDistanceCalculated,
  onFlightTimeCalculated,
}) => {
  const [options, setOptions] = useState<
    {
      ident: string;
      name: string;
      type: string;
      iata_code: string;
      coordinates: string;
    }[]
  >([]);
  const [selectedAirport1, setSelectedAirport1] = useState("");
  const [selectedAirport2, setSelectedAirport2] = useState("");
  const [averageSpeed] = useState<number>(900); // Velocidad promedio en km/h

  useEffect(() => {
    fetch("/airports.csv")
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok")
			}
			return response.text()
		})
		.then((csvText) => {
			const parsedData = Papa.parse(csvText, {
				header: true,
				skipEmptyLines: true,
			})

			const filteredData = parsedData.data.map((row: any) => ({
				ident: row.ident,
				name: row.name,
				type: row.type,
				iata_code: row.iata_code,
				coordinates: row.coordinates,
			}))

			setOptions(filteredData)
		})
		.catch((error) => console.error("Error fetching CSV:", error))
  }, []);

  const calculateDistance = () => {
    const airport1 = options.find(
      (option) => option.ident === selectedAirport1
    );
    const airport2 = options.find(
      (option) => option.ident === selectedAirport2
    );

    if (airport1 && airport2) {
      const [lat1, lon1] = airport1.coordinates.split(", ").map(Number);
      const [lat2, lon2] = airport2.coordinates.split(", ").map(Number);

      const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;

      const R = 6371; // Radio de la Tierra en km
      const dLat = toRadians(lat2 - lat1);
      const dLon = toRadians(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
          Math.cos(toRadians(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c; // Distancia en km
      if (onDistanceCalculated) onDistanceCalculated(distance);

      // Calcular el tiempo de vuelo
      const flightTime = distance / averageSpeed; // Tiempo en horas
      if (onFlightTimeCalculated) onFlightTimeCalculated(flightTime);

      // Mostrar alerta con los resultados
      window.alert(
        `Distance: ${distance.toFixed(2)} km\nflight Time: ${flightTime.toFixed(
          2
        )} hours`
      );
    } else {
      window.alert("Please select airport.");
    }
  };
  return (
    <div className="flex items-end space-x-4">
      <div>
        <label
          htmlFor="airportSelect1"
          className="block font-semibold text-gray-700"
        >
          {labelFrom}
        </label>
        <select
          id="airportSelect1"
          className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => {
            setSelectedAirport1(e.target.value);
            if (onSelectFrom) onSelectFrom(e.target.value);
          }}
        >
          <option value="">-- Select --</option>
          {options.map((option, index) => (
            <option key={index} value={option.ident}>
              {option.name} ({option.ident}) - {option.iata_code}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="airportSelect2"
          className="block font-semibold text-gray-700"
        >
          {labelTo}
        </label>
        <select
          id="airportSelect2"
          className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => {
            setSelectedAirport2(e.target.value);
            if (onSelectTo) onSelectTo(e.target.value);
          }}
        >
          <option value="">-- Select --</option>
          {options.map((option, index) => (
            <option key={index} value={option.ident}>
              {option.name} ({option.ident}) - {option.iata_code}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={calculateDistance}
        className="border-collapse  px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
      >
        calculate
      </button>
    </div>
  );
};

export default CsvSelect;

import axios from 'axios';

export interface AirportData {
  name: string;
  address: string;
  fbo?: {
    name: string;
    phone: string;
  };
  coordinates?: {
    lat: number;
    lon: number;
  };
  city_name?: string;
  country_name?: string;
  code?: string;
}

export interface TravelPayoutsAirport {
  code: string;
  name: string;
  country_name: string;
  city_name?: string;
  coordinates?: {
    lat: number;
    lon: number;
  };
}

export const getFBOInfo = (country: string) => {
  // Default FBO info if not found
  return {
    name: "Local FBO Services",
    phone: "+1 (555) 0123"
  };
};

export const fetchAirportData = async (icaoCode: string): Promise<AirportData | null> => {
  try {
    console.log(`Fetching data for airport ${icaoCode}`);
    
    const response = await axios.get(
      `https://autocomplete.travelpayouts.com/places2?term=${icaoCode}&locale=en&types[]=airport`
    );

    if (response.data && response.data.length > 0) {
      // Find exact match for ICAO code
      const airport = response.data.find((a: any) => a.code === icaoCode);
      
      if (airport) {
        console.log(`Found airport data for ${icaoCode} in TravelPayouts`);
        const fboInfo = getFBOInfo(airport.country_name);
        
        return {
          name: airport.name,
          address: `${airport.city_name || ''}, ${airport.country_name}`,
          fbo: fboInfo,
          coordinates: airport.coordinates,
          city_name: airport.city_name,
          country_name: airport.country_name,
          code: airport.code
        };
      }
    }

    console.warn(`No data found for ${icaoCode}`);
    return null;
    
  } catch (error) {
    console.error("Error fetching airport data:", error);
    return null;
  }
};

// Función para búsqueda de aeropuertos (autocompletado)
export const fetchAirports = async (
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
        .slice(0, 5)
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

// Helper function to convert IATA to ICAO
export const iataToIcao = async (iataCode: string): Promise<string | null> => {
  try {
    // Try TravelPayouts API first
    const response = await axios.get<TravelPayoutsAirport[]>(
      `https://autocomplete.travelpayouts.com/places2?term=${iataCode}&locale=en&types[]=airport`
    );

    if (response.data && response.data.length > 0) {
      // Find exact match for IATA code
      const airport = response.data.find(a => a.code === iataCode);
      if (airport) {
        // TravelPayouts uses IATA codes, we need to convert to ICAO
        // Common conversion patterns:
        // US airports: Add 'K' prefix to IATA
        // European airports: Add 'E' prefix and specific country code
        // South American airports: Add 'S' prefix and specific country code
        if (airport.country_name === 'United States') {
          return `K${iataCode}`;
        } else if (airport.country_name === 'United Kingdom') {
          return `EG${iataCode}`;
        } else if (airport.country_name === 'Spain') {
          return `LE${iataCode}`;
        } else if (airport.country_name === 'France') {
          return `LF${iataCode}`;
        } else if (airport.country_name === 'Germany') {
          return `ED${iataCode}`;
        } else if (airport.country_name === 'Italy') {
          return `LI${iataCode}`;
        } else if (airport.country_name === 'Argentina') {
          return `SA${iataCode}`;
        } else if (airport.country_name === 'Brazil') {
          return `SB${iataCode}`;
        } else if (airport.country_name === 'Chile') {
          return `SC${iataCode}`;
        }
      }
    }

    // If TravelPayouts fails or we can't determine the ICAO code, try OpenSky
    const openSkyResponse = await fetch(
      `https://opensky-network.org/api/airports?iata=${iataCode}`
    );
    
    if (openSkyResponse.ok) {
      const data = await openSkyResponse.json();
      if (data && data.length > 0) {
        return data[0].icao;
      }
    }

    return null;
  } catch (error) {
    console.error('Error converting IATA to ICAO:', error);
    return null;
  }
}; 
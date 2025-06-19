interface AirportData {
  name: string;
  address: string;
  fbo: {
    name: string;
    phone: string;
  };
}

export const fetchAirportData = async (icaoCode: string): Promise<AirportData | null> => {
  try {
    // First try OurAirports API (free, no key needed)
    const ourAirportsResponse = await fetch(
      `https://airport-info.p.rapidapi.com/airport?icao=${icaoCode}`,
      {
        headers: {
          'X-RapidAPI-Key': import.meta.env.NEXT_PUBLIC_RAPID_API_KEY || '',
          'X-RapidAPI-Host': 'airport-info.p.rapidapi.com'
        }
      }
    );
    
    if (ourAirportsResponse.ok) {
      const data = await ourAirportsResponse.json();
      if (data) {
        return {
          name: data.name || 'Unknown Airport',
          address: `${data.city || ''}, ${data.country || ''}`,
          fbo: {
            name: 'Contact Airport for FBO Details',
            phone: data.phone || 'Phone Not Available'
          }
        };
      }
    }

    // If OurAirports fails, try OpenSky Network API (completely free)
    const openSkyResponse = await fetch(
      `https://opensky-network.org/api/airports?icao=${icaoCode}`
    );

    if (openSkyResponse.ok) {
      const openSkyData = await openSkyResponse.json();
      
      if (openSkyData && openSkyData.length > 0) {
        const airport = openSkyData[0];
        return {
          name: airport.name,
          address: `${airport.city}, ${airport.country}`,
          fbo: {
            name: 'Contact Airport for FBO Details',
            phone: 'Phone Not Available'
          }
        };
      }
    }

    // If both APIs fail, try a local database of major airports
    const majorAirports: Record<string, AirportData> = {
      'KJFK': {
        name: 'John F. Kennedy International Airport',
        address: 'Queens, NY 11430, USA',
        fbo: { name: 'Signature Flight Support', phone: '+1 718-244-4000' }
      },
      'KLAX': {
        name: 'Los Angeles International Airport',
        address: 'Los Angeles, CA 90045, USA',
        fbo: { name: 'Signature Flight Support', phone: '+1 310-215-5151' }
      },
      'EGLL': {
        name: 'London Heathrow Airport',
        address: 'Longford, Hounslow TW6 1AP, UK',
        fbo: { name: 'Signature Flight Support', phone: '+44 20 8759 2525' }
      },
      // Add more major airports as needed
    };

    if (majorAirports[icaoCode]) {
      return majorAirports[icaoCode];
    }

    return null;
  } catch (error) {
    console.error('Error fetching airport data:', error);
    return null;
  }
};

// Helper function to convert IATA to ICAO
export const iataToIcao = async (iataCode: string): Promise<string | null> => {
  // Common IATA to ICAO mappings
  const commonMappings: { [key: string]: string } = {
    'JFK': 'KJFK',
    'LAX': 'KLAX',
    'LHR': 'EGLL',
    'CDG': 'LFPG',
    'FRA': 'EDDF',
    'MAD': 'LEMD',
    'MIA': 'KMIA',
    'ORD': 'KORD',
    'SFO': 'KSFO',
    'DXB': 'OMDB',
    'HKG': 'VHHH',
    'SIN': 'WSSS',
    'NRT': 'RJAA',
    'SYD': 'YSSY',
    'MEL': 'YMML',
    'AUH': 'OMAA',
    'DOH': 'OTHH',
    'IST': 'LTFM',
    'AMS': 'EHAM',
    'FCO': 'LIRF',
    'EZE': 'SAEZ',
    // Add more mappings as needed
  };

  // First check our common mappings
  if (commonMappings[iataCode]) {
    return commonMappings[iataCode];
  }

  try {
    // If not in our mappings, try OpenSky Network API
    const response = await fetch(
      `https://opensky-network.org/api/airports?iata=${iataCode}`
    );
    
    if (response.ok) {
      const data = await response.json();
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
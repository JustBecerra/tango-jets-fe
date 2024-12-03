
const API_KEY = '164e2e6a836de5874ee4e7810db5aca0b0529b11997904bc9071050d26e0dc689809b9f71ae59155ab5eb656f03f8245';


  export async function getAirportCoordinates(ICAO) {
   const url = `https://airportdb.io/api/v1/airport/${ICAO}?apiToken=${API_KEY}`;
   const response = await fetch(url);
   
   
   if (response.ok) {
     const data = await response.json();
   
     if (data && data.latitude_deg && data.longitude_deg) {
       const latitude = data.latitude_deg;
       const longitude = data.longitude_deg;
    
       return { latitude, longitude };
     } else {
       return { latitude: 0, longitude: 0 };
     }
   } else {
     throw new Error('Error fetching data from API');
   }
 } 



function calculateDistance(coord1, coord2) {
  // Implement the Haversine formula or any other distance calculation
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (coord2.latitude - coord1.latitude) * (Math.PI / 180);
  const dLon = (coord2.longitude - coord1.longitude) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(coord1.latitude * (Math.PI / 180)) * Math.cos(coord2.latitude * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return Math.round(distance);
}

export async function getAirportDistanceFromAirportCode(code1, code2) {
 
  try {
    const coordinates1 = await getAirportCoordinates(code1);
    const coordinates2 = await getAirportCoordinates(code2);
    
    if (coordinates1 && coordinates2) {
      const distance = calculateDistance(coordinates1, coordinates2);
     
      return distance;
    } else {
      return "No distance found1";
    }
  } catch (error) {
    console.error('Error calculating distance:', error);
    return "No distance found";
  }
}
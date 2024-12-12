async function getFlights() {
  try {
    const response = await fetch(
      `${"https://vuelos-be.onrender.com"}/flights`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseToken = await response.json();
    return responseToken;
  } catch (err) {
    console.error("Error fetching flights:", err);
    throw err;
  }
}
async function addFlight(flightData) {
  try {
    const response = await fetch(
      `${"https://vuelos-be.onrender.com"}/flight`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(flightData)
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseText = await response.text();
    const responseData = responseText ? JSON.parse(responseText) : {};
    return responseData;
  } catch (err) {
    console.error("Error adding flight:", err);
    throw err;
  }
}

export { addFlight as a, getFlights as g };

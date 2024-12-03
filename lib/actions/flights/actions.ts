export async function getFlights() {
  try {
    const response = await fetch(
      `${import.meta.env.PUBLIC_BACKEND_URL}/flights`
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
export async function addFlight(flightData: Record<string, any>) {
  try {
    const response = await fetch(
      `${import.meta.env.PUBLIC_BACKEND_URL}/flight`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(flightData),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Verificar si la respuesta tiene contenido antes de intentar parsear como JSON
    const responseText = await response.text();
    const responseData = responseText ? JSON.parse(responseText) : {};

    return responseData;
  } catch (err) {
    console.error("Error adding flight:", err);
    throw err;
  }
}

export async function deleteFlight(id: number) {
  try {
    const response = await fetch(
      `${import.meta.env.PUBLIC_BACKEND_URL}/flight/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (err) {
    console.error("Error adding flight:", err);
    throw err;
  }
}

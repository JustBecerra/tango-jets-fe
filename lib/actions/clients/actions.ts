export async function getClients() {
  try {
    const response = await fetch(
      `${import.meta.env.PUBLIC_BACKEND_URL}/clients`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseToken = await response.json();

    return responseToken;
  } catch (err) {
    console.error("Error fetching clients:", err);
    throw err;
  }
}

export async function addClient(clientData: Record<string, any>) {
  try {
    const response = await fetch(
      `${import.meta.env.PUBLIC_BACKEND_URL}/client`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clientData),
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
    console.error("Error adding client:", err);
    throw err;
  }
}

export async function deleteClient(id: number) {
  try {
    const response = await fetch(
      `${import.meta.env.PUBLIC_BACKEND_URL}/client/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (err) {
    console.error("Error adding client:", err);
    throw err;
  }
}

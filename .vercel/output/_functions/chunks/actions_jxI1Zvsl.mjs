async function getClients() {
  try {
    const response = await fetch(
      `${"https://vuelos-be.onrender.com"}/clients`
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
async function addClient(clientData) {
  try {
    const response = await fetch(
      `${"https://vuelos-be.onrender.com"}/client`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(clientData)
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseText = await response.text();
    const responseData = responseText ? JSON.parse(responseText) : {};
    return responseData;
  } catch (err) {
    console.error("Error adding client:", err);
    throw err;
  }
}

async function getAirships() {
  try {
    const response = await fetch(
      `${"https://vuelos-be.onrender.com"}/airships`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseToken = await response.json();
    return responseToken;
  } catch (err) {
    console.error("Error fetching Airships:", err);
    throw err;
  }
}
async function addAirship(formData) {
  try {
    const response = await fetch(
      `${"https://vuelos-be.onrender.com"}/airship`,
      {
        method: "POST",
        body: formData
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseText = await response.text();
    const responseData = responseText ? JSON.parse(responseText) : {};
    return responseData;
  } catch (err) {
    console.error("Error adding airship:", err);
    throw err;
  }
}

export { getClients as a, addClient as b, addAirship as c, getAirships as g };

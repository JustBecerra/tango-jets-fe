// lib/database.js
export async function getClients() {
    return [
      { id: 1, firstname: "Juan", lastname: "Pérez", phonenumber: "123456789", email: "juan.perez@example.com", identification: "A12345678" },
      { id: 2, firstname: "María", lastname: "González", phonenumber: "987654321", email: "maria.gonzalez@example.com", identification: "B87654321" },
      // Agrega más clientes ficticios según sea necesario
    ];
  }

  export async function getJets() {
    return [
      { id: 1, name: "Jet Falcon", capacity: "12", flightrange:"5000 km", speed: "850 km/h", price: "$35M" },
      { id: 2, name: "Gulfstream G700", capacity: "19", flightrange:"7500 km", speed: "950 km/h", price: "$75M" },
      { id: 3, name: "Bombardier Global 7500", capacity: "19", flightrange:"7700 km", speed: "950 km/h", price: "$72M" },
      { id: 4, name: "Dassault Falcon 8X", capacity: "16", flightrange:"6450 km", speed: "900 km/h", price: "$58M" },
      { id: 5, name: "Embraer Praetor 600", capacity: "12", flightrange:"4400 km", speed: "860 km/h", price: "$21M" },
    ];
  }

  export async function getFlights() {
    return [
      { 
        id: 1, 
        launchtime: "2024-10-15 08:00", 
        arrivaltime: "2024-10-15 10:00", 
        to: "New York", 
        airship: "Jet A1", 
        createdby: "John Doe" 
      },
      { 
        id: 2, 
        launchtime: "2024-10-16 12:00", 
        arrivaltime: "2024-10-16 14:00", 
        to: "Los Angeles", 
        airship: "Jet B2", 
        createdby: "Jane Smith" 
      }
    ];
  }
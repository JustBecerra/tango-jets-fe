import { StepperHeader } from "./StepperHeader";
import type { Airship, Client, Flight } from "../table/TableModal";
import { ProgressStepper } from "./ProgressStepper";
import { StepperFlightInfo } from "./StepperFlightInfo";
import FlightSegmentsSection from "./FlightSegmentSection";
import { generateElegantItinerary } from "../PDFPrinter/generateItineraryPDF";
import { DUMMY_IMAGES } from "../PDFPrinter/dummyImages";
import { useState, useCallback, useEffect } from "react";
import { fetchAirportData, iataToIcao } from "../../utils/airportData";

interface props {
  currentFlight: Flight;
  listAirships: Airship[];
  listClients: Client[];
  chosenAirship: Airship;
  allFlights: Flight[];
}

export const StepperStructure = ({
  currentFlight,
  listAirships,
  listClients,
  chosenAirship,
  allFlights,
}: props) => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [rafaImageBase64, setRafaImageBase64] = useState<string | null>(null);

  const lead_passenger =
    listClients.find(
      (client) => client.fullname === currentFlight.master_passenger
    ) || "John Doe";

  const coordinates = [
    {
      latitude: currentFlight.first_latitude,
      longitude: currentFlight.first_longitude,
    },
    {
      latitude: currentFlight.second_latitude,
      longitude: currentFlight.second_longitude,
    },
  ];

  // Load and convert rafa.JPG to base64 on component mount
  useEffect(() => {
    const loadRafaImage = async () => {
      try {
        const response = await fetch('/rafa.JPG');
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          setRafaImageBase64(base64String);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error('Error loading rafa.JPG:', error);
      }
    };
    loadRafaImage();
  }, []);

  const handleGeneratePDF = useCallback(async () => {
    if (isGeneratingPDF || !rafaImageBase64) return;
    
    setIsGeneratingPDF(true);
    
    // Use requestAnimationFrame to ensure the state is updated before generating the PDF
    requestAnimationFrame(async () => {
      try {
        const headerData = {
          leadPassenger: typeof lead_passenger === "string" 
            ? lead_passenger 
            : lead_passenger.fullname || "Unknown Passenger",
          title: typeof lead_passenger === "string" ? "" : lead_passenger.title || "",
          nationality: typeof lead_passenger === "string" ? "unknown" : lead_passenger.nationality || "unknown",
          email: typeof lead_passenger === "string" ? "unknown" : lead_passenger.email || "unknown",
          dateOfBirth: typeof lead_passenger === "string" ? "unknown" : lead_passenger.date_of_birth || "unknown",
          passport: typeof lead_passenger === "string" ? "unknown" : lead_passenger.passport || "unknown"
        };

        // Fetch airport data for each flight
        const legs = await Promise.all(allFlights.map(async flight => {
          // Convert IATA codes to ICAO if needed
          const departureIcao = await iataToIcao(flight.from || '');
          const arrivalIcao = await iataToIcao(flight.to || '');

          // Debug logs
          console.log('Departure IATA:', flight.from, 'ICAO:', departureIcao);
          console.log('Arrival IATA:', flight.to, 'ICAO:', arrivalIcao);
          
          // Fetch airport data
          const departureAirport = departureIcao ? await fetchAirportData(departureIcao) : null;
          const arrivalAirport = arrivalIcao ? await fetchAirportData(arrivalIcao) : null;

          return {
            flightNumber: flight.id.toString(),
            departureLocation: flight.from || "Unknown Origin",
            arrivalLocation: flight.to || "Unknown Destination",
            departureTime: flight.launchtime || "Unknown Departure Time",
            arrivalTime: flight.arrivaltime || "Unknown Arrival Time",
            airshipName: flight.airship_name || "Unknown Airship",
            flightDuration: flight.flight_time || "Unknown Duration",
            phase: flight.phase.toString() || "Unknown Phase",
            // Use real airport data if available, fallback to defaults
            departureAirportName: departureAirport?.name || "Unknown Airport",
            departureAirportAddress: departureAirport?.address || "Address Not Available",
            departureFBOName: departureAirport?.fbo.name || "FBO Information Not Available",
            departureFBOPhone: departureAirport?.fbo.phone || "Contact Airport for FBO Details",
            departureWeather: { icon: "☁️", hi: "84°", lo: "68°", description: "Weather Data Not Available" },
            arrivalAirportName: arrivalAirport?.name || "Unknown Airport",
            arrivalAirportAddress: arrivalAirport?.address || "Address Not Available",
            arrivalFBOName: arrivalAirport?.fbo.name || "FBO Information Not Available",
            arrivalFBOPhone: arrivalAirport?.fbo.phone || "Contact Airport for FBO Details",
            arrivalWeather: { icon: "☀️", hi: "80°", lo: "57°", description: "Weather Data Not Available" },
            crew: [
              { role: "PIC", name: "Alexandre Juca Abreu Motta" },
              { role: "SIC", name: "Fortun Aspurz Arandigoyen" }
            ],
            passengers: [
              flight.master_passenger,
              ...(flight.companion_passengers || [])
            ],
            distance: "943 miles", // We'll update this in the next step
            timeZoneChange: "0"    // We'll update this in the next step
          };
        }));

        const footerData = {
          totalPassengers: currentFlight.companion_passengers.length + 1,
          totalPrice: currentFlight.price_revenue || 0,
          termsAndConditions: "Standard terms and conditions apply"
        };

        // Use rafa.JPG for all images
        const dummyHeaderInfo = {
          aircraftName: chosenAirship.title || "Unknown Aircraft",
          registration: chosenAirship.id.toString() || "Unknown Registration",
          mapImageBase64: rafaImageBase64,
          aircraftExteriorBase64: rafaImageBase64,
          aircraftInteriorBase64: rafaImageBase64
        };

        console.log('Chosen Airship:', chosenAirship);
        console.log('Dummy Header Info:', dummyHeaderInfo);

        // Just call the function - it will handle saving internally
        generateElegantItinerary(
          headerData,
          legs,
          footerData,
          dummyHeaderInfo
        );
      } catch (error) {
        console.error('Error generating PDF:', error);
      } finally {
        // Reset the state after a short delay
        setTimeout(() => {
          setIsGeneratingPDF(false);
        }, 1000);
      }
    });
  }, [isGeneratingPDF, currentFlight, lead_passenger, allFlights, chosenAirship, rafaImageBase64]);

  return (
    <div className="flex flex-col h-full w-full justify-start items-center gap-8">
      <StepperHeader
        currentFlight={currentFlight}
        lead_passenger={lead_passenger}
      />
      <ProgressStepper currentStep={currentFlight.phase} />
      <StepperFlightInfo
        coordinates={coordinates}
        currentFlight={currentFlight}
        listAirships={listAirships}
        chosenAirship={chosenAirship}
        to={currentFlight.to}
        from={currentFlight.from}
        totalPassengers={currentFlight.companion_passengers.length + 1}
      />
      <FlightSegmentsSection 
        allFlights={allFlights} 
        currentFlightID={currentFlight.id}
      />
      <button
        onClick={handleGeneratePDF}
        disabled={isGeneratingPDF || !rafaImageBase64}
        className={`bg-blue-500 text-white px-4 py-2 rounded ${
          isGeneratingPDF || !rafaImageBase64 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
        }`}
      >
        {isGeneratingPDF ? 'Generating PDF...' : !rafaImageBase64 ? 'Loading Images...' : 'Generate Itinerary PDF'}
      </button>
    </div>
  );
};

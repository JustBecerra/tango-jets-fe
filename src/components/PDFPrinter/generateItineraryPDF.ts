import jsPDF from "jspdf";
import "jspdf-autotable"; // Adds support for elegant tables
import { crewBase64, passengerBase64 } from './IconsForItenerary';
import { fetchAirportData } from '../../utils/airportData';

/**
 * Interfaces that define the data structure
 */
interface TravelerInfo {
  leadPassenger: string;
  title?: string;
  nationality: string;
  email: string;
  dateOfBirth: string;
  passport: string;
  reservationNumber?: string;
  identification?: string;
}

interface FlightSegment {
  flightNumber: string;
  departureLocation: string;
  arrivalLocation: string;
  departureTime: string;
  arrivalTime: string;
  airshipName: string;
  flightDuration: string;
  phase: string;
  // Extended fields for richer details
  departureAirportName?: string;
  departureAirportAddress?: string;
  departureFBOName?: string;
  departureFBOPhone?: string;
  departureWeather?: { icon?: string; hi?: string; lo?: string; description?: string };
  arrivalAirportName?: string;
  arrivalAirportAddress?: string;
  arrivalFBOName?: string;
  arrivalFBOPhone?: string;
  arrivalWeather?: { icon?: string; hi?: string; lo?: string; description?: string };
  crew?: { role: string; name: string }[];
  passengers?: string[];
  distance?: string;
  timeZoneChange?: string;
}

interface TripInfo {
  totalPassengers: number;
  totalPrice: number;
  termsAndConditions?: string;
}

// Color definition for consistent use
type RGBColor = [number, number, number];

interface ColorPalette {
  primary: RGBColor;
  secondary: RGBColor;
  accent: RGBColor;
  dark: RGBColor;
  light: RGBColor;
  white: RGBColor;
  success: RGBColor;
  warning: RGBColor;
  danger: RGBColor;
}

// New interface for classic header
interface ItineraryHeaderInfo {
  aircraftName: string;
  registration: string;
  clientName?: string;
  clientCompany?: string;
  mapImageBase64?: string; // base64 string for the map image
  aircraftExteriorBase64?: string; // base64 string for exterior image
  aircraftInteriorBase64?: string; // base64 string for interior image
}

// Crew icon as a data URL
const crewIconDataUrl = crewBase64;

/**
 * Generates an elegant travel itinerary in PDF format
 * @param travelerInfo - Traveler information
 * @param flightSegments - Flight segments
 * @param tripInfo - General trip information
 * @param headerInfo - (Optional) Classic header information for classic layout
 */
export const generateElegantItinerary = async (
  travelerInfo: TravelerInfo, 
  flightSegments: FlightSegment[], 
  tripInfo: TripInfo,
  headerInfo?: ItineraryHeaderInfo
): Promise<jsPDF> => {
  // Fetch airport data for all segments first
  for (const segment of flightSegments) {
    // Get departure airport info
    const depAirportData = await fetchAirportData(segment.departureLocation);
    if (depAirportData) {
      segment.departureAirportName = depAirportData.name;
      segment.departureAirportAddress = depAirportData.address;
      if (depAirportData.fbo) {
        segment.departureFBOName = depAirportData.fbo.name;
        segment.departureFBOPhone = depAirportData.fbo.phone;
      }
    }

    // Get arrival airport info
    const arrAirportData = await fetchAirportData(segment.arrivalLocation);
    if (arrAirportData) {
      segment.arrivalAirportName = arrAirportData.name;
      segment.arrivalAirportAddress = arrAirportData.address;
      if (arrAirportData.fbo) {
        segment.arrivalFBOName = arrAirportData.fbo.name;
        segment.arrivalFBOPhone = arrAirportData.fbo.phone;
      }
    }
  }

  // Initial configuration
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 15;
  
  // Trip number (hex) for use throughout the document
  let tripNumber = flightSegments && flightSegments.length > 0 && flightSegments[0].flightNumber
    ? flightSegments[0].flightNumber
    : undefined;
  let hexTripNumber = undefined;
  if (tripNumber) {
    const numericPart = tripNumber.replace(/\D/g, '');
    if (numericPart) {
      hexTripNumber = parseInt(numericPart).toString(16).toUpperCase();
    }
  }
  
  // Modern color palette
  const colors: ColorPalette = {
    primary: [41, 128, 185],      // Main blue
    secondary: [52, 152, 219],    // Secondary blue
    accent: [230, 126, 34],       // Orange accent
    dark: [44, 62, 80],           // Dark blue/black
    light: [236, 240, 241],       // Light gray
    white: [255, 255, 255],       // White
    success: [46, 204, 113],      // Green (secondary accent)
    warning: [241, 196, 15],      // Yellow
    danger: [231, 76, 60]         // Red
  };
  
  // ===== HELPER FUNCTIONS =====
  
  /**
   * Converts a flight number to hexadecimal format
   * @param flightNumber - The flight number to convert
   * @returns The flight number in hexadecimal format
   */
  const convertToHex = (flightNumber: string): string => {
    // Extract the numeric part of the flight number
    const numericPart = flightNumber.replace(/\D/g, '');
    if (!numericPart) return flightNumber;
    
    // Convert to hex and pad with zeros to maintain length
    const hex = parseInt(numericPart).toString(16).toUpperCase();
    const prefix = flightNumber.replace(numericPart, '');
    return `${prefix}${hex}`;
  };
  
  /**
   * Draws a rounded rectangle with shadow
   */
  const drawCard = (
    x: number, 
    y: number, 
    width: number, 
    height: number, 
    radius: number = 5, 
    shadow: boolean = true
  ): void => {
    // Draw shadow (slight offset)
    if (shadow) {
      doc.setFillColor(100, 100, 100, 0.1);
      doc.roundedRect(x+2, y+2, width, height, radius, radius, 'F');
    }
    
    // Draw white background
    doc.setFillColor(colors.white[0], colors.white[1], colors.white[2]);
    doc.roundedRect(x, y, width, height, radius, radius, 'F');
    
    // Subtle border
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.roundedRect(x, y, width, height, radius, radius, 'S');
  };
  
  /**
   * Draws a section header
   */
  const drawSectionHeader = (
    x: number, 
    y: number, 
    text: string, 
    color: RGBColor = colors.primary
  ): number => {
    // Color line
    doc.setDrawColor(color[0], color[1], color[2]);
    doc.setLineWidth(1.5);
    doc.line(x, y+6, x+40, y+6);
    
    // Text
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
    doc.text(text.toUpperCase(), x, y);
    
    return y + 12; // Returns the new Y position
  };
  
  /**
   * Draws the airline logo
   */
  const drawLogo = (x: number, y: number): void => {
    // Logo background
    doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.roundedRect(x, y, 60, 20, 3, 3, 'F');
    
    // Logo text
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
    doc.text("SKYWAY", x + 30, y + 12, { align: "center" });
    
    // Decorative line
    doc.setDrawColor(colors.white[0], colors.white[1], colors.white[2]);
    doc.setLineWidth(0.5);
    doc.line(x + 10, y + 16, x + 50, y + 16);
  };
  
  /**
   * Draws a classic header section
   */
  const drawAircraftInfoCard = (headerInfo: ItineraryHeaderInfo, yPosition: number): number => {
    const width = pageWidth - (margin * 2);
    const height = 120;
    drawCard(margin, yPosition, width, height);

    // Divide into 4 quadrants
    const colPadding = 12;
    const halfWidth = Math.floor((width - colPadding * 3) / 2);
    const halfHeight = Math.floor((height - colPadding * 3) / 2);
    const leftX = margin + colPadding;
    const rightX = leftX + halfWidth + colPadding;
    const topY = yPosition + colPadding;
    const bottomY = topY + halfHeight + colPadding;

    // Top left: text info
    let textY = topY + 8;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
    doc.text(headerInfo.aircraftName || "No Aircraft Name", leftX, textY, { maxWidth: halfWidth - 6 });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    textY += 13;
    doc.text(`Registration: ${headerInfo.registration || "No Registration"}`, leftX, textY, { maxWidth: halfWidth - 6 });
    textY += 10;
    doc.text(`Type: Private Jet`, leftX, textY, { maxWidth: halfWidth - 6 });
    textY += 10;
    doc.text(`Configuration: VIP`, leftX, textY, { maxWidth: halfWidth - 6 });

    // Bottom left: map image
    if (headerInfo.mapImageBase64) {
      doc.addImage(headerInfo.mapImageBase64, 'JPEG', leftX, bottomY, halfWidth, halfHeight);
    }

    // Top right: exterior image
    if (headerInfo.aircraftExteriorBase64) {
      doc.addImage(headerInfo.aircraftExteriorBase64, 'JPEG', rightX, topY, halfWidth, halfHeight);
    }

    // Bottom right: interior image
    if (headerInfo.aircraftInteriorBase64) {
      doc.addImage(headerInfo.aircraftInteriorBase64, 'JPEG', rightX, bottomY, halfWidth, halfHeight);
    }

    return yPosition + height + 10; // Return the next Y position after the card
  };
  
  /**
   * Draws a flight segment with visual style
   */
  const drawFlightSegment = (
    x: number, 
    y: number, 
    segment: FlightSegment, 
    index: number
  ): number => {
    const width = pageWidth - (margin * 2);
    const height = 180;
    drawCard(x, y, width, height);
    
    // Flight number and phase
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.text(`Leg ${index + 1}: ${segment.departureLocation} → ${segment.arrivalLocation}`, x + 10, y + 15);
    
    // Departure section
    let currentY = y + 35;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
    doc.text("DEPARTURE", x + 10, currentY);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    currentY += 15;
    doc.text(segment.departureAirportName || "Unknown Airport", x + 10, currentY);
    currentY += 10;
    doc.text(segment.departureAirportAddress || "Address Not Available", x + 10, currentY);
    currentY += 10;
    doc.text(`FBO: ${segment.departureFBOName || "FBO Information Not Available"}`, x + 10, currentY);
    doc.text(`Tel: ${segment.departureFBOPhone || "Contact Airport for FBO Details"}`, x + 10, currentY);
    
    if (segment.departureWeather) {
      currentY += 15;
      const weatherText = `${segment.departureWeather.description} (${segment.departureWeather.hi}°C / ${segment.departureWeather.lo}°C)`;
      doc.text(weatherText, x + 10, currentY);
    }
    
    // Arrival section (right side)
    currentY = y + 35;
    const rightX = x + (width / 2) + 10;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("ARRIVAL", rightX, currentY);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    currentY += 15;
    doc.text(segment.arrivalAirportName || "Unknown Airport", rightX, currentY);
    currentY += 10;
    doc.text(segment.arrivalAirportAddress || "Address Not Available", rightX, currentY);
    currentY += 10;
    doc.text(`FBO: ${segment.arrivalFBOName || "FBO Information Not Available"}`, rightX, currentY);
    currentY += 10;
    doc.text(`Tel: ${segment.arrivalFBOPhone || "Contact Airport for FBO Details"}`, rightX, currentY);
    
    if (segment.arrivalWeather) {
      currentY += 15;
      const weatherText = `${segment.arrivalWeather.description} (${segment.arrivalWeather.hi}°C / ${segment.arrivalWeather.lo}°C)`;
      doc.text(weatherText, rightX, currentY);
    }
    
    // Flight details section
    currentY = y + 140;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Flight Details:", x + 10, currentY);
    
    doc.setFont("helvetica", "normal");
    currentY += 10;
    doc.text(`Duration: ${segment.flightDuration}`, x + 10, currentY);
    doc.text(`Distance: ${segment.distance}`, x + (width/2) + 10, currentY);
    currentY += 10;
    doc.text(`Time Zone Change: ${segment.timeZoneChange}`, x + 10, currentY);
    
    return y + height + 10;
  };
  
  // ===== PDF CONSTRUCTION =====
  
  // 1. HEADER BAR
  // ------------------------------------------
  const headerBarHeight = 65; // Increased height for more space
  doc.setFillColor(41, 152, 185); // Optionally, a lighter/more modern blue
  doc.rect(0, 0, pageWidth, headerBarHeight, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18); // Larger font
  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  if (headerInfo?.aircraftName && headerInfo.aircraftName.trim().toLowerCase() !== 'tbd') {
    doc.text(headerInfo.aircraftName, margin, 32, { align: "left" }); // Lowered for more padding
  }

  doc.setFontSize(13); // Slightly larger
  if (headerInfo?.registration && headerInfo.registration.trim() !== '43') {
    doc.text(headerInfo.registration, pageWidth - margin, 32, { align: "right" });
  }

  if (hexTripNumber) {
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Trip #${hexTripNumber}`, pageWidth - margin, 48, { align: "right" });
  }

  // Move yPos below the blue bar
  var yPos = headerBarHeight + 10;
  
  // 3. CLIENT INFO CARD BELOW IMAGES
  // ------------------------------------------
  // No client info card; summary uses full width
  const summaryWidth = pageWidth - margin * 2;
  let summaryY = yPos;

  // Draw each leg as a card, repeating 3 times, within summaryWidth
  flightSegments.forEach((segment, idx) => {
    for (let repeat = 0; repeat < 3; repeat++) {
      const cardHeight = 20;
      const cardWidth = summaryWidth;
      drawCard(margin, summaryY, cardWidth, cardHeight);
      // Draw leg number circle on the left
      const circleRadius = 7;
      const circleX = margin + circleRadius + 3;
      const circleY = summaryY + cardHeight/2;
      doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
      doc.circle(circleX, circleY, circleRadius, 'F');
      doc.setFontSize(7);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
      doc.text(`${idx + 1}`, circleX, circleY + 1, { align: "center" });
      // Left side - Departure
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
      const depCode = segment.departureLocation.slice(0, 3).toUpperCase();
      doc.text(depCode, circleX + circleRadius + 8, summaryY + 8);
      // Departure time
      doc.setFontSize(7);
      doc.setFont("helvetica", "normal");
      const depParts = segment.departureTime.split(' ');
      const depTime = depParts.length > 1 ? depParts.slice(1).join(' ') : segment.departureTime;
      doc.text(depTime, circleX + circleRadius + 8, summaryY + 15);
      // Center - Arrow and duration
      const centerX = margin + cardWidth / 2;
      doc.setDrawColor(colors.dark[0], colors.dark[1], colors.dark[2]);
      doc.setLineWidth(0.5);
      const arrowLength = 20;
      doc.line(centerX - arrowLength/2, summaryY + 10, centerX + arrowLength/2, summaryY + 10);
      const headSize = 3;
      doc.line(centerX + arrowLength/2, summaryY + 10, centerX + arrowLength/2 - headSize, summaryY + 10 - headSize);
      doc.line(centerX + arrowLength/2, summaryY + 10, centerX + arrowLength/2 - headSize, summaryY + 10 + headSize);
      doc.setFontSize(6);
      doc.setFont("helvetica", "normal");
      doc.text(segment.flightDuration, centerX, summaryY + 16, { align: "center" });
      // Right side - Arrival
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      const arrCode = segment.arrivalLocation.slice(0, 3).toUpperCase();
      doc.text(arrCode, margin + cardWidth - 15, summaryY + 8, { align: "right" });
      doc.setFontSize(7);
      doc.setFont("helvetica", "normal");
      const arrParts = segment.arrivalTime.split(' ');
      const arrTime = arrParts.length > 1 ? arrParts.slice(1).join(' ') : segment.arrivalTime;
      doc.text(arrTime, margin + cardWidth - 15, summaryY + 15, { align: "right" });
      if (repeat < 2 || idx < flightSegments.length - 1) {
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.5);
        doc.line(margin + 10, summaryY + cardHeight, margin + cardWidth - 10, summaryY + cardHeight);
      }
      summaryY += cardHeight + 3;
    }
  });

  // After both columns, set yPos to the greater of the two column bottoms plus spacing
  yPos = Math.max(summaryY, yPos) + 10;
  
  // 2. COVER PAGE
  // ------------------------------------------
  
  // Logo
  drawLogo(margin, 20);
  
  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  doc.text("TRAVEL ITINERARY", pageWidth - margin, 35, { align: "right" });
  
  // Draw aircraft info card if info is provided
  if (headerInfo) {
    yPos = drawAircraftInfoCard(headerInfo, yPos);
  }
  
  // 3. FLIGHT SEGMENTS
  // ------------------------------------------
  // Always start Flight Details on a new page
  doc.addPage();
  yPos = 20; // Reset yPos for new page
  
  yPos = drawSectionHeader(margin, yPos, "Flight Details");
  
  // Draw each segment, limiting to 2 per page
  const firstSegment = flightSegments[0]; // Get the first segment
  const segmentsToShow = [firstSegment]; // Show just one segment

  segmentsToShow.forEach((segment, index) => {
    // Check if we need a new page (after every 2 segments)
    if (index > 0 && index % 2 === 0) {
      doc.addPage();
      // Add a small header on the new page
      doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
      doc.rect(0, 0, pageWidth, 20, "F");
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
      doc.text("TRAVEL ITINERARY (CONTINUED)", pageWidth - margin, 13, { align: "right" });
      yPos = 30;
    }
    
    // Calculate optimal height for 2 segments per page with more spacing
    const height = (pageHeight - (20 + 30 + 25 + 30)) / 2; // Increased spacing between segments
    drawCard(margin, yPos, pageWidth - (margin * 2), height, 6, true);

    // Colored left accent bar
    const accentBarWidth = 7;
    doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.roundedRect(margin, yPos, accentBarWidth, height, 4, 4, 'F');

    // Section backgrounds for columns (adjusted to fit only the content area)
    const sectionBgHeight = 70; // Increased height for more content
    doc.setFillColor(colors.light[0], colors.light[1], colors.light[2]);
    doc.rect(margin + accentBarWidth + 10, yPos + 15, (pageWidth - (margin * 2) - accentBarWidth - 20) / 2, sectionBgHeight, 'F'); // Departure
    doc.rect(margin + accentBarWidth + 10 + (pageWidth - (margin * 2) - accentBarWidth - 20) / 2, yPos + 15, (pageWidth - (margin * 2) - accentBarWidth - 20) / 2, sectionBgHeight, 'F'); // Arrival

    // Leg label (top)
    doc.setFontSize(14);
    doc.setFont("times", "bold");
    doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    const arrowX = margin + accentBarWidth + 12 + doc.getTextWidth(`Leg ${index + 1}: ${segment.departureLocation} `);
    doc.text(`Leg ${index + 1}: ${segment.departureLocation} `, margin + accentBarWidth + 12, yPos + 9);
    doc.text('→', arrowX, yPos + 9);
    doc.text(` ${segment.arrivalLocation}`, arrowX + doc.getTextWidth('→'), yPos + 9);

    // Primary color line below Leg label
    doc.setDrawColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.setLineWidth(1.2);
    doc.line(margin + accentBarWidth + 10, yPos + 12, pageWidth - margin - 10, yPos + 12);

    // Departure column
    let depX = margin + accentBarWidth + 14;
    let depY = yPos + 20;
    // Section header: Departure
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(colors.success[0], colors.success[1], colors.success[2]);
    doc.text("DEPARTURE", depX, depY);
    // Primary color line below header
    doc.setDrawColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.setLineWidth(0.7);
    doc.line(depX, depY + 2, depX + 40, depY + 2);
    // Details
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
    doc.text(`${segment.departureLocation} - ${segment.departureTime}`, depX, depY + 9);
    if (segment.departureAirportName) doc.text(segment.departureAirportName, depX, depY + 17);
    if (segment.departureAirportAddress) doc.text(segment.departureAirportAddress, depX, depY + 25);
    if (segment.departureFBOName || segment.departureFBOPhone) doc.text(`FBO: ${segment.departureFBOName || ''} ${segment.departureFBOPhone || ''}`, depX, depY + 33);
    if (segment.departureWeather) {
      doc.setFontSize(10);
      const weatherText = `${segment.departureWeather.description} (${segment.departureWeather.hi}°C / ${segment.departureWeather.lo}°C)`;
      doc.text(weatherText, depX, depY + 41);
    }

    // Arrival column
    let arrX = margin + accentBarWidth + 14 + (pageWidth - (margin * 2) - accentBarWidth - 20) / 2;
    let arrY = yPos + 20;
    // Section header: Arrival
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(colors.success[0], colors.success[1], colors.success[2]);
    doc.text("ARRIVAL", arrX, arrY);
    // Primary color line below header
    doc.setDrawColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.setLineWidth(0.7);
    doc.line(arrX, arrY + 2, arrX + 40, arrY + 2);
    // Details
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
    doc.text(`${segment.arrivalLocation} - ${segment.arrivalTime}`, arrX, arrY + 9);
    if (segment.arrivalAirportName) doc.text(segment.arrivalAirportName, arrX, arrY + 17);
    if (segment.arrivalAirportAddress) doc.text(segment.arrivalAirportAddress, arrX, arrY + 25, { maxWidth: (pageWidth - (margin * 2) - accentBarWidth - 20) / 2 - 8 });
    if (segment.arrivalFBOName || segment.arrivalFBOPhone) doc.text(`FBO: ${segment.arrivalFBOName || ''} ${segment.arrivalFBOPhone || ''}`, arrX, arrY + 33, { maxWidth: (pageWidth - (margin * 2) - accentBarWidth - 20) / 2 - 8 });
    if (segment.arrivalWeather) {
      doc.setFontSize(10);
      const weatherText = `${segment.arrivalWeather.description} (${segment.arrivalWeather.hi}°C / ${segment.arrivalWeather.lo}°C)`;
      doc.text(weatherText, arrX, arrY + 41, { maxWidth: (pageWidth - (margin * 2) - accentBarWidth - 20) / 2 - 8 });
    }

    // Bottom row: Crew, Passengers, Distance, Time Zone
    let bottomY = yPos + height - 20; // Increased spacing from bottom
    let infoX = margin + accentBarWidth + 14;
    let infoXCursor = infoX;
    
    // Draw crew icon and text first (in foreground)
    if (segment.crew && segment.crew.length > 0) {
      let iconY = bottomY - 2;
      let iconSize = 6.12; // Reduced by another 15% from 7.2
      let textOffset = iconSize + 6; // Increased text offset for better spacing
      
      // Add the crew icon with proper dimensions
      try {
        doc.addImage(crewBase64, 'PNG', infoX, iconY, iconSize, iconSize, undefined, 'FAST');
      } catch (error) {
        console.error('Error rendering crew icon:', error);
        // Fallback to text if icon fails
        doc.text('👨‍✈️', infoX, iconY + iconSize);
      }
      
      // Render each crew member on a new line for clarity
      segment.crew.forEach((c, i) => {
        doc.setFontSize(8.5); // Slightly larger font for better readability
        // Adjust vertical position to align with icon and remove spacing between PIC and SIC
        const textY = i === 0 ? bottomY : bottomY + (i * 6);
        doc.text(`${c.role}: ${c.name}`, infoX + textOffset, textY);
      });
      infoXCursor = infoX + 80; // Reduced spacing after crew section
    }
    
    // Draw other text elements with adjusted spacing
    if (segment.passengers && segment.passengers.length > 0) {
      let iconY = bottomY - 2;
      let iconSize = 6.12; // Reduced by another 15% from 7.2
      let textOffset = iconSize + 6;
      
      // Align passenger icon with arrival section
      const passengerX = arrX; // Use the same X position as arrival section
      
      // Add the passenger icon
      try {
        doc.addImage(passengerBase64, 'PNG', passengerX, iconY, iconSize, iconSize, undefined, 'FAST');
      } catch (error) {
        console.error('Error rendering passenger icon:', error);
        doc.text('👥', passengerX, iconY + iconSize);
      }
      
      // Align passenger text with PIC
      doc.text(`Passengers: ${segment.passengers.join(', ')}`, passengerX + textOffset, bottomY);
      infoXCursor = passengerX + 60; // Reduced spacing after passenger section
    }

    // Move distance and timezone to a new line below with reduced spacing
    let bottomInfoY = bottomY + 15; // Reduced spacing from 25 to 15
    if (segment.distance || segment.timeZoneChange) {
      const iconSize = 6.12; // Reduced by another 15% from 7.2
      const textOffset = iconSize + 6;
      const passengerX = arrX;
      
      if (segment.distance) {
        // Align with crew text
        doc.text(`Distance: ${segment.distance}`, infoX + textOffset, bottomInfoY);
      }
      if (segment.timeZoneChange) {
        // Align with passenger text
        doc.text(`Time zone: ${segment.timeZoneChange}`, passengerX + textOffset, bottomInfoY);
      }
    }
    
    // Primary color line above bottom row
    doc.setDrawColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.setLineWidth(0.7);
    doc.line(margin + accentBarWidth + 10, bottomY - 6, pageWidth - margin - 10, bottomY - 6);

    yPos += height + 15; // Increased spacing between segments
  });
  
  // 4. TERMS AND CONDITIONS (on a new page)
  // ------------------------------------------
  doc.addPage();
  yPos = 20;
  
  yPos = drawSectionHeader(margin, yPos, "Terms and Conditions");
  
  // Terms card with increased height
  drawCard(margin, yPos, pageWidth - (margin * 2), 80); // Increased height from 50 to 80
  
  // Terms text with more spacing
  doc.setFontSize(10); // Increased from 9 to 10
  doc.setFont("helvetica", "normal");
  doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
  doc.text(tripInfo.termsAndConditions || 
          "This document is your official itinerary. Please note that complete terms and conditions " +
          "can be found on our website. All passengers must check in at least 2 hours before " +
          "international flights.", 
          margin + 15, yPos + 15, { // Increased padding
            maxWidth: pageWidth - (margin * 2) - 30,
            align: "justify"
          });
  
  // 6. FOOTER
  // ------------------------------------------
  // Add footer to all pages
  const totalPages = doc.getNumberOfPages();
  
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    // Divider line
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.line(margin, pageHeight - 25, pageWidth - margin, pageHeight - 25);
    
    // Footer text
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(150, 150, 150);
    doc.text("© 2025 Skyway Airlines. All rights reserved.", margin, pageHeight - 15);
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin, pageHeight - 15, { align: "right" });
  }
  
  // Save document
  console.log('About to save PDF. This should trigger a download.');
  let filename = hexTripNumber ? `Flight Itinerary #${hexTripNumber}.pdf` : 'Flight Itinerary.pdf';
  return doc.save(filename);
};


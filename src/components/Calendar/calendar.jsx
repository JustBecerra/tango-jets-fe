import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./calendar.css";
import { getFlights } from "../../../lib/actions/flights/actions";
import { RouteGuard } from "../../components/routeguard";
import LoaderSpinner from "../Loaders/LoaderSpinner";

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const flights = await getFlights();
      const phaseColors = {
        1: "red",
        2: "blue",
        3: "green",
        4: "orange",
        5: "purple",
        6: "red",
        7: "blue",
        8: "pink",
        9: "yellow",
        10: "cyan",
      };

      const extractAirportCode = (location) => {
        const match = location.match(/\(([^)]+)\)/); 
        return match ? match[1] : location; 
      };

      const events = flights.map((flight) => {
        const launchTime = new Date(flight.launchtime);
        const arrivalTime = new Date(flight.arrivaltime);
      
        const fromCode = extractAirportCode(flight.from);
        const toCode = extractAirportCode(flight.to);
      
        return {
          title: `${fromCode}-${toCode}`, 
          start: launchTime.toISOString(),
          end: arrivalTime.toISOString(), 
          url: `/trip/${flight.id}`,
          backgroundColor: phaseColors[flight.phase] || "blue", 
        };
      });

      setEvents(events);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  
  useEffect(() => {
    document.body.style.overflow = "hidden"; 
    return () => {
      document.body.style.overflow = ""; 
    };
  }, []);

  const handleDateClick = (info) => {
    alert(`Date clicked: ${info.dateStr}`);
  };

  return (
    <RouteGuard>
      <div className="calendar-container">
        {loading ? (
          <div className="loader-container">
            <LoaderSpinner />
          </div>
        ) : (
          <>
            <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            initialDate={new Date().toISOString().split("T")[0]} // Set initial date to today
            events={events}
            dateClick={handleDateClick}
            eventContent={renderEventContent}
            eventDisplay="block"
            />
          </>
        )}
      </div>
    </RouteGuard>
  );
};

const renderEventContent = (eventInfo) => {
  const bgColor = eventInfo.event.backgroundColor || "blue";
  return (
    <a
      href={eventInfo.event.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "block",
        backgroundColor: bgColor,
        color: "#fff",
        textDecoration: "none",
        height: "60%",
        width: "100%",
        padding: 0,
        margin: 0,
        borderRadius: 0,
        textAlign: "center",
        lineHeight: "2.5em",
        position: "relative",
        top: "20%",
      }}
    >
      <i>{eventInfo.event.title}</i>
    </a>
  );
};

export default CalendarComponent;
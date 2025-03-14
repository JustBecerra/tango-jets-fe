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
  const [createdByFilter, setCreatedByFilter] = useState(""); // State for the selected createdby filter
  const [createdByOptions, setCreatedByOptions] = useState([]); // State for the dropdown options
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
      const events = flights.map((flight) => {
        // Limit to the first 4 events
        const launchTime = new Date(flight.launchtime);
        const endTime = new Date(launchTime);
        endTime.setDate(launchTime.getDate() + 2); // Add 2 days to launch time

        return {
          title: `${flight.from}--${flight.to}`,
          start: launchTime.toISOString(),
          end: endTime.toISOString(),
          url: `/trip/${flight.id}`,
          backgroundColor: phaseColors[flight.phase] || "blue",
          createdby: flight.createdby, // Include createdby in the event object
        };
      });
      setEvents(events);

      // Extract unique createdby values for the dropdown options
      const uniqueCreatedBy = [
        ...new Set(flights.map((flight) => flight.createdby)),
      ];
      setCreatedByOptions(uniqueCreatedBy);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  const handleDateClick = (info) => {
    alert(`Date clicked: ${info.dateStr}`);
  };

  const handleCreatedByChange = (event) => {
    setCreatedByFilter(event.target.value);
  };

  // Filter events based on the selected createdby value
  const filteredEvents = createdByFilter
    ? events.filter((event) => event.createdby === parseInt(createdByFilter))
    : events;

  return (
    <RouteGuard>
      <div className="calendar-container">
        {loading ? ( // Mostrar el loader mientras se cargan los eventos
          <div className="loader-container">
            <LoaderSpinner />
          </div>
        ) : (
          <>
            <div className="filter-container">
              <label htmlFor="createdByFilter">Filter by Created By:</label>
              <select
                id="createdByFilter"
                value={createdByFilter}
                onChange={handleCreatedByChange}
              >
                <option value="">All</option>
                {createdByOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              initialDate={new Date().toISOString().split("T")[0]} // Set initial date to today
              events={filteredEvents}
              dateClick={handleDateClick}
              eventContent={renderEventContent}
              eventBackgroundColor={(info) =>
                info.event.extendedProps.backgroundColor
              } // Ensure background color is used
            />
          </>
        )}
      </div>
    </RouteGuard>
  );
};

const renderEventContent = (eventInfo) => {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <a href={eventInfo.event.url} target="_blank" rel="noopener noreferrer">
        <i>{eventInfo.event.title}</i>
      </a>
    </>
  );
};

export default CalendarComponent;

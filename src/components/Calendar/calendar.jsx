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
  useEffect(() => {
    const fetchEvents = async () => {
      const flights = await getFlights();
      const phaseColors = {
        3: 'green',
        4: 'orange',
        5: 'purple',
        6: 'red',
        7: 'blue',
        8: 'pink',
        9: 'cyan',
        10: 'cyan',
      };
      const events = flights.map(flight => {
        const launchTime = new Date(flight.launchtime);
        const endTime = new Date(launchTime);
        endTime.setDate(launchTime.getDate() + 2);

        return {
          title: `${flight.from}--${flight.to}`,
          start: launchTime.toISOString(),
          end: endTime.toISOString(),
          url: `/trip/${flight.id}`,
          backgroundColor: phaseColors[flight.phase] || 'blue',
        };
      });
      setEvents(events);
    };

    fetchEvents();
  }, []);

  const handleDateClick = (info) => {
    alert(`Date clicked: ${info.dateStr}`);
  };

  return (
    <RouteGuard>
      <div className="calendar-container overflow-hidden">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          initialDate={new Date().toISOString().split('T')[0]}
          events={events}
          dateClick={handleDateClick}
          eventContent={renderEventContent}
          eventBackgroundColor={(info) => info.event.extendedProps.backgroundColor}
        />
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

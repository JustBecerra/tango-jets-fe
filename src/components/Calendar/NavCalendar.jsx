import React from 'react';

const NavCalendar = ({ onPrevMonth, onNextMonth }) => {
  return (
    <div className="nav-calendar">
      <button onClick={onPrevMonth} className="nav-button">Previous</button>
      <button onClick={onNextMonth} className="nav-button">Next</button>
      <style jsx>{`
        .nav-calendar {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .nav-button {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px 20px;
          font-size: 1em;
          cursor: pointer;
          border-radius: 5px;
          transition: background-color 0.3s;
        }
        .nav-button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default NavCalendar;
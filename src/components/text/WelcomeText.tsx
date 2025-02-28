import React, { useEffect, useState } from "react";
import { getCookie } from "../../utils/getCookie";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { toZonedTime } from "date-fns-tz";
import { toast } from "react-toastify";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        {children}
        <button
          onClick={onClose}
          className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const timeZoneAbbreviations: { [key: string]: string } = {
  "America/New_York": "NY",
  "Europe/London": "LON",
  "Asia/Tokyo": "TOK",
  "Australia/Sydney": "SYD",
  "America/Los_Angeles": "LA",
  "Asia/Shanghai": "SHA",
  "Europe/Madrid": "MAD",
};

export const WelcomeText = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [selectedTimeZone, setSelectedTimeZone] = useState("America/New_York");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const name = getCookie("username");
    if (name) {
      setEmployeeName(name);
    }

    setCurrentTime(new Date());

    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (!currentTime) return null;

  const formattedTime = format(currentTime, "EEE dd 🕒 'ARG' hh:mm a", {
    locale: enUS,
  });

  const zonedTime = toZonedTime(currentTime, selectedTimeZone);
  const timeZoneAbbreviation = timeZoneAbbreviations[selectedTimeZone];
  const formattedZonedTime = format(
    zonedTime,
    `EEE dd 🕒 '${timeZoneAbbreviation}' hh:mm a`,
    {
      locale: enUS,
    }
  );

  const handleTimeZoneChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedTimeZone(event.target.value);
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="m-8 text-center">
        <h1 className="text-4xl font-bold" onClick={openModal}>
          Welcome,
          <span className="text-blue-500 font-cursive">{employeeName}</span>!
        </h1>

        <h2 className="text-1xl font-semibold mt-4">{formattedTime}</h2>
        <h2 className="text-1xl font-semibold mt-4">{formattedZonedTime}</h2>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Select Time Zone</h2>
        <label htmlFor="modalTimeZoneSelector" className="mr-2">
          Time Zone:
        </label>
        <select
          id="modalTimeZoneSelector"
          value={selectedTimeZone}
          onChange={handleTimeZoneChange}
          className="w-full p-2 border rounded"
        >
          <option value="America/New_York">New York</option>
          <option value="America/Los_Angeles">Los Angeles</option>
          <option value="Europe/London">London</option>
          <option value="Europe/Madrid">Madrid</option>
          <option value="Asia/Tokyo">Tokyo</option>
          <option value="Asia/Shanghai">Shanghai</option>
        </select>
      </Modal>
    </div>
  );
};

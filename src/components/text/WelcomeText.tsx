import { useEffect, useState } from "react";
import { getCookie } from "../../utils/getCookie";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

export const WelcomeText = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const name = getCookie("username");
    if (name) {
      setEmployeeName(name);
    }

    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = format(currentTime, "EEE dd 🕒 'ARG' hh:mm a", {
    locale: enUS,
  });

  return (
    <div className="m-8 text-center">
      <h1 className="text-4xl font-bold">
        Welcome,
        <span className="text-blue-500 font-cursive">{employeeName}</span>!
      </h1>

      <h2 className="text-1xl font-semibold mt-4">{formattedTime}</h2>
    </div>
  );
};

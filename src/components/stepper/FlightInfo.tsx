import { useEffect, useState } from "react";
import { getAirships } from "../../../lib/actions/airships/actions";
import type { formType } from "../modals/ModalFlightAdd";

interface Airship {
  id: number;
  title: string;
}

interface props {
  phase: string;
  formData: formType;
  setFormData: React.Dispatch<React.SetStateAction<formType>>;
}

export const FlightInfo = ({ phase, formData, setFormData }: props) => {
  const {
    to,
    from,
    launchtime,
    master_passenger,
    airship_name,
    price_cost,
    price_revenue,
  } = formData;

  const [airshipNames, setAirshipNames] = useState<Airship[]>([]);

  const fetchAirshipNames = async () => {
    try {
      const airships = await getAirships();
      setAirshipNames(airships);
    } catch (error) {
      console.error("Error fetching airship names:", error);
    }
  };

  useEffect(() => {
    fetchAirshipNames();
  }, []);

  const getPercentage = (cost: string) => {
    if (cost === "") return 0;
    const percentage = 12;
    const revenue = (percentage * 100) / parseInt(cost);
    return parseInt(cost) + revenue;
  };

  const PhaseFields = () => {
    if (phase === "first") {
      return (
        <div className="h-fit mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="to"
              className="block text-sm font-medium text-gray-900 dark:text-gray-200"
            >
              To
            </label>
            <input
              type="text"
              id="to"
              name="to"
              value={to}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  to: e.target.value,
                }))
              }
              className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="from"
              className="block text-sm font-medium text-gray-900 dark:text-gray-200"
            >
              From
            </label>
            <input
              type="text"
              id="from"
              name="from"
              value={from}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  from: e.target.value,
                }))
              }
              className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="launchtime"
              className="block text-sm font-medium text-gray-900 dark:text-gray-200"
            >
              Launch Time
            </label>
            <input
              type="datetime-local"
              id="launchtime"
              name="launchtime"
              value={launchtime.toISOString().slice(0, 16)}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  launchtime: new Date(e.target.value),
                }))
              }
              min={new Date().toISOString().slice(0, 16)}
              className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="master_passenger"
              className="block text-sm font-medium text-gray-900 dark:text-gray-200"
            >
              Master Passenger
            </label>
            <input
              type="text"
              id="master_passenger"
              name="master_passenger"
              value={master_passenger}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  master_passenger: e.target.value,
                }))
              }
              className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              required
            />
          </div>
        </div>
      );
    } else if (phase === "second") {
      return (
        <div className="h-fit mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="airship_title"
              className="block text-sm font-medium text-gray-900 dark:text-gray-200"
            >
              Airship Name
            </label>
            <select
              id="airship_title"
              name="airship_title"
              value={airship_name}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  airship_name: e.target.value,
                }))
              }
              className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              <option value="">Select an airship</option>
              {airshipNames.map((airship) => (
                <option key={airship.id} value={airship.title}>
                  {airship.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="price_cost"
              className="block text-sm font-medium text-gray-900 dark:text-gray-200"
            >
              Price cost
            </label>
            <input
              value={price_cost}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  price_cost: e.target.value,
                  price_revenue: getPercentage(e.target.value),
                }))
              }
              type="number"
              id="price_cost"
              name="price_cost"
              style={{
                appearance: "textfield",
                WebkitAppearance: "none",
                MozAppearance: "textfield",
              }}
              className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="price_revenue"
              className="block text-sm font-medium text-gray-900 dark:text-gray-200"
            >
              Price revenue
            </label>
            <input
              id="price_revenue"
              name="price_revenue"
              value={price_revenue}
              disabled
              className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="h-fit mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <h2>to: {to === "" ? "TBD" : to}</h2>
          <h2>from: {from === "" ? "TBD" : from}</h2>
          <h2>launch time: {launchtime.toISOString().slice(0, 16)}</h2>
          <h2>
            master passenger:{" "}
            {master_passenger === "" ? "TBD" : master_passenger}
          </h2>
          <h2>airship: {airship_name === "" ? "TBD" : airship_name}</h2>
          <h2>cost: {price_cost === "" ? "TBD" : price_cost}</h2>
          <h2>
            cost plus revenue: {price_revenue === 0 ? "TBD" : price_revenue}
          </h2>
        </div>
      );
    }
  };

  return <>{PhaseFields()}</>;
};

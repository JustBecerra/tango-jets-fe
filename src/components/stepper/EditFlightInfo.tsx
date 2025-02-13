import React from "react";
import type { Flight } from "../table/TableModal";

interface props {
  formData: Flight;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  phase: string;
}

export const EditFlightInfo = ({ formData, handleChange, phase }: props) => {
  const phaseFields = () => {
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
						value={formData.to}
						onChange={handleChange}
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
						value={formData.from}
						onChange={handleChange}
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
						value={formData.launchtime}
						onChange={handleChange}
						className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						required
					/>
				</div>
				<div>
					<label
						htmlFor="master_passenger"
						className="block text-sm font-medium text-gray-900 dark:text-gray-200"
					>
						Lead Passenger
					</label>
					<input
						type="text"
						id="master_passenger"
						name="master_passenger"
						value={formData.master_passenger}
						onChange={handleChange}
						className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
						required
					/>
				</div>
			</div>
		)
    } else if (phase === "second") {
      return (
        <div className="h-fit mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="airship_name"
              className="block text-sm font-medium text-gray-900 dark:text-gray-200"
            >
              Airship Name
            </label>
            <input
              type="text"
              id="airship_name"
              name="airship_name"
              value={formData.airship_name}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              required
            />
          </div>
          <div>
            <label
              htmlFor="price_cost"
              className="block text-sm font-medium text-gray-900 dark:text-gray-200"
            >
              Price cost
            </label>
            <input
              value={formData.price_cost}
              onChange={handleChange}
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
              Price with 20% commission
            </label>
            <input
              id="price_revenue"
              name="price_revenue"
              value={formData.price_revenue}
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
          <h2>to: {formData.to}</h2>
          <h2>from: {formData.from}</h2>
          <h2>launch time: {formData.launchtime.slice(0, 16)}</h2>
          <h2>lead passenger: {formData.master_passenger}</h2>
          <h2>airship: {formData.airship_name}</h2>
          <h2>cost: {formData.price_cost}</h2>
          <h2>cost plus revenue: {formData.price_revenue}</h2>
        </div>
      );
    }
  };
  return <>{phaseFields()}</>;
};

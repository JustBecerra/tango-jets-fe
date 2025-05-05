import React, { useState } from "react";
import { FaRegPlusSquare, FaRegMinusSquare } from "react-icons/fa";
import useStore from "../../store/store";
import CsvSelect from "../stepper/prueba";
import { AutoComplete } from "../input/AutoComplete";
import type { airshipFormType, formType } from "../scheduler/SchedulerFrame";
import type { Flight } from "../table/TableModal";
import { getCookie } from "../../utils/getCookie";
import { addFlight, getFlights } from "../../../lib/actions/flights/actions";
import LoaderSpinner from "../Loaders/LoaderSpinner";
import { StepperButtons } from "../buttons/StepperButtons";
import LocationSelector from "./LocationSelector";

interface props {
  phase: string;
  setPhase: React.Dispatch<React.SetStateAction<string>>;
  flightData?: Flight | null;
  flightID?: string | null;
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FlightInfo = ({
  phase,
  flightID,
  flightData,
  setShowToast,
  setPhase,
}: props) => {
  const { airships } = useStore((state) => state);
  const [distance, setDistance] = useState<number | null>(null);
  const [formData, setFormData] = useState<formType>({
    launchtime: new Date(),
    to: "",
    from: "",
    master_passenger: flightData ? flightData.master_passenger : "",
    type_of: flightID ? "connection" : "initial",
    associated_to: flightID ? flightID : "",
    first_longitude: "",
    first_latitude: "",
    second_longitude: "",
    second_latitude: "",
    flight_time: "00:00",
    pax: 0,
  });
  const [airshipData, setAirshipData] = useState<airshipFormType[]>([
    {
      airship_name: "",
      price_cost: 0,
      price_revenue: 0,
      percentage: 20,
      extra_price: 0,
    },
  ]);

  const [loading, setLoading] = useState(false);
  const { updateFlights } = useStore((state) => state);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const name = getCookie("username");
    const transformedFlightData = [
		{
			launchtime: formatLocalDateTime(formData.launchtime),
			arrivaltime: formatLocalDateTime(formData.launchtime),
			to: formData.to,
			from: formData.from,
			master_passenger: formData.master_passenger,
			createdby: name,
			type_of: formData.type_of,
			associated_to: formData.associated_to,
			first_longitude: formData.first_longitude,
			first_latitude: formData.first_latitude,
			second_longitude: formData.second_longitude,
			second_latitude: formData.second_latitude,
			flight_time: formData.flight_time,
		},
	]

    try {
      const newFlights = await addFlight(transformedFlightData);

      const flights = await getFlights();
      updateFlights(flights);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        window.location.href = "/Trips";
      }, 2000);
    } catch (err) {
      console.error("Error adding flight:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatLocalDateTime = (date: Date) => {
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 16);
  };

  const getPercentage = ({
    cost,
    newPercentage = "20",
  }: {
    cost: string;
    newPercentage?: string;
  }): { revenue: number; roundingDifference: number } => {
    if (cost === "") return { revenue: 0, roundingDifference: 0 };

    const percentage = parseFloat(newPercentage);
    const costNumber = parseFloat(cost);

    const revenue = costNumber * (percentage / 100);
    const roundedRevenue = Math.ceil(costNumber + revenue);
    const roundingDifference = roundedRevenue - (costNumber + revenue);

    return { revenue: roundedRevenue, roundingDifference };
  };
  const handleSelectFrom = (value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      from: value,
    }));
  };

  const handleSelectTo = (value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      to: value,
    }));
  };

  const handleDistanceCalculated = (calculatedDistance: number) => {
    setDistance(calculatedDistance);
  };

  const addAirshipOption = () => {
    setAirshipData((prev) => [
      ...prev,
      {
        airship_name: "",
        price_cost: 0,
        price_revenue: 0,
        percentage: 20,
        extra_price: 0,
      },
    ]);
  };

  const subtractAirshipOption = (airshipindex: number) => {
    const newAirshipData = airshipData.filter(
      (airship) => airship !== airshipData[airshipindex]
    );
    setAirshipData(newAirshipData);
  };

  const PhaseFields = () => {
    if (phase === "first") {
      return (
        <div className="w-full flex flex-col gap-6">
          <div className="w-full">
            <CsvSelect
              labelFrom="From"
              labelTo="To"
              onSelectFrom={handleSelectFrom}
              onSelectTo={handleSelectTo}
              onDistanceCalculated={handleDistanceCalculated}
              formData={formData}
              setFormData={setFormData}
            />
          </div>

          <div className="flex flex-col justify-start space-y-4 w-full">
            <div>
              <label
                htmlFor="launchtime"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Launch Time
              </label>
              <input
                type="datetime-local"
                id="launchtime"
                name="launchtime"
                value={formatLocalDateTime(formData.launchtime)}
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    launchtime: new Date(e.target.value),
                  }))
                }
                min={formatLocalDateTime(new Date())}
                className="block w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="master_passenger"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Lead Passenger
              </label>
              <div className="relative">
                <AutoComplete
                  value={formData.master_passenger}
                  setter={setFormData}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else if (phase === "second") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <h3 className="text-sm font-medium text-blue-800 mb-3">
                Flight Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">From:</span>
                  <span className="font-medium text-gray-800">
                    {formData.from || "Not selected"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">To:</span>
                  <span className="font-medium text-gray-800">
                    {formData.to || "Not selected"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Launch time:</span>
                  <span className="font-medium text-gray-800">
                    {new Date(formData.launchtime).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Flight time:</span>
                  <span className="font-medium text-gray-800">
                    {formData.flight_time}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lead passenger:</span>
                  <span className="font-medium text-gray-800">
                    {formData.master_passenger || "Not specified"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Aircraft Selection
              </h3>

              {airshipData.map((airship, index) => (
                <div
                  key={index}
                  className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Aircraft
                    </label>
                    {index > 0 && (
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => subtractAirshipOption(index)}
                      >
                        <FaRegMinusSquare className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <select
                    value={airship.airship_name}
                    onChange={(e) =>
                      setAirshipData((prevFormData) =>
                        prevFormData.map((item, idx) =>
                          index === idx
                            ? {
                                ...item,
                                airship_name: e.target.value,
                              }
                            : item
                        )
                      )
                    }
                    className="block w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 mb-3"
                  >
                    <option value="" disabled>
                      Select an aircraft
                    </option>
                    {airships.map((airship, idx) => (
                      <option value={airship.title} key={idx}>
                        {airship.title}
                      </option>
                    ))}
                  </select>

                  <div className="space-y-3">
                    <div>
                      <label
                        htmlFor="price_cost"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Price cost
                      </label>
                      <input
                        value={airship.price_cost}
                        onChange={(e) => {
                          const newCost = parseInt(e.target.value) || 0;
                          const { revenue, roundingDifference } = getPercentage(
                            {
                              cost: e.target.value,
                              newPercentage: airship.percentage.toString(),
                            }
                          );

                          const totalRevenue =
                            revenue + (airship.extra_price || 0);

                          setAirshipData((prevFormData) =>
                            prevFormData.map((item, idx) =>
                              index === idx
                                ? {
                                    ...item,
                                    price_cost: newCost,
                                    price_revenue: totalRevenue,
                                  }
                                : item
                            )
                          );
                        }}
                        type="number"
                        id="price_cost"
                        name="price_cost"
                        style={{
                          appearance: "textfield",
                          WebkitAppearance: "none",
                          MozAppearance: "textfield",
                        }}
                        className="block w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="price_revenue"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Price with{" "}
                        <input
                          value={airship.percentage}
                          type="number"
                          style={{
                            appearance: "textfield",
                            WebkitAppearance: "none",
                            MozAppearance: "textfield",
                            width: "20px",
                          }}
                          onChange={(e) => {
                            const newPercentage =
                              parseFloat(e.target.value) || 0;
                            const { revenue, roundingDifference } =
                              getPercentage({
                                cost: airship.price_cost.toString(),
                                newPercentage: e.target.value,
                              });

                            const totalRevenue =
                              revenue + (airship.extra_price || 0);

                            setAirshipData((prevFormData) =>
                              prevFormData.map((item, idx) =>
                                index === idx
                                  ? {
                                      ...item,
                                      percentage: newPercentage,
                                      price_revenue: totalRevenue,
                                    }
                                  : item
                              )
                            );
                          }}
                          placeholder="20%"
                          className="w-[4%][appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        % commission +{" "}
                        <input
                          value={
                            airship.extra_price === 0 ? "" : airship.extra_price
                          }
                          type="number"
                          style={{
                            appearance: "textfield",
                            WebkitAppearance: "none",
                            MozAppearance: "textfield",
                            width: "35px",
                          }}
                          onChange={(e) => {
                            const newExtraPrice =
                              parseFloat(e.target.value) || 0;
                            const { revenue, roundingDifference } =
                              getPercentage({
                                cost: airship.price_cost.toString(),
                                newPercentage: airship.percentage.toString(),
                              });

                            const totalRevenue = revenue + newExtraPrice;

                            setAirshipData((prevFormData) =>
                              prevFormData.map((item, idx) =>
                                index === idx
                                  ? {
                                      ...item,
                                      extra_price: newExtraPrice,
                                      price_revenue: totalRevenue,
                                    }
                                  : item
                              )
                            );
                          }}
                          placeholder="Extra"
                          className="w-[4%][appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </label>

                      <input
                        id="price_revenue"
                        name="price_revenue"
                        value={airship.price_revenue}
                        onChange={(e) =>
                          setAirshipData((prevFormData) =>
                            prevFormData.map((item, idx) =>
                              index === idx
                                ? {
                                    ...item,
                                    price_revenue:
                                      parseInt(e.target.value) || 0,
                                  }
                                : item
                            )
                          )
                        }
                        className="block w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Rounding:{" "}
                        {getPercentage({
                          cost: airship.price_cost.toString(),
                          newPercentage: airship.percentage.toString(),
                        }).roundingDifference.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                onClick={addAirshipOption}
              >
                <FaRegPlusSquare className="w-4 h-4 mr-1" />
                Add Aircraft Option
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex justify-center">
          <div className="bg-white rounded-lg border border-gray-200 p-4 col-span-2 mx-auto w-fit">
            <h3 className="text-lg font-medium text-gray-700 mb-3">
              Flight Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-600">From:</span>
                <span className="font-medium">{formData.from || "TBD"}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-600">To:</span>
                <span className="font-medium">{formData.to || "TBD"}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-600">Launch Time:</span>
                <span className="font-medium">
                  {formData.launchtime.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-600">Distance:</span>
                <span className="font-medium">
                  {distance !== null ? `${distance} km` : "TBD"}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-600">Flight Time:</span>
                <span className="font-medium">
                  {formData.flight_time || "TBD"}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-600">Lead Passenger:</span>
                <span className="font-medium">
                  {formData.master_passenger || "TBD"}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-lg overflow-auto max-h-[85vh] p-4 w-full min-h-[60vh] max-w-[1400px] mx-auto">
        {PhaseFields()}
      </div>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="p-6 rounded-2xl">
            <LoaderSpinner />
          </div>
        </div>
      )}
      <StepperButtons phase={phase} setPhase={setPhase} operation="add" />
    </form>
  );
};

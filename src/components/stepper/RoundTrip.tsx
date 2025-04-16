import React, { useState } from "react";
import { FaRegPlusSquare, FaRegMinusSquare } from "react-icons/fa";
import useStore from "../../store/store";
import CsvSelect from "../stepper/prueba";
import { AutoComplete } from "../input/AutoComplete";
import type { airshipFormType, formType } from "../scheduler/SchedulerFrame";
import type { Flight } from "../table/TableModal";
import StarRanking from "./StarsRank";
import LocationSelector from "./LocationSelector";
import { addFlight, getFlights } from "../../../lib/actions/flights/actions";
import { getCookie } from "../../utils/getCookie";
import LoaderSpinner from "../Loaders/LoaderSpinner";
import { StepperButtons } from "../buttons/StepperButtons";

interface props {
  phase: string;
  setPhase: React.Dispatch<React.SetStateAction<string>>;
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RoundTrip = ({ phase, setPhase, setShowToast }: props) => {
  const { airships } = useStore((state) => state);
  const [distance, setDistance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<formType[]>([
    {
      launchtime: new Date(),
      to: "",
      from: "",
      master_passenger: "",
      type_of: "initial",
      associated_to: "",
      first_longitude: "",
      first_latitude: "",
      second_longitude: "",
      second_latitude: "",
      flight_time: "00:00",
      pax: 0,
    },
    {
      launchtime: new Date(),
      to: "",
      from: "",
      master_passenger: "",
      type_of: "connection",
      associated_to: "",
      first_longitude: "",
      first_latitude: "",
      second_longitude: "",
      second_latitude: "",
      flight_time: "00:00",
      pax: 0,
    },
  ]);
  const [airshipData, setAirshipData] = useState<airshipFormType[]>([
    {
      airship_name: "",
      price_cost: 0,
      price_revenue: 0,
      percentage: 20,
      extra_price: 0,
    },
  ]);
  const { updateFlights } = useStore((state) => state);
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const name = getCookie("username");
    const transformedFlightData = formData.map((elem) => ({
      launchtime: elem.launchtime.toISOString().slice(0, 16),
      to: elem.to,
      from: elem.from,
      master_passenger: elem.master_passenger,
      createdby: name,
      type_of: elem.type_of,
      associated_to: elem.associated_to,
      first_longitude: elem.first_longitude,
      first_latitude: elem.first_latitude,
      second_longitude: elem.second_longitude,
      second_latitude: elem.second_latitude,
      flight_time: elem.flight_time,
    }));

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
  const handleSelectFrom = ({
    value,
    index,
  }: {
    value: string;
    index: number;
  }) => {
    if (index !== 999) {
      setFormData((prevFormData) => {
        const updatedFormData = [...prevFormData];
        updatedFormData[index] = {
          ...updatedFormData[index],
          from: value,
        };
        return updatedFormData;
      });
    }
  };

  const handleSelectTo = ({
    value,
    index,
  }: {
    value: string;
    index: number;
  }) => {
    if (index !== 999) {
      setFormData((prevFormData) => {
        const updatedFormData = [...prevFormData];
        updatedFormData[index] = {
          ...updatedFormData[index],
          to: value,
        };
        return updatedFormData;
      });
    }
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
        <div className="w-full overflow-y-auto max-h-[60vh] pr-1">
          {formData.map((elem, index) => (
            <div
              key={index}
              className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 border-b border-gray-200 pb-6 mb-6 relative"
            >
              <div className="absolute top-0 left-0 inline-flex items-center px-2.5 py-0.5 bg-blue-600 text-white text-xs font-medium rounded-full">
                {index === 0 ? "Depart" : "Return"}
              </div>

              <div className="mt-6">
                <LocationSelector
                  labelFrom="From"
                  labelTo="To"
                  onSelectFrom={handleSelectFrom}
                  onSelectTo={handleSelectTo}
                  onDistanceCalculated={handleDistanceCalculated}
                  formData={elem}
                  setFormData={setFormData}
                  formDataIndex={index}
                />
              </div>

              <div className="flex flex-col justify-start space-y-4 mt-6">
                <div>
                  <label
                    htmlFor={`launchtime-${index}`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Launch Time
                  </label>
                  <input
                    type="datetime-local"
                    id={`launchtime-${index}`}
                    name={`launchtime-${index}`}
                    value={elem.launchtime.toISOString().slice(0, 16)}
                    onChange={(e) =>
                      setFormData((prevFormData) => {
                        const updatedFormData = [...prevFormData];
                        updatedFormData[index] = {
                          ...updatedFormData[index],
                          launchtime: new Date(e.target.value),
                        };
                        return updatedFormData;
                      })
                    }
                    min={new Date().toISOString().slice(0, 16)}
                    className="block w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor={`master_passenger-${index}`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Lead Passenger
                  </label>
                  <div className="relative">
                    <AutoComplete
                      value={elem.master_passenger}
                      setter={setFormData}
                      formDataIndex={index}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    } else if (phase === "second") {
      return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto pr-1">
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <h3 className="text-sm font-medium text-blue-800 mb-3">
                Round Trip Details
              </h3>
              {formData.map((elem, index) => (
                <div
                  key={index}
                  className="mb-4 pb-3 border-b border-blue-100 last:border-b-0 last:mb-0 last:pb-0"
                >
                  <h4 className="font-medium text-sm text-blue-700 mb-2">
                    {index === 0 ? "Depart Flight" : "Return Flight"}
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">From:</span>
                      <span className="font-medium text-gray-800">
                        {elem.from || "Not selected"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">To:</span>
                      <span className="font-medium text-gray-800">
                        {elem.to || "Not selected"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Launch time:</span>
                      <span className="font-medium text-gray-800">
                        {new Date(elem.launchtime).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Flight time:</span>
                      <span className="font-medium text-gray-800">
                        {elem.flight_time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
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
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto pr-1">
          {formData.map((elem, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 p-4"
            >
              <h3 className="text-lg font-medium text-gray-700 mb-3">
                {index === 0 ? "Depart Flight" : "Return Flight"}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">From:</span>
                  <span className="font-medium">{elem.from || "TBD"}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">To:</span>
                  <span className="font-medium">{elem.to || "TBD"}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Launch Time:</span>
                  <span className="font-medium">
                    {new Date(elem.launchtime).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Flight Time:</span>
                  <span className="font-medium">
                    {elem.flight_time || "TBD"}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Lead Passenger:</span>
                  <span className="font-medium">
                    {elem.master_passenger || "TBD"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-lg">{PhaseFields()}</div>
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

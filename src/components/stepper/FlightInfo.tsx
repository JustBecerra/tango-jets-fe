import React, { useState } from "react";
import { FaRegPlusSquare, FaRegMinusSquare } from "react-icons/fa";
import useStore from "../../store/store";
import CsvSelect from "../stepper/prueba";
import { AutoComplete } from "../input/AutoComplete";
import type { airshipFormType, formType } from "../scheduler/SchedulerFrame";
import type { Flight } from "../table/TableModal";

interface props {
  phase: string;
  formData: formType;
  setFormData: React.Dispatch<React.SetStateAction<formType>>;
  airshipData: airshipFormType[];
  setAirshipData: React.Dispatch<React.SetStateAction<airshipFormType[]>>;
}

export const FlightInfo = ({
  phase,
  formData,
  setFormData,
  airshipData,
  setAirshipData,
}: props) => {
  const { to, from, launchtime, master_passenger, flight_time } = formData;
  const { airships } = useStore((state) => state);
  const [distance, setDistance] = useState<number | null>(null);
  const [flightTime, setFlightTime] = useState<number | null>(null);

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

  const handleFlightTimeCalculated = (calculatedFlightTime: number) => {
    setFlightTime(calculatedFlightTime);
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
        <div className="h-[300px] w-[800px] grid grid-auto-rows grid-cols-1 gap-6 sm:grid-cols-2">
          <CsvSelect
            labelFrom="From"
            labelTo="To"
            onSelectFrom={handleSelectFrom}
            onSelectTo={handleSelectTo}
            onDistanceCalculated={handleDistanceCalculated}
            onFlightTimeCalculated={handleFlightTimeCalculated}
            formData={formData}
            setFormData={setFormData}
          />
          <div className="flex flex-col justify-end h-fit">
            <label htmlFor="launchtime" className="block text-sm font-medium">
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
              className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="flex flex-col justify-end h-fit">
            <label
              htmlFor="master_passenger"
              className="block text-sm font-medium"
            >
              Lead Passenger
            </label>
            <AutoComplete value={master_passenger} setter={setFormData} />
          </div>
        </div>
      );
    } else if (phase === "second") {
      return (
        <div className="h-[280px] w-[800px] mb-6 grid grid-cols-1 gap-12 sm:grid-cols-2 overflow-y-auto">
          {airshipData.map((airship, airshipindex) => {
            const { revenue, roundingDifference } = getPercentage({
              cost: airship.price_cost.toString(),
              newPercentage: airship.percentage.toString(),
            });
            const totalRevenue = revenue + airship.extra_price;
            return (
              <>
                <div
                  className="flex flex-col justify-center items-start "
                  key={airshipindex}
                >
                  <label
                    htmlFor="airship_title"
                    className="block text-sm font-medium"
                  >
                    Airship Name
                  </label>
                  <select
                    onChange={(e) =>
                      setAirshipData((prevFormData) =>
                        prevFormData.map((item, index) =>
                          airshipindex === index
                            ? {
                                ...item,
                                airship_name: e.target.value,
                              }
                            : item
                        )
                      )
                    }
                    value={airship.airship_name}
                    className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  >
                    <option value="" disabled>
                      Select an airship
                    </option>
                    {airships.map((airship, index) => (
                      <option value={airship.title} key={index}>
                        {airship.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col justify-center items-start ">
                  <label
                    htmlFor="price_cost"
                    className="block text-sm font-medium"
                  >
                    Price cost
                  </label>
                  <input
                    value={airship.price_cost}
                    onChange={(e) => {
                      const newCost = parseInt(e.target.value) || 0;
                      const { revenue, roundingDifference } = getPercentage({
                        cost: e.target.value,
                        newPercentage: airship.percentage.toString(),
                      });

                      // Calcular totalRevenue incluyendo el extra_price
                      const totalRevenue = revenue + (airship.extra_price || 0);

                      setAirshipData((prevFormData) =>
                        prevFormData.map((item, index) =>
                          index === airshipindex
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
                    className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex flex-col justify-center items-start ">
                  <label
                    htmlFor="price_revenue"
                    className="block text-sm font-medium"
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
                        const newPercentage = parseFloat(e.target.value) || 0;
                        const { revenue, roundingDifference } = getPercentage({
                          cost: airship.price_cost.toString(),
                          newPercentage: e.target.value,
                        });

                        // Calcular totalRevenue incluyendo el extra_price
                        const totalRevenue =
                          revenue + (airship.extra_price || 0);

                        setAirshipData((prevFormData) =>
                          prevFormData.map((item, index) =>
                            index === airshipindex
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
                        const newExtraPrice = parseFloat(e.target.value) || 0;
                        const { revenue, roundingDifference } = getPercentage({
                          cost: airship.price_cost.toString(),
                          newPercentage: airship.percentage.toString(),
                        });

                        // Calcular totalRevenue con el nuevo extra_price
                        const totalRevenue = revenue + newExtraPrice;

                        setAirshipData((prevFormData) =>
                          prevFormData.map((item, index) =>
                            index === airshipindex
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
                    value={totalRevenue}
                    onChange={(e) =>
                      setAirshipData((prevFormData) =>
                        prevFormData.map((item, index) =>
                          index === airshipindex
                            ? {
                                ...item,
                                price_revenue: parseInt(e.target.value) || 0,
                              }
                            : item
                        )
                      )
                    }
                    className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <p className="text-sm text-gray-500">
                    Rounding: {roundingDifference.toFixed(2)}
                  </p>
                </div>
                {airshipData.length > 0 &&
                airshipData.length !== airshipindex + 1 ? (
                  <div className="flex items-center">
                    <FaRegMinusSquare
                      onClick={() => subtractAirshipOption(airshipindex)}
                      className="mx-auto cursor-pointer h-10 w-10 text-gray-300"
                    />
                  </div>
                ) : (
                  <div className="flex items-center">
                    <FaRegPlusSquare
                      onClick={addAirshipOption}
                      className="mx-auto cursor-pointer h-10 w-10 text-gray-300"
                    />
                  </div>
                )}
              </>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="h-[280px] w-[800px] mb-6 grid grid-cols-1 gap-12 sm:grid-cols-2 overflow-y-auto">
          <h2>To: {to === "" ? "TBD" : to}</h2>
          <h2>From: {from === "" ? "TBD" : from}</h2>
          <h2>Launch Time: {launchtime.toISOString().slice(0, 16)}</h2>
          <h2>
            Distance: {distance !== null ? `${distance.toFixed(2)} km` : "TBD"}
          </h2>
          <h2>
            Flight Time: {flight_time !== null ? `${flight_time} hours` : "TBD"}
          </h2>
          <h2>
            Lead Passenger: {master_passenger === "" ? "TBD" : master_passenger}
          </h2>
        </div>
      );
    }
  };
  return <div className="py-2">{PhaseFields()}</div>;
};

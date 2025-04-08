import React, { useState } from "react";
import { FaRegPlusSquare, FaRegMinusSquare } from "react-icons/fa";
import useStore from "../../store/store";
import { AutoComplete } from "../input/AutoComplete";
import type { airshipFormType, formType } from "../scheduler/SchedulerFrame";
import type { Flight } from "../table/TableModal";
import LocationSelector from "./LocationSelector";
import { getCookie } from "../../utils/getCookie";
import { addFlight, getFlights } from "../../../lib/actions/flights/actions";
import LoaderSpinner from "../Loaders/LoaderSpinner";

interface props {
  phase: string;
  setPhase: React.Dispatch<React.SetStateAction<string>>;
  flightData: Flight | null;
  flightID: string | null;
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MultiCity = ({
  phase,
  setPhase,
  flightID,
  flightData,
  setShowToast,
}: props) => {
	const { airships } = useStore((state) => state)
	const [distance, setDistance] = useState<number | null>(null)
	const [loading, setLoading] = useState(false)
	const [formData, setFormData] = useState<formType[]>([
		{
			launchtime: new Date(),
			to: "",
			from: "",
			master_passenger:
				flightData !== null ? flightData.master_passenger : "",
			type_of: "initial",
			associated_to: flightID ? flightID : "",
			first_longitude: "",
			first_latitude: "",
			second_longitude: "",
			second_latitude: "",
			flight_time: "00:00",
			pax: 0
		},
		{
			launchtime: new Date(),
			to: "",
			from: "",
			master_passenger:
				flightData !== null ? flightData.master_passenger : "",
			type_of: "connection",
			associated_to: flightID ? flightID : "",
			first_longitude: "",
			first_latitude: "",
			second_longitude: "",
			second_latitude: "",
			flight_time: "00:00",
			pax: 0
		},
		{
			launchtime: new Date(),
			to: "",
			from: "",
			master_passenger:
				flightData !== null ? flightData.master_passenger : "",
			type_of: "connection",
			associated_to: flightID ? flightID : "",
			first_longitude: "",
			first_latitude: "",
			second_longitude: "",
			second_latitude: "",
			flight_time: "00:00",
			pax: 0
		},
	])
	const [airshipData, setAirshipData] = useState<airshipFormType[]>([
		{
			airship_name: "",
			price_cost: 0,
			price_revenue: 0,
			percentage: 20,
			extra_price: 0,
		},
	])

	const { updateFlights } = useStore((state) => state)

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		setLoading(true)

		const name = getCookie("username")
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
		}))

		try {
			const newFlights = await addFlight(transformedFlightData)

			const flights = await getFlights()
			updateFlights(flights)
			setShowToast(true)
			setTimeout(() => {
				setShowToast(false)
				window.location.href = "/Trips"
			}, 2000)
		} catch (err) {
			console.error("Error adding flight:", err)
		} finally {
			setLoading(false)
		}
	}

	const getPercentage = ({
		cost,
		newPercentage = "20",
	}: {
		cost: string
		newPercentage?: string
	}): { revenue: number; roundingDifference: number } => {
		if (cost === "") return { revenue: 0, roundingDifference: 0 }

    const percentage = parseFloat(newPercentage);
    const costNumber = parseFloat(cost);

    const revenue = costNumber * (percentage / 100);
    const roundedRevenue = Math.ceil(costNumber + revenue);
    const roundingDifference = roundedRevenue - (costNumber + revenue);

    return { revenue: roundedRevenue, roundingDifference };
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
        <div className="w-[800px] h-[350px] flex flex-col gap-y-16 mb-6 overflow-y-auto">
          {formData.map((elem, index) => (
            <div
              key={index}
              className="h-[300px] w-[800px] grid grid-auto-rows grid-cols-1 gap-6 sm:grid-cols-2 border-solid border-b-4 border-gray-400 pb-8"
            >
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
              <div className="flex flex-col justify-end h-fit">
                <label
                  htmlFor="launchtime"
                  className="block text-sm font-medium"
                >
                  Launch Time
                </label>
                <input
                  type="datetime-local"
                  id="launchtime"
                  name="launchtime"
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
                <AutoComplete
                  value={elem.master_passenger}
                  setter={setFormData}
                  formDataIndex={index}
                />
              </div>
              <div className="flex flex-col justify-end h-fit">
                <label
                  htmlFor={`cant_pax_${index}`}
                  className="block text-sm font-medium"
                >
                  Number of Passengers
                </label>
                <input
                  type="number"
                  id={`cant_pax_${index}`}
                  name="cant_pax"
                  value={elem.pax || 0} // Asegúrate de que el campo exista
                  onChange={(e) =>
                    setFormData((prevFormData) => {
                      const updatedFormData = [...prevFormData];
                      updatedFormData[index] = {
                        ...updatedFormData[index],
                        pax: parseInt(e.target.value) || 0, // Actualiza el valor de pax
                      };
                      return updatedFormData;
                    })
                  }
                  className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {index === formData.length - 1 && (
                <div className="flex h-full w-full justify-center items-end">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prevFormData: formType[]) => {
                        const updatedFormData = [...prevFormData];
                        updatedFormData.push({
                          launchtime: new Date(),
                          to: "",
                          from: "",
                          master_passenger:
                            flightData !== null
                              ? flightData.master_passenger
                              : "",
                          type_of: flightID ? "connection" : "initial",
                          associated_to: flightID ? flightID : "",
                          first_longitude: "",
                          first_latitude: "",
                          second_longitude: "",
                          second_latitude: "",
                          flight_time: "00:00",
                          pax: 0,
                        });
                        return updatedFormData;
                      })
                    }
                    className="w-[200px] h-[40px] text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                  >
                    Add trip
                  </button>
                </div>
              )}
            </div>
          ))}
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
          {formData.map((elem) => (
            <div>
              <h2>To: {elem.to === "" ? "TBD" : elem.to}</h2>
              <h2>From: {elem.from === "" ? "TBD" : elem.from}</h2>
              <h2>Launch Time: {elem.launchtime.toISOString().slice(0, 16)}</h2>
              <h2>
                Distance:{" "}
                {distance !== null ? `${distance.toFixed(2)} km` : "TBD"}
              </h2>
              <h2>
                Flight Time:{" "}
                {elem.flight_time !== null
                  ? `${elem.flight_time} hours`
                  : "TBD"}
              </h2>
              <h2>
                Lead Passenger:{" "}
                {elem.master_passenger === "" ? "TBD" : elem.master_passenger}
              </h2>
            </div>
          ))}
        </div>
      );
    }
  };
  return <form onSubmit={handleSubmit} className="space-y-6">
  <div className="rounded-xl">{PhaseFields()}</div>
  {loading && (
	  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
		  <div className="p-6 rounded-2xl">
			  <LoaderSpinner />
		  </div>
	  </div>
  )}
</form>;
};

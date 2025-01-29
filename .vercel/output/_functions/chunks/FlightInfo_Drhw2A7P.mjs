import hash from 'hash.js';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { u as useStore } from './actions_MIoFgvcc.mjs';
import { FaRegPlusSquare } from 'react-icons/fa';

const flightScheduledMessage = ({
  transformedFlightData,
  airshipData,
  airships,
  tripID
}) => {
  const { launchtime, to, from, createdby, master_passenger } = transformedFlightData;
  const AirshipIDs = airshipData.map((jet) => {
    const getAirshipID = airships.find(
      (ship) => ship.title === jet.airship_name
    )?.id;
    return `${getAirshipID}/${jet.price_revenue.toString()}/`;
  }).join("");
  const fullURL = `https://tango-jets-fe.vercel.app/Invoice/${tripID}/${AirshipIDs}`;
  const hashedURL = hash.sha256().update(fullURL).digest("hex");
  return `Dear ${master_passenger},

	We’re pleased to inform you that your flight has been successfully pre-scheduled. Below are the details:

    Departure: ${launchtime}

    Departure Airport: ${from}

    Arrival Airport: ${to}

	Please ensure you arrive at the airport at least one hour before departure for check-in.

	Here is the link to the quote: ${hashedURL}

	if you have any questions or need assistance, feel free to contact us.

	Thank you for choosing Tango Jets.

	Best regards,
	${createdby}
`;
};

const ModalStepper = ({ phase }) => {
  return /* @__PURE__ */ jsx("div", { className: "p-2 rounded mb-8 mt-4", children: /* @__PURE__ */ jsxs("ol", { className: "flex items-center w-full text-sm font-medium text-center sm:text-base ", children: [
    /* @__PURE__ */ jsx(
      "li",
      {
        className: `flex md:w-full items-center text-blue-600 
				 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10`,
        children: /* @__PURE__ */ jsxs("span", { className: "flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200", children: [
          phase !== "first" && /* @__PURE__ */ jsx(
            "svg",
            {
              className: "w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5",
              "aria-hidden": "true",
              xmlns: "http://www.w3.org/2000/svg",
              fill: "currentColor",
              viewBox: "0 0 20 20",
              children: /* @__PURE__ */ jsx("path", { d: "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" })
            }
          ),
          "Flight",
          /* @__PURE__ */ jsx("span", { className: "hidden sm:inline-flex sm:ms-2", children: "Info" })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      "li",
      {
        className: `flex md:w-full items-center ${phase !== "first" && "text-blue-600"} sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10`,
        children: /* @__PURE__ */ jsxs("span", { className: "flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200", children: [
          phase === "third" && /* @__PURE__ */ jsx(
            "svg",
            {
              className: "w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5",
              "aria-hidden": "true",
              xmlns: "http://www.w3.org/2000/svg",
              fill: "currentColor",
              viewBox: "0 0 20 20",
              children: /* @__PURE__ */ jsx("path", { d: "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" })
            }
          ),
          "Quote"
        ] })
      }
    ),
    /* @__PURE__ */ jsx("li", { className: "flex items-center", children: /* @__PURE__ */ jsx(
      "span",
      {
        className: `flex items-center ${phase === "third" && "text-blue-600"} after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 `,
        children: "Confirmation"
      }
    ) })
  ] }) });
};

const StepperButtons = ({ phase, setPhase, operation }) => {
  const PhaseDecider = () => {
    if (phase === "first") {
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600",
            onClick: (e) => {
              e.preventDefault();
              window.location.href = "Trips";
            },
            children: "Back"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800",
            onClick: (e) => {
              e.preventDefault();
              setPhase("second");
            },
            children: "Next Phase"
          }
        )
      ] });
    } else if (phase === "second") {
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600",
            onClick: (e) => {
              e.preventDefault();
              setPhase("first");
            },
            children: "Back"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800",
            onClick: (e) => {
              e.preventDefault();
              setPhase("third");
            },
            children: "Next Phase"
          }
        )
      ] });
    } else if (phase === "third" && operation === "add") {
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600",
            onClick: (e) => {
              e.preventDefault();
              setPhase("second");
            },
            children: "Back"
          }
        ),
        /* @__PURE__ */ jsx("p", { children: "This will send an email to the master passenger" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800",
            children: "Add Flight"
          }
        )
      ] });
    } else if (phase === "third" && operation === "edit") {
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600",
            onClick: (e) => {
              e.preventDefault();
              setPhase("second");
            },
            children: "Back"
          }
        ),
        /* @__PURE__ */ jsx("p", { children: "This will send an email to the master passenger" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800",
            children: "Edit Flight"
          }
        )
      ] });
    }
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `flex  ${phase === "third" ? "justify-between w-full" : "justify-start"} items-center py-6 space-x-2 border-t border-gray-600 rounded-b`,
      children: PhaseDecider()
    }
  );
};

const AutoComplete = ({ value, setter }) => {
  const { clients } = useStore((state) => state);
  const [listClients, setListClients] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(false);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        id: "master_passenger",
        name: "master_passenger",
        value,
        onChange: (e) => {
          setter((prevFormData) => ({
            ...prevFormData,
            master_passenger: e.target.value
          }));
          if (e.target.value.length > 0) setOpenDropdown(true);
          const newList = clients.filter(
            (client) => client.fullname.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
          );
          setListClients(newList);
        },
        className: "block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500",
        required: true
      }
    ),
    openDropdown && /* @__PURE__ */ jsx("ul", { className: "h-[100px] w-[370px] overflow-y-auto border-white border-2 rounded ml-2 bg-white absolute scrollbar-hide ", children: listClients.map((client, index) => /* @__PURE__ */ jsx(
      "li",
      {
        className: "cursor-pointer text-black border-b-2 border-[#166ba3] pl-2 hover:bg-blue-100",
        onClick: () => {
          setter((prevFormData) => ({
            ...prevFormData,
            master_passenger: client.fullname
          }));
          setOpenDropdown(false);
        },
        children: client.fullname
      },
      index
    )) })
  ] });
};

const FlightInfo = ({
  phase,
  formData,
  setFormData,
  airshipData,
  setAirshipData
}) => {
  const { to, from, launchtime, master_passenger } = formData;
  const { airships } = useStore((state) => state);
  const getPercentage = (cost) => {
    if (cost === "") return 0;
    const percentage = 20;
    const costNumber = parseFloat(cost);
    const revenue = costNumber * (percentage / 100);
    return costNumber + revenue;
  };
  const addAirshipOption = () => {
    setAirshipData((prev) => [
      ...prev,
      {
        airship_name: "",
        price_cost: 0,
        price_revenue: 0
      }
    ]);
  };
  const PhaseFields = () => {
    if (phase === "first") {
      return /* @__PURE__ */ jsxs("div", { className: "h-[200px] w-[800px] mb-6 grid grid-cols-1 gap-12 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "to",
              className: "block text-sm font-medium",
              children: "To"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "to",
              name: "to",
              value: to,
              onChange: (e) => setFormData((prevFormData) => ({
                ...prevFormData,
                to: e.target.value
              })),
              className: "block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "from",
              className: "block text-sm font-medium",
              children: "From"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "from",
              name: "from",
              value: from,
              onChange: (e) => setFormData((prevFormData) => ({
                ...prevFormData,
                from: e.target.value
              })),
              className: "block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "launchtime",
              className: "block text-sm font-medium",
              children: "Launch Time"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "datetime-local",
              id: "launchtime",
              name: "launchtime",
              value: launchtime.toISOString().slice(0, 16),
              onChange: (e) => setFormData((prevFormData) => ({
                ...prevFormData,
                launchtime: new Date(e.target.value)
              })),
              min: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16),
              className: "block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "master_passenger",
              className: "block text-sm font-medium",
              children: "Master Passenger"
            }
          ),
          /* @__PURE__ */ jsx(
            AutoComplete,
            {
              value: master_passenger,
              setter: setFormData
            }
          )
        ] })
      ] });
    } else if (phase === "second") {
      return /* @__PURE__ */ jsx("div", { className: "h-[200px] w-[800px] mb-6 grid grid-cols-1 gap-12 sm:grid-cols-2 overflow-y-auto", children: airshipData.map((airship, index) => /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "airship_title",
              className: "block text-sm font-medium",
              children: "Airship Name"
            }
          ),
          /* @__PURE__ */ jsxs(
            "select",
            {
              onChange: (e) => setAirshipData(
                (prevFormData) => prevFormData.map(
                  (item, index2) => index2 === prevFormData.length - 1 ? {
                    ...item,
                    airship_name: e.target.value
                  } : item
                )
              ),
              value: airship.airship_name,
              className: "block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
              children: [
                /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: "Select an airship" }),
                airships.map((airship2, index2) => /* @__PURE__ */ jsx(
                  "option",
                  {
                    value: airship2.title,
                    children: airship2.title
                  },
                  index2
                ))
              ]
            }
          )
        ] }, index),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "price_cost",
              className: "block text-sm font-medium",
              children: "Price cost"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              value: airship.price_cost,
              onChange: (e) => setAirshipData(
                (prevFormData) => prevFormData.map(
                  (item, index2) => index2 === prevFormData.length - 1 ? {
                    ...item,
                    price_cost: parseInt(
                      e.target.value
                    ),
                    price_revenue: getPercentage(
                      e.target.value
                    )
                  } : item
                )
              ),
              type: "number",
              id: "price_cost",
              name: "price_cost",
              style: {
                appearance: "textfield",
                WebkitAppearance: "none",
                MozAppearance: "textfield"
              },
              className: "block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "price_revenue",
              className: "block text-sm font-medium",
              children: "Price revenue"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "price_revenue",
              name: "price_revenue",
              value: airship.price_revenue,
              disabled: true,
              className: "block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx(
          FaRegPlusSquare,
          {
            onClick: addAirshipOption,
            className: "mx-auto cursor-pointer h-10 w-10 text-gray-300"
          }
        ) })
      ] })) });
    } else {
      return /* @__PURE__ */ jsxs("div", { className: "h-[200px] w-[800px] mb-6 grid grid-cols-1 gap-12 sm:grid-cols-2 overflow-y-auto", children: [
        /* @__PURE__ */ jsxs("h2", { children: [
          "To: ",
          to === "" ? "TBD" : to
        ] }),
        /* @__PURE__ */ jsxs("h2", { children: [
          "From: ",
          from === "" ? "TBD" : from
        ] }),
        /* @__PURE__ */ jsxs("h2", { children: [
          "Launch Time: ",
          launchtime.toISOString().slice(0, 16)
        ] }),
        /* @__PURE__ */ jsxs("h2", { children: [
          "Master Passenger:",
          " ",
          master_passenger === "" ? "TBD" : master_passenger
        ] })
      ] });
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "border-t border-gray-600 py-2", children: PhaseFields() });
};

export { FlightInfo as F, ModalStepper as M, StepperButtons as S, flightScheduledMessage as f };

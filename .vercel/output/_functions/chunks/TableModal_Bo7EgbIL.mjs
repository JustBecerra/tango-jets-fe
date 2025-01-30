import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { Modal, Button, Toast } from 'flowbite-react';
import { HiOutlineExclamationCircle, HiCheck } from 'react-icons/hi';
import { L as LoaderSpinner } from './LoaderSpinner_ALWPhgDz.mjs';
import { u as useStore, g as getFlights, a as addFlight } from './actions_Cnex7xBx.mjs';
import { a as getClients, g as getAirships, b as addClient, c as addAirship } from './actions_jxI1Zvsl.mjs';
import { g as getCookie } from './getCookie_2p--uMcu.mjs';
import { M as ModalStepper, F as FlightInfo, S as StepperButtons, f as flightScheduledMessage } from './FlightInfo_Bg_i2D0Q.mjs';
import { z } from 'zod';

async function deleteAction({ caseType, id }) {
  try {
    const response = await fetch(
      `${"https://vuelos-be.onrender.com"}/${caseType}/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response;
  } catch (err) {
    console.error("Error deleting element:", err);
    throw err;
  }
}

const Delete = ({ id, caseType, setData }) => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { updateFlights, updateAirships, updateClients } = useStore(
    (state) => state
  );
  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteAction({ caseType, id });
      if (caseType === "flight") {
        const newFlights = await getFlights();
        setData(
          newFlights.map((flight) => {
            const { updatedAt, ...rest } = flight;
            return rest;
          }).filter((flight) => {
            const launchTime = new Date(flight.launchtime);
            const currentTime = /* @__PURE__ */ new Date();
            return currentTime < launchTime;
          })
        );
        updateFlights(newFlights);
      } else if (caseType === "client") {
        const newClients = await getClients();
        setData(newClients);
        updateClients(newClients);
      } else if (caseType === "airship") {
        const newAirships = await getAirships();
        setData(newAirships);
        updateAirships(newAirships);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      setOpenModal(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "bg-transparent p-2 ml-2",
        onClick: (e) => {
          e.stopPropagation();
          setOpenModal(true);
        },
        children: /* @__PURE__ */ jsx(
          "svg",
          {
            className: "w-6 h-6 text-red-500",
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "2",
                d: "M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
              }
            )
          }
        )
      }
    ),
    /* @__PURE__ */ jsxs(
      Modal,
      {
        show: openModal,
        size: "md",
        onClose: () => setOpenModal(false),
        popup: true,
        children: [
          /* @__PURE__ */ jsx(Modal.Header, {}),
          /* @__PURE__ */ jsx(Modal.Body, { children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx(HiOutlineExclamationCircle, { className: "mx-auto mb-4 h-14 w-14 text-gray-900" }),
            /* @__PURE__ */ jsxs("h3", { className: "mb-5 text-lg font-normal text-gray-900", children: [
              "Are you sure you want to delete this id ",
              id,
              "?"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-4", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  className: "bg-red-600",
                  onClick: handleDelete,
                  children: "Yes, I'm sure"
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  color: "gray",
                  onClick: () => setOpenModal(false),
                  children: "No, cancel"
                }
              )
            ] })
          ] }) })
        ]
      }
    ),
    loading && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50", children: /* @__PURE__ */ jsx(LoaderSpinner, {}) })
  ] });
};

const ModalFlightAdd = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState("first");
  const [formData, setFormData] = useState({
    launchtime: /* @__PURE__ */ new Date(),
    to: "",
    from: "",
    price_cost: "",
    price_revenue: 0,
    airship_name: "",
    master_passenger: "",
    companion_passengers: []
  });
  const handleToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const {
      launchtime,
      to,
      from,
      price_cost,
      price_revenue,
      airship_name,
      master_passenger
    } = formData;
    const name = getCookie("username");
    const transformedFlightData = {
      launchtime: launchtime.toISOString().slice(0, 16),
      to,
      from,
      price_cost,
      price_revenue,
      airship_name,
      master_passenger,
      createdby: name
    };
    ({
      to: transformedFlightData.master_passenger,
      subject: "Flight scheduled!",
      text: flightScheduledMessage(transformedFlightData)
    });
    try {
      await addFlight(transformedFlightData);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        window.location.reload();
      }, 2e3);
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error adding flight:", err);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        id: "addFlightButton",
        className: "block text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",
        type: "button",
        onClick: handleToggleModal,
        children: "Add Flight"
      }
    ),
    isModalOpen && /* @__PURE__ */ jsx(
      "div",
      {
        id: "addFlightModal",
        tabIndex: -1,
        "aria-hidden": "true",
        className: "fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto backdrop-filter backdrop-blur-sm bg-opacity-50",
        children: /* @__PURE__ */ jsx("div", { className: "relative w-full max-w-2xl max-h-full", children: /* @__PURE__ */ jsxs("div", { className: "relative bg-white rounded-lg shadow dark:bg-gray-800", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600", children: [
            /* @__PURE__ */ jsx(ModalStepper, { phase }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                className: "text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white",
                onClick: handleToggleModal,
                children: [
                  /* @__PURE__ */ jsx(
                    "svg",
                    {
                      "aria-hidden": "true",
                      className: "w-5 h-5",
                      fill: "currentColor",
                      viewBox: "0 0 20 20",
                      xmlns: "http://www.w3.org/2000/svg",
                      children: /* @__PURE__ */ jsx(
                        "path",
                        {
                          fillRule: "evenodd",
                          d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                          clipRule: "evenodd"
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close modal" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "p-6 space-y-6", children: /* @__PURE__ */ jsxs(
            "form",
            {
              id: "addFlightForm",
              onSubmit: handleSubmit,
              children: [
                /* @__PURE__ */ jsx(
                  FlightInfo,
                  {
                    phase,
                    formData,
                    setFormData
                  }
                ),
                /* @__PURE__ */ jsx(
                  StepperButtons,
                  {
                    phase,
                    setPhase,
                    operation: "add"
                  }
                )
              ]
            }
          ) })
        ] }) })
      }
    ),
    loading && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50", children: /* @__PURE__ */ jsx(LoaderSpinner, {}) }),
    showToast && /* @__PURE__ */ jsx("div", { className: "fixed top-4 left-1/2 transform -translate-x-1/2", children: /* @__PURE__ */ jsxs(Toast, { children: [
      /* @__PURE__ */ jsx("div", { className: "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200", children: /* @__PURE__ */ jsx(HiCheck, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsx("div", { className: "ml-3 text-sm font-normal", children: "Flight added successfully." }),
      /* @__PURE__ */ jsx(Toast.Toggle, { onClick: () => setShowToast(false) })
    ] }) })
  ] });
};

const EmptyTableCard = ({ loading }) => {
  return /* @__PURE__ */ jsx(Fragment, { children: loading ? /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50", children: /* @__PURE__ */ jsx(LoaderSpinner, {}) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "mb-2", children: /* @__PURE__ */ jsx(ModalFlightAdd, {}) }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center border-2 border-white rounded-lg h-[400px] w-[400px]", children: /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "There is no data to show" }) })
  ] }) });
};

async function editAction({ caseType, data, id }) {
  try {
    data.append("id", id.toString());
    const url = `${"https://vuelos-be.onrender.com"}/${caseType}`;
    let body;
    if (caseType === "airship") {
      body = data;
    } else {
      body = JSON.stringify(Object.fromEntries(data));
    }
    const response = await fetch(url, {
      method: "PUT",
      body,
      headers: caseType !== "airship" ? {
        "Content-Type": "application/json"
      } : void 0
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseText = await response.text();
    const responseData = responseText ? JSON.parse(responseText) : {};
    return responseData;
  } catch (err) {
    console.error("Error editing element:", err);
    throw err;
  }
}

const nationalities = [
  "Afghan",
  "Albanian",
  "Algerian",
  "American",
  "Andorran",
  "Angolan",
  "Antiguan",
  "Argentinian",
  "Armenian",
  "Australian",
  "Austrian",
  "Azerbaijani",
  "Bahamian",
  "Bahraini",
  "Bangladeshi",
  "Barbadian",
  "Belarusian",
  "Belgian",
  "Belizean",
  "Beninese",
  "Bhutanese",
  "Bolivian",
  "Bosnian",
  "Botswanan",
  "Brazilian",
  "British",
  "Bruneian",
  "Bulgarian",
  "Burkinabe",
  "Burmese",
  "Burundian",
  "Cambodian",
  "Cameroonian",
  "Canadian",
  "Cape Verdean",
  "Central African",
  "Chadian",
  "Chilean",
  "Chinese",
  "Colombian",
  "Comorian",
  "Congolese",
  "Costa Rican",
  "Croatian",
  "Cuban",
  "Cypriot",
  "Czech",
  "Danish",
  "Djiboutian",
  "Dominican",
  "Dutch",
  "Ecuadorian",
  "Egyptian",
  "Emirati",
  "Equatorial Guinean",
  "Eritrean",
  "Estonian",
  "Eswatini",
  "Ethiopian",
  "Fijian",
  "Filipino",
  "Finnish",
  "French",
  "Gabonese",
  "Gambian",
  "Georgian",
  "German",
  "Ghanaian",
  "Greek",
  "Grenadian",
  "Guatemalan",
  "Guinean",
  "Guyanese",
  "Haitian",
  "Honduran",
  "Hungarian",
  "Icelandic",
  "Indian",
  "Indonesian",
  "Iranian",
  "Iraqi",
  "Irish",
  "Israeli",
  "Italian",
  "Ivorian",
  "Jamaican",
  "Japanese",
  "Jordanian",
  "Kazakh",
  "Kenyan",
  "Kiribati",
  "Kuwaiti",
  "Kyrgyz",
  "Laotian",
  "Latvian",
  "Lebanese",
  "Liberian",
  "Libyan",
  "Liechtensteiner",
  "Lithuanian",
  "Luxembourger",
  "Malagasy",
  "Malawian",
  "Malaysian",
  "Maldivian",
  "Malian",
  "Maltese",
  "Marshallese",
  "Mauritanian",
  "Mauritian",
  "Mexican",
  "Micronesian",
  "Moldovan",
  "Monacan",
  "Mongolian",
  "Montenegrin",
  "Moroccan",
  "Mozambican",
  "Namibian",
  "Nauruan",
  "Nepalese",
  "New Zealander",
  "Nicaraguan",
  "Nigerian",
  "Nigerien",
  "North Korean",
  "North Macedonian",
  "Norwegian",
  "Omani",
  "Pakistani",
  "Palauan",
  "Palestinian",
  "Panamanian",
  "Papua New Guinean",
  "Paraguayan",
  "Peruvian",
  "Polish",
  "Portuguese",
  "Qatari",
  "Romanian",
  "Russian",
  "Rwandan",
  "Saint Kitts and Nevisian",
  "Saint Lucian",
  "Saint Vincentian",
  "Samoan",
  "San Marinese",
  "Sao Tomean",
  "Saudi",
  "Scottish",
  "Senegalese",
  "Serbian",
  "Seychellois",
  "Sierra Leonean",
  "Singaporean",
  "Slovak",
  "Slovenian",
  "Solomon Islander",
  "Somali",
  "South African",
  "South Korean",
  "Spanish",
  "Sri Lankan",
  "Sudanese",
  "Surinamese",
  "Swazi",
  "Swedish",
  "Swiss",
  "Syrian",
  "Tajik",
  "Tanzanian",
  "Thai",
  "Timorese",
  "Togolese",
  "Tongan",
  "Trinidadian",
  "Tunisian",
  "Turkish",
  "Turkmen",
  "Tuvaluan",
  "Ugandan",
  "Ukrainian",
  "Uruguayan",
  "Uzbek",
  "Vanuatuan",
  "Venezuelan",
  "Vietnamese",
  "Welsh",
  "Yemeni",
  "Zambian",
  "Zimbabwean"
];

const ModalEditCli = ({
  formData,
  handleChange,
  handleEdit,
  setOpenModal
}) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const edit = await handleEdit(event);
    } catch (err) {
      console.error("Error editing client:", err);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      id: "editClientModal",
      tabIndex: -1,
      "aria-hidden": "true",
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto backdrop-filter backdrop-blur-sm bg-opacity-50",
      children: [
        /* @__PURE__ */ jsx("div", { className: "relative w-full max-w-2xl max-h-full", children: /* @__PURE__ */ jsxs("div", { className: "relative bg-white rounded-lg shadow dark:bg-gray-800", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-gray-900 dark:text-white", children: "Edit Client" }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                className: "text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white",
                onClick: () => setOpenModal(false),
                children: [
                  /* @__PURE__ */ jsx(
                    "svg",
                    {
                      "aria-hidden": "true",
                      className: "w-5 h-5",
                      fill: "currentColor",
                      viewBox: "0 0 20 20",
                      xmlns: "http://www.w3.org/2000/svg",
                      children: /* @__PURE__ */ jsx(
                        "path",
                        {
                          fillRule: "evenodd",
                          d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                          clipRule: "evenodd"
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close modal" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "p-6 space-y-6", children: /* @__PURE__ */ jsxs("form", { id: "editClientForm", onSubmit: handleSubmit, children: [
            /* @__PURE__ */ jsxs("div", { className: "h-fit mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "fullname",
                    className: "block text-sm font-medium text-gray-900 dark:text-gray-200",
                    children: "Full name"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    id: "fullname",
                    name: "fullname",
                    value: formData.fullname,
                    onChange: handleChange,
                    className: "block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "passport",
                    className: "block text-sm font-medium text-gray-900 dark:text-gray-200",
                    children: "Passport"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "tel",
                    id: "passport",
                    name: "passport",
                    value: formData.passport,
                    onChange: handleChange,
                    className: "block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "email",
                    className: "block text-sm font-medium text-gray-900 dark:text-gray-200",
                    children: "Email"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "email",
                    id: "email",
                    name: "email",
                    value: formData.email,
                    onChange: handleChange,
                    className: "block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "nationality",
                    className: "block text-sm font-medium text-gray-900 dark:text-gray-200",
                    children: "Nationality"
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    id: "nationality",
                    name: "nationality",
                    className: "block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    required: true,
                    children: [
                      /* @__PURE__ */ jsx(
                        "option",
                        {
                          defaultValue: formData.nationality,
                          children: formData.nationality
                        }
                      ),
                      nationalities.map((nationality) => /* @__PURE__ */ jsx("option", { value: nationality, children: nationality }))
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "identification",
                    className: "block text-sm font-medium text-gray-900 dark:text-gray-200",
                    children: "ID"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    id: "identification",
                    name: "identification",
                    value: formData.identification,
                    onChange: handleChange,
                    className: "block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "weight",
                    className: "block text-sm font-medium text-gray-900 dark:text-gray-200",
                    children: "Weight"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    id: "weight",
                    name: "weight",
                    value: formData.weight,
                    onChange: handleChange,
                    className: "block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    required: true
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-start items-center py-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  id: "submitEdit",
                  type: "submit",
                  className: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
                  children: "Edit Client"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  className: "text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600",
                  onClick: () => setOpenModal(false),
                  children: "Cancel"
                }
              )
            ] })
          ] }) })
        ] }) }),
        loading && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50", children: /* @__PURE__ */ jsx(LoaderSpinner, {}) })
      ]
    }
  );
};

const PortraitImage = ({
  handleDragOver,
  handleDrop,
  handleFileChange,
  portraitData
}) => {
  console.log({ portraitData });
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      "label",
      {
        htmlFor: "portrait",
        className: "block text-sm font-medium text-gray-900 dark:text-gray-200",
        children: "Portrait Image"
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        onDragOver: handleDragOver,
        onDrop: (event) => handleDrop({
          event,
          type: "portrait"
        }),
        className: "flex items-center justify-center w-full mt-1",
        children: /* @__PURE__ */ jsxs("label", { className: "flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center pt-5 pb-6", children: [
            /* @__PURE__ */ jsx(
              "svg",
              {
                className: "w-8 h-8 mb-4 text-gray-500 dark:text-gray-400",
                "aria-hidden": "true",
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 20 16",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    stroke: "currentColor",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "2",
                    d: "M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  }
                )
              }
            ),
            portraitData.name ? /* @__PURE__ */ jsx("p", { className: "w-full truncate", children: portraitData.name }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("p", { className: "mb-2 text-sm text-gray-500 dark:text-gray-400", children: [
                /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Click to upload" }),
                " ",
                "or drag and drop"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: "PNG or JPG" })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "file",
              id: "portrait",
              name: "portrait",
              className: "hidden",
              onChange: (event) => handleFileChange({
                event,
                type: "portrait"
              })
            }
          )
        ] })
      }
    )
  ] });
};

const GenericImage = ({
  handleDragOver,
  handleDrop,
  handleFileChange,
  genericData
}) => {
  console.log({ genericData });
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      "label",
      {
        htmlFor: "generic",
        className: "block text-sm font-medium text-gray-900 dark:text-gray-200",
        children: "Generic Images"
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        onDragOver: handleDragOver,
        onDrop: (event) => handleDrop({
          event,
          type: "generic"
        }),
        className: "flex items-center justify-center w-full mt-1",
        children: /* @__PURE__ */ jsxs("label", { className: "flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col w-full items-center justify-center pt-5 pb-6", children: [
            /* @__PURE__ */ jsx(
              "svg",
              {
                className: "w-8 h-8 mb-4 text-gray-500 dark:text-gray-400",
                "aria-hidden": "true",
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 20 16",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    stroke: "currentColor",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "2",
                    d: "M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  }
                )
              }
            ),
            genericData.length > 0 ? genericData.map((data, key) => /* @__PURE__ */ jsx("p", { className: "w-full truncate", children: data.name }, key)) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("p", { className: "mb-2 text-sm text-gray-500 dark:text-gray-400", children: [
                /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Click to upload" }),
                " ",
                "or drag and drop"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: "PNG or JPG" })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "generic",
              name: "generic",
              type: "file",
              multiple: true,
              className: "hidden",
              onChange: (event) => handleFileChange({
                event,
                type: "generic"
              })
            }
          )
        ] })
      }
    )
  ] });
};

const ModalEditJet = ({
  formData,
  handleChange,
  handleEdit,
  setOpenModal,
  genericData,
  portraitData,
  setGenericData,
  setPortraitData
}) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await handleEdit(event);
    } catch (err) {
      console.error("Error editing jet:", err);
    } finally {
      setLoading(false);
    }
  };
  const handleFileChange = ({
    event,
    type
  }) => {
    if (type === "generic") {
      const selectedFiles = Array.from(event.target.files || []);
      setGenericData((prevFiles) => [...prevFiles, ...selectedFiles]);
    } else if (type === "portrait") {
      if (event.target.files) {
        const selectedFile = event.target.files[0];
        setPortraitData(selectedFile);
      }
    }
  };
  const handleDrop = ({
    event,
    type
  }) => {
    event.preventDefault();
    event.stopPropagation();
    if (type === "generic") {
      const droppedFiles = Array.from(event.dataTransfer.files);
      setGenericData((prevFiles) => [...prevFiles, ...droppedFiles]);
    } else if (type === "portrait") {
      const selectedFile = event.dataTransfer.files[0];
      setPortraitData(selectedFile);
    }
  };
  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      id: "editJetModal",
      tabIndex: -1,
      "aria-hidden": "true",
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto backdrop-filter backdrop-blur-sm bg-opacity-50",
      children: [
        /* @__PURE__ */ jsx("div", { className: "relative w-full max-w-2xl max-h-full", children: /* @__PURE__ */ jsxs("div", { className: "relative bg-white rounded-lg shadow dark:bg-gray-800", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-gray-900 dark:text-white", children: "Edit Jet" }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                className: "text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white",
                onClick: () => setOpenModal(false),
                children: [
                  /* @__PURE__ */ jsx(
                    "svg",
                    {
                      "aria-hidden": "true",
                      className: "w-5 h-5",
                      fill: "currentColor",
                      viewBox: "0 0 20 20",
                      xmlns: "http://www.w3.org/2000/svg",
                      children: /* @__PURE__ */ jsx(
                        "path",
                        {
                          fillRule: "evenodd",
                          d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                          clipRule: "evenodd"
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close modal" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "p-6 space-y-6", children: /* @__PURE__ */ jsxs("form", { id: "editJetForm", onSubmit: handleSubmit, children: [
            /* @__PURE__ */ jsxs("div", { className: "h-fit mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "title",
                    className: "block text-sm font-medium text-gray-900 dark:text-gray-200",
                    children: "Jet Title"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    id: "title",
                    name: "title",
                    value: formData.title,
                    onChange: handleChange,
                    className: "block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "status",
                    className: "block text-sm font-medium text-gray-900 dark:text-gray-200",
                    children: "Status"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    id: "status",
                    name: "status",
                    value: formData.status,
                    onChange: handleChange,
                    className: "block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "seats",
                    className: "block text-sm font-medium text-gray-900 dark:text-gray-200",
                    children: "Seats"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    id: "seats",
                    name: "seats",
                    value: formData.seats,
                    onChange: handleChange,
                    className: "block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "size",
                    className: "block text-sm font-medium text-gray-900 dark:text-gray-200",
                    children: "Size"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    id: "size",
                    name: "size",
                    value: formData.size,
                    onChange: handleChange,
                    className: "block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                PortraitImage,
                {
                  handleFileChange,
                  handleDragOver,
                  portraitData,
                  handleDrop
                }
              ),
              /* @__PURE__ */ jsx(
                GenericImage,
                {
                  handleFileChange,
                  handleDragOver,
                  genericData,
                  handleDrop
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-start items-center py-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  id: "submitEdit",
                  type: "submit",
                  className: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
                  children: "Edit Jet"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  className: "text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600",
                  onClick: () => setOpenModal(false),
                  children: "Cancel"
                }
              )
            ] })
          ] }) })
        ] }) }),
        loading && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50", children: /* @__PURE__ */ jsx(LoaderSpinner, {}) })
      ]
    }
  );
};

const EditFlightInfo = ({ formData, handleChange, phase }) => {
  const phaseFields = () => {
    if (phase === "first") {
      return /* @__PURE__ */ jsxs("div", { className: "h-fit mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "to",
              className: "block text-sm font-medium text-gray-900 dark:text-gray-200",
              children: "To"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "to",
              name: "to",
              value: formData.to,
              onChange: handleChange,
              className: "block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "from",
              className: "block text-sm font-medium text-gray-900 dark:text-gray-200",
              children: "From"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "from",
              name: "from",
              value: formData.from,
              onChange: handleChange,
              className: "block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "launchtime",
              className: "block text-sm font-medium text-gray-900 dark:text-gray-200",
              children: "Launch Time"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "datetime-local",
              id: "launchtime",
              name: "launchtime",
              value: formData.launchtime,
              onChange: handleChange,
              className: "block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "master_passenger",
              className: "block text-sm font-medium text-gray-900 dark:text-gray-200",
              children: "Master Passenger"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "master_passenger",
              name: "master_passenger",
              value: formData.master_passenger,
              onChange: handleChange,
              className: "block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
              required: true
            }
          )
        ] })
      ] });
    } else if (phase === "second") {
      return /* @__PURE__ */ jsxs("div", { className: "h-fit mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "airship_name",
              className: "block text-sm font-medium text-gray-900 dark:text-gray-200",
              children: "Airship Name"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "airship_name",
              name: "airship_name",
              value: formData.airship_name,
              onChange: handleChange,
              className: "block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "price_cost",
              className: "block text-sm font-medium text-gray-900 dark:text-gray-200",
              children: "Price cost"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              value: formData.price_cost,
              onChange: handleChange,
              type: "number",
              id: "price_cost",
              name: "price_cost",
              style: {
                appearance: "textfield",
                WebkitAppearance: "none",
                MozAppearance: "textfield"
              },
              className: "block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "price_revenue",
              className: "block text-sm font-medium text-gray-900 dark:text-gray-200",
              children: "Price with 20% commission"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "price_revenue",
              name: "price_revenue",
              value: formData.price_revenue,
              disabled: true,
              className: "block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
              required: true
            }
          )
        ] })
      ] });
    } else {
      return /* @__PURE__ */ jsxs("div", { className: "h-fit mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("h2", { children: [
          "to: ",
          formData.to
        ] }),
        /* @__PURE__ */ jsxs("h2", { children: [
          "from: ",
          formData.from
        ] }),
        /* @__PURE__ */ jsxs("h2", { children: [
          "launch time: ",
          formData.launchtime.slice(0, 16)
        ] }),
        /* @__PURE__ */ jsxs("h2", { children: [
          "master passenger: ",
          formData.master_passenger
        ] }),
        /* @__PURE__ */ jsxs("h2", { children: [
          "airship: ",
          formData.airship_name
        ] }),
        /* @__PURE__ */ jsxs("h2", { children: [
          "cost: ",
          formData.price_cost
        ] }),
        /* @__PURE__ */ jsxs("h2", { children: [
          "cost plus revenue: ",
          formData.price_revenue
        ] })
      ] });
    }
  };
  return /* @__PURE__ */ jsx(Fragment, { children: phaseFields() });
};

const ModalFlightEdit = ({
  formData,
  handleChange,
  handleEdit,
  setOpenModal
}) => {
  const [phase, setPhase] = useState("first");
  return /* @__PURE__ */ jsx(
    "div",
    {
      id: "editFlightModal",
      tabIndex: -1,
      "aria-hidden": "true",
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto backdrop-filter backdrop-blur-sm bg-opacity-50",
      children: /* @__PURE__ */ jsx("div", { className: "relative w-full max-w-2xl max-h-full", children: /* @__PURE__ */ jsxs("div", { className: "relative bg-white rounded-lg shadow dark:bg-gray-800", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600", children: [
          /* @__PURE__ */ jsx(ModalStepper, { phase }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              className: "text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white",
              onClick: () => setOpenModal(false),
              children: [
                /* @__PURE__ */ jsx(
                  "svg",
                  {
                    "aria-hidden": "true",
                    className: "w-5 h-5",
                    fill: "currentColor",
                    viewBox: "0 0 20 20",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        fillRule: "evenodd",
                        d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                        clipRule: "evenodd"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close modal" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "p-6 space-y-6", children: /* @__PURE__ */ jsxs("form", { id: "editFlightForm", onSubmit: handleEdit, children: [
          /* @__PURE__ */ jsx(
            EditFlightInfo,
            {
              formData,
              handleChange,
              phase
            }
          ),
          /* @__PURE__ */ jsx(
            StepperButtons,
            {
              phase,
              setPhase,
              operation: "edit"
            }
          )
        ] }) })
      ] }) })
    }
  );
};

const Edit = ({ id, caseType, data }) => {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState(data);
  const [portraitData, setPortraitData] = useState(
    new File(["initial content"], "", { type: "text/plain" })
  );
  const [genericData, setGenericData] = useState([]);
  const { updateClients, updateAirships } = useStore();
  const handleEdit = async (event) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const formData2 = new FormData(formElement);
    formData2.delete("portrait");
    formData2.delete("generic");
    formData2.append("portrait", portraitData);
    genericData.forEach((file) => {
      formData2.append("generic", file);
    });
    try {
      await editAction({ caseType, data: formData2, id });
      if (caseType === "client") {
        const clients = await getClients();
        updateClients(clients);
      } else if (caseType === "airship") {
        const airships = await getAirships();
        updateAirships(airships);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setOpenModal(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value, id }));
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "bg-transparent p-2",
        onClick: () => setOpenModal(true),
        children: /* @__PURE__ */ jsx(
          "svg",
          {
            className: "w-6 h-6 text-blue-500 ",
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
              }
            )
          }
        )
      }
    ),
    openModal && (caseType === "airship" ? /* @__PURE__ */ jsx(
      ModalEditJet,
      {
        formData,
        handleChange,
        handleEdit,
        setOpenModal,
        genericData,
        setGenericData,
        portraitData,
        setPortraitData
      }
    ) : caseType === "flight" ? /* @__PURE__ */ jsx(
      ModalFlightEdit,
      {
        formData,
        handleChange,
        handleEdit,
        setOpenModal
      }
    ) : caseType === "client" ? /* @__PURE__ */ jsx(
      ModalEditCli,
      {
        formData,
        handleChange,
        handleEdit,
        setOpenModal
      }
    ) : null)
  ] });
};

const Client = z.object({
  fullname: z.string().refine((value) => {
    const words = value.trim().split(/\s+/);
    return words.length >= 2;
  }),
  nationality: z.string(),
  email: z.string().email("it needs to be an email"),
  identification: z.string().min(8, "ID needs to have a minimum of 8 characters"),
  passport: z.string().min(6, "ID needs to have a minimum of 6 characters"),
  weight: z.string().min(2, "needs to have a minimum of 2 characters")
});
const ModalAdd = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    fullname: "",
    nationality: "",
    email: "",
    identification: "",
    passport: "",
    weight: ""
  });
  const handleToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formElement = event.target;
      const formData = new FormData(formElement);
      const clientData = Object.fromEntries(formData.entries());
      const parsedData = Client.parse({
        fullname: clientData.fullname,
        nationality: clientData.nationality,
        email: clientData.email,
        identification: clientData.identification,
        passport: clientData.passport,
        weight: clientData.weight
      });
      const transformedClientData = {
        fullname: parsedData.fullname,
        nationality: parsedData.nationality,
        email: parsedData.email,
        identification: parsedData.identification,
        passport: parsedData.passport,
        weight: parsedData.weight
      };
      const response = await addClient(transformedClientData);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        window.location.reload();
      }, 2e3);
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error adding client:", err);
      if (err instanceof z.ZodError) {
        const newErrors = {
          fullname: err.errors.find((e) => e.path[0] === "fullname")?.message || "",
          nationality: err.errors.find((e) => e.path[0] === "nationality")?.message || "",
          email: err.errors.find((e) => e.path[0] === "email")?.message || "",
          identification: err.errors.find((e) => e.path[0] === "identification")?.message || "",
          passport: err.errors.find((e) => e.path[0] === "passport")?.message || "",
          weight: err.errors.find((e) => e.path[0] === "weight")?.message || ""
        };
        setErrors(newErrors);
      }
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        className: "flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200",
        type: "button",
        onClick: handleToggleModal,
        children: [
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              className: "w-5 h-5 text-blue-500",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              "stroke-width": "2",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  d: "M12 4v16m8-8H4"
                }
              )
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gray-800", children: "New Client" })
        ]
      }
    ),
    isModalOpen && /* @__PURE__ */ jsx(
      "div",
      {
        id: "addClientModal",
        tabIndex: -1,
        "aria-hidden": "true",
        className: "fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto backdrop-filter backdrop-blur-sm bg-opacity-50",
        children: /* @__PURE__ */ jsx("div", { className: "relative w-full max-w-2xl max-h-full bg-gradient-to-b from-[#BFE4FC] to-[#FFFFFF]", children: /* @__PURE__ */ jsxs("div", { className: "relative bg-[#166ba3] bg-opacity-30 backdrop-blur-md rounded-lg shadow-lg  ", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-gray-900 dark:text-white", children: "Add New Client" }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                className: "text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white",
                onClick: handleToggleModal,
                children: [
                  /* @__PURE__ */ jsx(
                    "svg",
                    {
                      "aria-hidden": "true",
                      className: "w-5 h-5",
                      fill: "currentColor",
                      viewBox: "0 0 20 20",
                      xmlns: "http://www.w3.org/2000/svg",
                      children: /* @__PURE__ */ jsx(
                        "path",
                        {
                          fillRule: "evenodd",
                          d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                          clipRule: "evenodd"
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close modal" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "p-6 space-y-6", children: /* @__PURE__ */ jsxs("form", { id: "addClientForm", onSubmit: handleSubmit, children: [
            /* @__PURE__ */ jsxs("div", { className: "h-fit mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "fullname",
                    className: "block text-sm font-medium text-gray-900 dark:text-gray-200",
                    children: "Full name"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    id: "fullname",
                    name: "fullname",
                    className: "block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    required: true
                  }
                ),
                errors.fullname && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs", children: errors.fullname })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "nationality",
                    className: "block text-sm font-medium text-gray-900 dark:text-gray-200",
                    children: "Nationality"
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    id: "nationality",
                    name: "nationality",
                    className: "block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    required: true,
                    children: [
                      /* @__PURE__ */ jsx("option", { defaultValue: "", children: "Select an option" }),
                      nationalities.map((nationality) => /* @__PURE__ */ jsx("option", { value: nationality, children: nationality }))
                    ]
                  }
                ),
                errors.nationality && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs", children: errors.nationality })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "email",
                    className: "block text-sm font-medium text-gray-900 dark:text-gray-200",
                    children: "Email"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "email",
                    id: "email",
                    name: "email",
                    className: "block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    required: true
                  }
                ),
                errors.email && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs", children: errors.email })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "identification",
                    className: "block text-sm font-medium text-gray-900 dark:text-gray-200",
                    children: "ID"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    id: "identification",
                    name: "identification",
                    className: "block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    required: true
                  }
                ),
                errors.identification && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs", children: errors.identification })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "passport",
                    className: "block text-sm font-medium text-gray-900 dark:text-gray-200",
                    children: "Passport"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    id: "passport",
                    name: "passport",
                    className: "block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    required: true
                  }
                ),
                errors.passport && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs", children: errors.passport })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "weight",
                    className: "block text-sm font-medium text-gray-900 dark:text-gray-200",
                    children: "Weight"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    id: "weight",
                    name: "weight",
                    className: "block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    required: true
                  }
                ),
                errors.weight && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs", children: errors.weight })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-start items-center py-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  id: "submitClient",
                  type: "submit",
                  className: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
                  children: "Add Client"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  className: "text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600",
                  onClick: handleToggleModal,
                  children: "Cancel"
                }
              )
            ] })
          ] }) })
        ] }) })
      }
    ),
    loading && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50", children: /* @__PURE__ */ jsx(LoaderSpinner, {}) }),
    showToast && /* @__PURE__ */ jsx("div", { className: "fixed top-4 left-1/2 transform -translate-x-1/2", children: /* @__PURE__ */ jsxs(Toast, { children: [
      /* @__PURE__ */ jsx("div", { className: "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200", children: /* @__PURE__ */ jsx(HiCheck, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsx("div", { className: "ml-3 text-sm font-normal", children: "Client added successfully." }),
      /* @__PURE__ */ jsx(Toast.Toggle, { onClick: () => setShowToast(false) })
    ] }) })
  ] });
};

const AddJetModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [portraitData, setPortraitData] = useState(
    new File(["initial content"], "", { type: "text/plain" })
  );
  const [genericData, setGenericData] = useState([]);
  const handleToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  const handleDrop = ({
    event,
    type
  }) => {
    event.preventDefault();
    event.stopPropagation();
    if (type === "generic") {
      const droppedFiles = Array.from(event.dataTransfer.files);
      setGenericData((prevFiles) => [...prevFiles, ...droppedFiles]);
    } else if (type === "portrait") {
      const selectedFile = event.dataTransfer.files[0];
      setPortraitData(selectedFile);
    }
  };
  const handleFileChange = ({
    event,
    type
  }) => {
    if (type === "generic") {
      const selectedFiles = Array.from(event.target.files || []);
      setGenericData((prevFiles) => [...prevFiles, ...selectedFiles]);
    } else if (type === "portrait") {
      if (event.target.files) {
        const selectedFile = event.target.files[0];
        setPortraitData(selectedFile);
      }
    }
  };
  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    formData.set("title", formData.get("title"));
    formData.set("status", formData.get("status"));
    formData.set("seats", formData.get("seats"));
    formData.set("size", formData.get("size"));
    const imagesInput = document.querySelector(
      'input[name="generic"]'
    );
    if (imagesInput?.files) {
      for (let i = 0; i < imagesInput.files.length - 1; i++) {
        formData.append("generic", imagesInput.files[i]);
      }
    }
    const portraitImageInput = document.querySelector(
      'input[name="portrait"]'
    );
    if (portraitImageInput?.files) {
      formData.append("portrait", portraitImageInput.files[0]);
    }
    try {
      const response = await addAirship(formData);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        setIsModalOpen(false);
      }, 2e3);
    } catch (err) {
      console.error("Error adding airship or uploading files:", err);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        id: "addJetButton",
        className: "block text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",
        type: "button",
        onClick: handleToggleModal,
        children: "Add Airship"
      }
    ),
    isModalOpen && /* @__PURE__ */ jsx(
      "div",
      {
        id: "addJetModal",
        tabIndex: -1,
        "aria-hidden": "true",
        className: "fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto backdrop-filter backdrop-blur-sm bg-opacity-50",
        children: /* @__PURE__ */ jsx("div", { className: "relative w-full max-w-3xl max-h-full", children: /* @__PURE__ */ jsxs("div", { className: "relative bg-white rounded-lg shadow dark:bg-gray-800", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-gray-900 dark:text-white", children: "Add New Airship" }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                className: "text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white",
                onClick: handleToggleModal,
                children: [
                  /* @__PURE__ */ jsx(
                    "svg",
                    {
                      "aria-hidden": "true",
                      className: "w-5 h-5",
                      fill: "currentColor",
                      viewBox: "0 0 20 20",
                      xmlns: "http://www.w3.org/2000/svg",
                      children: /* @__PURE__ */ jsx(
                        "path",
                        {
                          fillRule: "evenodd",
                          d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                          clipRule: "evenodd"
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close modal" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "p-6 space-y-6", children: /* @__PURE__ */ jsxs("form", { id: "addJetForm", onSubmit: handleSubmit, children: [
            /* @__PURE__ */ jsxs("div", { className: "h-fit mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "title",
                    className: "block text-sm font-medium text-gray-900 dark:text-gray-200",
                    children: "Jet Title"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    id: "title",
                    name: "title",
                    className: "block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "status",
                    className: "block text-sm font-medium text-gray-900 dark:text-gray-200",
                    children: "Status"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    id: "status",
                    name: "status",
                    className: "block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "seats",
                    className: "block text-sm font-medium text-gray-900 dark:text-gray-200",
                    children: "Seats"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    id: "seats",
                    name: "seats",
                    className: "block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "size",
                    className: "block text-sm font-medium text-gray-900 dark:text-gray-200",
                    children: "Size"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    id: "size",
                    name: "size",
                    className: "block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                PortraitImage,
                {
                  handleDragOver,
                  handleDrop,
                  handleFileChange,
                  portraitData
                }
              ),
              /* @__PURE__ */ jsx(
                GenericImage,
                {
                  handleDragOver,
                  handleDrop,
                  handleFileChange,
                  genericData
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-start items-center py-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  id: "submitJet",
                  type: "submit",
                  className: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
                  children: "Add Jet"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  className: "text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600",
                  onClick: handleToggleModal,
                  children: "Cancel"
                }
              )
            ] })
          ] }) })
        ] }) })
      }
    ),
    loading && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50", children: /* @__PURE__ */ jsx(LoaderSpinner, {}) }),
    showToast && /* @__PURE__ */ jsx("div", { className: "fixed top-4 left-1/2 transform -translate-x-1/2", children: /* @__PURE__ */ jsxs(Toast, { children: [
      /* @__PURE__ */ jsx("div", { className: "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200", children: /* @__PURE__ */ jsx(HiCheck, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsx("div", { className: "ml-3 text-sm font-normal", children: "Jet added successfully." }),
      /* @__PURE__ */ jsx(Toast.Toggle, { onClick: () => setShowToast(false) })
    ] }) })
  ] });
};

const TableModal = ({ caseType }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const flights = useStore((state) => state.flights);
  const clients = useStore((state) => state.clients);
  const airships = useStore((state) => state.airships);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (caseType === "flight") {
          setData(
            flights.map((flight) => {
              const { updatedAt, ...rest } = flight;
              return rest;
            }).filter((flight) => {
              const launchTime = new Date(flight.launchtime);
              const currentTime = /* @__PURE__ */ new Date();
              return currentTime < launchTime;
            }).map((flight) => {
              return {
                ...flight,
                launchtime: new Date(flight.launchtime).toLocaleString(
                  "en-US",
                  {
                    month: "2-digit",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false
                  }
                ),
                createdAt: new Date(flight.createdAt).toLocaleString(
                  "en-US",
                  {
                    month: "2-digit",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false
                  }
                )
              };
            })
          );
        } else if (caseType === "history") {
          setData(
            flights.map((flight) => {
              const { updatedAt, ...rest } = flight;
              return rest;
            }).filter((flight) => flight.phase > 7)
          );
        } else if (caseType === "client") {
          setData(clients);
        } else if (caseType === "airship") {
          setData(airships);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [caseType, flights, clients, airships]);
  const handleScheduler = () => {
    window.location.href = "/Scheduler";
  };
  const handleStepper = (id) => {
    if (caseType === "flight") window.location.href = `/trip/${id}`;
  };
  const buttonRetriever = () => {
    if (caseType === "flight") {
      return /* @__PURE__ */ jsxs(
        "button",
        {
          className: "flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200",
          type: "button",
          onClick: handleScheduler,
          children: [
            /* @__PURE__ */ jsx(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                className: "w-5 h-5 text-blue-500",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                strokeWidth: "2",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M12 4v16m8-8H4"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gray-800", children: "New Trip" })
          ]
        }
      );
    } else if (caseType === "client") {
      return /* @__PURE__ */ jsx(ModalAdd, {});
    } else if (caseType === "airship") {
      return /* @__PURE__ */ jsx(AddJetModal, {});
    } else {
      return /* @__PURE__ */ jsx(Fragment, {});
    }
  };
  return /* @__PURE__ */ jsx("div", { className: " w-full max-w-[100%] shadow-md sm:rounded-lg", children: data.length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "mb-2", children: buttonRetriever() }),
    /* @__PURE__ */ jsxs("table", { className: "border-gray-400 w-full text-sm text-left rtl:text-right text-gray-500 overflow-y-auto", children: [
      /* @__PURE__ */ jsx("thead", { className: "sticky top-0 text-xs text-gray-700 uppercase bg-gray-400", children: /* @__PURE__ */ jsxs("tr", { children: [
        Object.entries(data[0]).filter(
          ([key, value]) => key !== "pslc" && key !== "createdAt"
          // chequear si son necesarios
        ).map(([key, value], index) => /* @__PURE__ */ jsx(
          "th",
          {
            scope: "col",
            className: "px-6 py-3",
            children: key
          },
          index
        )),
        /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3", children: "Action" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "overflow-y-auto", children: data.map((element) => {
        const { pslc, createdAt, ...rest } = element;
        return rest;
      }).map((singledata) => /* @__PURE__ */ jsxs(
        "tr",
        {
          className: "bg-white border-b cursor-pointer hover:bg-gray-200",
          children: [
            Object.entries(singledata).map(
              ([key, value]) => {
                return /* @__PURE__ */ jsx(
                  "td",
                  {
                    onClick: () => handleStepper(
                      singledata.id
                    ),
                    className: "px-6 py-3 whitespace-nowrap",
                    children: value
                  },
                  key
                );
              }
            ),
            /* @__PURE__ */ jsxs("td", { className: "px-6 py-3 flex whitespace-nowrap", children: [
              caseType !== "history" && caseType !== "flight" && /* @__PURE__ */ jsx(
                Edit,
                {
                  id: singledata.id,
                  caseType,
                  data: singledata
                }
              ),
              /* @__PURE__ */ jsx(
                Delete,
                {
                  id: singledata.id,
                  caseType,
                  setData
                }
              )
            ] })
          ]
        },
        singledata.id
      )) })
    ] })
  ] }) : /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(EmptyTableCard, { loading }) }) });
};

export { TableModal as T };

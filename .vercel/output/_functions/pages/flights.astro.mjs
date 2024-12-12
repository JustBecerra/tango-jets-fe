/* empty css                                    */
import { c as createComponent, r as renderTemplate, a as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_CTmRdsx1.mjs';
import 'kleur/colors';
import { a as addFlight, g as getFlights } from '../chunks/actions_Cc8p6MjE.mjs';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { Toast } from 'flowbite-react';
import { HiCheck } from 'react-icons/hi';
import { g as getCookie } from '../chunks/getCookie_2p--uMcu.mjs';
import { $ as $$Layout } from '../chunks/Layout_WHO-CHq2.mjs';
export { renderers } from '../renderers.mjs';

const ModalFlightAdd = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const handleToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formElement = event.target;
    const formData = new FormData(formElement);
    const flightData = Object.fromEntries(formData.entries());
    const name = getCookie("username");
    const transformedFlightData = {
      launchtime: new Date(flightData.launchtime).toISOString(),
      arrivaltime: new Date(
        flightData.arrivaltime
      ).toISOString(),
      to: flightData.to,
      from: flightData.from,
      airship_title: flightData.airship_title,
      createdby: name
    };
    try {
      const response = await addFlight(transformedFlightData);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        window.location.reload();
      }, 2e3);
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error adding flight:", err);
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
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-gray-900 dark:text-white", children: "Add New Flight" }),
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
                /* @__PURE__ */ jsxs("div", { className: "h-fit mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2", children: [
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
                        min: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16),
                        className: "block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                        required: true
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(
                      "label",
                      {
                        htmlFor: "arrivaltime",
                        className: "block text-sm font-medium text-gray-900 dark:text-gray-200",
                        children: "Arrival Time"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "datetime-local",
                        id: "arrivaltime",
                        name: "arrivaltime",
                        min: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16),
                        className: "block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                        required: true
                      }
                    )
                  ] }),
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
                        className: "block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                        required: true
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(
                      "label",
                      {
                        htmlFor: "airship_title",
                        className: "block text-sm font-medium text-gray-900 dark:text-gray-200",
                        children: "Airship Name"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        id: "airship_title",
                        name: "airship_title",
                        className: "block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                        required: true
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-start items-center py-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      id: "submitFlight",
                      type: "submit",
                      className: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
                      children: "Add Flight"
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
              ]
            }
          ) })
        ] }) })
      }
    ),
    showToast && /* @__PURE__ */ jsx("div", { className: "fixed top-4 left-1/2 transform -translate-x-1/2", children: /* @__PURE__ */ jsxs(Toast, { children: [
      /* @__PURE__ */ jsx("div", { className: "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200", children: /* @__PURE__ */ jsx(HiCheck, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsx("div", { className: "ml-3 text-sm font-normal", children: "Flight added successfully." }),
      /* @__PURE__ */ jsx(Toast.Toggle, { onClick: () => setShowToast(false) })
    ] }) })
  ] });
};

const $$Flights = createComponent(async ($$result, $$props, $$slots) => {
  const data = await getFlights();
  const filteredData = data.map((flight) => {
    const { updatedAt, ...rest } = flight;
    return rest;
  }).filter((flight) => {
    const launchTime = new Date(flight.launchtime);
    const currentTime = /* @__PURE__ */ new Date();
    return currentTime < launchTime;
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Flights" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col space-y-4"> <div> ${renderComponent($$result2, "ModalFlightAdd", ModalFlightAdd, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Justo/Desktop/tango-jets-fe/src/components/modals/ModalFlightAdd", "client:component-export": "default" })} </div> <div> ${renderComponent($$result2, "TableModal", null, { "info": filteredData, "caseType": "flight", "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/Users/Justo/Desktop/tango-jets-fe/src/components/table/TableModal", "client:component-export": "default" })} </div> </div> ` })}`;
}, "C:/Users/Justo/Desktop/tango-jets-fe/src/pages/Flights.astro", void 0);

const $$file = "C:/Users/Justo/Desktop/tango-jets-fe/src/pages/Flights.astro";
const $$url = "/Flights";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Flights,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

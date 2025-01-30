/* empty css                                       */
import { c as createComponent, r as renderTemplate, a as renderComponent, f as createAstro } from '../../chunks/astro/server_DwpHebLD.mjs';
import 'kleur/colors';
import { u as useStore, p as putCompletePhase, b as getFlightById, g as getFlights, $ as $$Layout } from '../../chunks/actions_Cnex7xBx.mjs';
import { R as RouteGuard } from '../../chunks/index_COhuEBoF.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { L as LoaderSpinner } from '../../chunks/LoaderSpinner_ALWPhgDz.mjs';
export { renderers } from '../../renderers.mjs';

const steps = [
  {
    step: 1,
    title: "First Contact"
  },
  {
    step: 2,
    title: "Quote Creation"
  },
  {
    step: 3,
    title: "Plane Selection"
  },
  {
    step: 4,
    title: "Internal Checking"
  },
  {
    step: 5,
    title: "Confirmation"
  },
  {
    step: 6,
    title: "Flight Payment"
  },
  {
    step: 7,
    title: "Payment Received"
  },
  {
    step: 8,
    title: "Post Flight Routine"
  }
];
const logoDecider = ({ phase, step }) => {
  if (phase > step) {
    return /* @__PURE__ */ jsx(
      "svg",
      {
        className: "w-4 h-4",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12",
        children: /* @__PURE__ */ jsx(
          "path",
          {
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "2",
            d: "M1 5.917 5.724 10.5 15 1.5"
          }
        )
      }
    );
  } else if (phase === step) {
    return /* @__PURE__ */ jsx(
      "svg",
      {
        className: "rtl:rotate-180 w-4 h-4",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 14 10",
        children: /* @__PURE__ */ jsx(
          "path",
          {
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "2",
            d: "M1 5h12m0 0L9 1m4 4L9 9"
          }
        )
      }
    );
  } else {
    return /* @__PURE__ */ jsx(Fragment, {});
  }
};
const VerticalStepper = ({ phase }) => {
  return /* @__PURE__ */ jsx("ol", { className: "space-y-4 w-72", children: steps.map(
    ({ step, title }, index) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
      "div",
      {
        className: `w-full p-4 ${phase > step && "text-green-400 border-green-800 bg-green-800"} border rounded-lg ${phase < step && "bg-gray-800 border-gray-700 text-gray-400"}
                            ${phase === step && "bg-gray-800 border-blue-800 text-blue-400"}
                        `,
        role: "alert",
        children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("h3", { className: "font-medium", children: [
            step,
            " ",
            title
          ] }),
          logoDecider({ phase, step })
        ] })
      }
    ) }, index)
  ) });
};

const PhaseButtons = ({
  phase,
  setPhase,
  currentPhase,
  currentFlightId,
  setCurrentFlight,
  setLoading
}) => {
  const updateFlights = useStore((state) => state.updateFlights);
  const handleCompletePhase = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      const nextPhase = phase + 1;
      await putCompletePhase({ phase: nextPhase, id: currentFlightId });
      const flightsRequested = await getFlightById(currentFlightId);
      setCurrentFlight(flightsRequested);
      const newFlights = await getFlights();
      updateFlights(newFlights);
      setPhase((prev) => prev + 1);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-[100%] flex justify-around", children: [
    phase > 1 && /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        className: "focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600",
        onClick: (e) => {
          e.preventDefault();
          setPhase((prev) => prev - 1);
        },
        children: "Back"
      }
    ),
    phase < 8 && /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        className: "text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800",
        onClick: (e) => {
          e.preventDefault();
          setPhase((prev) => prev + 1);
        },
        children: "Next Phase"
      }
    ),
    phase === currentPhase && /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        className: "text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-green-600 hover:bg-green-700 focus:ring-green-800",
        onClick: handleCompletePhase,
        children: "Complete Phase"
      }
    )
  ] });
};

const fieldDecider = ({ currentFlight, localPhase }) => {
  const clients = useStore((state) => state.clients).find(
    (client) => client.id === parseInt(currentFlight.master_passenger)
  );
  switch (localPhase) {
    case 1:
      return /* @__PURE__ */ jsxs("div", { className: "w-[100%] h-[100%] grid grid-cols-2 gap-16", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-xl text-center", children: [
          "From: ",
          /* @__PURE__ */ jsx("br", {}),
          currentFlight.from
        ] }),
        /* @__PURE__ */ jsxs("h2", { className: "text-xl text-center", children: [
          "To: ",
          /* @__PURE__ */ jsx("br", {}),
          currentFlight.to
        ] }),
        /* @__PURE__ */ jsxs("h2", { className: "text-xl text-center", children: [
          "Master Passenger: ",
          /* @__PURE__ */ jsx("br", {}),
          clients && clients.fullname
        ] }),
        /* @__PURE__ */ jsxs("h2", { className: "text-xl text-center", children: [
          "Launch time: ",
          /* @__PURE__ */ jsx("br", {}),
          currentFlight.launchtime.slice(0, 16)
        ] })
      ] });
    case 2:
      return /* @__PURE__ */ jsxs("div", { className: "w-[100%] h-[100%] grid grid-cols-2 gap-16", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-xl text-center", children: [
          "Cost: ",
          /* @__PURE__ */ jsx("br", {}),
          "$",
          currentFlight && currentFlight.price_cost
        ] }),
        /* @__PURE__ */ jsxs("h2", { className: "text-xl text-center", children: [
          "Markup: ",
          /* @__PURE__ */ jsx("br", {}),
          "$",
          currentFlight && currentFlight.price_revenue
        ] })
      ] });
    case 3:
      return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("p", { children: "Waiting for Client to choose plane." }) });
    case 4:
      return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("p", { children: "Planes chosen by the client." }) });
    case 5:
      return /* @__PURE__ */ jsx(Fragment, { children: "Send invoice with detailed prices." });
    case 6:
      return /* @__PURE__ */ jsx(Fragment, { children: "Waiting for client to pay." });
    case 7:
      return /* @__PURE__ */ jsx(Fragment, { children: "Check client has correctly payed and alert crew of the plane." });
    default:
      return /* @__PURE__ */ jsx(Fragment, { children: "Post Routine Flight." });
  }
};
const EditFields = ({ currentFlight, localPhase, loading }) => {
  return /* @__PURE__ */ jsxs("div", { className: "w-full h-[30%] flex justify-center items-center ", children: [
    fieldDecider({ currentFlight, localPhase }),
    loading && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50", children: /* @__PURE__ */ jsx(LoaderSpinner, {}) })
  ] });
};

const EditForms = ({
  localPhase,
  setLocalPhase,
  currentFlight,
  setCurrentFlight
}) => {
  const [loading, setLoading] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "w-[700px] h-[70%] flex flex-col items-center justify-evenly bg-[#166ba3] bg-opacity-30 border-blue-800 rounded-lg", children: [
    /* @__PURE__ */ jsxs("h1", { className: "text-3xl", children: [
      "Flight Phase: ",
      localPhase
    ] }),
    /* @__PURE__ */ jsx(
      EditFields,
      {
        currentFlight,
        localPhase,
        loading
      }
    ),
    currentFlight && /* @__PURE__ */ jsx(
      PhaseButtons,
      {
        phase: localPhase,
        setPhase: setLocalPhase,
        currentPhase: currentFlight.phase,
        currentFlightId: currentFlight.id,
        setCurrentFlight,
        setLoading
      }
    )
  ] });
};

const EditStepperFrame = ({ flightRequested }) => {
  const [localPhase, setLocalPhase] = useState(flightRequested.phase);
  const [currentFlight, setCurrentFlight] = useState(flightRequested);
  return /* @__PURE__ */ jsxs("div", { className: "flex h-full justify-center items-center gap-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full justify-center items-start", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "focus:ring-4 focus:outline-none mb-2 focus:ring-blue-300 rounded-lg border text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600",
          onClick: () => window.location.href = "/Trips",
          children: "Back"
        }
      ),
      /* @__PURE__ */ jsx(
        EditForms,
        {
          localPhase,
          setLocalPhase,
          currentFlight,
          setCurrentFlight
        }
      )
    ] }),
    currentFlight && /* @__PURE__ */ jsx(VerticalStepper, { phase: currentFlight.phase })
  ] });
};

const $$Astro = createAstro();
async function getStaticPaths() {
  const flightsRequested = await getFlights();
  return flightsRequested.map((flight) => ({
    params: { trip: flight.id }
  }));
}
const $$trip = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$trip;
  const { trip } = Astro2.params;
  const flight = await getFlightById(trip);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "trip" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "RouteGuard", RouteGuard, { "client:load": "react", "client:component-hydration": "load", "client:component-path": "C:/Users/Justo/Desktop/tango-jets-fe/src/components/routeguard", "client:component-export": "RouteGuard" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "EditStepperFrame", EditStepperFrame, { "flightRequested": flight, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Justo/Desktop/tango-jets-fe/src/components/stepper/EditStepperFrame", "client:component-export": "EditStepperFrame" })} ` })} ` })}`;
}, "C:/Users/Justo/Desktop/tango-jets-fe/src/pages/trip/[trip].astro", void 0);

const $$file = "C:/Users/Justo/Desktop/tango-jets-fe/src/pages/trip/[trip].astro";
const $$url = "/trip/[trip]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$trip,
	file: $$file,
	getStaticPaths,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

/* empty css                                    */
import { c as createComponent, r as renderTemplate, a as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_DwpHebLD.mjs';
import 'kleur/colors';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { M as ModalStepper, F as FlightInfo, S as StepperButtons, f as flightScheduledMessage } from '../chunks/FlightInfo_Drhw2A7P.mjs';
import { u as useStore, a as addFlight, g as getFlights, $ as $$Layout } from '../chunks/actions_MIoFgvcc.mjs';
import { g as getCookie } from '../chunks/getCookie_2p--uMcu.mjs';
import { Toast } from 'flowbite-react';
import { HiCheck } from 'react-icons/hi';
import { L as LoaderSpinner } from '../chunks/LoaderSpinner_ALWPhgDz.mjs';
export { renderers } from '../renderers.mjs';

async function sendEmail(flightData) {
  try {
    const response = await fetch(
      `${"https://vuelos-be.onrender.com"}/email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(flightData)
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseText = await response.text();
    const responseData = responseText ? JSON.parse(responseText) : {};
    return responseData;
  } catch (err) {
    console.error("Error adding flight:", err);
    throw err;
  }
}

const SchedulerFrame = () => {
  const [phase, setPhase] = useState("first");
  const [showToast, setShowToast] = useState(false);
  const airships = useStore((state) => state.airships);
  const [formData, setFormData] = useState({
    launchtime: /* @__PURE__ */ new Date(),
    to: "",
    from: "",
    master_passenger: ""
  });
  const [airshipData, setAirshipData] = useState([
    {
      airship_name: "",
      price_cost: 0,
      price_revenue: 0
    }
  ]);
  const [loading, setLoading] = useState(false);
  const { updateFlights } = useStore((state) => state);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { launchtime, to, from, master_passenger } = formData;
    const name = getCookie("username");
    const transformedFlightData = {
      launchtime: launchtime.toISOString().slice(0, 16),
      to,
      from,
      master_passenger,
      createdby: name
    };
    try {
      const newFlight = await addFlight(transformedFlightData);
      const EmailInfo = {
        to: transformedFlightData.master_passenger,
        subject: "Flight pre-scheduled!",
        text: flightScheduledMessage({
          transformedFlightData,
          airshipData,
          airships,
          tripID: newFlight.id
        })
      };
      await sendEmail(EmailInfo);
      const flights = await getFlights();
      updateFlights(flights);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        window.location.href = "/Trips";
      }, 2e3);
    } catch (err) {
      console.error("Error adding flight:", err);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative overflow-x-auto overflow-y-auto max-h-[800px] bg-[#166ba3] bg-opacity-30 backdrop-blur-md w-full max-w-[100%] shadow-md sm:rounded-lg px-6", children: [
    showToast && /* @__PURE__ */ jsx("div", { className: "fixed top-4 left-1/2 transform -translate-x-1/2", children: /* @__PURE__ */ jsxs(Toast, { children: [
      /* @__PURE__ */ jsx("div", { className: "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500", children: /* @__PURE__ */ jsx(HiCheck, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsx("div", { className: "ml-3 text-sm font-normal", children: "Flight added successfully." }),
      /* @__PURE__ */ jsx(Toast.Toggle, { onClick: () => setShowToast(false) })
    ] }) }),
    /* @__PURE__ */ jsx(ModalStepper, { phase }),
    /* @__PURE__ */ jsx("div", { className: "p-6 space-y-6", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsx(
        FlightInfo,
        {
          phase,
          formData,
          setFormData,
          airshipData,
          setAirshipData
        }
      ),
      /* @__PURE__ */ jsx(StepperButtons, { phase, setPhase, operation: "add" })
    ] }) }),
    loading && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50", children: /* @__PURE__ */ jsx(LoaderSpinner, {}) })
  ] });
};

const $$Scheduler = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Scheduler" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "RouteGuard", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/Users/Justo/Desktop/tango-jets-fe/src/components/routeguard", "client:component-export": "RouteGuard" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="flex"> ${renderComponent($$result3, "SchedulerFrame", SchedulerFrame, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Justo/Desktop/tango-jets-fe/src/components/scheduler/SchedulerFrame", "client:component-export": "default" })} </div> ` })} ` })}`;
}, "C:/Users/Justo/Desktop/tango-jets-fe/src/pages/Scheduler.astro", void 0);

const $$file = "C:/Users/Justo/Desktop/tango-jets-fe/src/pages/Scheduler.astro";
const $$url = "/Scheduler";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Scheduler,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

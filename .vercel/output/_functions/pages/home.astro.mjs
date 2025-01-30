/* empty css                                    */
import { c as createComponent, r as renderTemplate, a as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_DwpHebLD.mjs';
import 'kleur/colors';
import { R as RouteGuard } from '../chunks/index_COhuEBoF.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import React, { useState, useEffect } from 'react';
import { g as getCookie } from '../chunks/getCookie_2p--uMcu.mjs';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { u as useStore, g as getFlights, $ as $$Layout } from '../chunks/actions_Cnex7xBx.mjs';
import { g as getAirships, a as getClients } from '../chunks/actions_jxI1Zvsl.mjs';
export { renderers } from '../renderers.mjs';

const WelcomeText = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [currentTime, setCurrentTime] = useState(null);
  useEffect(() => {
    const name = getCookie("username");
    if (name) {
      setEmployeeName(name);
    }
    setCurrentTime(/* @__PURE__ */ new Date());
    const intervalId = setInterval(() => {
      setCurrentTime(/* @__PURE__ */ new Date());
    }, 1e3);
    return () => clearInterval(intervalId);
  }, []);
  if (!currentTime) return null;
  const formattedTime = format(currentTime, "EEE dd 🕒 'ARG' hh:mm a", {
    locale: enUS
  });
  return /* @__PURE__ */ jsxs("div", { className: "m-8 text-center", children: [
    /* @__PURE__ */ jsxs("h1", { className: "text-4xl font-bold", children: [
      "Welcome,",
      /* @__PURE__ */ jsx("span", { className: "text-blue-500 font-cursive", children: employeeName }),
      "!"
    ] }),
    /* @__PURE__ */ jsx("h2", { className: "text-1xl font-semibold mt-4", children: formattedTime })
  ] });
};

const DepartingSoon = React.lazy(() => import('../chunks/DepartingSoon_CSjIbZqY.mjs'));
const ClientTable = React.lazy(() => import('../chunks/ClientTable_MLJmLc9U.mjs'));
const MissingInfoCli = React.lazy(() => import('../chunks/MissingInfoCli_C70M1W-r.mjs'));
const InFlight = React.lazy(() => import('../chunks/InFlight_A9vaEj95.mjs'));
const RecentlyLanded = React.lazy(() => import('../chunks/RecentlyLanded_DmlwX1Qv.mjs'));
const Datitos = () => {
  const { updateAirships, updateFlights, updateClients, flights, clients } = useStore((state) => state);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const flightsRequested = await getFlights();
      updateFlights(flightsRequested);
      const airshipsRequested = await getAirships();
      updateAirships(airshipsRequested);
      const clientsRequested = await getClients();
      updateClients(clientsRequested);
      const username = getCookie("username");
      const filteredClients2 = clientsRequested.filter(
        (client) => client.email === null || client.fullname === null || client.id === null || client.identification === null || client.nacionality === null || client.pasaport === null || client.weight === null
      );
      setFilteredClients(filteredClients2);
      const filteredFlights2 = flightsRequested.filter(
        (flight) => flight.createdby === username
      );
      setFilteredFlights(filteredFlights2);
    };
    fetchData();
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "p-4 h-full w-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-white col-span-1 rounded-lg shadow-lg min-h-[200px] h-[300px] max-w-full", children: /* @__PURE__ */ jsx(DepartingSoon, { flights: filteredFlights }) }),
      /* @__PURE__ */ jsx("div", { className: "bg-white col-span-1 rounded-lg shadow-lg min-h-[200px] h-[300px] max-w-full", children: /* @__PURE__ */ jsx(InFlight, { flights: filteredFlights }) }),
      /* @__PURE__ */ jsx("div", { className: "bg-white col-span-1 rounded-lg shadow-lg min-h-[200px] h-[300px] max-w-full", children: /* @__PURE__ */ jsx(RecentlyLanded, { flights: filteredFlights }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "my-8 grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-white col-span-2 rounded-lg shadow-lg min-h-[200px] h-[300px] max-w-full", children: /* @__PURE__ */ jsx(MissingInfoCli, { clients: filteredClients }) }),
      /* @__PURE__ */ jsx("div", { className: "bg-white col-span-1 rounded-lg shadow-lg min-h-[200px] h-[300px] max-w-full", children: /* @__PURE__ */ jsx(ClientTable, { clients: filteredFlights }) })
    ] })
  ] });
};

const $$Home = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Tango Jets." }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "RouteGuard", RouteGuard, { "client:load": "react", "client:component-hydration": "load", "client:component-path": "C:/Users/Justo/Desktop/tango-jets-fe/src/components/routeguard", "client:component-export": "RouteGuard" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class=" flex flex-col items-center justify-start relative w-full"> <div> ${renderComponent($$result3, "WelcomeText", WelcomeText, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Justo/Desktop/tango-jets-fe/src/components/text/WelcomeText", "client:component-export": "WelcomeText" })} </div> <div class="absolute top-0 right-0 m-4"> <button class="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200" onclick="window.location.href = '/Scheduler'"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"> <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path> </svg> <span class="text-sm font-medium text-gray-800">New Trip</span> </button> </div> ${renderComponent($$result3, "Datitos", Datitos, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Justo/Desktop/tango-jets-fe/src/components/cargadorDeTablas/Datitos", "client:component-export": "Datitos" })} </div> ` })} ` })}`;
}, "C:/Users/Justo/Desktop/tango-jets-fe/src/pages/Home.astro", void 0);

const $$file = "C:/Users/Justo/Desktop/tango-jets-fe/src/pages/Home.astro";
const $$url = "/Home";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Home,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

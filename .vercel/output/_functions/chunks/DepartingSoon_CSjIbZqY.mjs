import { jsx, jsxs } from 'react/jsx-runtime';
import { useMemo } from 'react';

const DepartingSoon = ({ flights }) => {
  const formatLaunchTime = (launchtime) => {
    const date = new Date(launchtime);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true
    });
  };
  const filteredFlights = useMemo(() => {
    const now = /* @__PURE__ */ new Date();
    const fiveDaysFromNow = new Date(now);
    fiveDaysFromNow.setDate(now.getDate() + 5);
    return flights.filter((flight) => {
      const launchDate = new Date(flight.launchtime);
      return launchDate > now && launchDate <= fiveDaysFromNow;
    });
  }, [flights]);
  return /* @__PURE__ */ jsx("div", { className: "h-full overflow-y-auto rounded-lg shadow-lg scrollbar-hide", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
    /* @__PURE__ */ jsxs("thead", { className: "bg-gray-50 sticky top-0 z-10", children: [
      /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx(
        "th",
        {
          colSpan: 4,
          className: "px-3 py-2 text-center font-semibold text-gray-700 uppercase tracking-wider text-sm",
          children: "🛫Departing soon"
        }
      ) }),
      /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Airship" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider", children: "From - To" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 hidden md:table-cell text-center text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Time" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200 rounded-b-lg", children: filteredFlights.map((flight) => /* @__PURE__ */ jsxs(
      "tr",
      {
        className: "bg-white border-b cursor-pointer hover:bg-gray-200",
        onClick: () => window.location.href = `/trip/${flight.id}`,
        children: [
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900", children: flight.airship_name }),
          /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 text-center whitespace-nowrap text-sm text-gray-700", children: [
            flight.from,
            /* @__PURE__ */ jsx(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                className: "inline-block w-4 h-4 mx-1 text-gray-500",
                viewBox: "0 0 24 24",
                fill: "currentColor",
                children: /* @__PURE__ */ jsx("path", { d: "M13.5 4.5a1 1 0 011.41 0l6 6a1 1 0 010 1.41l-6 6a1 1 0 01-1.41-1.41L17.59 12H4a1 1 0 010-2h13.59l-4.09-4.09a1 1 0 010-1.41z" })
              }
            ),
            flight.to
          ] }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 hidden md:table-cell text-center whitespace-nowrap text-sm text-gray-700", children: formatLaunchTime(flight.launchtime) })
        ]
      },
      flight.id
    )) })
  ] }) });
};

export { DepartingSoon as default };

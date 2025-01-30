import { jsx, jsxs } from 'react/jsx-runtime';

const ClientTable = ({ clients }) => {
  const newClientsList = clients.sort((a, b) => b.phase - a.phase);
  return /* @__PURE__ */ jsx("div", { className: "h-full overflow-y-auto rounded-lg shadow-lg scrollbar-hide", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
    /* @__PURE__ */ jsxs("thead", { className: "bg-gray-50 sticky top-0 z-10", children: [
      /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx(
        "th",
        {
          colSpan: 3,
          className: "px-3 py-2 bg-gray-50 font-semibold text-gray-700 uppercase tracking-wider text-sm",
          children: "Trips Status"
        }
      ) }),
      /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Name" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Phase" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200 ", children: newClientsList.map((client) => /* @__PURE__ */ jsxs(
      "tr",
      {
        className: `border-b cursor-pointer ${client.phase === 4 ? "bg-green-100 text-green-800 hover:bg-green-200" : client.phase === 7 ? "bg-red-100 text-red-800 hover:bg-red-900" : "bg-white hover:bg-gray-200"}`,
        onClick: () => window.location.href = `/trip/${client.id}`,
        children: [
          /* @__PURE__ */ jsx(
            "td",
            {
              className: `px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900`,
              children: client.master_passenger
            }
          ),
          /* @__PURE__ */ jsx(
            "td",
            {
              className: `px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900`,
              children: client.phase
            }
          )
        ]
      },
      client.id
    )) })
  ] }) });
};

export { ClientTable as default };

import { jsx, jsxs } from 'react/jsx-runtime';

const MissingInfoCli = ({ clients }) => {
  return /* @__PURE__ */ jsx("div", { className: "h-full overflow-y-auto rounded-lg shadow-lg scrollbar-hide", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200  text-xs sm:text-sm", children: [
    /* @__PURE__ */ jsxs("thead", { className: "bg-gray-50 sticky top-0 z-10", children: [
      /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx(
        "th",
        {
          colSpan: 7,
          className: "px-3 py-2 bg-gray-50 font-semibold text-gray-700 uppercase tracking-wider text-sm",
          children: "⚠️ Missing Client Information ⚠️"
        }
      ) }),
      /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-3 py-2 bg-gray-50  font-medium text-gray-500 uppercase tracking-wider", children: "Name" }),
        /* @__PURE__ */ jsx("th", { className: "px-3 py-2 hidden md:table-cell bg-gray-50  font-medium text-gray-500 uppercase tracking-wider", children: "Email" }),
        /* @__PURE__ */ jsx("th", { className: "px-3 py-2 hidden md:table-cell bg-gray-50  font-medium text-gray-500 uppercase tracking-wider", children: "Nationality" }),
        /* @__PURE__ */ jsx("th", { className: "px-3 py-2 hidden md:table-cell bg-gray-50  font-medium text-gray-500 uppercase tracking-wider", children: "Identification" }),
        /* @__PURE__ */ jsx("th", { className: "px-3 py-2  bg-gray-50 font-medium text-gray-500 uppercase tracking-wider", children: "Passport" }),
        /* @__PURE__ */ jsx("th", { className: "px-3 py-2 hidden md:table-cell bg-gray-50  font-medium text-gray-500 uppercase tracking-wider", children: "Weight" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: clients.map((client) => /* @__PURE__ */ jsxs(
      "tr",
      {
        className: "bg-white border-b cursor-pointer sm:hover:bg-gray-200",
        onClick: () => window.location.href = `/Client`,
        children: [
          /* @__PURE__ */ jsx("td", { className: "px-3 py-2 text-center whitespace-nowrap font-medium text-gray-900", children: client.fullname }),
          /* @__PURE__ */ jsx("td", { className: "px-3 py-2 text-center hidden md:table-cell whitespace-nowrap text-gray-700", children: client.email }),
          /* @__PURE__ */ jsx("td", { className: "px-3 py-2 text-center hidden md:table-cell whitespace-nowrap text-gray-700", children: client.nationality }),
          /* @__PURE__ */ jsx("td", { className: "px-3 py-2 text-center hidden md:table-cell whitespace-nowrap text-gray-700", children: client.identification }),
          /* @__PURE__ */ jsx("td", { className: "px-3 py-2  text-center whitespace-nowrap text-gray-700", children: client.passport }),
          /* @__PURE__ */ jsx("td", { className: "px-3 py-2 hidden md:table-cell text-center whitespace-nowrap text-gray-700", children: client.weight })
        ]
      },
      client.id
    )) })
  ] }) });
};

export { MissingInfoCli as default };

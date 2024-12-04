/* empty css                                    */
import { c as createComponent, r as renderTemplate, a as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_BhDw4P4A.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_o6iQYi5C.mjs';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { Toast } from 'flowbite-react';
import { HiCheck } from 'react-icons/hi';
import { T as TableModal } from '../chunks/TableModal_DA6RTQJ9.mjs';
export { renderers } from '../renderers.mjs';

async function getAirships() {
  try {
    const response = await fetch(
      `${"https://vuelos-be.onrender.com"}/airships`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseToken = await response.json();
    return responseToken;
  } catch (err) {
    console.error("Error fetching Airships:", err);
    throw err;
  }
}
async function addAirship(formData) {
  try {
    const response = await fetch(
      `${"https://vuelos-be.onrender.com"}/airship`,
      {
        method: "POST",
        body: formData
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseText = await response.text();
    const responseData = responseText ? JSON.parse(responseText) : {};
    return responseData;
  } catch (err) {
    console.error("Error adding airship:", err);
    throw err;
  }
}

const AddJetModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const handleToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    formData.set("title", formData.get("title"));
    formData.set("status", formData.get("status"));
    formData.set("pricepermile", formData.get("pricepermile"));
    formData.set("seats", formData.get("seats"));
    formData.set("size", formData.get("size"));
    const imagesInput = formElement.querySelector(
      'input[name="images"]'
    );
    if (imagesInput?.files) {
      for (let i = 0; i < imagesInput.files.length; i++) {
        formData.append("images", imagesInput.files[i]);
      }
    }
    try {
      const response = await addAirship(formData);
      console.log("Airship added successfully:", response);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        setIsModalOpen(false);
      }, 2e3);
    } catch (err) {
      console.error("Error adding airship or uploading files:", err);
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
        children: /* @__PURE__ */ jsx("div", { className: "relative w-full max-w-2xl max-h-full", children: /* @__PURE__ */ jsxs("div", { className: "relative bg-white rounded-lg shadow dark:bg-gray-800", children: [
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
                    htmlFor: "pricepermile",
                    className: "block text-sm font-medium text-gray-900 dark:text-gray-200",
                    children: "Price per Mile"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    id: "pricepermile",
                    name: "pricepermile",
                    className: "block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
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
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "images",
                    className: "block text-sm font-medium text-gray-900 dark:text-gray-200",
                    children: "Images"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "file",
                    id: "images",
                    name: "images",
                    multiple: true,
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
    showToast && /* @__PURE__ */ jsx("div", { className: "fixed top-4 left-1/2 transform -translate-x-1/2", children: /* @__PURE__ */ jsxs(Toast, { children: [
      /* @__PURE__ */ jsx("div", { className: "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200", children: /* @__PURE__ */ jsx(HiCheck, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsx("div", { className: "ml-3 text-sm font-normal", children: "Jet added successfully." }),
      /* @__PURE__ */ jsx(Toast.Toggle, { onClick: () => setShowToast(false) })
    ] }) })
  ] });
};

const $$Airships = createComponent(async ($$result, $$props, $$slots) => {
  const data = await getAirships();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Airships" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col space-y-4"> <div> ${renderComponent($$result2, "ModalJetAdd", AddJetModal, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Justo/Desktop/tango-jets-fe/src/components/modals/ModalJetAdd", "client:component-export": "default" })} </div> <div> ${renderComponent($$result2, "TableModal", TableModal, { "info": data, "caseType": "airship", "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Justo/Desktop/tango-jets-fe/src/components/table/TableModal", "client:component-export": "default" })} </div> </div> ` })}`;
}, "C:/Users/Justo/Desktop/tango-jets-fe/src/pages/Airships.astro", void 0);

const $$file = "C:/Users/Justo/Desktop/tango-jets-fe/src/pages/Airships.astro";
const $$url = "/Airships";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Airships,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

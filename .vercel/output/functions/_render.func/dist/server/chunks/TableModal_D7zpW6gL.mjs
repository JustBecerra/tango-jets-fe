import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { Modal, Button } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { L as LoaderSpinner } from './LoaderSpinner_ALWPhgDz.mjs';

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

const Delete = ({ id, caseType }) => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteAction({ caseType, id });
      window.location.reload();
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
        onClick: () => setOpenModal(true),
        children: /* @__PURE__ */ jsx(
          "svg",
          {
            className: "w-6 h-6 text-gray-800 dark:text-white hover:text-red-500 dark:hover:text-red-500",
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
            /* @__PURE__ */ jsx(HiOutlineExclamationCircle, { className: "mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" }),
            /* @__PURE__ */ jsxs("h3", { className: "mb-5 text-lg font-normal text-gray-500 dark:text-gray-400", children: [
              "Are you sure you want to delete this id ",
              id,
              "?"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-4", children: [
              /* @__PURE__ */ jsx(Button, { className: "bg-red-600", onClick: handleDelete, children: "Yes, I'm sure" }),
              /* @__PURE__ */ jsx(Button, { color: "gray", onClick: () => setOpenModal(false), children: "No, cancel" })
            ] })
          ] }) })
        ]
      }
    ),
    loading && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50", children: /* @__PURE__ */ jsx(LoaderSpinner, {}) })
  ] });
};

const EmptyTableCard = () => {
  return /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center border-2 border-white rounded-lg h-[400px] w-[400px]", children: /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "There is no data to show" }) });
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

const ModalEditCli = ({
  formData,
  handleChange,
  handleEdit,
  setOpenModal
}) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      id: "editClientModal",
      tabIndex: -1,
      "aria-hidden": "true",
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto backdrop-filter backdrop-blur-sm bg-opacity-50",
      children: /* @__PURE__ */ jsx("div", { className: "relative w-full max-w-2xl max-h-full", children: /* @__PURE__ */ jsxs("div", { className: "relative bg-white rounded-lg shadow dark:bg-gray-800", children: [
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
        /* @__PURE__ */ jsx("div", { className: "p-6 space-y-6", children: /* @__PURE__ */ jsxs("form", { id: "editClientForm", onSubmit: handleEdit, children: [
          /* @__PURE__ */ jsxs("div", { className: "h-fit mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(
                "label",
                {
                  htmlFor: "firstname",
                  className: "block text-sm font-medium text-gray-900 dark:text-gray-200",
                  children: "First Name"
                }
              ),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  id: "firstname",
                  name: "firstname",
                  value: formData.firstname,
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
                  htmlFor: "lastname",
                  className: "block text-sm font-medium text-gray-900 dark:text-gray-200",
                  children: "Last Name"
                }
              ),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  id: "lastname",
                  name: "lastname",
                  value: formData.lastname,
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
                  htmlFor: "phonenumber",
                  className: "block text-sm font-medium text-gray-900 dark:text-gray-200",
                  children: "Phone"
                }
              ),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "tel",
                  id: "phonenumber",
                  name: "phonenumber",
                  value: formData.phonenumber,
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
                  htmlFor: "documentType",
                  className: "block text-sm font-medium text-gray-900 dark:text-gray-200",
                  children: "Document Type"
                }
              ),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  id: "typeid",
                  name: "typeid",
                  value: formData.typeid,
                  onChange: handleChange,
                  className: "block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                  required: true,
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "DNI", children: "DNI" }),
                    /* @__PURE__ */ jsx("option", { value: "Passport", children: "Passport" })
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
                  children: "Document Number"
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
                  htmlFor: "title",
                  className: "block text-sm font-medium text-gray-900 dark:text-gray-200",
                  children: "Title"
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
                  htmlFor: "address",
                  className: "block text-sm font-medium text-gray-900 dark:text-gray-200",
                  children: "Address"
                }
              ),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  id: "address",
                  name: "address",
                  value: formData.address,
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
                  htmlFor: "company",
                  className: "block text-sm font-medium text-gray-900 dark:text-gray-200",
                  children: "Company"
                }
              ),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  id: "company",
                  name: "company",
                  value: formData.company,
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
      ] }) })
    }
  );
};

const ModalEditJet = ({
  formData,
  handleChange,
  handleEdit,
  setOpenModal
}) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      id: "editJetModal",
      tabIndex: -1,
      "aria-hidden": "true",
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto backdrop-filter backdrop-blur-sm bg-opacity-50",
      children: /* @__PURE__ */ jsx("div", { className: "relative w-full max-w-2xl max-h-full", children: /* @__PURE__ */ jsxs("div", { className: "relative bg-white rounded-lg shadow dark:bg-gray-800", children: [
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
        /* @__PURE__ */ jsx("div", { className: "p-6 space-y-6", children: /* @__PURE__ */ jsxs("form", { id: "addJetForm", onSubmit: handleEdit, children: [
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
                  value: formData.pricepermile,
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
                  className: "block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                children: "Edit Airship"
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
      ] }) })
    }
  );
};

const ModalFlightEdit = ({
  formData,
  handleChange,
  handleEdit,
  setOpenModal
}) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      id: "editFlightModal",
      tabIndex: -1,
      "aria-hidden": "true",
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto backdrop-filter backdrop-blur-sm bg-opacity-50",
      children: /* @__PURE__ */ jsx("div", { className: "relative w-full max-w-2xl max-h-full", children: /* @__PURE__ */ jsxs("div", { className: "relative bg-white rounded-lg shadow dark:bg-gray-800", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-gray-900 dark:text-white", children: "Edit Flight" }),
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
                  value: formData.arrivaltime,
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
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-start items-center py-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                id: "submitEdit",
                type: "submit",
                className: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
                children: "Edit Flight"
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
      ] }) })
    }
  );
};

const Edit = ({ id, caseType, data }) => {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState(data);
  const handleEdit = async (event) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const formData2 = new FormData(formElement);
    const imagesInput = formElement.querySelector(
      'input[name="images"]'
    );
    if (imagesInput?.files) {
      for (let i = 0; i < imagesInput.files.length; i++) {
        formData2.append("images", imagesInput.files[i]);
      }
    }
    try {
      await editAction({ caseType, data: formData2, id }).then(
        () => window.location.reload()
      );
    } catch (error) {
      console.error("Error:", error);
    }
    setOpenModal(false);
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
            className: "w-6 h-6 text-gray-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-500",
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
        setOpenModal
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

const TableModal = ({ info, caseType }) => {
  const [data, setData] = useState(info);
  const [isHistoryPage, setIsHistoryPage] = useState(false);
  useEffect(() => {
    setData(info);
    setIsHistoryPage(window.location.pathname === "/History");
  }, [info]);
  return /* @__PURE__ */ jsx("div", { className: "relative overflow-x-auto overflow-y-auto max-h-[800px] w-full max-w-[100%] shadow-md sm:rounded-lg", children: data.length > 0 ? /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400", children: [
    /* @__PURE__ */ jsx("thead", { className: "sticky top-0 text-xs text-gray-700 uppercase bg-gray-400 dark:bg-gray-700 dark:text-gray-400", children: /* @__PURE__ */ jsxs("tr", { children: [
      Object.entries(data[0]).map(
        ([key, value], index) => /* @__PURE__ */ jsx(
          "th",
          {
            scope: "col",
            className: "px-6 py-3",
            children: key
          },
          index
        )
      ),
      /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3", children: "Action" })
    ] }) }),
    /* @__PURE__ */ jsx("tbody", { children: data.map((singledata) => /* @__PURE__ */ jsxs(
      "tr",
      {
        className: "bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600",
        children: [
          Object.entries(singledata).map(
            ([key, value]) => /* @__PURE__ */ jsx(
              "td",
              {
                className: "px-6 py-3 whitespace-nowrap",
                children: value
              },
              key
            )
          ),
          /* @__PURE__ */ jsxs("td", { className: "px-6 py-3 flex whitespace-nowrap", children: [
            !isHistoryPage && /* @__PURE__ */ jsx(
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
                caseType
              }
            )
          ] })
        ]
      },
      singledata.id
    )) })
  ] }) : /* @__PURE__ */ jsx(EmptyTableCard, {}) });
};

export { TableModal as T };

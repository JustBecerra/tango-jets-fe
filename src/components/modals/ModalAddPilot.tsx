import React, { useState } from "react";
import { Toast } from "flowbite-react";
import { HiCheck } from "react-icons/hi";
import { addPilot, getPilots } from "../../../lib/actions/pilots/actions";
import LoaderSpinner from "../Loaders/LoaderSpinner";
import { z } from "zod";
import useStore from "../../store/store";

const Pilot = z.object({
  fullname: z.string(),
  phonenumber: z.string(),
  weight: z.string(),
  email: z.string(),
  type: z.string(),
  passport: z.string(),
  date_of_birth: z.string(),
  expiration_date: z.string(),
});

const ModalAddPilot: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    fullname: "",
    phonenumber: "",
    weight: "",
    email: "",
    type: "",
    passport: "",
    date_of_birth: "",
    expiration_date: "",
  });
  const { updatePilots } = useStore((state) => state);
  const handleToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formElement = event.target as HTMLFormElement;
      const formData = new FormData(formElement);
      const pilotData = Object.fromEntries(formData.entries());

      const parsedData = Pilot.parse({
        fullname: pilotData.fullname,
        phonenumber: pilotData.phonenumber,
        weight: pilotData.weight,
        email: pilotData.email,
        type: pilotData.type,
        passport: pilotData.passport,
        date_of_birth: pilotData.date_of_birth,
        expiration_date: pilotData.expiration_date,
      });

      const transformedPilotData = {
        fullname: parsedData.fullname,
        phonenumber: parsedData.phonenumber,
        weight: parsedData.weight,
        email: parsedData.email,
        type: parsedData.type,
        passport: parsedData.passport,
        date_of_birth: parsedData.date_of_birth,
        expiration_date: parsedData.expiration_date,
      };

      const response = await addPilot(transformedPilotData);
      const pilots = await getPilots();
      updatePilots(pilots);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        window.location.reload();
      }, 2000);
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error adding pilot:", err);
      if (err instanceof z.ZodError) {
        const newErrors = {
          fullname:
            err.errors.find((e) => e.path[0] === "fullname")?.message || "",
          phonenumber:
            err.errors.find((e) => e.path[0] === "phonenumber")?.message || "",
          weight: err.errors.find((e) => e.path[0] === "weight")?.message || "",
          email: err.errors.find((e) => e.path[0] === "email")?.message || "",
          type: err.errors.find((e) => e.path[0] === "type")?.message || "",
          passport:
            err.errors.find((e) => e.path[0] === "passport")?.message || "",
          date_of_birth:
            err.errors.find((e) => e.path[0] === "date_of_birth")?.message ||
            "",
          expiration_date:
            err.errors.find((e) => e.path[0] === "expiration_date")?.message ||
            "",
        };
        setErrors(newErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        type="button"
        onClick={handleToggleModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        <span className="text-sm font-medium text-gray-800">New Pilot</span>
      </button>

      {isModalOpen && (
        <div
          id="addPilotModal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto backdrop-filter backdrop-blur-sm bg-opacity-50"
        >
          <div className="relative w-full max-w-2xl max-h-full bg-gradient-to-b from-[#BFE4FC] to-[#FFFFFF]">
            <div className="relative bg-[#166ba3] bg-opacity-30 backdrop-blur-md rounded-lg shadow-lg">
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Add New Pilot
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={handleToggleModal}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-6 space-y-6">
                <form id="addPilotForm" onSubmit={handleSubmit}>
                  <div className="h-fit mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="fullname"
                        className="block text-sm font-medium text-gray-900 dark:text-gray-200"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                      {errors.fullname && (
                        <p className="text-red-500 text-xs">
                          {errors.fullname}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="phonenumber"
                        className="block text-sm font-medium text-gray-900 dark:text-gray-200"
                      >
                        Phone Number
                      </label>
                      <input
                        type="text"
                        id="phonenumber"
                        name="phonenumber"
                        className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {errors.phonenumber && (
                        <p className="text-red-500 text-xs">
                          {errors.phonenumber}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="weight"
                        className="block text-sm font-medium text-gray-900 dark:text-gray-200"
                      >
                        Weight
                      </label>
                      <input
                        type="text"
                        id="weight"
                        name="weight"
                        className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {errors.weight && (
                        <p className="text-red-500 text-xs">{errors.weight}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-900 dark:text-gray-200"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="type"
                        className="block text-sm font-medium text-gray-900 dark:text-gray-200"
                      >
                        Type
                      </label>
                      <input
                        type="text"
                        id="type"
                        name="type"
                        className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {errors.type && (
                        <p className="text-red-500 text-xs">{errors.type}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="passport"
                        className="block text-sm font-medium text-gray-900 dark:text-gray-200"
                      >
                        Passport
                      </label>
                      <input
                        type="text"
                        id="passport"
                        name="passport"
                        className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {errors.passport && (
                        <p className="text-red-500 text-xs">
                          {errors.passport}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="date_of_birth"
                        className="block text-sm font-medium text-gray-900 dark:text-gray-200"
                      >
                        Date of Birth
                      </label>
                      <input
                        type="datetime-local"
                        defaultValue={new Date().toISOString().slice(0, 16)}
                        id="date_of_birth"
                        name="date_of_birth"
                        className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {errors.date_of_birth && (
                        <p className="text-red-500 text-xs">
                          {errors.date_of_birth}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="expiration_date"
                        className="block text-sm font-medium text-gray-900 dark:text-gray-200"
                      >
                        Expiration Date
                      </label>
                      <input
                        type="datetime-local"
                        defaultValue={new Date().toISOString().slice(0, 16)}
                        id="expiration_date"
                        name="expiration_date"
                        className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {errors.expiration_date && (
                        <p className="text-red-500 text-xs">
                          {errors.expiration_date}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-start items-center py-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button
                      id="submitPilot"
                      type="submit"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Add Pilot
                    </button>
                    <button
                      type="button"
                      className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                      onClick={handleToggleModal}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <LoaderSpinner />
        </div>
      )}

      {showToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2">
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
              <HiCheck className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">
              Pilot added successfully.
            </div>
            <Toast.Toggle onClick={() => setShowToast(false)} />
          </Toast>
        </div>
      )}
    </>
  );
};

export default ModalAddPilot;

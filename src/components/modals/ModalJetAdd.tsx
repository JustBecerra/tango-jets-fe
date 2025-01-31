import React, { useState } from "react";
import { Toast } from "flowbite-react";
import { HiCheck } from "react-icons/hi";
import { addAirship } from "../../../lib/actions/airships/actions";
import LoaderSpinner from "../Loaders/LoaderSpinner";
import { PortraitImage } from "../input/PortraitImage";
import { GenericImage } from "../input/GenericImage";

const AddJetModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [portraitData, setPortraitData] = useState<File>(
    new File(["initial content"], "", { type: "text/plain" })
  );
  const [genericData, setGenericData] = useState<File[]>([]);

  const handleToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleDrop = ({
    event,
    type,
  }: {
    event: React.DragEvent<HTMLDivElement>;
    type: string;
  }) => {
    event.preventDefault();
    event.stopPropagation();
    if (type === "generic") {
      const droppedFiles = Array.from(event.dataTransfer.files);
      setGenericData((prevFiles) => [...prevFiles, ...droppedFiles]);
    } else if (type === "portrait") {
      const selectedFile = event.dataTransfer.files[0];
      setPortraitData(selectedFile);
    }
  };

  const handleFileChange = ({
    event,
    type,
  }: {
    event: React.ChangeEvent<HTMLInputElement>;
    type: string;
  }) => {
    if (type === "generic") {
      const selectedFiles = Array.from(event.target.files || []);
      setGenericData((prevFiles) => [...prevFiles, ...selectedFiles]);
    } else if (type === "portrait") {
      if (event.target.files) {
        const selectedFile = event.target.files[0];
        setPortraitData(selectedFile);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);

    formData.set("title", formData.get("title") as string);
    formData.set("status", formData.get("status") as string);
    formData.set("seats", formData.get("seats") as string);
    formData.set("size", formData.get("size") as string);

    const imagesInput = document.querySelector<HTMLInputElement>(
      'input[name="generic"]'
    );
    if (imagesInput?.files) {
      for (let i = 0; i < imagesInput.files.length - 1; i++) {
        formData.append("generic", imagesInput.files[i]);
      }
    }

    const portraitImageInput = document.querySelector<HTMLInputElement>(
      'input[name="portrait"]'
    );

    if (portraitImageInput?.files) {
      formData.append("portrait", portraitImageInput.files[0]);
    }

    try {
      const response = await addAirship(formData); // Pass formData here

      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        setIsModalOpen(false);
      }, 2000);
    } catch (err) {
      console.error("Error adding airship or uploading files:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        id="addJetButton"
        className="block text-white  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-green-600 hover:bg-green-700 focus:ring-green-800"
        type="button"
        onClick={handleToggleModal}
      >
        Add Airship
      </button>

      {isModalOpen && (
        <div
          id="addJetModal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto backdrop-filter backdrop-blur-sm bg-opacity-50"
        >
          <div className="relative w-full max-w-3xl max-h-full">
            <div className="relative  rounded-lg shadow bg-gray-800">
              <div className="flex items-start justify-between p-4 border-b rounded-t border-gray-600">
                <h3 className="text-xl font-semibold text-white">
                  Add New Airship
                </h3>
                <button
                  type="button"
                  className=" bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
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
                <form id="addJetForm" onSubmit={handleSubmit}>
                  <div className="h-fit mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-200"
                      >
                        Operator Make Model
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="block w-full px-4 py-2 mt-1 text-sm  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-200"
                      >
                        Tail Number
                      </label>
                      <input
                        type="text"
                        id="status"
                        name="status"
                        className="block w-full px-4 py-2 mt-1 text-sm bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="seats"
                        className="block text-sm font-medium text-gray-200"
                      >
                        Seats
                      </label>
                      <input
                        type="number"
                        id="seats"
                        name="seats"
                        className="block w-full px-4 py-2 mt-1 text-sm bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="size"
                        className="block text-sm font-medium text-gray-200"
                      >
                        Size
                      </label>
                      <select
                        id="size"
                        name="size"
                        className="block w-full px-4 py-2 mt-1 text-sm bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="" disabled selected>
                          Select a size
                        </option>
                        <option value="Turbo-prop">Turbo prop</option>
                        <option value="Light-jet">Light jet</option>
                        <option value="Midsize-jet">Midsize jet</option>
                        <option value="Sup-Midsize-Jet">
                          Super Midsize Jet
                        </option>
                        <option value="Heavy-jet">Heavy jet</option>
                        <option value="Ultra-Long-Range">
                          Ultra Long Range
                        </option>
                      </select>
                    </div>
                    <PortraitImage
                      handleDragOver={handleDragOver}
                      handleDrop={handleDrop}
                      handleFileChange={handleFileChange}
                      portraitData={portraitData}
                    />

                    <GenericImage
                      handleDragOver={handleDragOver}
                      handleDrop={handleDrop}
                      handleFileChange={handleFileChange}
                      genericData={genericData}
                    />
                  </div>
                  <div className="flex justify-start items-center py-6 space-x-2 border-t rounded-b border-gray-600">
                    <button
                      id="submitJet"
                      type="submit"
                      className="text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                    >
                      Add Jet
                    </button>
                    <button
                      type="button"
                      className=" focus:ring-4 focus:outline-none  rounded-lg border text-sm font-medium px-5 py-2.5 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
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
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 bg-green-800 text-green-200">
              <HiCheck className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">
              Jet added successfully.
            </div>
            <Toast.Toggle onClick={() => setShowToast(false)} />
          </Toast>
        </div>
      )}
    </>
  );
};

export default AddJetModal;

import { useState } from "react";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { deleteAction } from "../../../lib/actions/delete/actions";
import LoaderSpinner from "../Loaders/LoaderSpinner";
import useStore from "../../store/store";
import { getFlights } from "../../../lib/actions/flights/actions";
import type { DataType } from "../table/TableModal";
import { getClients } from "../../../lib/actions/clients/actions";
import { getAirships } from "../../../lib/actions/airships/actions";
import { getPilots } from "../../../lib/actions/pilots/actions";
import type { Pilot } from "../table/TablePilot";

interface Props<T> {
  id: number;
  caseType: string;
  setData: React.Dispatch<React.SetStateAction<T[]>>;
}

const Delete = <T extends Pilot | DataType>({
  id,
  caseType,
  setData,
}: Props<T>) => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { updateFlights, updateAirships, updateClients } = useStore(
    (state) => state
  );
  const handleDelete = async (e: any) => {
    e.stopPropagation();
    setLoading(true);
    try {
      await deleteAction({ caseType: caseType, id });
      if (caseType === "flight") {
        const newFlights = await getFlights();
        setData(
          newFlights
            .map((flight: any) => {
              const { updatedAt, ...rest } = flight;
              return rest;
            })
            .filter((flight: any) => {
              const launchTime = new Date(flight.launchtime);
              const currentTime = new Date();
              return currentTime < launchTime;
            })
        );
        updateFlights(newFlights);
      } else if (caseType === "client") {
        const newClients = await getClients();
        setData(newClients);
        updateClients(newClients);
      } else if (caseType === "airship") {
        const newAirships = await getAirships();
        setData(newAirships);
        updateAirships(newAirships);
      } else if (caseType === "pilot") {
        const newPilots = await getPilots();
        setData(newPilots);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      setOpenModal(false);
    }
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <button
        className="bg-transparent p-2 ml-2"
        onClick={(e) => {
          e.stopPropagation();
          setOpenModal(true);
        }}
      >
        <svg
          className="w-6 h-6 text-red-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
          />
        </svg>
      </button>

      <Modal
        show={openModal}
        size="md"
        onClose={() => {
          setOpenModal(false);
        }}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-white" />
            <h3 className="mb-5 text-lg font-normal text-white">
              Are you sure you want to delete this id {id}?
            </h3>
            <div className="flex justify-center gap-4">
              <Button className="bg-red-600" onClick={handleDelete}>
                Yes, I'm sure
              </Button>
              <Button
                color="gray"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenModal(false);
                }}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <LoaderSpinner />
        </div>
      )}
    </div>
  );
};

export default Delete;

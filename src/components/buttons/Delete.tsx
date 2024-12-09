import { useState } from "react";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { deleteAction } from "../../../lib/actions/delete/actions";
import LoaderSpinner from "../Loaders/LoaderSpinner";

interface Props {
  id: number;
  caseType: string;
}

const Delete = ({ id, caseType }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      //PARA PROBAR EL LOADER
      // await new Promise((resolve) => setTimeout(resolve, 5000));
      await deleteAction({ caseType: caseType, id });
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      setOpenModal(false); // Cierra el modal después de eliminar
    }
  };

  return (
    <div>
      <button
        className="bg-transparent p-2 ml-2"
        onClick={() => setOpenModal(true)}
      >
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white hover:text-red-500 dark:hover:text-red-500"
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
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this id {id}?
            </h3>
            <div className="flex justify-center gap-4">
              <Button className="bg-red-600" onClick={handleDelete}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
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

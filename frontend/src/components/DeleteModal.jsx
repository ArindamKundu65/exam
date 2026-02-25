import React from "react";
import axios from "axios";
import toast from "react-hot-toast";

const DeleteModal = ({ setdelModal, noteId, getAll }) => {

  const handleDelete = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {
      await axios.delete(
        `http://localhost:8000/note/delete/${noteId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Note deleted successfully");

      setdelModal(false);
      getAll();
    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-5 rounded shadow-lg">
        <h2 className="mb-4">Are you sure?</h2>

        <div className="flex justify-between">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white"
          >
            Yes
          </button>

          <button
            onClick={() => setdelModal(false)}
            className="px-4 py-2 bg-gray-400 text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
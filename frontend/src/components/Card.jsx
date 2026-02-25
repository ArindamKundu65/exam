import React, { useState } from "react";
import DeleteModal from "./DeleteModal";

const Card = ({ title, id, getAll, description }) => {
  const [delModal, setDelModal] = useState(false);

  return (
    <div className="w-96 m-auto mt-5 bg-blue-50 p-2 flex justify-between">
      <div>{title}</div>
      <div>{description}</div>


      <button onClick={() => setDelModal(true)}>
        🗑️
      </button>

      {delModal && (
        <DeleteModal
          setdelModal={setDelModal}
          noteId={id}
          getAll={getAll}
        />
      )}
    </div>
  );
};

export default Card;
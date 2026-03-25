import React, { useState } from "react";

const ParticipantList = ({ participants, onRemoveParticipant }) => {
  const [confirmIndex, setConfirmIndex] = useState(null);

  const handleRemove = (index) => {
    onRemoveParticipant(index);
    setConfirmIndex(null);
  };

  return (
    <ul className="list-none mt-4 space-y-3">
      {participants.map((participant, index) => (
        <li
          key={participant.name}
          className="bg-white p-4 shadow-md rounded-lg flex justify-between items-center"
        >
          <span className="font-medium text-neutral">
            {participant.name}: ${participant.amount.toFixed(2)}
          </span>

          {confirmIndex === index ? (
            <div className="flex gap-2 items-center">
              <span className="text-sm text-gray-600">¿Eliminar?</span>
              <button
                className="bg-danger text-white px-3 py-1 rounded-lg hover:bg-red-700 transition text-sm"
                onClick={() => handleRemove(index)}
              >
                Sí
              </button>
              <button
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300 transition text-sm"
                onClick={() => setConfirmIndex(null)}
              >
                No
              </button>
            </div>
          ) : (
            <button
              className="bg-danger text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
              onClick={() => setConfirmIndex(index)}
            >
              Eliminar
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ParticipantList;

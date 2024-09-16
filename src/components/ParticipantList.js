import React from "react";

const ParticipantList = ({ participants, onRemoveParticipant }) => {
  return (
    <ul className="list-none mt-4 space-y-3">
      {participants.map((participant, index) => (
        <li
          key={index}
          className="bg-white p-4 shadow-md rounded-lg flex justify-between items-center"
        >
          <span className="font-medium text-neutral">
            {participant.name}: ${participant.amount.toFixed(2)}
          </span>
          <button
            className="bg-danger text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
            onClick={() => onRemoveParticipant(index)}
          >
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ParticipantList;

import React from "react";

const ParticipantList = ({ participants, onRemoveParticipant }) => {
  return (
    <ul className="list-none">
      {participants.map((participant, index) => (
        <li
          key={index}
          className="bg-blue-100 p-3 mb-2 flex justify-between items-center rounded-lg"
        >
          <span>{participant.name}: ${participant.amount.toFixed(2)}</span>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
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

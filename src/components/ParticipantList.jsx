import React, { useState } from "react";

const ParticipantList = ({
  participants,
  onRemoveParticipant,
  onEditParticipant,
  onClearAll,
}) => {
  const [confirmIndex, setConfirmIndex] = useState(null);
  const [confirmClear, setConfirmClear] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [editError, setEditError] = useState("");

  const handleRemove = (index) => {
    onRemoveParticipant(index);
    setConfirmIndex(null);
    if (editIndex === index) {
      setEditIndex(null);
      setEditValue("");
      setEditError("");
    }
  };

  const handleEditStart = (index, currentAmount) => {
    setEditIndex(index);
    setEditValue(String(currentAmount));
    setEditError("");
    setConfirmIndex(null);
  };

  const handleEditSave = (index) => {
    const parsed = parseFloat(editValue);
    if (editValue === "" || isNaN(parsed) || parsed < 0) {
      setEditError("Ingresá un número mayor o igual a cero.");
      return;
    }
    onEditParticipant(index, parsed);
    setEditIndex(null);
    setEditValue("");
    setEditError("");
  };

  const handleEditCancel = () => {
    setEditIndex(null);
    setEditValue("");
    setEditError("");
  };

  const handleClearAll = () => {
    onClearAll();
    setConfirmClear(false);
    setConfirmIndex(null);
    setEditIndex(null);
  };

  if (participants.length === 0) return null;

  return (
    <div className="mt-4">
      {/* Botón Limpiar todo */}
      <div className="flex justify-end mb-2">
        {confirmClear ? (
          <div className="flex gap-2 items-center">
            <span className="text-sm text-gray-600">¿Eliminar todos?</span>
            <button
              className="bg-danger text-white px-3 py-1 rounded-lg hover:bg-red-700 transition text-sm"
              onClick={handleClearAll}
            >
              Sí, limpiar
            </button>
            <button
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300 transition text-sm"
              onClick={() => setConfirmClear(false)}
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button
            className="text-sm text-danger underline hover:text-red-700 transition"
            onClick={() => setConfirmClear(true)}
          >
            Limpiar todo
          </button>
        )}
      </div>

      <ul className="list-none space-y-3">
        {participants.map((participant, index) => (
          <li
            key={`${participant.name}-${index}`}
            className="bg-white p-4 shadow-md rounded-lg"
          >
            {editIndex === index ? (
              /* Modo edición */
              <div className="flex flex-col gap-2">
                <span className="font-medium text-neutral">{participant.name}</span>
                <div className="flex gap-2 items-center">
                  <label htmlFor={`edit-amount-${index}`} className="sr-only">
                    Monto de {participant.name}
                  </label>
                  <input
                    id={`edit-amount-${index}`}
                    type="number"
                    value={editValue}
                    min="0"
                    step="0.01"
                    autoFocus
                    onChange={(e) => {
                      setEditValue(e.target.value);
                      setEditError("");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleEditSave(index);
                      if (e.key === "Escape") handleEditCancel();
                    }}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-32 text-sm"
                  />
                  <button
                    className="bg-secondary text-white px-3 py-1 rounded-lg hover:bg-green-600 transition text-sm"
                    onClick={() => handleEditSave(index)}
                  >
                    Guardar
                  </button>
                  <button
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300 transition text-sm"
                    onClick={handleEditCancel}
                  >
                    Cancelar
                  </button>
                </div>
                {editError && (
                  <p className="text-danger text-xs font-medium">{editError}</p>
                )}
              </div>
            ) : (
              /* Modo normal */
              <div className="flex justify-between items-center">
                <span className="font-medium text-neutral">
                  {participant.name}:{" "}
                  <strong className="text-primary">
                    ${participant.amount.toFixed(2)}
                  </strong>
                </span>
                <div className="flex gap-2">
                  <button
                    aria-label={`Editar monto de ${participant.name}`}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-200 transition text-sm border border-gray-300"
                    onClick={() => handleEditStart(index, participant.amount)}
                  >
                    ✏️ Editar
                  </button>
                  {confirmIndex === index ? (
                    <div className="flex gap-2 items-center">
                      <span className="text-sm text-gray-600">¿Eliminar?</span>
                      <button
                        aria-label={`Confirmar eliminar a ${participant.name}`}
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
                      aria-label={`Eliminar a ${participant.name}`}
                      className="bg-danger text-white px-3 py-1 rounded-lg hover:bg-red-600 transition text-sm"
                      onClick={() => setConfirmIndex(index)}
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipantList;

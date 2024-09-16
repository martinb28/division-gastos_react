import React, { useState } from "react";

const Form = ({ onAddParticipant }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && !isNaN(parseFloat(amount))) {
      onAddParticipant(name, parseFloat(amount));
      setName("");
      setAmount("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg"
        placeholder="Nombre del participante"
        required
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg"
        placeholder="Gasto"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
      >
        Agregar
      </button>
    </form>
  );
};

export default Form;

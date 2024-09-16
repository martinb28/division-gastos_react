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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg"
    >
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Nombre del participante"
        required
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Gasto"
        required
      />
      <button type="submit" className="bg-primary text-white p-3 rounded-lg">
        Agregar
      </button>
    </form>
  );
};

export default Form;

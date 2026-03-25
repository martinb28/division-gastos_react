import React, { useState } from "react";

const Form = ({ onAddParticipant }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("El nombre no puede estar vacío.");
      return;
    }
    if (amount === "" || isNaN(parseFloat(amount)) || parseFloat(amount) < 0) {
      setError("El gasto debe ser un número mayor o igual a cero.");
      return;
    }

    onAddParticipant(name.trim(), parseFloat(amount));
    setName("");
    setAmount("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg"
    >
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError("");
        }}
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Nombre del participante"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
          setError("");
        }}
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Gasto (0 si no aportó)"
        min="0"
        step="0.01"
      />
      {error && (
        <p className="text-danger text-sm font-medium">{error}</p>
      )}
      <button
        type="submit"
        className="bg-primary text-white p-3 rounded-lg hover:bg-blue-600 transition"
      >
        Agregar
      </button>
    </form>
  );
};

export default Form;

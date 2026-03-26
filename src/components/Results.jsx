import React from "react";
import { calculateDebts } from "../utils/calculateDebts";

const Results = ({ participants }) => {
  if (participants.length === 0) return null;

  const totalAmount = participants.reduce((sum, p) => sum + p.amount, 0);
  const averageAmount = totalAmount / participants.length;
  const transactions = calculateDebts(participants);

  return (
    <div className="mt-5 bg-white p-5 rounded-lg shadow-lg">
      <p className="text-lg font-semibold mb-2">
        Total gastado:{" "}
        <strong className="text-primary">${totalAmount.toFixed(2)}</strong>
      </p>
      <p className="text-lg font-semibold mb-4">
        Promedio a pagar por persona:{" "}
        <strong className="text-primary">${averageAmount.toFixed(2)}</strong>
      </p>

      {transactions.length === 0 ? (
        <p className="text-green-600 font-medium">
          ✅ Todos pagaron la misma parte. ¡No hay deudas!
        </p>
      ) : (
        transactions.map((t) => (
          <p key={`${t.from}-${t.to}`} className="mb-1">
            <span className="text-danger font-medium">{t.from}</span> debe pagar
            a <span className="text-secondary font-medium">{t.to}</span>{" "}
            <strong>${t.amount.toFixed(2)}</strong>
          </p>
        ))
      )}
    </div>
  );
};

export default Results;

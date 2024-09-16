import React from "react";

const Results = ({ participants }) => {
  if (participants.length === 0) return null;

  const totalAmount = participants.reduce(
    (sum, participant) => sum + participant.amount,
    0
  );
  const averageAmount = totalAmount / participants.length;

  const debts = participants.map((participant) => ({
    name: participant.name,
    amount: participant.amount - averageAmount,
  }));

  const creditors = debts.filter((debt) => debt.amount > 0);
  const debtors = debts.filter((debt) => debt.amount < 0);

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

      {creditors.map((creditor) =>
        debtors.map((debtor) => {
          if (creditor.amount === 0 || debtor.amount === 0) return null;

          const debtToSettle = Math.min(creditor.amount, -debtor.amount);
          creditor.amount -= debtToSettle;
          debtor.amount += debtToSettle;

          return (
            <p key={`${debtor.name}-${creditor.name}`} className="mb-1">
              <span className="text-danger">{debtor.name}</span> debe pagar a{" "}
              <span className="text-secondary">{creditor.name}</span>{" "}
              <strong>${debtToSettle.toFixed(2)}</strong>
            </p>
          );
        })
      )}
    </div>
  );
};

export default Results;

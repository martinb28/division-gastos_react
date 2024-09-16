import React from "react";

const Results = ({ participants }) => {
  if (participants.length === 0) return null;

  const totalAmount = participants.reduce((sum, participant) => sum + participant.amount, 0);
  const averageAmount = totalAmount / participants.length;

  const debts = participants.map(participant => ({
    name: participant.name,
    amount: participant.amount - averageAmount
  }));

  const creditors = debts.filter(debt => debt.amount > 0);
  const debtors = debts.filter(debt => debt.amount < 0);

  return (
    <div className="mt-5 bg-blue-50 p-5 rounded-lg">
      <p>Total gastado: <strong>${totalAmount.toFixed(2)}</strong></p>
      <p>Promedio a pagar por persona: <strong>${averageAmount.toFixed(2)}</strong></p>

      {creditors.map(creditor => {
        return debtors.map(debtor => {
          if (creditor.amount === 0 || debtor.amount === 0) return null;

          const debtToSettle = Math.min(creditor.amount, -debtor.amount);
          creditor.amount -= debtToSettle;
          debtor.amount += debtToSettle;

          return (
            <p key={`${debtor.name}-${creditor.name}`}>
              {debtor.name} debe pagar a {creditor.name} ${debtToSettle.toFixed(2)}
            </p>
          );
        });
      })}
    </div>
  );
};

export default Results;

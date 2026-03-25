/**
 * Calcula las transacciones mínimas necesarias para saldar deudas entre participantes.
 * Algoritmo greedy de dos punteros — O(n log n).
 *
 * @param {Array<{name: string, amount: number}>} participants
 * @returns {Array<{from: string, to: string, amount: number}>}
 */
export function calculateDebts(participants) {
  if (participants.length === 0) return [];

  const total = participants.reduce((sum, p) => sum + p.amount, 0);
  const average = total / participants.length;

  // Balance de cada participante: positivo = acreedor, negativo = deudor
  const balances = participants.map((p) => ({
    name: p.name,
    balance: parseFloat((p.amount - average).toFixed(10)),
  }));

  const creditors = balances
    .filter((p) => p.balance > 0)
    .sort((a, b) => b.balance - a.balance);

  const debtors = balances
    .filter((p) => p.balance < 0)
    .sort((a, b) => a.balance - b.balance);

  const transactions = [];
  let i = 0; // índice en creditors
  let j = 0; // índice en debtors

  while (i < creditors.length && j < debtors.length) {
    const pay = parseFloat(
      Math.min(creditors[i].balance, -debtors[j].balance).toFixed(2)
    );

    if (pay > 0) {
      transactions.push({
        from: debtors[j].name,
        to: creditors[i].name,
        amount: pay,
      });
    }

    creditors[i].balance = parseFloat((creditors[i].balance - pay).toFixed(10));
    debtors[j].balance = parseFloat((debtors[j].balance + pay).toFixed(10));

    if (Math.abs(creditors[i].balance) < 0.001) i++;
    if (Math.abs(debtors[j].balance) < 0.001) j++;
  }

  return transactions;
}

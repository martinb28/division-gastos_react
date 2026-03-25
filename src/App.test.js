import { calculateDebts } from './utils/calculateDebts';

describe('calculateDebts', () => {
  test('retorna array vacío si no hay participantes', () => {
    expect(calculateDebts([])).toEqual([]);
  });

  test('un solo participante → sin deudas', () => {
    const result = calculateDebts([{ name: 'Ana', amount: 100 }]);
    expect(result).toEqual([]);
  });

  test('todos pagaron lo mismo → sin deudas', () => {
    const participants = [
      { name: 'Ana', amount: 60 },
      { name: 'Bob', amount: 60 },
      { name: 'Carlos', amount: 60 },
    ];
    expect(calculateDebts(participants)).toEqual([]);
  });

  test('caso simple 2 personas: Bob le debe a Ana', () => {
    const participants = [
      { name: 'Ana', amount: 80 },
      { name: 'Bob', amount: 20 },
    ];
    const result = calculateDebts(participants);
    expect(result).toHaveLength(1);
    expect(result[0].from).toBe('Bob');
    expect(result[0].to).toBe('Ana');
    expect(result[0].amount).toBeCloseTo(30, 2);
  });

  test('3 personas con balances distintos — mínimas transacciones', () => {
    // Ana pagó 90, Bob pagó 30, Carlos pagó 60 → promedio 60
    // Ana creditor +30, Bob debtor -30, Carlos equilibrado
    const participants = [
      { name: 'Ana', amount: 90 },
      { name: 'Bob', amount: 30 },
      { name: 'Carlos', amount: 60 },
    ];
    const result = calculateDebts(participants);
    expect(result).toHaveLength(1);
    expect(result[0].from).toBe('Bob');
    expect(result[0].to).toBe('Ana');
    expect(result[0].amount).toBeCloseTo(30, 2);
  });

  test('3 personas con un deudor que paga a dos acreedores', () => {
    // Ana 0, Bob 0, Carlos 90 → promedio 30
    // Ana debtor -30, Bob debtor -30, Carlos creditor +60
    const participants = [
      { name: 'Ana', amount: 0 },
      { name: 'Bob', amount: 0 },
      { name: 'Carlos', amount: 90 },
    ];
    const result = calculateDebts(participants);
    expect(result).toHaveLength(2);
    const totals = result.reduce((sum, t) => sum + t.amount, 0);
    expect(totals).toBeCloseTo(60, 2);
    result.forEach((t) => expect(t.to).toBe('Carlos'));
  });

  test('no muta los participantes originales', () => {
    const participants = [
      { name: 'Ana', amount: 100 },
      { name: 'Bob', amount: 0 },
    ];
    const original = JSON.stringify(participants);
    calculateDebts(participants);
    expect(JSON.stringify(participants)).toBe(original);
  });
});

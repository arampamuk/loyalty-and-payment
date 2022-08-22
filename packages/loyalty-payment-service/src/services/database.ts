export const addTransaction = (transaction: Transaction) => {
  database.push(transaction);
};

export const getUserTotalPoints = (userId: string) => {
  const previousTransactions = database.filter(
    (transaction) => transaction.userId === userId
  );

  const totalPoints = previousTransactions.reduce(
    (previousValue, currentValue) => previousValue + currentValue.points,
    0
  );

  return totalPoints;
};

export interface Transaction {
  userId: string;
  payment: number;
  points: number;
  transactionDate: number;
}

export const database: Transaction[] = [
  {
    userId: '1',
    payment: 200,
    points: 4,
    transactionDate: 1661167283,
  },
  {
    userId: '1',
    payment: 100,
    points: 2,
    transactionDate: 1650622883,
  },
  {
    userId: '2',
    payment: 50,
    points: 0.5,
    transactionDate: 1647948083,
  },
  {
    userId: '2',
    payment: 150,
    points: 1.5,
    transactionDate: 1647775283,
  },
];

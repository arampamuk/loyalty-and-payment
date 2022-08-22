import * as databaseService from './database';

describe('Database Service Tests', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
    while (!databaseService.database.pop()) {} //reset database values
  });

  it('should export a addTransaction function', () => {
    expect(databaseService.addTransaction).toBeInstanceOf(Function);
  });

  it('should add a transaction successfully', () => {
    // Arrange
    const transaction = {
      userId: '5',
      payment: 100,
      points: 2,
      transactionDate: 1650622883,
    };

    // Act + Assert
    databaseService.addTransaction(transaction);
    const addedUserTotalPoint = databaseService.getUserTotalPoints(
      transaction.userId
    );
    expect(addedUserTotalPoint).toEqual(transaction.points);
  });

  it('should get a user total point successfully', () => {
    // Arrange
    const userId = '5';
    const transaction1 = {
      userId,
      payment: 100,
      points: 2,
      transactionDate: 1650622883,
    };
    const transaction2 = {
      ...transaction1,
      payment: 200,
      points: 4,
    };

    databaseService.addTransaction(transaction1);
    databaseService.addTransaction(transaction2);

    // Act
    const actual = databaseService.getUserTotalPoints(userId);
    //Assert

    expect(actual).toEqual(transaction1.points + transaction2.points);
  });
});

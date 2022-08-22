import * as chargePaymentService from './charge-payment';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

describe('chargePayment Service Tests', () => {
  const baseURL = `http://localhost:3000`;
  let mockAdapter: MockAdapter;

  beforeEach(() => {
    mockAdapter = new MockAdapter(axios);
    jest.spyOn(console, 'log').mockImplementation(() => {}); // don't show console logs
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
    mockAdapter.reset();
  });

  it('should export a addTransaction function', () => {
    expect(chargePaymentService.chargePayment).toBeInstanceOf(Function);
  });

  it('should return valid result when status 200', async () => {
    // Arrange
    const paymentRequest = { userId: 'userId', amount: 100 };
    mockAdapter
      .onPost(`${baseURL}/monolith/api/charge-payment`)
      .reply(200, 'Payment successful');

    // Act
    const actual = await chargePaymentService.chargePayment(paymentRequest);
    //Assert
    expect(actual).toEqual({ message: 'Payment successful', status: 200 });
  });
});

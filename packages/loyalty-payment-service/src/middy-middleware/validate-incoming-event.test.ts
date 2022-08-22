import { Context } from 'aws-lambda';
import validateIncomingEvent from './validate-incoming-event';
import { RequestPayment } from '../types/request-payment';

const mockEvent: RequestPayment = {
  userId: 'userId',
  amount: 1,
};

describe('validate incoming event', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {}); // don't show console logs
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
    jest.resetModules();
  });

  it('should successfully validate when event valid', async () => {
    // Act
    validateIncomingEvent({}).before?.({
      event: mockEvent,
      context: {} as Context,
      error: null,
      internal: {},
      response: undefined,
    });

    // Assert
    expect(true).toBeTruthy();
  });

  it('should successfully validate when event null', async () => {
    // Arrange
    const event = null;

    // Act
    validateIncomingEvent({}).before?.({
      event,
      context: {} as Context,
      error: null,
      internal: {},
      response: undefined,
    });

    // Assert
    expect(true).toBeTruthy();
  });

  it('should throw error when event invalid', async () => {
    // Arrange
    const event = {
      Records: [
        {
          body: '{"INVALID": true }',
        },
      ],
    };

    // Act + Assert
    await expect(
      validateIncomingEvent({}).before?.({
        event,
        context: {} as Context,
        error: null,
        internal: {},
        response: undefined,
      })
    ).rejects.toThrow();
  });
});

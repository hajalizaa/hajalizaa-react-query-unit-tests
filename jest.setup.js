import '@testing-library/jest-dom';

import axios from 'axios';

jest.mock('axios');

// Mock the axios.create function and return a mock instance
const mockAxiosHandler = {
  get: jest.fn(),
  interceptors: {
    response: {
      use: jest.fn()
    }
  }
};

axios.create.mockReturnValue(mockAxiosHandler);

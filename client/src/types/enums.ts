export enum Status {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}

export enum InputErrors {
  MIN_LENGTH = 'Minimum 4 characters required',
  MIN_LENGTH_PASSWORD = 'Minimum 6 characters required',
  MIN_LENGTH_PHONE = 'Minimum 10 characters required',
  PATTERN = 'Invalid value for field',
  PATTERN_EMAIL = 'Invalid value for email',
  MAX_LENGTH = 'Maximum 15 characters required',
  ERROR = 'Something went wrong',
  REQUIRED = 'Please, enter a value',
}

export enum ErrorMessage {
  ERROR = 'something went wrong',
}
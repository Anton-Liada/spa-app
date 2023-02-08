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

export enum EMessages {
  ERROR = 'Something went wrong.',
  LOGIN_ERROR_MSG = 'You have entered an invalid email or password.',
  REGISTER_ERROR_MSG = 'User with such data already exist.',
  UPDATED_COMPANY_MSG = "Your company has been successfully updated.",
  CREATED_COMPANY_MSG = "Your company has been successfully created.",
  ERROR_COMPANY_MSG = 'Company with such name already exist.',
}
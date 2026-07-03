export const RESPONSE_STATUS = {
  OK: 'ok',
  ERROR: 'error',
} as const;

export const RESPONSE_MESSAGES = {
  BANK_LOAN_DETAILS_FETCHED_SUCCESSFULLY:
    'Bank Loan Details Fetched Successfully',
  SOMETHING_WENT_WRONG: 'Something went wrong. Please try later',
} as const;

export const BASE_INTEREST_RATE = {
  'HDFC Bank': 8.6,
  'ICICI Bank': 8.8,
  'Axis Bank': 9.0,
  'SBI Bank': 8.4,
} as const;

export const LOAN_AMOUNT_ADJUSTMENT = {
  500000: 0.7,
  1000000: 0.4,
  1500000: 0.2,
  2000000: 0.0,
  ABOVE_2000000: -0.2,
} as const;

export const LOAN_TENURE_ADJUSTMENT = {
  36: 0.0,
  60: 0.3,
  84: 0.6,
} as const;

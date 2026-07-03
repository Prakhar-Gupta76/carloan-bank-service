import { Injectable } from '@nestjs/common';
import {
  BASE_INTEREST_RATE,
  LOAN_AMOUNT_ADJUSTMENT,
  LOAN_TENURE_ADJUSTMENT,
  RESPONSE_MESSAGES,
} from '../utils/constants';
import { ApiResponseHelper } from '../utils/api-response.helper';
import { GetQuotesDto } from './dto/get-quotes.dto';

@Injectable()
export class QuotesService {
  getQuotes(getQuotesDto: GetQuotesDto) {
    const loanAmount = Number(getQuotesDto.loan_amount);
    const loanTenure = Number(getQuotesDto.loan_tenure);

    if (!Number.isFinite(loanAmount) || !Number.isFinite(loanTenure)) {
      throw new Error('loan_amount and loan_tenure must be valid numbers');
    }

    const loanAmountAdjustment = this.getLoanAmountAdjustment(loanAmount);
    const loanTenureAdjustment = this.getLoanTenureAdjustment(loanTenure);

    const quotes = Object.entries(BASE_INTEREST_RATE).map(
      ([bank, baseInterestRate]) => ({
        bank,
        interest_rate: Number(
          (
            baseInterestRate +
            loanAmountAdjustment +
            loanTenureAdjustment
          ).toFixed(2),
        ),
      }),
    );

    return ApiResponseHelper.ok(
      RESPONSE_MESSAGES.BANK_LOAN_DETAILS_FETCHED_SUCCESSFULLY,
      quotes,
    );
  }

  private getLoanAmountAdjustment(loanAmount: number) {
    if (loanAmount <= 500000) {
      return LOAN_AMOUNT_ADJUSTMENT[500000];
    }

    if (loanAmount <= 1000000) {
      return LOAN_AMOUNT_ADJUSTMENT[1000000];
    }

    if (loanAmount <= 1500000) {
      return LOAN_AMOUNT_ADJUSTMENT[1500000];
    }

    if (loanAmount <= 2000000) {
      return LOAN_AMOUNT_ADJUSTMENT[2000000];
    }

    return LOAN_AMOUNT_ADJUSTMENT.ABOVE_2000000;
  }

  private getLoanTenureAdjustment(loanTenure: number) {
    if (loanTenure <= 36) {
      return LOAN_TENURE_ADJUSTMENT[36];
    }

    if (loanTenure <= 60) {
      return LOAN_TENURE_ADJUSTMENT[60];
    }

    return LOAN_TENURE_ADJUSTMENT[84];
  }
}

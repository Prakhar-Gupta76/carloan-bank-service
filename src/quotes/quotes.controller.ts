import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponseHelper } from '../utils/api-response.helper';
import { GetQuotesDto } from './dto/get-quotes.dto';
import { QuotesService } from './quotes.service';

@Controller('api/v1')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Post('getQuotes')
  @HttpCode(HttpStatus.OK)
  getQuotes(@Body() getQuotesDto: GetQuotesDto) {
    try {
      return this.quotesService.getQuotes(getQuotesDto);
    } catch (error) {
      return ApiResponseHelper.error(error);
    }
  }
}

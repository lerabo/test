import { Body, Controller, Post } from '@nestjs/common';

import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiGetResponse } from 'src/modules/common/decorators';
import { ExchnageTokenDTO, LinkTokenDTO } from '../dtos/plaid.dto';
import { PlaidService } from '../services/plaid.service';

@ApiTags('plaid')
@Controller('plaid')
export class PlaidController {
  constructor(private readonly plaidService: PlaidService) {}

  @Post('/create-link-token')
  @ApiOperation({ summary: 'create link token' })
  @ApiGetResponse('Successfully created link token', LinkTokenDTO as any)
  async createLinkToken(@Body() data: LinkTokenDTO) {
    return this.plaidService.newToken(data);
  }

  @Post('/exchange-public-token')
  @ApiOperation({ summary: 'exchange public token' })
  @ApiGetResponse('Successfully exchanged token', ExchnageTokenDTO as any)
  async exchangePublicToken(@Body() data: ExchnageTokenDTO) {
    return this.plaidService.exchangeToken(data);
  }
}

import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ExampleEntity } from 'src/entities/example.entity';
import { ApiGetResponse } from 'src/modules/common/decorators';
import { ExampleService } from '../services/example.service';

@ApiTags('example')
@Controller('example')
export class ExampleController {
  constructor(public readonly exampleService: ExampleService) {}

  @Get('/:contract_number')
  @ApiOperation({ summary: 'Get page of Events' })
  @ApiGetResponse('Successfully fetched page of Events', ExampleEntity as any)
  getUserByContactNumber(@Param('contract_number') contractNumber: string) {
    return this.exampleService.getExamples(contractNumber);
  }
}

import { Injectable } from '@nestjs/common';
import { ExampleRepository } from 'src/repositories/example.repository';

@Injectable()
export class ExampleService {
  constructor(private readonly exampleRepository: ExampleRepository) {}
  public async getExamples(contractNumber: string) {
    const res = this.exampleRepository.findByContactNumber(contractNumber);
    return res;
  }
}

import { Module } from '@nestjs/common';
import { ExampleService } from './services/example.service';
import { ExampleController } from './controllers/example.controller';
import { ExampleRepository } from 'src/repositories/example.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ExampleEntity, ExampleSchema } from 'src/entities/example.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: ExampleEntity.name, schema: ExampleSchema }])],
  providers: [ExampleService, ExampleRepository],
  controllers: [ExampleController],
})
export class ExampleModule {}

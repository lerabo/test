import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ExampleEntity } from "src/entities/example.entity";

export class ExampleRepository {
  constructor(@InjectModel(ExampleEntity.name) private exampleModel: Model<ExampleEntity>) {}

  public async findByContactNumber(contactNumber: string) {
    return this.exampleModel.findOne({contactNumber}).exec();
  }
}
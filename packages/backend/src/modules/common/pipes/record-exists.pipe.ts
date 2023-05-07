import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { GUID_MATCH } from 'src/modules/common/constants';
import { getRepository } from 'typeorm';

@ValidatorConstraint({ name: 'RecordExists', async: true })
@Injectable()
export class RecordExistsPipe implements ValidatorConstraintInterface {
  async validate(value: string, validationArguments: ValidationArguments) {
    const [entity, field = 'id', errorIfExist = false] =
      validationArguments.constraints;
    if (field === 'id' && !value.match(GUID_MATCH)) {
      return false;
    }

    const repository = await getRepository(entity);
    const record = await repository.findOne({ [field]: value });

    if (record && errorIfExist) {
      return false;
    }
    if (!record && !errorIfExist) {
      return false;
    }

    return true;
  }
}

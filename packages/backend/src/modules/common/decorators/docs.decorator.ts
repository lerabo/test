import { ApiResponse } from '@nestjs/swagger';
import { EAppRoles } from 'src/modules/common/types';
import { IdDTO, TokenDTO } from 'src/modules/common/dtos';

export const ApiLoginResponse = (role: EAppRoles) =>
  ApiResponse({
    status: 200,
    description: `${role} successfully login!`,
    type: TokenDTO,
  });

export const ApiGetResponse = (description: string, type: () => void) =>
  ApiResponse({ status: 200, description, type });

export const ApiCreateResponse = (description: string, type: () => void) =>
  ApiResponse({ status: 201, description, type });

export const ApiUpdateResponse = (description: string) =>
  ApiResponse({ status: 201, description, type: IdDTO });

export const ApiForbiddenResponse = () =>
  ApiResponse({ status: 403, description: 'Forbidden.' });

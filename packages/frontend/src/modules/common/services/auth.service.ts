import { CreateUserDTO, UserDTO } from '../types/user.type';
import { EnhancedWithAuthHttpService } from './http-auth.service';
import { HttpFactoryService } from './http-factory.service';

class AuthService {
  constructor(private readonly httpService: EnhancedWithAuthHttpService) {}

  async verifyToken(pubKey: string) {
    return this.httpService.post<UserDTO, { pubKey: string }>('auth/verify', {
      pubKey
    });
  }

  async login(payload: CreateUserDTO) {
    return this.httpService.post<UserDTO, CreateUserDTO>('auth/login', payload);
  }
}

const httpService = HttpFactoryService.createAuthHttpService();
export const authService = new AuthService(httpService);
